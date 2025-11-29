import pandas as pd
import numpy as np

def generate_synthetic_data(n_samples=1000):
    np.random.seed(42)
    
    # Features based on standard heart disease datasets (e.g., UCI)
    data = {
        'Age': np.random.randint(28, 78, n_samples),
        'Sex': np.random.choice(['M', 'F'], n_samples),
        'ChestPainType': np.random.choice(['TA', 'ATA', 'NAP', 'ASY'], n_samples),
        'RestingBP': np.random.normal(130, 20, n_samples).astype(int),
        'Cholesterol': np.random.normal(240, 50, n_samples).astype(int),
        'FastingBS': np.random.choice([0, 1], n_samples, p=[0.8, 0.2]),
        'RestingECG': np.random.choice(['Normal', 'ST', 'LVH'], n_samples),
        'MaxHR': np.random.normal(140, 25, n_samples).astype(int),
        'ExerciseAngina': np.random.choice(['Y', 'N'], n_samples),
        'Oldpeak': np.round(np.random.exponential(1, n_samples), 1),
        'ST_Slope': np.random.choice(['Up', 'Flat', 'Down'], n_samples),
    }
    
    df = pd.DataFrame(data)
    
    # Simulate HeartDisease target based on some logic to make it learnable
    # This is a simplified logic for demonstration purposes
    risk_score = (
        (df['Age'] > 55).astype(int) * 2 +
        (df['Sex'] == 'M').astype(int) * 1 +
        (df['ChestPainType'] == 'ASY').astype(int) * 3 +
        (df['RestingBP'] > 140).astype(int) * 2 +
        (df['Cholesterol'] > 280).astype(int) * 1 +
        (df['FastingBS'] == 1).astype(int) * 2 +
        (df['MaxHR'] < 120).astype(int) * 2 +
        (df['ExerciseAngina'] == 'Y').astype(int) * 3 +
        (df['Oldpeak'] > 1.5).astype(int) * 2 +
        (df['ST_Slope'] == 'Flat').astype(int) * 2
    )
    
    # Add some noise
    risk_score += np.random.normal(0, 2, n_samples)
    
    # Sigmoid-like probability
    prob = 1 / (1 + np.exp(-(risk_score - 8))) # Shift to center
    df['HeartDisease'] = (np.random.random(n_samples) < prob).astype(int)
    
    return df

if __name__ == "__main__":
    print("Generating synthetic heart failure data...")
    df = generate_synthetic_data(1000)
    output_path = 'heart_failure_dataset.csv'
    df.to_csv(output_path, index=False)
    print(f"Dataset saved to {output_path}")
    print(df.head())
    print(f"\nClass distribution:\n{df['HeartDisease'].value_counts(normalize=True)}")
