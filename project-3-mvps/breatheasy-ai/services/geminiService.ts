import { GoogleGenAI, Type } from "@google/genai";
import { Patient, AIAnalysisResult, RiskLevel } from '../types';

// In a real app, this key comes from a secure backend proxy.
// For this demo, we assume it is in process.env
const API_KEY = process.env.API_KEY || ''; 

export const analyzePatientRisk = async (patient: Patient): Promise<AIAnalysisResult> => {
  if (!API_KEY) {
    // Fallback for demo if no key is present
    return {
      riskScore: patient.riskScore,
      riskLevel: patient.riskScore > 60 ? RiskLevel.HIGH : (patient.riskScore > 20 ? RiskLevel.MODERATE : RiskLevel.LOW),
      reasoning: "Simulation Mode: API Key not detected. Based on static rules: PEF is declining relative to baseline.",
      recommendation: "Monitor PEF daily. If drop continues >20%, initiate Yellow Zone protocol.",
      urgentActionRequired: patient.riskScore > 60
    };
  }

  const ai = new GoogleGenAI({ apiKey: API_KEY });

  // Format the last 7 days of logs for the prompt
  const recentLogs = patient.logs.slice(-7);
  const logSummary = recentLogs.map(log => 
    `Date: ${log.date}, PEF: ${log.pef} (Baseline: ${patient.baselinePEF}), SpO2: ${log.spO2}%, Breathlessness: ${log.breathlessness}/10, Rescue Inhaler: ${log.rescueInhalerPuffs} puffs`
  ).join('\n');

  const prompt = `
    You are a COPD specialist AI assistant. Analyze the following patient data to predict exacerbation risk.
    
    Patient Profile:
    - Age: ${patient.age}
    - COPD Stage: ${patient.copdStage}
    - Baseline PEF: ${patient.baselinePEF}

    Recent Daily Logs (Last 7 days):
    ${logSummary}

    Task:
    1. Calculate a risk score (0-100) where >60 is high risk of imminent exacerbation.
    2. Identify key trends (PEF decline, SpO2 drops, symptom spikes).
    3. Provide a specific clinical recommendation.
    
    Output JSON only.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            riskScore: { type: Type.NUMBER },
            riskLevel: { type: Type.STRING },
            reasoning: { type: Type.STRING },
            recommendation: { type: Type.STRING },
            urgentActionRequired: { type: Type.BOOLEAN }
          },
          required: ["riskScore", "riskLevel", "reasoning", "recommendation", "urgentActionRequired"]
        }
      }
    });

    const result = JSON.parse(response.text || '{}');
    
    // Map string risk level to enum if needed
    let riskLevelEnum = RiskLevel.LOW;
    if (result.riskScore >= 60) riskLevelEnum = RiskLevel.HIGH;
    else if (result.riskScore >= 20) riskLevelEnum = RiskLevel.MODERATE;

    return {
      riskScore: result.riskScore,
      riskLevel: riskLevelEnum,
      reasoning: result.reasoning,
      recommendation: result.recommendation,
      urgentActionRequired: result.urgentActionRequired
    };

  } catch (error) {
    console.error("Gemini Analysis Failed", error);
    return {
        riskScore: 0,
        riskLevel: RiskLevel.LOW,
        reasoning: "AI Analysis unavailable. Please consult standard charts.",
        recommendation: "Continue standard monitoring.",
        urgentActionRequired: false
    }
  }
};