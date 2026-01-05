import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, User, Bot, Sparkles } from 'lucide-react';
import { PHQ9_QUESTIONS, type Question } from '../engine/ClinicalAssessmentEngine';

interface AssessmentChatProps {
    onComplete: (answers: number[]) => void;
}

interface Message {
    id: string;
    sender: 'bot' | 'user';
    text: string;
}

export const AssessmentChat: React.FC<AssessmentChatProps> = ({ onComplete }) => {
    const [messages, setMessages] = useState<Message[]>([
        { id: 'intro', sender: 'bot', text: "Hi, I'm MindBridge. I'm here to help check in on your mental health. This assessment (PHQ-9) helps identify symptoms of depression. Your answers are private." },
        { id: 'ready', sender: 'bot', text: "Scanning vital signs... Ready to begin?" }
    ]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(-1); // -1 = Intro/Ready
    const [answers, setAnswers] = useState<number[]>([]);
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const currentQuestion: Question | undefined = PHQ9_QUESTIONS[currentQuestionIndex];

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isTyping]);

    const handleStart = () => {
        setCurrentQuestionIndex(0);
        addBotMessage(PHQ9_QUESTIONS[0].text);
    };

    const addBotMessage = (text: string) => {
        setIsTyping(true);
        setTimeout(() => {
            setIsTyping(false);
            setMessages(prev => [...prev, { id: crypto.randomUUID(), sender: 'bot', text }]);
        }, 1000); // Fake typing delay
    };

    const handleAnswer = (value: number, label: string) => {
        // 1. Add User Message
        setMessages(prev => [...prev, { id: crypto.randomUUID(), sender: 'user', text: label }]);

        // 2. Record Answer
        const newAnswers = [...answers, value];
        setAnswers(newAnswers);

        // 3. Next Question or Finish
        if (currentQuestionIndex < PHQ9_QUESTIONS.length - 1) {
            const nextIndex = currentQuestionIndex + 1;
            setCurrentQuestionIndex(nextIndex);
            addBotMessage(PHQ9_QUESTIONS[nextIndex].text);
        } else {
            setCurrentQuestionIndex(-2); // Completed
            setIsTyping(true);
            setTimeout(() => {
                setIsTyping(false);
                onComplete(newAnswers);
            }, 1500);
        }
    };

    return (
        <div className="flex flex-col h-full bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-100">
            {/* Header */}
            <div className="bg-teal-50 border-b border-teal-100 p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="bg-teal-500 p-2 rounded-lg text-white">
                        <Sparkles size={20} />
                    </div>
                    <div>
                        <h2 className="font-display font-bold text-slate-900">MindBridge AI</h2>
                        <p className="text-xs text-teal-600 font-medium tracking-wide uppercase">Mental Health Triage</p>
                    </div>
                </div>
                <div className="text-xs text-slate-400">
                    PHQ-9 Standard
                </div>
            </div>

            {/* Chat Area */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-slate-50/50">
                {messages.map((msg) => (
                    <motion.div
                        key={msg.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                        <div className={`flex items-end gap-2 max-w-[80%] ${msg.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                            {/* Avatar */}
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${msg.sender === 'user' ? 'bg-indigo-100 text-indigo-600' : 'bg-teal-100 text-teal-600'
                                }`}>
                                {msg.sender === 'user' ? <User size={14} /> : <Bot size={14} />}
                            </div>

                            {/* Bubble */}
                            <div className={`p-4 rounded-2xl text-sm leading-relaxed ${msg.sender === 'user'
                                ? 'bg-indigo-600 text-white rounded-br-none'
                                : 'bg-white border border-slate-200 text-slate-700 rounded-bl-none shadow-sm'
                                }`}>
                                {msg.text}
                            </div>
                        </div>
                    </motion.div>
                ))}

                {isTyping && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
                        <div className="flex items-end gap-2">
                            <div className="w-8 h-8 rounded-full bg-teal-100 flex items-center justify-center">
                                <Bot size={14} className="text-teal-600" />
                            </div>
                            <div className="bg-white border border-slate-200 p-4 rounded-2xl rounded-bl-none shadow-sm flex gap-1">
                                <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></span>
                                <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce delay-100"></span>
                                <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce delay-200"></span>
                            </div>
                        </div>
                    </motion.div>
                )}
                <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="bg-white border-t border-slate-100 p-4 min-h-[100px] flex flex-col justify-center">
                <AnimatePresence mode="wait">
                    {currentQuestionIndex === -1 ? (
                        <motion.button
                            key="start"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            onClick={handleStart}
                            className="bg-teal-600 text-white font-bold py-3 px-6 rounded-xl w-full hover:bg-teal-700 transition-colors flex items-center justify-center gap-2 shadow-lg shadow-teal-600/20"
                        >
                            Start Assessment <Send size={16} />
                        </motion.button>
                    ) : currentQuestion ? (
                        <motion.div
                            key="options"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 20 }}
                            className="grid grid-cols-1 sm:grid-cols-2 gap-3"
                        >
                            {currentQuestion.options.map((opt) => (
                                <button
                                    key={opt.value}
                                    onClick={() => handleAnswer(opt.value, opt.label)}
                                    disabled={isTyping}
                                    className="p-3 text-sm font-medium text-slate-700 bg-slate-50 border border-slate-200 rounded-xl hover:bg-teal-50 hover:border-teal-200 hover:text-teal-700 transition-all text-left flex items-center justify-between group disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {opt.label}
                                    <div className="w-4 h-4 rounded-full border border-slate-300 group-hover:border-teal-400 group-hover:bg-teal-400 transition-colors"></div>
                                </button>
                            ))}
                        </motion.div>
                    ) : (
                        <div className="text-center text-slate-400 text-sm">
                            Assessment complete. Analyzing results...
                        </div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};
