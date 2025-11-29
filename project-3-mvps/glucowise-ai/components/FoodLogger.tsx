import React, { useState, useRef } from 'react';
import { Camera, Check, Loader2, Utensils } from 'lucide-react';
import { analyzeMealImage } from '../services/geminiService';

interface FoodLoggerProps {
  onLog: (data: any) => void;
}

const FoodLogger: React.FC<FoodLoggerProps> = ({ onLog }) => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const [analysis, setAnalysis] = useState<any>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result as string;
      setPreview(base64String);
      analyzeImage(base64String.split(',')[1]); // Remove data URL prefix
    };
    reader.readAsDataURL(file);
  };

  const analyzeImage = async (base64: string) => {
    setIsAnalyzing(true);
    try {
      const result = await analyzeMealImage(base64);
      setAnalysis(result);
    } catch (error) {
      console.error("Analysis failed", error);
      alert("Failed to analyze image. Please try again.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  const confirmLog = () => {
    if (analysis) {
      onLog(analysis);
      setPreview(null);
      setAnalysis(null);
    }
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
          <div className="p-1.5 bg-orange-100 rounded-lg">
             <Utensils className="w-5 h-5 text-orange-500" />
          </div>
          Smart Food Logger
        </h3>
      </div>

      {!preview ? (
        <div 
          className="border-2 border-dashed border-slate-200 rounded-2xl p-8 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-slate-50 hover:border-emerald-200 transition-all group"
          onClick={() => fileInputRef.current?.click()}
        >
          <div className="w-14 h-14 bg-emerald-50 rounded-full flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
            <Camera className="w-7 h-7 text-emerald-600" />
          </div>
          <h4 className="text-slate-700 font-bold">Snap or Upload Meal</h4>
          <p className="text-sm text-slate-400 mt-1">AI estimates carbs & suggests dosing</p>
          <input 
            type="file" 
            ref={fileInputRef} 
            className="hidden" 
            accept="image/*"
            onChange={handleFileChange}
          />
        </div>
      ) : (
        <div className="space-y-4">
          <div className="relative h-56 w-full bg-slate-100 rounded-xl overflow-hidden shadow-inner">
            <img src={preview} alt="Meal preview" className="w-full h-full object-cover" />
            {isAnalyzing && (
              <div className="absolute inset-0 bg-black/60 flex items-center justify-center backdrop-blur-sm">
                <div className="text-white flex flex-col items-center">
                  <Loader2 className="w-10 h-10 animate-spin mb-3 text-emerald-400" />
                  <span className="text-sm font-semibold tracking-wide">Analyzing nutrition...</span>
                </div>
              </div>
            )}
          </div>

          {analysis && (
            <div className="bg-emerald-50 p-5 rounded-xl border border-emerald-100 animate-in fade-in slide-in-from-bottom-4 shadow-sm">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <p className="font-bold text-emerald-900 text-xl">{analysis.totalCarbs}g Carbs</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-sm font-medium text-emerald-700">{analysis.totalCalories} kcal</span>
                    <span className="text-slate-300">•</span>
                    <span className="text-sm font-medium text-emerald-700">GI: {analysis.glycemicIndexEstimate}</span>
                  </div>
                </div>
                <button 
                  onClick={confirmLog}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2.5 rounded-xl text-sm font-bold flex items-center gap-2 transition-colors shadow-lg shadow-emerald-200"
                >
                  <Check className="w-4 h-4" />
                  Log Meal
                </button>
              </div>
              
              <div className="text-sm text-slate-600 mb-3">
                <span className="font-semibold text-slate-700">Identified: </span>
                {analysis.foodItems?.join(', ')}
              </div>

              {analysis.healthTip && (
                <div className="bg-white p-3 rounded-lg border border-emerald-100 text-sm text-emerald-800 italic shadow-sm">
                  "💡 {analysis.healthTip}"
                </div>
              )}
            </div>
          )}
          
          <div className="flex justify-end">
             <button 
                onClick={() => { setPreview(null); setAnalysis(null); }}
                className="text-sm font-medium text-slate-400 hover:text-slate-600 px-4 py-2"
              >
                Cancel
              </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FoodLogger;