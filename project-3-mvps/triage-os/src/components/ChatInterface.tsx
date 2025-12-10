import { useState, useRef, useEffect } from 'react';
import { Bot, User, ShieldCheck } from 'lucide-react';
import { TriageEngine } from '../engine/TriageEngine';
import type { Protocol, TriageResult as ITriageResult } from '../types';
import { SymptomInput } from './SymptomInput';
import { TriageResultCard } from './TriageResult';

type Message = {
    id: string;
    text: string;
    sender: 'bot' | 'user';
    type?: 'question' | 'answer';
};

export function ChatInterface() {
    const [messages, setMessages] = useState<Message[]>([
        { id: '1', text: "Hello. I am HealthLine AI. I use clinical protocols to help assess your symptoms. To begin, please briefly describe your main symptom (e.g., 'chest pain', 'headache').", sender: 'bot' }
    ]);
    const [stage, setStage] = useState<'intake' | 'redFlag' | 'acuity' | 'result'>('intake');
    const [currentProtocol, setCurrentProtocol] = useState<Protocol | null>(null);
    const [redFlagIndex, setRedFlagIndex] = useState(0);
    const [triageResult, setTriageResult] = useState<ITriageResult | null>(null);

    // Engine Instance
    const engine = useRef(new TriageEngine()).current;

    // Auto-scroll to bottom
    const bottomRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, stage]);

    const handleSymptomSubmit = (symptom: string) => {
        // User Message
        setMessages(prev => [...prev, { id: Date.now().toString(), text: symptom, sender: 'user' }]);

        // Match Protocol
        const protocol = engine.matchProtocol(symptom);

        if (protocol) {
            setCurrentProtocol(protocol);
            setStage('redFlag');
            setRedFlagIndex(0);

            // Ask first Red Flag
            setTimeout(() => {
                setMessages(prev => [...prev, {
                    id: 'bot_' + Date.now(),
                    text: `I understand you have ${protocol.name.toLowerCase()}. Let's check for critical signs.\n\n${protocol.redFlags[0].text}`,
                    sender: 'bot',
                    type: 'question'
                }]);
            }, 500);
        } else {
            setTimeout(() => {
                setMessages(prev => [...prev, {
                    id: 'bot_' + Date.now(),
                    text: "I didn't recognize that symptom in my current protocol database. Please try 'Chest Pain', 'Headache', or 'Abdominal Pain'.",
                    sender: 'bot'
                }]);
            }, 500);
        }
    };

    const handleRedFlagResponse = (answer: boolean) => {
        if (!currentProtocol) return;

        const currentFlag = currentProtocol.redFlags[redFlagIndex];
        const userText = answer ? 'Yes' : 'No';

        setMessages(prev => [...prev, { id: Date.now().toString(), text: userText, sender: 'user' }]);

        // Check Logic
        const isTrigger = (answer && currentFlag.triggerAnswer === 'yes') || (!answer && currentFlag.triggerAnswer === 'no');

        if (isTrigger) {
            // STOP - Critical
            setTriageResult({
                level: currentFlag.outcomeLevel,
                disposition: 'Based on your response, this is a potential emergency.',
                color: 'red' // Placeholder
            });
            setStage('result');
        } else {
            // Next Flag?
            if (redFlagIndex < currentProtocol.redFlags.length - 1) {
                const nextIndex = redFlagIndex + 1;
                setRedFlagIndex(nextIndex);
                setTimeout(() => {
                    setMessages(prev => [...prev, {
                        id: 'bot_' + Date.now(),
                        text: currentProtocol.redFlags[nextIndex].text,
                        sender: 'bot',
                        type: 'question'
                    }]);
                }, 500);
            } else {
                // Done with Red Flags -> Go to Acuity
                setStage('acuity');
                setTimeout(() => {
                    setMessages(prev => [...prev, {
                        id: 'bot_' + Date.now(),
                        text: currentProtocol.acuityQuestion,
                        sender: 'bot',
                        type: 'question'
                    }]);
                }, 500);
            }
        }
    };

    const handleAcuityResponse = (score: number) => {
        if (!currentProtocol) return;

        setMessages(prev => [...prev, { id: Date.now().toString(), text: score.toString(), sender: 'user' }]);

        const level = engine.calculateAcuity(score, currentProtocol);

        setTriageResult({
            level,
            disposition: 'Assessment Complete',
            color: 'blue'
        });
        setStage('result');
    };

    const reset = () => {
        setMessages([{ id: '1', text: "Hello. I am HealthLine AI. I use clinical protocols to help assess your symptoms. To begin, please briefly describe your main symptom (e.g., 'chest pain', 'headache').", sender: 'bot' }]);
        setStage('intake');
        setCurrentProtocol(null);
        setTriageResult(null);
        setRedFlagIndex(0);
    };

    return (
        <div className="flex flex-col h-[600px] w-full max-w-2xl mx-auto bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden">
            {/* Header */}
            <div className="w-full bg-slate-900 p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-600 rounded-lg">
                        <ShieldCheck className="w-6 h-6 text-white" />
                    </div>
                    <div>
                        <h1 className="text-white font-bold text-lg">HealthLine AI</h1>
                        <p className="text-slate-400 text-xs font-mono">V.1.0.0 • ESI TRIAGE PROTOCOLS</p>
                    </div>
                </div>
                {currentProtocol && !triageResult && (
                    <span className="px-3 py-1 bg-slate-800 text-blue-400 text-xs font-bold uppercase rounded-full">
                        Protocol: {currentProtocol.name}
                    </span>
                )}
            </div>

            {/* Chat Area */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-slate-50">
                {messages.map((msg) => (
                    <div
                        key={msg.id}
                        className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                        <div className={`flex max-w-[80%] gap-3 ${msg.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                            {/* Avatar */}
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${msg.sender === 'user' ? 'bg-indigo-100 text-indigo-600' : 'bg-blue-600 text-white'}`}>
                                {msg.sender === 'user' ? <User className="w-5 h-5" /> : <Bot className="w-5 h-5" />}
                            </div>

                            {/* Bubble */}
                            <div className={`p-4 rounded-2xl shadow-sm text-sm leading-relaxed whitespace-pre-wrap ${msg.sender === 'user'
                                ? 'bg-white text-slate-800 border border-slate-200 rounded-tr-none'
                                : 'bg-blue-600 text-white rounded-tl-none shadow-blue-200'
                                }`}>
                                {msg.text}
                            </div>
                        </div>
                    </div>
                ))}

                {/* Interaction Zone */}
                {stage === 'result' && triageResult && (
                    <div className="my-6">
                        <TriageResultCard result={triageResult} onReset={reset} />
                    </div>
                )}

                <div ref={bottomRef} />
            </div>

            {/* Input Area */}
            <div className="p-4 bg-white border-t border-slate-100">
                {stage === 'intake' && (
                    <SymptomInput onSubmit={handleSymptomSubmit} />
                )}

                {stage === 'redFlag' && (
                    <div className="flex gap-4 justify-center animate-fade-in">
                        <button onClick={() => handleRedFlagResponse(false)} className="px-8 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl transition-colors">
                            No
                        </button>
                        <button onClick={() => handleRedFlagResponse(true)} className="px-8 py-3 bg-red-50 hover:bg-red-100 text-red-600 font-bold rounded-xl border border-red-200 transition-colors">
                            Yes
                        </button>
                    </div>
                )}

                {stage === 'acuity' && (
                    <div className="grid grid-cols-11 gap-1 max-w-xl mx-auto">
                        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
                            <button
                                key={num}
                                onClick={() => handleAcuityResponse(num)}
                                className={`aspect-square rounded-lg font-bold text-sm transition-all ${num < 4 ? 'bg-green-100 text-green-700 hover:bg-green-200' :
                                    num < 7 ? 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200' :
                                        'bg-red-100 text-red-700 hover:bg-red-200'
                                    }`}
                            >
                                {num}
                            </button>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
