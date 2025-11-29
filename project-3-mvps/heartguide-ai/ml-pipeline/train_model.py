import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.preprocessing import LabelEncoder
from sklearn.metrics import accuracy_score, classification_report
import json
import joblib

def train_model():
    # Load data
    try:
        df = pd.read_csv('heart_failure_dataset.csv')
    except FileNotFoundError:
        print("Dataset not found. Please run generate_data.py first.")
        return

    # Preprocessing
    le_dict = {}
    categorical_cols = ['Sex', 'ChestPainType', 'RestingECG', 'ExerciseAngina', 'ST_Slope']
    
    for col in categorical_cols:
        le = LabelEncoder()
        df[col] = le.fit_transform(df[col])
        le_dict[col] = {str(k): int(v) for k, v in zip(le.classes_, le.transform(le.classes_))}
    
    X = df.drop('HeartDisease', axis=1)
    y = df['HeartDisease']
    
    # Train test split
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
    
    # Train model
    rf = RandomForestClassifier(n_estimators=100, max_depth=5, random_state=42)
    rf.fit(X_train, y_train)
    
    # Evaluate
    y_pred = rf.predict(X_test)
    print(f"Accuracy: {accuracy_score(y_test, y_pred):.4f}")
    print("\nClassification Report:\n", classification_report(y_test, y_pred))
    
    # Feature Importance
    feature_importance = dict(zip(X.columns, rf.feature_importances_))
    print("\nFeature Importance:\n", feature_importance)
    
    # Export model for frontend (Simplified for MVP: exporting coefficients/logic or just the importance for simulation)
    # For a real app, we'd use ONNX or a backend API. 
    # For this MVP client-side simulation, we will export the feature weights/importance to adjust the risk score calculation dynamically.
    # However, to be more "AI", let's save the actual model to be served (mocked) or just use the logic.
    # We will save the feature importance and the categorical mappings to a JSON file that the frontend can "load" (or we hardcode based on this).
    
    model_artifact = {
        "feature_importance": feature_importance,
        "categorical_mappings": le_dict,
        "base_risk": float(y_train.mean()) # approximate base risk
    }
    
    with open('public/model_artifact.json', 'w') as f:
        json.dump(model_artifact, f, indent=2)
        
    print("\nModel artifact saved to public/model_artifact.json")
    
    # Also save the actual sklearn model for "completeness"
    joblib.dump(rf, 'ml-pipeline/heart_risk_model.joblib')
    print("Full model saved to ml-pipeline/heart_risk_model.joblib")

if __name__ == "__main__":
    train_model()
