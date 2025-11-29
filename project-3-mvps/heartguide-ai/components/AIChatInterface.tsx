import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, MoreHorizontal } from 'lucide-react';

interface Message {
    id: string;
    role: 'user' | 'assistant';
    content: string;
    timestamp: Date;
}

interface Props {
    nurseName: string;
    specialty: string;
}

const AIChatInterface: React.FC<Props> = ({ nurseName, specialty }) => {
    const [messages, setMessages] = useState<Message[]>([
        {
            id: '1',
            role: 'assistant',
            content: `Hi! I'm ${nurseName}, your personal ${specialty} assistant. How are you feeling today?`,
            timestamp: new Date()
        }
    ]);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isTyping]);

    const handleSend = async () => {
        if (!input.trim()) return;

        const userMsg: Message = {
            id: Date.now().toString(),
            role: 'user',
            content: input,
            timestamp: new Date()
        };

        setMessages(prev => [...prev, userMsg]);
        setInput('');
        setIsTyping(true);

        // Simulate AI response
        setTimeout(() => {
            const responses = [
                "I understand. Could you tell me more about that?",
                "I've logged that for your doctor. Is there anything else?",
                "That sounds good. Remember to stay hydrated!",
                "Based on your recent logs, you're doing great.",
                "I can help you schedule an appointment if you'd like."
            ];
            const randomResponse = responses[Math.floor(Math.random() * responses.length)];

            const aiMsg: Message = {
                id: (Date.now() + 1).toString(),
                role: 'assistant',
                content: randomResponse,
                timestamp: new Date()
            };

            setMessages(prev => [...prev, aiMsg]);
            setIsTyping(false);
        }, 1500);
    };

    return (
        <div className="flex flex-col h-[600px] bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
            {/* Chat Header */}
            <div className="bg-slate-50 p-4 border-b border-slate-100 flex items-center gap-3">
                <div className="bg-teal-100 p-2 rounded-full">
                    <Bot className="w-6 h-6 text-teal-600" />
                </div>
                <div>
                    <h3 className="font-bold text-slate-800">{nurseName}</h3>
                    <p className="text-xs text-slate-500 font-medium text-teal-600">AI {specialty} Nurse • Online</p>
                </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50/30">
                {messages.map((msg) => (
                    <div
                        key={msg.id}
                        className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                        <div
                            className={`max-w-[80%] p-3.5 rounded-2xl text-sm leading-relaxed shadow-sm ${msg.role === 'user'
                                    ? 'bg-teal-600 text-white rounded-tr-none'
                                    : 'bg-white text-slate-700 border border-slate-100 rounded-tl-none'
                                }`}
                        >
                            {msg.content}
                        </div>
                    </div>
                ))}
                {isTyping && (
                    <div className="flex justify-start">
                        <div className="bg-white p-4 rounded-2xl rounded-tl-none border border-slate-100 shadow-sm">
                            <MoreHorizontal className="w-5 h-5 text-slate-400 animate-pulse" />
                        </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-4 bg-white border-t border-slate-100">
                <div className="flex gap-2">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                        placeholder="Type a message..."
                        className="flex-1 bg-slate-50 border-none rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-teal-500/20 outline-none text-slate-700 placeholder:text-slate-400"
                    />
                    <button
                        onClick={handleSend}
                        disabled={!input.trim()}
                        className="bg-teal-600 text-white p-3 rounded-xl hover:bg-teal-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-teal-200"
                    >
                        <Send size={20} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AIChatInterface;
