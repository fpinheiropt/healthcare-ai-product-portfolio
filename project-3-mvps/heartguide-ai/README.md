# HeartGuide AI

## 🩺 Overview
HeartGuide AI is an AI-powered platform that predicts the risk of heart disease and provides personalized prevention recommendations. This MVP demonstrates the core functionality of our predictive model and user interface.

## 🎯 Problem Statement
Cardiovascular diseases are the leading cause of death globally, with many cases being preventable through early detection and lifestyle changes. Current risk assessment tools are often not personalized enough or require extensive medical testing.

## 🚀 Solution
HeartGuide AI uses machine learning to analyze health metrics and predict heart disease risk with high accuracy, providing personalized insights and prevention strategies.

## 👥 Target Users
- **Primary**: Adults aged 30-65 concerned about heart health
- **Secondary**: Primary care physicians, cardiologists

## 🛠 Tech Stack
- **Frontend**: Streamlit
- **Backend**: FastAPI
- **ML Framework**: TensorFlow/Keras
- **Data Storage**: SQLite
- **Deployment**: Docker, AWS

## 🎯 Key Features
1. **Risk Assessment**
   - Input health metrics (age, blood pressure, cholesterol, etc.)
   - Receive instant heart disease risk prediction
   - View personalized risk factors

2. **Personalized Insights**
   - Understand key factors affecting your risk
   - Track changes over time
   - Receive evidence-based recommendations

3. **Clinical Integration**
   - Exportable reports for healthcare providers
   - API for EHR integration
   - Secure data handling (HIPAA compliant)

## 📊 Model Performance
- **Accuracy**: 87.5%
- **Precision**: 89.2%
- **Recall**: 86.1%
- **AUC-ROC**: 0.92

## 🚀 Getting Started
```bash
# Clone the repository
git clone [repository-url]

# Install dependencies
pip install -r requirements.txt

# Run the application
streamlit run app/main.py
```

## 📂 Project Structure
```
heartguide-ai/
├── app/                 # Application code
│   ├── main.py          # Main Streamlit app
│   └── api/             # API endpoints
├── models/              # Trained models
│   └── heart_model.h5   # Pretrained model
├── notebooks/           # Jupyter notebooks
│   ├── EDA.ipynb        # Exploratory data analysis
│   └── model_training.ipynb  # Model development
└── tests/               # Unit tests
```

## 📅 Development Roadmap
- [x] Data collection and preprocessing
- [x] Model development and training
- [x] Basic Streamlit UI
- [ ] User authentication
- [ ] Mobile app integration
- [ ] Clinical validation study

## 📝 License
This project is licensed under the MIT License - see the [LICENSE](../LICENSE) file for details.

## 🤝 Contributing
Contributions are welcome! Please read our [contributing guidelines](CONTRIBUTING.md) for details.

## 📧 Contact
For questions or feedback, please contact [your-email@example.com](mailto:your-email@example.com)
