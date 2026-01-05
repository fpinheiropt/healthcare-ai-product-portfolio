<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

## 🏗️ Architecture
The **BreathEasy System** uses a Trigger Safety Guardrail to deterministic flag hazardous environmental conditions.

```mermaid
graph TD
    Env[Open-Meteo API] --> SafetyGuard[🌬️ Trigger Safety]
    SafetyGuard -- AQI > 150 --> Hazardous[☣️ Hazardous Alert]
    SafetyGuard -- AQI < 50 --> Safe[✅ Optimal Conditions]
    SafetyGuard --> UI[Patient Dashboard]
```

## 🧪 Testing
Run deterministic safety tests with:
```bash
npm test
```

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/drive/1kS4iKUFo-Y7xNl7i-RJf-cRYNIB8uRmC

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`
