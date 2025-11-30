import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LogisticRegression
from sklearn.preprocessing import StandardScaler, OneHotEncoder
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline
from sklearn.metrics import accuracy_score, classification_report

# Load Data
data_path = r"H:\CAREER TRANSITION\PORTFOLIO\data\HFdata\heart.csv"
df = pd.read_csv(data_path)

# Preprocessing
X = df.drop('HeartDisease', axis=1)
y = df['HeartDisease']

# Define categorical and numerical columns
categorical_cols = ['Sex', 'ChestPainType', 'RestingECG', 'ExerciseAngina', 'ST_Slope']
numerical_cols = ['Age', 'RestingBP', 'Cholesterol', 'FastingBS', 'MaxHR', 'Oldpeak']

# Create preprocessor
preprocessor = ColumnTransformer(
    transformers=[
        ('num', StandardScaler(), numerical_cols),
        ('cat', OneHotEncoder(drop='first', sparse_output=False), categorical_cols)
    ])

# Create pipeline
model = Pipeline(steps=[('preprocessor', preprocessor),
                        ('classifier', LogisticRegression())])

# Train model
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
model.fit(X_train, y_train)

# Evaluate
y_pred = model.predict(X_test)
print("Model Accuracy:", accuracy_score(y_test, y_pred))
print("\nClassification Report:\n", classification_report(y_test, y_pred))

# Extract Coefficients
classifier = model.named_steps['classifier']
preprocessor = model.named_steps['preprocessor']

# Get feature names after one-hot encoding
cat_feature_names = preprocessor.named_transformers_['cat'].get_feature_names_out(categorical_cols)
feature_names = numerical_cols + list(cat_feature_names)

coefficients = classifier.coef_[0]
intercept = classifier.intercept_[0]

print("\n--- Model Coefficients (for React App) ---")
print(f"Intercept: {intercept:.4f}")
for name, coef in zip(feature_names, coefficients):
    print(f"{name}: {coef:.4f}")

print("\n--- JSON Format ---")
import json
coef_dict = {name: coef for name, coef in zip(feature_names, coefficients)}
coef_dict['Intercept'] = intercept
print(json.dumps(coef_dict, indent=2))
