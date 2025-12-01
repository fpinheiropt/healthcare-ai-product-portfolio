import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LogisticRegression
from sklearn.preprocessing import StandardScaler
from sklearn.pipeline import Pipeline
from sklearn.metrics import accuracy_score, classification_report
import json

# Load Data
data_path = r"H:\CAREER TRANSITION\PORTFOLIO\data\DMData\diabetes.csv"
df = pd.read_csv(data_path)

# Preprocessing
X = df.drop('Outcome', axis=1)
y = df['Outcome']

# Create pipeline
model = Pipeline(steps=[
    ('scaler', StandardScaler()),
    ('classifier', LogisticRegression())
])

# Train model
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
model.fit(X_train, y_train)

# Evaluate
y_pred = model.predict(X_test)
print("Model Accuracy:", accuracy_score(y_test, y_pred))
print("\nClassification Report:\n", classification_report(y_test, y_pred))

# Extract Coefficients
classifier = model.named_steps['classifier']
scaler = model.named_steps['scaler']

coefficients = classifier.coef_[0]
intercept = classifier.intercept_[0]
feature_names = X.columns.tolist()

print("\n--- Model Coefficients (for React App) ---")
coef_dict = {name: coef for name, coef in zip(feature_names, coefficients)}
coef_dict['Intercept'] = intercept

# Also save scaler mean and scale for normalization in the app
coef_dict['means'] = {name: mean for name, mean in zip(feature_names, scaler.mean_)}
coef_dict['scales'] = {name: scale for name, scale in zip(feature_names, scaler.scale_)}

print(json.dumps(coef_dict, indent=2))
