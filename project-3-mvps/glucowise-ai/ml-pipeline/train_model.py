import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestRegressor
from sklearn.preprocessing import LabelEncoder
from sklearn.metrics import mean_absolute_error, r2_score
import json
import joblib

def generate_synthetic_data(n_samples=1000):
    np.random.seed(42)
    
    # Features for glucose prediction
    data = {
        'Age': np.random.randint(25, 75, n_samples),
        'BMI': np.random.normal(28, 5, n_samples),
        'CarbohydrateIntake': np.random.randint(30, 200, n_samples),  # grams
        'PhysicalActivity': np.random.choice(['Low', 'Moderate', 'High'], n_samples),
        'MedicationAdherence': np.random.choice([0, 1], n_samples, p=[0.2, 0.8]),
        'StressLevel': np.random.randint(1, 11, n_samples),  # 1-10 scale
        'SleepHours': np.random.normal(7, 1.5, n_samples),
        'BaselineGlucose': np.random.normal(120, 30, n_samples),
    }
    
    df = pd.DataFrame(data)
    
    # Simulate glucose level based on features
    glucose = (
        df['BaselineGlucose'] +
        (df['CarbohydrateIntake'] - 100) * 0.5 +  # Carbs increase glucose
        (df['Age'] - 50) * 0.3 +  # Age factor
        (df['BMI'] - 25) * 1.5 +  # BMI impact
        (df['PhysicalActivity'] == 'Low').astype(int) * 15 +  # Low activity increases
        (df['PhysicalActivity'] == 'High').astype(int) * -10 +  # High activity decreases
        (1 - df['MedicationAdherence']) * 25 +  # Non-adherence increases
        df['StressLevel'] * 2 +  # Stress increases
        (7 - df['SleepHours']) * 3 +  # Poor sleep increases
        np.random.normal(0, 10, n_samples)  # Random noise
    )
    
    df['GlucoseLevel'] = np.clip(glucose, 70, 300)  # Realistic range
    
    return df

def train_model():
    print("Generating synthetic diabetes data...")
    df = generate_synthetic_data(1000)
    
    # Save dataset
    df.to_csv('ml-pipeline/diabetes_dataset.csv', index=False)
    print(f"Dataset saved: {len(df)} samples")
    
    # Preprocessing
    le_dict = {}
    categorical_cols = ['PhysicalActivity']
    
    for col in categorical_cols:
        le = LabelEncoder()
        df[col] = le.fit_transform(df[col])
        le_dict[col] = {str(k): int(v) for k, v in zip(le.classes_, le.transform(le.classes_))}
    
    X = df.drop('GlucoseLevel', axis=1)
    y = df['GlucoseLevel']
    
    # Train test split
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
    
    # Train model
    rf = RandomForestRegressor(n_estimators=100, max_depth=10, random_state=42)
    rf.fit(X_train, y_train)
    
    # Evaluate
    y_pred = rf.predict(X_test)
    mae = mean_absolute_error(y_test, y_pred)
    r2 = r2_score(y_test, y_pred)
    
    print(f"\nModel Performance:")
    print(f"MAE: {mae:.2f} mg/dL")
    print(f"R² Score: {r2:.4f}")
    
    # Feature Importance
    feature_importance = dict(zip(X.columns, rf.feature_importances_))
    print("\nFeature Importance:")
    for feat, imp in sorted(feature_importance.items(), key=lambda x: x[1], reverse=True):
        print(f"  {feat}: {imp:.4f}")
    
    # Export model artifact
    model_artifact = {
        "feature_importance": {k: float(v) for k, v in feature_importance.items()},
        "categorical_mappings": le_dict,
        "baseline_glucose": float(y_train.mean()),
        "model_performance": {
            "mae": float(mae),
            "r2": float(r2)
        }
    }
    
    with open('public/model_artifact.json', 'w') as f:
        json.dump(model_artifact, f, indent=2)
        
    print("\nModel artifact saved to public/model_artifact.json")
    
    # Save full model
    joblib.dump(rf, 'ml-pipeline/glucose_model.joblib')
    print("Full model saved to ml-pipeline/glucose_model.joblib")

if __name__ == "__main__":
    train_model()
