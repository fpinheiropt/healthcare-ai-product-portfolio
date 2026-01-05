import React from 'react';
import Navbar from '../components/Navbar';
import { motion } from 'framer-motion';
import {
    Activity,
    ArrowRight,
    Check,
    AlertTriangle,
    Info
} from 'lucide-react';

const DesignSystem = () => {
    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white transition-colors duration-300">
            <Navbar />

            <div className="max-w-7xl mx-auto px-6 py-24">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="mb-16"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 font-bold text-sm tracking-wide uppercase mb-6">
                        <span className="relative flex h-3 w-3">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-3 w-3 bg-indigo-500"></span>
                        </span>
                        Internal Documentation
                    </div>
                    <h1 className="font-display text-5xl font-bold mb-4">Atomic Design System</h1>
                    <p className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl">
                        The visual language and component library powering the Sovereign AI Ecosystem.
                        Optimized for readability, accessibility, and "High-Agency" aesthetics.
                    </p>
                </motion.div>

                <div className="space-y-24">

                    {/* Section 1: Typography */}
                    <section>
                        <h2 className="text-2xl font-bold mb-8 flex items-center gap-3">
                            <span className="w-8 h-8 rounded-lg bg-slate-200 dark:bg-slate-800 flex items-center justify-center text-sm">01</span>
                            Typography
                        </h2>

                        <div className="grid md:grid-cols-2 gap-12 glass-card p-12">
                            <div className="space-y-8">
                                <div>
                                    <p className="text-sm text-slate-500 font-mono mb-2">Display / H1</p>
                                    <h1 className="font-display text-5xl font-bold">The quick brown fox</h1>
                                </div>
                                <div>
                                    <p className="text-sm text-slate-500 font-mono mb-2">Display / H2</p>
                                    <h2 className="font-display text-4xl font-bold">The quick brown fox</h2>
                                </div>
                                <div>
                                    <p className="text-sm text-slate-500 font-mono mb-2">Display / H3</p>
                                    <h3 className="font-display text-3xl font-bold">The quick brown fox</h3>
                                </div>
                            </div>
                            <div className="space-y-8">
                                <div>
                                    <p className="text-sm text-slate-500 font-mono mb-2">Body / Large</p>
                                    <p className="text-xl text-slate-600 dark:text-slate-300">
                                        AI agents are not just tools; they are proactive partners in care.
                                    </p>
                                </div>
                                <div>
                                    <p className="text-sm text-slate-500 font-mono mb-2">Body / Regular</p>
                                    <p className="text-base text-slate-600 dark:text-slate-300">
                                        By bridging clinical medicine with engineering, we create systems that can predict, prevent, and treat disease at scale.
                                    </p>
                                </div>
                                <div>
                                    <p className="text-sm text-slate-500 font-mono mb-2">Caption / Code</p>
                                    <p className="text-sm font-mono text-slate-500">
                                        import {`{ Agent }`} from '@sovereign/core';
                                    </p>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Section 2: Color Palette */}
                    <section>
                        <h2 className="text-2xl font-bold mb-8 flex items-center gap-3">
                            <span className="w-8 h-8 rounded-lg bg-slate-200 dark:bg-slate-800 flex items-center justify-center text-sm">02</span>
                            Color Tokens
                        </h2>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                            {/* Teal */}
                            <div className="space-y-2">
                                <div className="h-24 rounded-xl bg-teal-500 shadow-lg shadow-teal-500/20"></div>
                                <div className="flex justify-between items-center text-sm">
                                    <span className="font-bold">Primary Teal</span>
                                    <span className="font-mono text-slate-500">#14B8A6</span>
                                </div>
                            </div>
                            {/* Blue */}
                            <div className="space-y-2">
                                <div className="h-24 rounded-xl bg-blue-600 shadow-lg shadow-blue-600/20"></div>
                                <div className="flex justify-between items-center text-sm">
                                    <span className="font-bold">Action Blue</span>
                                    <span className="font-mono text-slate-500">#2563EB</span>
                                </div>
                            </div>
                            {/* Slate */}
                            <div className="space-y-2">
                                <div className="h-24 rounded-xl bg-slate-900 shadow-lg shadow-slate-900/20 dark:bg-slate-800"></div>
                                <div className="flex justify-between items-center text-sm">
                                    <span className="font-bold">Surface Dark</span>
                                    <span className="font-mono text-slate-500">#0F172A</span>
                                </div>
                            </div>
                            {/* Indigo */}
                            <div className="space-y-2">
                                <div className="h-24 rounded-xl bg-indigo-600 shadow-lg shadow-indigo-600/20"></div>
                                <div className="flex justify-between items-center text-sm">
                                    <span className="font-bold">Deep Indigo</span>
                                    <span className="font-mono text-slate-500">#4F46E5</span>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Section 3: Glassmorphism */}
                    <section>
                        <h2 className="text-2xl font-bold mb-8 flex items-center gap-3">
                            <span className="w-8 h-8 rounded-lg bg-slate-200 dark:bg-slate-800 flex items-center justify-center text-sm">03</span>
                            Glassmorphism Effect
                        </h2>

                        <div className="relative h-64 rounded-3xl overflow-hidden bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                            {/* Background Elements */}
                            <div className="absolute top-10 left-10 w-32 h-32 bg-yellow-400 rounded-full blur-2xl opacity-50"></div>
                            <div className="absolute bottom-10 right-10 w-48 h-48 bg-teal-400 rounded-full blur-3xl opacity-50"></div>

                            {/* The Glass Card */}
                            <div className="glass-card p-8 w-96 relative mx-4">
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                                        <Activity className="w-6 h-6 text-white" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-white">Glass Card</h4>
                                        <p className="text-white/60 text-sm">Backdrop Blur + Border</p>
                                    </div>
                                </div>
                                <p className="text-white/80 text-sm leading-relaxed">
                                    Our signature aesthetic combines high-transparency layers with soft gradients to create depth and hierarchy.
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* Section 4: Components */}
                    <section>
                        <h2 className="text-2xl font-bold mb-8 flex items-center gap-3">
                            <span className="w-8 h-8 rounded-lg bg-slate-200 dark:bg-slate-800 flex items-center justify-center text-sm">04</span>
                            Atomic Components
                        </h2>

                        <div className="glass-card p-12 space-y-12">
                            {/* Buttons */}
                            <div>
                                <h4 className="text-sm font-bold uppercase tracking-wider text-slate-500 mb-6">Buttons</h4>
                                <div className="flex flex-wrap gap-4">
                                    <button className="bg-teal-600 text-white px-6 py-2.5 rounded-xl font-bold hover:bg-teal-700 transition-all shadow-lg shadow-teal-600/30">
                                        Primary Action
                                    </button>
                                    <button className="bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-6 py-2.5 rounded-xl font-bold hover:opacity-90 transition-all shadow-lg">
                                        Secondary Action
                                    </button>
                                    <button className="flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                                        Ghost Button <ArrowRight className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>

                            <div className="h-px bg-slate-200 dark:bg-slate-700"></div>

                            {/* Badges */}
                            <div>
                                <h4 className="text-sm font-bold uppercase tracking-wider text-slate-500 mb-6">Status Badges</h4>
                                <div className="flex flex-wrap gap-4">
                                    <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 text-sm font-bold border border-emerald-200 dark:border-emerald-800">
                                        <Check className="w-3.5 h-3.5" /> Operational
                                    </span>
                                    <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 text-sm font-bold border border-amber-200 dark:border-amber-800">
                                        <AlertTriangle className="w-3.5 h-3.5" /> Warning
                                    </span>
                                    <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 text-sm font-bold border border-blue-200 dark:border-blue-800">
                                        <Info className="w-3.5 h-3.5" /> Beta
                                    </span>
                                    <span className="px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 text-sm font-medium border border-slate-200 dark:border-slate-700">
                                        Tag
                                    </span>
                                </div>
                            </div>
                        </div>
                    </section>

                </div>
            </div>
        </div>
    );
};

export default DesignSystem;
