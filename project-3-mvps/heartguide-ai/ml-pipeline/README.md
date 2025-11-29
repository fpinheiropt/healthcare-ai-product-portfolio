# HeartGuide AI - ML Pipeline

## Overview
This directory contains the machine learning pipeline for training the Heart Failure Risk Prediction model used in the HeartGuide AI application.

## Files
- `generate_data.py`: Generates synthetic heart failure dataset based on UCI Heart Disease schema
- `train_model.py`: Trains a Random Forest Classifier and exports model artifacts
- `requirements.txt`: Python dependencies
- `heart_risk_model.joblib`: Trained scikit-learn model (binary)
- `heart_failure_dataset.csv`: Generated synthetic dataset

## Model Details
- **Algorithm**: Random Forest Classifier
- **Features**: Age, Sex, ChestPainType, RestingBP, Cholesterol, FastingBS, RestingECG, MaxHR, ExerciseAngina, Oldpeak, ST_Slope
- **Target**: HeartDisease (binary: 0 = No, 1 = Yes)
- **Accuracy**: ~76% on test set
- **Output**: `public/model_artifact.json` containing feature importance weights and categorical mappings

## Usage

### 1. Install Dependencies
```bash
pip install -r requirements.txt
```

### 2. Generate Dataset
```bash
python generate_data.py
```

### 3. Train Model
```bash
python train_model.py
```

This will:
- Train the Random Forest model
- Print accuracy and classification report
- Export model artifact to `../public/model_artifact.json`
- Save full model to `heart_risk_model.joblib`

## Model Artifact
The `model_artifact.json` file contains:
- **feature_importance**: Weights for each clinical feature
- **categorical_mappings**: Encoding mappings for categorical variables
- **base_risk**: Population-level baseline risk (34.5%)

## Frontend Integration
The Risk Simulator in `PatientView.tsx` uses the feature importance weights to calculate dynamic risk scores based on user inputs (weight changes, symptom severity).
