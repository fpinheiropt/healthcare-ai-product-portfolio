import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.linear_model import Ridge
from sklearn.preprocessing import StandardScaler
from sklearn.pipeline import Pipeline
import json

# 1. Load Data
data_path = r"H:\CAREER TRANSITION\PORTFOLIO\data\COPDData\dataset.csv"
df = pd.read_csv(data_path)

# 2. Preprocessing
severity_map = {
    'MILD': 1,
    'MODERATE': 2,
    'SEVERE': 3,
    'VERY SEVERE': 4
}
df['SeverityScore'] = df['COPDSEVERITY'].map(severity_map)

# Select Features
# FEV1: Lung Function (Lower is worse)
# PackHistory: Smoking (Higher is worse)
# AGE: Age (Higher is arguably worse)
features = ['FEV1', 'PackHistory', 'AGE']
target = 'SeverityScore'

df = df.dropna(subset=features + [target])
X = df[features]
y = df[target]

# 3. Train Model
# Using Ridge Regression to handle potential multicollinearity and stabilize coefficients
model = Pipeline([
    ('scaler', StandardScaler()),
    ('regressor', Ridge(alpha=1.0))
])

model.fit(X, y)

# 4. Extract Coefficients
regressor = model.named_steps['regressor']
scaler = model.named_steps['scaler']

# 5. Output JSON
output = {
    "coef": {
        "FEV1": regressor.coef_[0],
        "PackHistory": regressor.coef_[1],
        "AGE": regressor.coef_[2],
        "Intercept": regressor.intercept_
    },
    "means": {
        "FEV1": scaler.mean_[0],
        "PackHistory": scaler.mean_[1],
        "AGE": scaler.mean_[2]
    },
    "scales": {
        "FEV1": scaler.scale_[0],
        "PackHistory": scaler.scale_[1],
        "AGE": scaler.scale_[2]
    }
}

print("\n--- JSON OUTPUT START ---")
print(json.dumps(output, indent=2))
print("--- JSON OUTPUT END ---")

print(f"\nModel R2 Score: {model.score(X, y):.4f}")
print("Coefficients interpretation:")
print(f"FEV1: {regressor.coef_[0]:.4f} (Expected Negative)")
print(f"PackHistory: {regressor.coef_[1]:.4f} (Expected Positive)")
print(f"AGE: {regressor.coef_[2]:.4f}")
