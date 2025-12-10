import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Stethoscope, Phone, Activity, Search, ShieldCheck, Database, Calendar, Users, Briefcase, Zap, Lock, PieChart, TrendingUp, AlertTriangle, FileText, Cpu, Code, Brain, Settings, BarChart3 } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';

function SNSTransformation() {
    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-300 font-sans">
            <Navbar />

            <div className="max-w-5xl mx-auto px-6 py-24 sm:py-32">
                <Link to="/" className="inline-flex items-center text-slate-500 hover:text-teal-600 mb-8 transition-colors">
                    <ArrowLeft className="w-4 h-4 mr-2" /> Back to Portfolio
                </Link>

                {/* Hero */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="mb-16"
                >
                    <div className="inline-flex items-center gap-2 bg-teal-100 dark:bg-teal-900/30 text-teal-800 dark:text-teal-300 px-4 py-1.5 rounded-full text-sm font-semibold mb-6">
                        <Cpu className="w-4 h-4" />
                        <span>Sovereign AI Architecture</span>
                    </div>
                    <h1 className="font-display text-4xl sm:text-6xl font-bold text-slate-900 dark:text-white mb-6 leading-tight">
                        Building the <span className="text-teal-600 dark:text-teal-400">Bionic SNS</span>
                    </h1>
                    <p className="text-xl text-slate-600 dark:text-slate-400 leading-relaxed border-l-4 border-teal-500 pl-6">
                        Moving beyond procurement: A proposal to build sovereign, custom AI infrastructure to solve the SNS operational crisis.
                    </p>
                </motion.div>

                {/* Executive Summary */}
                <section className="mb-20">
                    <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6">The "Build" Imperative</h2>
                    <div className="glass-card p-8 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm border-l-4 border-l-blue-500">
                        <p className="text-lg text-slate-700 dark:text-slate-300 mb-6 leading-relaxed">
                            The Portuguese National Health Service (SNS) cannot rely solely on off-the-shelf software to solve its unique structural challenges. To achieve true sustainability and data sovereignty, we must engineer <strong>bespoke AI solutions</strong> tailored to the specific reality of our clinical workflows.
                        </p>
                        <p className="text-lg text-slate-700 dark:text-slate-300 leading-relaxed font-semibold">
                            This blueprint proposes the development of 14 proprietary AI applications ("The SNS Stack") designed to decouple healthcare volume from human labor hours.
                        </p>
                    </div>
                </section>

                {/* 2. Architectural Blueprint */}
                <section className="mb-20">
                    <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-8">The SNS Stack Architecture</h2>
                    <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white rounded-3xl p-8 sm:p-12 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>

                        <div className="relative z-10 grid md:grid-cols-3 gap-8">
                            <div>
                                <h3 className="text-xl font-bold text-teal-300 mb-3 flex items-center gap-2">
                                    <Database className="w-5 h-5" /> Data Sovereignty (The "Digital Wall")
                                </h3>
                                <p className="text-slate-300 text-sm leading-relaxed">
                                    Breaking the lethal silo between Hospital (Sorian) and Primary Care (SClínico). A central <strong>FHIR-native Data Lake</strong> ensures ER doctors see the full patient history instantly.
                                </p>
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-blue-300 mb-3 flex items-center gap-2">
                                    <Code className="w-5 h-5" /> Open Core
                                </h3>
                                <p className="text-slate-300 text-sm leading-relaxed">
                                    Leveraging open-source LLMs (Llama 3, Mistral) fine-tuned on Portuguese medical corpora to reduce licensing costs and vendor lock-in.
                                </p>
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-purple-300 mb-3 flex items-center gap-2">
                                    <ShieldCheck className="w-5 h-5" /> Clinical Safety
                                </h3>
                                <p className="text-slate-300 text-sm leading-relaxed">
                                    Implementing "Human-in-the-loop" deterministic validation layers (like my <strong>Triage-Os</strong> engine) to prevent hallucinations in critical pathways.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 3. The 14 Strategic Domains - Categorized */}

                {/* SECTION 1: PRIMARY CARE (Centros de Saúde) - TEAL THEME */}
                <section className="mb-20 border-t pt-12 border-slate-200 dark:border-slate-800">
                    <div className="flex items-center gap-3 mb-12">
                        <div className="p-3 bg-teal-100 dark:bg-teal-900/30 rounded-lg text-teal-600 dark:text-teal-400">
                            <Stethoscope className="w-6 h-6" />
                        </div>
                        <h2 className="text-3xl font-bold text-slate-900 dark:text-white">I. Primary Care Ecosystem</h2>
                    </div>

                    {/* Domain B - CliniScript */}
                    <div className="mb-16">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-12 h-12 bg-teal-100 dark:bg-teal-900/30 rounded-full flex items-center justify-center text-teal-600 font-bold text-xl">B</div>
                            <div>
                                <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Primary Care Capacity</h3>
                                <p className="text-teal-600 dark:text-teal-400 font-semibold">Problem: "Data Entry" Burnout</p>
                            </div>
                        </div>
                        <div className="grid md:grid-cols-2 gap-8">
                            <div className="glass-card p-6">
                                <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-2">The Gap</h4>
                                <p className="text-slate-600 dark:text-slate-400">Family Doctors spend 40% of appointments typing. This administrative burden creates the "unassigned patient" crisis.</p>
                            </div>
                            <div className="glass-card p-6 border-l-4 border-teal-500">
                                <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-2">
                                    App to Build: <span className="text-teal-600">"CliniScript"</span>
                                </h4>
                                <div className="text-xs font-bold uppercase text-slate-500 mb-2">Ambient Clinical Intelligence</div>
                                <ul className="space-y-2 text-slate-600 dark:text-slate-400 text-sm">
                                    <li>• <strong>Core Tech</strong>: Local LLM fine-tuned on Portuguese SClínico notes.</li>
                                    <li>• <strong>Function</strong>: Ambiently listens to the consult and auto-generates SOAP notes, prescriptions, and exam requisitions.</li>
                                    <li>• <strong>Advantage</strong>: Saves 2 hours/day per MD. Equivalent to hiring 500 new doctors.</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Domain C - Chronic Suite */}
                    <div className="mb-16">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-12 h-12 bg-teal-100 dark:bg-teal-900/30 rounded-full flex items-center justify-center text-teal-600 font-bold text-xl">C</div>
                            <div>
                                <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Chronic Management</h3>
                                <p className="text-teal-600 dark:text-teal-400 font-semibold">Problem: Reactive "Crash" Care</p>
                            </div>
                        </div>
                        <div className="grid md:grid-cols-2 gap-8">
                            <div className="glass-card p-6">
                                <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-2">The Gap</h4>
                                <p className="text-slate-600 dark:text-slate-400">Heart Failure and Diabetes patients are unmonitored between hospital visits, leading to preventable decompensation.</p>
                            </div>
                            <div className="glass-card p-6 border-l-4 border-teal-500">
                                <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-2">
                                    Apps to Deploy: <span className="text-teal-600">"The Chronic Suite"</span>
                                </h4>
                                <div className="text-xs font-bold uppercase text-slate-500 mb-2">Disease-Specific Telemetry Modules</div>
                                <ul className="space-y-2 text-slate-600 dark:text-slate-400 text-sm">
                                    <li>• <strong>HeartGuide (HF)</strong>: Daily weight/edema monitoring.</li>
                                    <li>• <strong>BreathEasy (COPD)</strong>: Correlates symptoms with AQI/Pollen APIs.</li>
                                    <li>• <strong>GlucoWise (Diabetes)</strong>: CV meal scanning for precision insulin dosing.</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Domain H - RxOptimize */}
                    <div className="mb-16">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-12 h-12 bg-teal-100 dark:bg-teal-900/30 rounded-full flex items-center justify-center text-teal-600 font-bold text-xl">H</div>
                            <div>
                                <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Medication Safety</h3>
                                <p className="text-teal-600 dark:text-teal-400 font-semibold">Problem: Polypharmacy in Elderly</p>
                            </div>
                        </div>
                        <div className="grid md:grid-cols-2 gap-8">
                            <div className="glass-card p-6">
                                <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-2">The Gap</h4>
                                <p className="text-slate-600 dark:text-slate-400">Elderly patients commonly take 10+ meds. Adverse Drug Events (ADEs) cause 15% of emergency admissions.</p>
                            </div>
                            <div className="glass-card p-6 border-l-4 border-teal-500">
                                <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-2">
                                    App to Build: <span className="text-teal-600">"RxOptimize"</span>
                                </h4>
                                <div className="text-xs font-bold uppercase text-slate-500 mb-2">AI De-Prescribing Agent</div>
                                <ul className="space-y-2 text-slate-600 dark:text-slate-400 text-sm">
                                    <li>• <strong>Core Tech</strong>: Knowledge Graph of Drug-Drug Interactions (DDIs).</li>
                                    <li>• <strong>Function</strong>: Scans patient list for high-risk combos. Suggests "De-prescribing" protocols to the GP.</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Domain I - GestaLink */}
                    <div className="mb-16">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-12 h-12 bg-teal-100 dark:bg-teal-900/30 rounded-full flex items-center justify-center text-teal-600 font-bold text-xl">I</div>
                            <div>
                                <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Maternal Health</h3>
                                <p className="text-teal-600 dark:text-teal-400 font-semibold">Problem: High-Risk Pregnancy Monitoring</p>
                            </div>
                        </div>
                        <div className="grid md:grid-cols-2 gap-8">
                            <div className="glass-card p-6">
                                <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-2">The Gap</h4>
                                <p className="text-slate-600 dark:text-slate-400">Routine in-person checks for healthy pregnancies clog the system, while pre-eclampsia goes undetected in high-risk cases.</p>
                            </div>
                            <div className="glass-card p-6 border-l-4 border-teal-500">
                                <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-2">
                                    App to Build: <span className="text-teal-600">"GestaLink"</span>
                                </h4>
                                <div className="text-xs font-bold uppercase text-slate-500 mb-2">Remote Obstetric Telemetry</div>
                                <ul className="space-y-2 text-slate-600 dark:text-slate-400 text-sm">
                                    <li>• <strong>Core Tech</strong>: Connected BP cuff + Urinalysis strips (OCR).</li>
                                    <li>• <strong>Function</strong>: Mothers scan results at home. AI flags protein/BP spikes instantly.</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Domain E - MindBridge AI */}
                    <div className="mb-16">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-12 h-12 bg-teal-100 dark:bg-teal-900/30 rounded-full flex items-center justify-center text-teal-600 font-bold text-xl">E</div>
                            <div>
                                <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Mental Health Access</h3>
                                <p className="text-teal-600 dark:text-teal-400 font-semibold">Problem: The "Silent" Waiting List</p>
                            </div>
                        </div>
                        <div className="grid md:grid-cols-2 gap-8">
                            <div className="glass-card p-6">
                                <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-2">The Gap</h4>
                                <p className="text-slate-600 dark:text-slate-400">High prevalence of anxiety/depression vs. severe lack of psychologists. Patients wait months for a first consult.</p>
                            </div>
                            <div className="glass-card p-6 border-l-4 border-teal-500">
                                <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-2">
                                    App to Build: <span className="text-teal-600">"MindBridge AI"</span>
                                </h4>
                                <div className="text-xs font-bold uppercase text-slate-500 mb-2">CBT Companion & Risk Triage</div>
                                <ul className="space-y-2 text-slate-600 dark:text-slate-400 text-sm">
                                    <li>• <strong>Core Tech</strong>: NLP Sentiment Analysis + CBT Protocol Engine.</li>
                                    <li>• <strong>Function</strong>: Offers 24/7 Level 1 psychological support (CBT exercises) and flags acute suicide risk.</li>
                                    <li>• <strong>Advantage</strong>: Decompresses waiting lists by managing mild/moderate cases automatically.</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>

                {/* SECTION 2: EMERGENCY & ACCESS (Urgency) - BLUE THEME */}
                <section className="mb-20 border-t pt-12 border-slate-200 dark:border-slate-800">
                    <div className="flex items-center gap-3 mb-12">
                        <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg text-blue-600 dark:text-blue-400">
                            <AlertTriangle className="w-6 h-6" />
                        </div>
                        <h2 className="text-3xl font-bold text-slate-900 dark:text-white">II. Emergency Department & Access</h2>
                    </div>

                    {/* Domain A - Triage-Os */}
                    <div className="mb-16">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center text-blue-600 font-bold text-xl">A</div>
                            <div>
                                <h3 className="text-2xl font-bold text-slate-900 dark:text-white">The Front Door (Access)</h3>
                                <p className="text-blue-600 dark:text-blue-400 font-semibold">Problem: SNS 24 Overload & Wait Times</p>
                            </div>
                        </div>
                        <div className="grid md:grid-cols-2 gap-8">
                            <div className="glass-card p-6">
                                <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-2">The Gap</h4>
                                <p className="text-slate-600 dark:text-slate-400">SNS 24 relies on linear human triage. Wait times generate "hang-ups" that divert to Emergency Depts.</p>
                            </div>
                            <div className="glass-card p-6 border-l-4 border-blue-500">
                                <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-2">
                                    App to Build: <span className="text-blue-600">"Triage-Os Neural"</span>
                                </h4>
                                <div className="text-xs font-bold uppercase text-slate-500 mb-2">Voice AI Copilot & Blackout Defense</div>
                                <ul className="space-y-2 text-slate-600 dark:text-slate-400 text-sm">
                                    <li>• <strong>Core Tech</strong>: Real-time STT + Acoustical Analysis + Maternal Risk Module.</li>
                                    <li>• <strong>Function</strong>: Detects "Agonal Breathing" (cardiac arrest) instantly. "Always-on" overflow valve during strikes/outages. safely triages obstetric calls when Specialists are unavailable.</li>
                                    <li>• <strong>Advantage</strong>: Prevents "System Blackouts". Filters 450+ daily/non-urgent calls to stop 112 Spillover.</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Domain L - Surge Commander */}
                    <div className="mb-16">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center text-blue-600 font-bold text-xl">L</div>
                            <div>
                                <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Public Health Resilience</h3>
                                <p className="text-blue-600 dark:text-blue-400 font-semibold">Problem: The "Winter Crisis" Cycle</p>
                            </div>
                        </div>
                        <div className="grid md:grid-cols-2 gap-8">
                            <div className="glass-card p-6">
                                <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-2">The Gap</h4>
                                <p className="text-slate-600 dark:text-slate-400">Every winter, flu spikes cause ER collapse because we cannot predict demand surges accurately enough to reallocate beds in advance.</p>
                            </div>
                            <div className="glass-card p-6 border-l-4 border-blue-500">
                                <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-2">
                                    App to Build: <span className="text-blue-600">"Surge Commander"</span>
                                </h4>
                                <div className="text-xs font-bold uppercase text-slate-500 mb-2">Epidemic Capacity & Network Directory</div>
                                <ul className="space-y-2 text-slate-600 dark:text-slate-400 text-sm">
                                    <li>• <strong>Core Tech</strong>: SIR Epidemiology Models + Live Network Status API.</li>
                                    <li>• <strong>Function</strong>: Simulates disease waves AND tracks real-time open/closed status of all Pediatric/Obstetric units.</li>
                                    <li>• <strong>Advantage</strong>: Prevents "Ghost Referrals" (sending patients to closed doors). Load-balances the entire regional network.</li>
                                </ul>
                            </div>
                        </div>
                    </div>



                    {/* Domain O - Sentinel */}
                    <div className="mb-16">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center text-blue-600 font-bold text-xl">O</div>
                            <div>
                                <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Waiting Room Safety</h3>
                                <p className="text-blue-600 dark:text-blue-400 font-semibold">Problem: The "Blind" Wait</p>
                            </div>
                        </div>
                        <div className="grid md:grid-cols-2 gap-8">
                            <div className="glass-card p-6">
                                <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-2">The Gap</h4>
                                <p className="text-slate-600 dark:text-slate-400">Patients deteriorate silently while waiting 4+ hours post-triage. Nurses cannot visualize the waiting room continuously.</p>
                            </div>
                            <div className="glass-card p-6 border-l-4 border-blue-500">
                                <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-2">
                                    App to Build: <span className="text-blue-600">"Sentinel"</span>
                                </h4>
                                <div className="text-xs font-bold uppercase text-slate-500 mb-2">Computer Vision Biometrics</div>
                                <ul className="space-y-2 text-slate-600 dark:text-slate-400 text-sm">
                                    <li>• <strong>Core Tech</strong>: Privacy-preserving Pose Estimation + rPPG (Remote Photoplethysmography).</li>
                                    <li>• <strong>Function</strong>: Scans the waiting room for "Postures of Distress" (slumping, writhing) and estimates pulse rates remotely.</li>
                                    <li>• <strong>Advantage</strong>: Alerts triage nurses to "Silent Hypoxia" or collapse instantly. Zero dead-on-arrivals in the WR.</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Domain P - FastTrack AI */}
                    <div className="mb-16">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center text-blue-600 font-bold text-xl">P</div>
                            <div>
                                <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Green Lane Flow</h3>
                                <p className="text-blue-600 dark:text-blue-400 font-semibold">Problem: Triage Bottlenecks</p>
                            </div>
                        </div>
                        <div className="grid md:grid-cols-2 gap-8">
                            <div className="glass-card p-6">
                                <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-2">The Gap</h4>
                                <p className="text-slate-600 dark:text-slate-400">Highly qualified nurses waste hours triaging simple sprains and colds (Green/Blue), blocking care for acute patients.</p>
                            </div>
                            <div className="glass-card p-6 border-l-4 border-blue-500">
                                <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-2">
                                    App to Build: <span className="text-blue-600">"FastTrack AI"</span>
                                </h4>
                                <div className="text-xs font-bold uppercase text-slate-500 mb-2">Self-Service Triage Kiosk</div>
                                <ul className="space-y-2 text-slate-600 dark:text-slate-400 text-sm">
                                    <li>• <strong>Core Tech</strong>: Multimodal NLP + Computer Vision (Injury Analysis).</li>
                                    <li>• <strong>Function</strong>: Walk-in patients scan their ID and describe symptoms. AI rules out Red Flags, assigns Pulse/BP check, and routes directly to "See & Treat".</li>
                                    <li>• <strong>Advantage</strong>: Reduces "Time-to-Triage" for low acuity to &lt;2 mins. Frees up 30% of nurse capacity.</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>

                {/* SECTION 3: THE SMART HOSPITAL - INDIGO THEME */}
                <section className="mb-20 border-t pt-12 border-slate-200 dark:border-slate-800">
                    <div className="flex items-center gap-3 mb-12">
                        <div className="p-3 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg text-indigo-600 dark:text-indigo-400">
                            <Activity className="w-6 h-6" />
                        </div>
                        <h2 className="text-3xl font-bold text-slate-900 dark:text-white">III. The Smart Hospital</h2>
                    </div>

                    {/* Domain F - FlowMaster */}
                    <div className="mb-16">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900/30 rounded-full flex items-center justify-center text-indigo-600 font-bold text-xl">F</div>
                            <div>
                                <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Hospital Flow (The "Bed Block")</h3>
                                <p className="text-indigo-600 dark:text-indigo-400 font-semibold">Problem: Surgical Cancellations</p>
                            </div>
                        </div>
                        <div className="grid md:grid-cols-2 gap-8">
                            <div className="glass-card p-6">
                                <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-2">The Gap</h4>
                                <p className="text-slate-600 dark:text-slate-400">Surgeries are cancelled last-minute because ward beds are occupied by "social cases" waiting for discharge.</p>
                            </div>
                            <div className="glass-card p-6 border-l-4 border-indigo-500">
                                <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-2">
                                    App to Build: <span className="text-indigo-600">"FlowMaster"</span>
                                </h4>
                                <div className="text-xs font-bold uppercase text-slate-500 mb-2">Predictive Discharge Engine</div>
                                <ul className="space-y-2 text-slate-600 dark:text-slate-400 text-sm">
                                    <li>• <strong>Core Tech</strong>: Random Forest Regression on patient demographics + social markers.</li>
                                    <li>• <strong>Function</strong>: Predicts "Date of Discharge" 48h in advance. Enables ER to "pre-book" beds for incoming patients.</li>
                                    <li>• <strong>Advantage</strong>: Solves "ER Boarding" (macas no corredor) by flushing the ward queue. Increases OR utilization by 15%.</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Domain G - SepsisSentinel */}
                    <div className="mb-16">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900/30 rounded-full flex items-center justify-center text-indigo-600 font-bold text-xl">G</div>
                            <div>
                                <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Ward Safety (Sepsis)</h3>
                                <p className="text-indigo-600 dark:text-indigo-400 font-semibold">Problem: In-Patient Deterioration</p>
                            </div>
                        </div>
                        <div className="grid md:grid-cols-2 gap-8">
                            <div className="glass-card p-6">
                                <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-2">The Gap</h4>
                                <p className="text-slate-600 dark:text-slate-400">Sepsis kills in hours. Ward monitoring is manual and intermittent, leading to "Failure to Rescue" events.</p>
                            </div>
                            <div className="glass-card p-6 border-l-4 border-indigo-500">
                                <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-2">
                                    App to Build: <span className="text-indigo-600">"SepsisSentinel"</span>
                                </h4>
                                <div className="text-xs font-bold uppercase text-slate-500 mb-2">Early Warning System (EWS)</div>
                                <ul className="space-y-2 text-slate-600 dark:text-slate-400 text-sm">
                                    <li>• <strong>Core Tech</strong>: Rolling EMR analysis.</li>
                                    <li>• <strong>Function</strong>: Detects sub-clinical trends 6 hours before shock. Alerts Rapid Response Teams.</li>
                                    <li>• <strong>Advantage</strong>: Reduces in-hospital mortality by 20%.</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Domain D - Patho-AI */}
                    <div className="mb-16">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900/30 rounded-full flex items-center justify-center text-indigo-600 font-bold text-xl">D</div>
                            <div>
                                <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Oncology Velocity</h3>
                                <p className="text-indigo-600 dark:text-indigo-400 font-semibold">Problem: Diagnostic Bottlenecks</p>
                            </div>
                        </div>
                        <div className="grid md:grid-cols-2 gap-8">
                            <div className="glass-card p-6">
                                <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-2">The Gap</h4>
                                <p className="text-slate-600 dark:text-slate-400">"Time is tissue." Shortage of pathologists creates dangerous delays in cancer diagnosis and treatment.</p>
                            </div>
                            <div className="glass-card p-6 border-l-4 border-indigo-500">
                                <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-2">
                                    App to Build: <span className="text-indigo-600">"Patho-AI"</span>
                                </h4>
                                <div className="text-xs font-bold uppercase text-slate-500 mb-2">Computer Vision Triage</div>
                                <ul className="space-y-2 text-slate-600 dark:text-slate-400 text-sm">
                                    <li>• <strong>Core Tech</strong>: CNNs trained on histology slides (H&E).</li>
                                    <li>• <strong>Function</strong>: Auto-screens biopsies. Flags "Normal" for rapid dismissal; Heatmaps "Suspicious".</li>
                                    <li>• <strong>Advantage</strong>: 37% faster case turnover.</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Domain N - DocuFlow (Now in Hospital) */}
                    <div className="mb-16">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900/30 rounded-full flex items-center justify-center text-indigo-600 font-bold text-xl">N</div>
                            <div>
                                <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Clinical Documentation</h3>
                                <p className="text-indigo-600 dark:text-indigo-400 font-semibold">Problem: Note Bloat & Burnout</p>
                            </div>
                        </div>
                        <div className="grid md:grid-cols-2 gap-8">
                            <div className="glass-card p-6">
                                <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-2">The Gap</h4>
                                <p className="text-slate-600 dark:text-slate-400">Hospital doctors spend more time typing admission & discharge notes than treating patients.</p>
                            </div>
                            <div className="glass-card p-6 border-l-4 border-indigo-500">
                                <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-2">
                                    App to Build: <span className="text-indigo-600">"DocuFlow"</span>
                                </h4>
                                <div className="text-xs font-bold uppercase text-slate-500 mb-2">Structured Template Engine</div>
                                <ul className="space-y-2 text-slate-600 dark:text-slate-400 text-sm">
                                    <li>• <strong>Core Tech</strong>: Deterministic String Interpolation.</li>
                                    <li>• <strong>Function</strong>: Click-based interface for instant, error-free admission/discharge summaries.</li>
                                    <li>• <strong>Advantage</strong>: Complete notes in &lt;45s.</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Domain J - PorterSmart (Now In Hospital) */}
                    <div className="mb-16">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900/30 rounded-full flex items-center justify-center text-indigo-600 font-bold text-xl">J</div>
                            <div>
                                <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Internal Logistics</h3>
                                <p className="text-indigo-600 dark:text-indigo-400 font-semibold">Problem: Patient Transport Latency</p>
                            </div>
                        </div>
                        <div className="grid md:grid-cols-2 gap-8">
                            <div className="glass-card p-6">
                                <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-2">The Gap</h4>
                                <p className="text-slate-600 dark:text-slate-400">Patients sit in radiology waiting for a porter. This "dead time" blocks bed turnover.</p>
                            </div>
                            <div className="glass-card p-6 border-l-4 border-indigo-500">
                                <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-2">
                                    App to Build: <span className="text-indigo-600">"PorterSmart"</span>
                                </h4>
                                <div className="text-xs font-bold uppercase text-slate-500 mb-2">Algorithm-Dispatched Logistics</div>
                                <ul className="space-y-2 text-slate-600 dark:text-slate-400 text-sm">
                                    <li>• <strong>Core Tech</strong>: TSP optimization.</li>
                                    <li>• <strong>Function</strong>: "Uber" for hospital porters. Groups jobs and assigns nearest staff automatically.</li>
                                    <li>• <strong>Advantage</strong>: Reduces patient transport time by 40%.</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Domain K - EcoWard AI (Now in Hospital) */}
                    <div className="mb-16">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900/30 rounded-full flex items-center justify-center text-indigo-600 font-bold text-xl">K</div>
                            <div>
                                <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Sustainable Ops</h3>
                                <p className="text-indigo-600 dark:text-indigo-400 font-semibold">Problem: Energy Waste in ORs</p>
                            </div>
                        </div>
                        <div className="grid md:grid-cols-2 gap-8">
                            <div className="glass-card p-6">
                                <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-2">The Gap</h4>
                                <p className="text-slate-600 dark:text-slate-400">Operating Theaters require massive HVAC energy even when empty at night.</p>
                            </div>
                            <div className="glass-card p-6 border-l-4 border-indigo-500">
                                <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-2">
                                    App to Build: <span className="text-indigo-600">"EcoWard AI"</span>
                                </h4>
                                <div className="text-xs font-bold uppercase text-slate-500 mb-2">Smart Facility Twin</div>
                                <ul className="space-y-2 text-slate-600 dark:text-slate-400 text-sm">
                                    <li>• <strong>Core Tech</strong>: Integration with BMS + Scheduling API.</li>
                                    <li>• <strong>Function</strong>: Automatically powers down HVAC/Lighting when OR schedule is clear.</li>
                                    <li>• <strong>Advantage</strong>: Cuts hospital energy bill by 15%.</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Domain M - CareFlow Architect (Now in Hospital) */}
                    <div className="mb-16">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900/30 rounded-full flex items-center justify-center text-indigo-600 font-bold text-xl">M</div>
                            <div>
                                <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Clinical Governance</h3>
                                <p className="text-indigo-600 dark:text-indigo-400 font-semibold">Problem: Protocol Spaghetti</p>
                            </div>
                        </div>
                        <div className="grid md:grid-cols-2 gap-8">
                            <div className="glass-card p-6">
                                <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-2">The Gap</h4>
                                <p className="text-slate-600 dark:text-slate-400">Medical guidelines are PDF files buried in intranets. Doctors rely on memory.</p>
                            </div>
                            <div className="glass-card p-6 border-l-4 border-indigo-500">
                                <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-2">
                                    App to Build: <span className="text-indigo-600">"CareFlow Architect"</span>
                                </h4>
                                <div className="text-xs font-bold uppercase text-slate-500 mb-2">No-Code Protocol Builder</div>
                                <ul className="space-y-2 text-slate-600 dark:text-slate-400 text-sm">
                                    <li>• <strong>Core Tech</strong>: ReactFlow Logic Engine.</li>
                                    <li>• <strong>Function</strong>: Allows Clinical Directors to visualy design pathways that auto-deploy to the EMR.</li>
                                    <li>• <strong>Advantage</strong>: Eradicates "care variability".</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                </section>

                {/* 4. Workforce Impact Analysis */}
                <section className="mb-20">
                    <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-8">Workforce Impact</h2>

                    {/* Mobile Card View */}
                    <div className="md:hidden space-y-4">
                        {/* GP */}
                        <div className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
                            <div className="flex items-center gap-2 mb-3 font-bold text-teal-600">
                                <Briefcase className="w-5 h-5" /> GP (Family Doc)
                            </div>
                            <div className="grid grid-cols-2 gap-4 text-sm">
                                <div>
                                    <div className="text-xs text-slate-500 uppercase font-bold mb-1">Problem</div>
                                    <div className="text-slate-700 dark:text-slate-300">Data Entry Clerk</div>
                                </div>
                                <div>
                                    <div className="text-xs text-slate-500 uppercase font-bold mb-1">Solution</div>
                                    <div className="text-slate-900 dark:text-white font-bold border-l-2 border-teal-500 pl-2">CliniScript</div>
                                </div>
                            </div>
                            <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center">
                                <span className="text-xs text-slate-500 font-semibold uppercase">Result</span>
                                <span className="text-emerald-600 font-bold">Pure Clinical Time</span>
                            </div>
                        </div>

                        {/* Nurse */}
                        <div className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
                            <div className="flex items-center gap-2 mb-3 font-bold text-blue-600">
                                <Phone className="w-5 h-5" /> Nurse (SNS 24)
                            </div>
                            <div className="grid grid-cols-2 gap-4 text-sm">
                                <div>
                                    <div className="text-xs text-slate-500 uppercase font-bold mb-1">Problem</div>
                                    <div className="text-slate-700 dark:text-slate-300">Call Center Burnout</div>
                                </div>
                                <div>
                                    <div className="text-xs text-slate-500 uppercase font-bold mb-1">Solution</div>
                                    <div className="text-slate-900 dark:text-white font-bold border-l-2 border-blue-500 pl-2">Triage-Os Neural</div>
                                </div>
                            </div>
                            <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center">
                                <span className="text-xs text-slate-500 font-semibold uppercase">Result</span>
                                <span className="text-emerald-600 font-bold">Superhuman Hearing</span>
                            </div>
                        </div>

                        {/* Surgeon */}
                        <div className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
                            <div className="flex items-center gap-2 mb-3 font-bold text-indigo-600">
                                <Activity className="w-5 h-5" /> Surgeon
                            </div>
                            <div className="grid grid-cols-2 gap-4 text-sm">
                                <div>
                                    <div className="text-xs text-slate-500 uppercase font-bold mb-1">Problem</div>
                                    <div className="text-slate-700 dark:text-slate-300">Cancelled Surgeries</div>
                                </div>
                                <div>
                                    <div className="text-xs text-slate-500 uppercase font-bold mb-1">Solution</div>
                                    <div className="text-slate-900 dark:text-white font-bold border-l-2 border-indigo-500 pl-2">FlowMaster</div>
                                </div>
                            </div>
                            <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center">
                                <span className="text-xs text-slate-500 font-semibold uppercase">Result</span>
                                <span className="text-emerald-600 font-bold">+15% OR Utilization</span>
                            </div>
                        </div>

                        {/* Hospital Admin */}
                        <div className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
                            <div className="flex items-center gap-2 mb-3 font-bold text-blue-600">
                                <BarChart3 className="w-5 h-5" /> Hospital Admin
                            </div>
                            <div className="grid grid-cols-2 gap-4 text-sm">
                                <div>
                                    <div className="text-xs text-slate-500 uppercase font-bold mb-1">Problem</div>
                                    <div className="text-slate-700 dark:text-slate-300">Winter Crisis</div>
                                </div>
                                <div>
                                    <div className="text-xs text-slate-500 uppercase font-bold mb-1">Solution</div>
                                    <div className="text-slate-900 dark:text-white font-bold border-l-2 border-blue-500 pl-2">Surge Commander</div>
                                </div>
                            </div>
                            <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center">
                                <span className="text-xs text-slate-500 font-semibold uppercase">Result</span>
                                <span className="text-emerald-600 font-bold">Proactive Capacity</span>
                            </div>
                        </div>

                        {/* Junior Doctor */}
                        <div className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
                            <div className="flex items-center gap-2 mb-3 font-bold text-indigo-600">
                                <FileText className="w-5 h-5" /> Junior Doctor
                            </div>
                            <div className="grid grid-cols-2 gap-4 text-sm">
                                <div>
                                    <div className="text-xs text-slate-500 uppercase font-bold mb-1">Problem</div>
                                    <div className="text-slate-700 dark:text-slate-300">Typing "Admin"</div>
                                </div>
                                <div>
                                    <div className="text-xs text-slate-500 uppercase font-bold mb-1">Solution</div>
                                    <div className="text-slate-900 dark:text-white font-bold border-l-2 border-indigo-500 pl-2">DocuFlow</div>
                                </div>
                            </div>
                            <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center">
                                <span className="text-xs text-slate-500 font-semibold uppercase">Result</span>
                                <span className="text-emerald-600 font-bold">Notes in &lt;45s</span>
                            </div>
                        </div>
                    </div>
                    <div className="overflow-x-auto hidden md:block">
                        <div className="min-w-[800px] grid gap-4">
                            {/* Header */}
                            <div className="grid grid-cols-4 gap-4 px-4 py-2 font-bold text-slate-500 uppercase text-sm border-b-2 border-slate-200">
                                <div>Role</div>
                                <div>Problem</div>
                                <div>Solution App</div>
                                <div>Result</div>
                            </div>

                            {/* Row 1: GP */}
                            <div className="grid grid-cols-4 gap-4 px-4 py-4 bg-white dark:bg-slate-900 rounded-xl items-center shadow-sm">
                                <div className="font-bold text-teal-600 flex items-center gap-2"><Briefcase className="w-4 h-4" /> GP (Family Doc)</div>
                                <div className="text-sm text-slate-600">Data Entry Clerk</div>
                                <div className="text-sm text-slate-600 border-l-2 border-emerald-500 pl-2"><strong>CliniScript</strong></div>
                                <div className="text-sm font-bold text-emerald-600">Pure Clinical Time</div>
                            </div>

                            {/* Row 2: Nurse */}
                            <div className="grid grid-cols-4 gap-4 px-4 py-4 bg-white dark:bg-slate-900 rounded-xl items-center shadow-sm">
                                <div className="font-bold text-blue-600 flex items-center gap-2"><Phone className="w-4 h-4" /> Nurse (SNS 24)</div>
                                <div className="text-sm text-slate-600">Call Center Burnout</div>
                                <div className="text-sm text-slate-600 border-l-2 border-blue-500 pl-2"><strong>Triage-Os Neural</strong></div>
                                <div className="text-sm font-bold text-emerald-600">Superhuman Hearing</div>
                            </div>

                            {/* Row 3: Admin/Pathologist */}
                            <div className="grid grid-cols-4 gap-4 px-4 py-4 bg-white dark:bg-slate-900 rounded-xl items-center shadow-sm">
                                <div className="font-bold text-indigo-600 flex items-center gap-2"><Users className="w-4 h-4" /> Pathologist</div>
                                <div className="text-sm text-slate-600">Slide Fatigue</div>
                                <div className="text-sm text-slate-600 border-l-2 border-indigo-500 pl-2"><strong>Patho-AI</strong></div>
                                <div className="text-sm font-bold text-emerald-600">+37% Speed</div>
                            </div>

                            {/* Row 4: Psychologist */}
                            <div className="grid grid-cols-4 gap-4 px-4 py-4 bg-white dark:bg-slate-900 rounded-xl items-center shadow-sm">
                                <div className="font-bold text-teal-600 flex items-center gap-2"><Brain className="w-4 h-4" /> Psychologist</div>
                                <div className="text-sm text-slate-600">Buried in Waitlists</div>
                                <div className="text-sm text-slate-600 border-l-2 border-teal-500 pl-2"><strong>MindBridge AI</strong></div>
                                <div className="text-sm font-bold text-emerald-600">Focus on Severe Cases</div>
                            </div>

                            {/* Row 5: Surgeon */}
                            <div className="grid grid-cols-4 gap-4 px-4 py-4 bg-white dark:bg-slate-900 rounded-xl items-center shadow-sm">
                                <div className="font-bold text-indigo-600 flex items-center gap-2"><Activity className="w-4 h-4" /> Surgeon</div>
                                <div className="text-sm text-slate-600">Cancelled Surgeries</div>
                                <div className="text-sm text-slate-600 border-l-2 border-indigo-500 pl-2"><strong>FlowMaster</strong></div>
                                <div className="text-sm font-bold text-emerald-600">+15% OR Utilization</div>
                            </div>

                            {/* Row 6: Porter */}
                            <div className="grid grid-cols-4 gap-4 px-4 py-4 bg-white dark:bg-slate-900 rounded-xl items-center shadow-sm">
                                <div className="font-bold text-indigo-600 flex items-center gap-2"><ArrowRight className="w-4 h-4" /> Porter</div>
                                <div className="text-sm text-slate-600">Inefficient Dispatch</div>
                                <div className="text-sm text-slate-600 border-l-2 border-indigo-500 pl-2"><strong>PorterSmart</strong></div>
                                <div className="text-sm font-bold text-emerald-600">Zero "Dead Time"</div>
                            </div>

                            {/* Row 7: Clinical Director */}
                            <div className="grid grid-cols-4 gap-4 px-4 py-4 bg-white dark:bg-slate-900 rounded-xl items-center shadow-sm">
                                <div className="font-bold text-indigo-600 dark:text-indigo-400 flex items-center gap-2"><Settings className="w-4 h-4" /> Clinical Lead</div>
                                <div className="text-sm text-slate-600">Protocol Variance</div>
                                <div className="text-sm text-slate-600 border-l-2 border-indigo-500 pl-2"><strong>CareFlow Architect</strong></div>
                                <div className="text-sm font-bold text-emerald-600">Standardized Care</div>
                            </div>

                            {/* Row 8: Hospital Admin */}
                            <div className="grid grid-cols-4 gap-4 px-4 py-4 bg-white dark:bg-slate-900 rounded-xl items-center shadow-sm">
                                <div className="font-bold text-blue-600 flex items-center gap-2"><BarChart3 className="w-4 h-4" /> Hospital Admin</div>
                                <div className="text-sm text-slate-600">Winter Crisis</div>
                                <div className="text-sm text-slate-600 border-l-2 border-blue-500 pl-2"><strong>Surge Commander</strong></div>
                                <div className="text-sm font-bold text-emerald-600">Proactive Capacity</div>
                            </div>

                            {/* Row 9: Resident */}
                            <div className="grid grid-cols-4 gap-4 px-4 py-4 bg-white dark:bg-slate-900 rounded-xl items-center shadow-sm">
                                <div className="font-bold text-indigo-600 flex items-center gap-2"><FileText className="w-4 h-4" /> Junior Doctor</div>
                                <div className="text-sm text-slate-600">Typing "Admin/Discharge"</div>
                                <div className="text-sm text-slate-600 border-l-2 border-indigo-500 pl-2"><strong>DocuFlow</strong></div>
                                <div className="text-sm font-bold text-emerald-600">Notes in &lt;45s</div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Conclusion */}
                <section className="text-center p-12 bg-slate-900 rounded-3xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-teal-500/10 rounded-full blur-3xl"></div>
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl"></div>

                    <h2 className="text-3xl font-bold text-white mb-6 relative z-10">The Engineering Vision</h2>
                    <p className="text-lg text-slate-300 max-w-2xl mx-auto mb-8 relative z-10">
                        We don't need to buy the future of the SNS. We can build it.<br />
                        By deploying this proprietary application stack, we secure our data, empower our workforce, and save our health service.
                    </p>

                    <div className="flex flex-wrap justify-center gap-4 relative z-10">
                        <div className="px-4 py-2 bg-white/10 rounded-lg text-sm font-semibold text-teal-300 border border-teal-500/30">
                            Proprietary Models
                        </div>
                        <div className="px-4 py-2 bg-white/10 rounded-lg text-sm font-semibold text-blue-300 border border-blue-500/30">
                            Sovereign Data
                        </div>
                        <div className="px-4 py-2 bg-white/10 rounded-lg text-sm font-semibold text-purple-300 border border-purple-500/30">
                            Local IP
                        </div>
                    </div>
                </section>

            </div >
        </div >
    );
}

export default SNSTransformation;
