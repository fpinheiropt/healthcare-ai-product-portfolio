import React from 'react';
import { Phone, RefreshCw } from 'lucide-react';

interface KioskLayoutProps {
    children: React.ReactNode;
    onReset?: () => void;
}

export default function KioskLayout({ children, onReset }: KioskLayoutProps) {
    return (
        <div className="min-h-screen bg-slate-50 relative overflow-hidden font-sans select-none">
            {/* Safe Area / Status Bar Simulation */}
            <div className="bg-slate-900 text-white px-6 py-2 flex justify-between items-center text-sm font-mono z-50 relative">
                <span>TERMINAL_ID: ED_KIOSK_01</span>
                <span className="animate-pulse text-green-400">● ONLINE</span>
            </div>

            {/* Main Content Area */}
            <main className="h-[calc(100vh-80px)] relative">
                {children}
            </main>

            {/* Always-on Emergency Footer */}
            <div className="absolute bottom-0 w-full bg-white border-t border-slate-200 p-4 flex justify-between items-center z-50 shadow-[0_-4px_20px_rgba(0,0,0,0.05)]">
                <button
                    onClick={onReset}
                    className="flex items-center gap-2 text-slate-500 hover:text-slate-800 transition-colors px-4 py-3 rounded-lg active:bg-slate-100"
                >
                    <RefreshCw className="w-5 h-5" />
                    <span className="font-medium tracking-wide">RESET</span>
                </button>

                <button className="flex items-center gap-3 bg-red-600 text-white px-8 py-4 rounded-xl shadow-lg shadow-red-200 active:scale-95 transition-transform">
                    <Phone className="w-6 h-6" />
                    <span className="font-bold text-lg tracking-wide uppercase">Call Nurse</span>
                </button>
            </div>
        </div>
    );
}
