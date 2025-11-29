import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.preprocessing import LabelEncoder
from sklearn.metrics import accuracy_score, classification_report
import json
import joblib

def generate_synthetic_data(n_samples=1000):
    np.random.seed(42)
    
    # Features for asthma exacerbation prediction
    data = {
        'Age': np.random.randint(5, 75, n_samples),
        'PeakFlow': np.random.normal(400, 80, n_samples),  # L/min
        'SymptomScore': np.random.randint(0, 11, n_samples),  # 0-10 scale
        'MedicationAdherence': np.random.choice([0, 1], n_samples, p=[0.3, 0.7]),
        'AirQuality': np.random.choice(['Good', 'Moderate', 'Poor'], n_samples),
        'Pollen': np.random.choice(['Low', 'Medium', 'High'], n_samples),
        'Temperature': np.random.normal(20, 8, n_samples),  # Celsius
        'Humidity': np.random.normal(60, 15, n_samples),  # Percentage
        'RecentInfection': np.random.choice([0, 1], n_samples, p=[0.8, 0.2]),
        'StressLevel': np.random.randint(1, 11, n_samples),  # 1-10 scale
        'SleepQuality': np.random.randint(1, 11, n_samples),  # 1-10 scale
    }
    
    df = pd.DataFrame(data)
    
    # Simulate exacerbation risk based on features
    risk_score = (
        (df['PeakFlow'] < 350).astype(int) * 3 +  # Low peak flow
        (df['SymptomScore'] > 5).astype(int) * 3 +  # High symptoms
        (1 - df['MedicationAdherence']) * 2 +  # Non-adherence
        (df['AirQuality'] == 'Poor').astype(int) * 2 +
        (df['Pollen'] == 'High').astype(int) * 2 +
        (df['Temperature'] < 10).astype(int) * 1 +  # Cold weather
        (df['Humidity'] > 75).astype(int) * 1 +  # High humidity
        df['RecentInfection'] * 3 +
        (df['StressLevel'] > 7).astype(int) * 1 +
        (df['SleepQuality'] < 5).astype(int) * 1 +
        np.random.normal(0, 2, n_samples)  # Random noise
    )
    
    # Sigmoid-like probability
    prob = 1 / (1 + np.exp(-(risk_score - 6)))
    df['ExacerbationRisk'] = (np.random.random(n_samples) < prob).astype(int)
    
    return df

def train_model():
    print("Generating synthetic asthma data...")
    df = generate_synthetic_data(1000)
    
    # Save dataset
    df.to_csv('ml-pipeline/asthma_dataset.csv', index=False)
    print(f"Dataset saved: {len(df)} samples")
    
    # Preprocessing
    le_dict = {}
    categorical_cols = ['AirQuality', 'Pollen']
    
    for col in categorical_cols:
        le = LabelEncoder()
        df[col] = le.fit_transform(df[col])
        le_dict[col] = {str(k): int(v) for k, v in zip(le.classes_, le.transform(le.classes_))}
    
    X = df.drop('ExacerbationRisk', axis=1)
    y = df['ExacerbationRisk']
    
    # Train test split
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
    
    # Train model
    rf = RandomForestClassifier(n_estimators=100, max_depth=8, random_state=42)
    rf.fit(X_train, y_train)
    
    # Evaluate
    y_pred = rf.predict(X_test)
    accuracy = accuracy_score(y_test, y_pred)
    print(f"\nModel Performance:")
    print(f"Accuracy: {accuracy:.4f}")
    print("\nClassification Report:\n", classification_report(y_test, y_pred))
    
    # Feature Importance
    feature_importance = dict(zip(X.columns, rf.feature_importances_))
    print("\nFeature Importance:")
    for feat, imp in sorted(feature_importance.items(), key=lambda x: x[1], reverse=True):
        print(f"  {feat}: {imp:.4f}")
    
    # Export model artifact
    model_artifact = {
        "feature_importance": {k: float(v) for k, v in feature_importance.items()},
        "categorical_mappings": le_dict,
        "baseline_risk": float(y_train.mean()),
        "model_performance": {
            "accuracy": float(accuracy)
        }
    }
    
    with open('public/model_artifact.json', 'w') as f:
        json.dump(model_artifact, f, indent=2)
        
    print("\nModel artifact saved to public/model_artifact.json")
    
    # Save full model
    joblib.dump(rf, 'ml-pipeline/asthma_model.joblib')
    print("Full model saved to ml-pipeline/asthma_model.joblib")

if __name__ == "__main__":
    train_model()
