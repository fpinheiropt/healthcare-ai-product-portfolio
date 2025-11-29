import { GoogleGenAI, Type } from "@google/genai";
import { SodiumEstimationResponse, RiskAssessmentResponse, SymptomLog } from "../types";

const apiKey = process.env.API_KEY || '';
// Safety check handled in UI if key is missing, but service assumes existence or handles errors.
const ai = new GoogleGenAI({ apiKey });

export const estimateSodium = async (foodDescription: string): Promise<SodiumEstimationResponse> => {
  if (!apiKey) throw new Error("API Key missing");

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `Estimate the sodium content for this food item: "${foodDescription}". 
      Provide a conservative estimate suitable for a heart failure patient. 
      Also provide brief advice (1 sentence).`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            sodiumMg: { type: Type.NUMBER, description: "Estimated sodium in milligrams" },
            advice: { type: Type.STRING, description: "Brief dietary advice" },
            riskAnalysis: { type: Type.STRING, description: "Is this low, medium, or high sodium for a HF patient?" }
          },
          required: ["sodiumMg", "advice", "riskAnalysis"]
        }
      }
    });

    if (response.text) {
      return JSON.parse(response.text) as SodiumEstimationResponse;
    }
    throw new Error("No data returned");
  } catch (error) {
    console.error("Gemini Sodium Error:", error);
    // Fallback for demo robustness
    return { sodiumMg: 0, advice: "Could not estimate. Please check manual label.", riskAnalysis: "Unknown" };
  }
};

export const assessPatientRisk = async (
  log: SymptomLog, 
  previousWeight: number,
  medsAdherenceRate: number
): Promise<RiskAssessmentResponse> => {
  if (!apiKey) throw new Error("API Key missing");

  const prompt = `
    Act as an expert cardiologist AI system. Evaluate the readmission risk for a Heart Failure patient based on today's check-in.
    
    Current Data:
    - Weight: ${log.weight} lbs (Previous: ${previousWeight} lbs)
    - SOB (Shortness of Breath): ${log.shortnessOfBreath}/10
    - Swelling: ${log.swelling ? "Yes" : "No"}
    - Chest Pain: ${log.chestPain ? "Yes" : "No"}
    - Med Adherence (Last 7 days): ${medsAdherenceRate}%
    
    Rules:
    - Weight gain > 3lbs in 2 days is HIGH risk.
    - SOB > 5 is MODERATE/HIGH risk.
    - Chest Pain is CRITICAL/HIGH risk.
    - Low adherence increases risk.
    
    Output JSON with a risk score (0-100), analysis, and recommendation.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            riskScore: { type: Type.NUMBER },
            riskAnalysis: { type: Type.STRING },
            recommendation: { type: Type.STRING }
          },
          required: ["riskScore", "riskAnalysis", "recommendation"]
        }
      }
    });

    if (response.text) {
      return JSON.parse(response.text) as RiskAssessmentResponse;
    }
    throw new Error("No risk data returned");
  } catch (error) {
    console.error("Gemini Risk Error:", error);
    return { riskScore: 50, riskAnalysis: "AI Unavailable", recommendation: "Contact care team manually." };
  }
};

export const chatWithNurseAI = async (message: string, context: string) => {
  if (!apiKey) throw new Error("API Key missing");

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `
        System: You are "Nurse Joy", a compassionate cardiac care nurse assistant. 
        Context about patient: ${context}.
        User Question: ${message}
        
        Keep answers short (under 50 words), empathetic, and strictly medical adherence focused. 
        If emergency (chest pain, severe breath), tell them to call 911 immediately.
      `,
    });
    return response.text || "I'm sorry, I didn't catch that.";
  } catch (error) {
    return "I am having trouble connecting. Please call your care provider if this is urgent.";
  }
};

export const generateEducationalContent = async (topic: string, patientCondition: string): Promise<{title: string, content: string}> => {
  if (!apiKey) return { title: topic, content: "Unable to load content. Please check your internet connection." };

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `Write a short, encouraging educational article for a heart failure patient with ${patientCondition} about "${topic}".
      Structure:
      - 3 Key Takeaways (bullet points)
      - Simple explanation (2 paragraphs, max 150 words)
      - Actionable advice for today
      
      Output plain text, formatted with simple Markdown (use ** for bold, - for lists).`,
    });
    return { title: topic, content: response.text || "Content unavailable." };
  } catch (e) {
    return { title: topic, content: "Content unavailable at the moment." };
  }
};
