import { GoogleGenAI, Type } from "@google/genai";

// Initialize Gemini Client
// NOTE: In a real production app, API calls should be proxied through a backend to protect the key.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const analyzeMealImage = async (base64Image: string, promptText: string = "") => {
  try {
    const model = "gemini-2.5-flash"; 
    
    const prompt = promptText || "Analyze this image for a diabetic patient. Identify the food items, estimate total carbohydrates in grams, and estimate calories. Return JSON.";

    const response = await ai.models.generateContent({
      model: model,
      contents: {
        parts: [
          {
            inlineData: {
              mimeType: "image/jpeg",
              data: base64Image
            }
          },
          { text: prompt }
        ]
      },
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            foodItems: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            },
            totalCarbs: { type: Type.NUMBER, description: "Total carbohydrates in grams" },
            totalCalories: { type: Type.NUMBER },
            glycemicIndexEstimate: { type: Type.STRING, description: "Low, Medium, or High" },
            healthTip: { type: Type.STRING, description: "Short advice for a diabetic eating this meal" }
          }
        }
      }
    });

    return JSON.parse(response.text || "{}");
  } catch (error) {
    console.error("Error analyzing meal:", error);
    throw error;
  }
};

export const getGlucoseInsights = async (readings: any[], medications: any[]) => {
  try {
    const model = "gemini-2.5-flash";
    
    // Prepare context for the AI
    const contextData = {
      recentReadings: readings.slice(-10),
      medications: medications
    };

    const prompt = `
      Analyze the following recent glucose readings and medication data for a Type 2 Diabetes patient.
      Provide a risk assessment for hypoglycemia in the next 24 hours (0-100%) and one key actionable insight.
      
      Data: ${JSON.stringify(contextData)}
    `;

    const response = await ai.models.generateContent({
      model: model,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            hypoRiskScore: { type: Type.NUMBER, description: "0 to 100 percentage" },
            riskLevel: { type: Type.STRING, enum: ["Low", "Moderate", "High"] },
            insightTitle: { type: Type.STRING },
            insightMessage: { type: Type.STRING },
            recommendation: { type: Type.STRING }
          }
        }
      }
    });

    return JSON.parse(response.text || "{}");
  } catch (error) {
    console.error("Error generating insights:", error);
    throw error;
  }
};