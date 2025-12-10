import React, { useState } from 'react';
import { Send, Search } from 'lucide-react';

interface SymptomInputProps {
    onSubmit: (symptom: string) => void;
    isLoading?: boolean;
}

export function SymptomInput({ onSubmit, isLoading }: SymptomInputProps) {
    const [input, setInput] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (input.trim()) {
            onSubmit(input);
            setInput('');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="relative w-full max-w-2xl mx-auto">
            <div className="relative flex items-center">
                <Search className="absolute left-4 text-slate-400 w-5 h-5" />
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Describe your main symptom (e.g., 'severe chest pain', 'headache')..."
                    className="w-full pl-12 pr-14 py-4 bg-white border border-slate-200 rounded-2xl shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-slate-800 text-lg placeholder:text-slate-400 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                    disabled={isLoading}
                    autoFocus
                />
                <button
                    type="submit"
                    disabled={!input.trim() || isLoading}
                    className="absolute right-2 p-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 disabled:bg-slate-300 disabled:cursor-not-allowed transition-colors"
                >
                    <Send className="w-5 h-5" />
                </button>
            </div>
        </form>
    );
}
