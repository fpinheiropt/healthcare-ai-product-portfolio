import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Wind, Droplet, Github, Linkedin, Mail, ExternalLink, ArrowRight, FileText, Search, Code } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { resumeData } from '../data/resume';
import ArchitectureModal from '../components/ArchitectureModal';
import { architectureData } from '../data/architecture';

function Home() {
    const [selectedArchitectureId, setSelectedArchitectureId] = React.useState<string | null>(null);

    const projects = [
        {
            id: 'heartguide',
            name: 'HeartGuide AI',
            tagline: 'AI-Driven Heart Failure Risk Engine',
            description: 'Clinical decision support system featuring a Monte Carlo readmission simulator to visualize patient risk reduction.',
            icon: Heart,
            color: 'from-red-500 to-pink-600',
            url: 'https://heartguide-ai.vercel.app/',
            features: ['Risk Simulator', 'Patient Monitoring', 'Intervention Modeling']
        },
        {
            id: 'breatheasy',
            name: 'BreathEasy AI',
            tagline: 'Environmental Asthma Trigger Simulator',
            description: 'Real-time asthma risk simulation combining clinical vulnerability with environmental data (AQI, Pollen, Weather).',
            icon: Wind,
            color: 'from-teal-500 to-cyan-600',
            url: 'https://breatheasy-ai.vercel.app/',
            features: ['Trigger Simulator', 'Environmental Risk', 'Vulnerability Profiler']
        },
        {
            id: 'glucowise',
            name: 'GlucoWise AI',
            tagline: 'Metabolic Impact Predictor',
            description: 'Diabetes management with a predictive engine that simulates glucose response to specific meals and insulin doses.',
            icon: Droplet,
            color: 'from-blue-500 to-indigo-600',
            url: 'https://glucowise-ai.vercel.app/',
            features: ['Meal Simulator', 'Glucose Prediction', 'Metabolic Scoring']
        }
    ];

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
            <div className="print:hidden">
                <Navbar />
            </div>
            {/* Hero Section */}
            <section id="home" className="relative overflow-hidden pt-16 print:hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-teal-50 via-blue-50 to-purple-50 dark:from-slate-900 dark:via-slate-900 dark:to-slate-800 opacity-60 dark:opacity-40"></div>
                <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-teal-500/10 rounded-full blur-[120px] animate-pulse"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-500/10 rounded-full blur-[120px] animate-pulse delay-1000"></div>

                <div className="relative max-w-7xl mx-auto px-6 py-24 sm:py-32">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-center"
                    >
                        <div className="inline-flex items-center gap-2 glass-panel px-4 py-2 rounded-full mb-8">
                            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                            <span className="text-sm font-medium text-slate-700 dark:text-slate-200">Available for Clinical Specialist Roles</span>
                        </div>

                        <h1 className="font-display text-5xl sm:text-7xl font-bold text-slate-900 dark:text-white mb-6 tracking-tight">
                            Francisco Pinheiro
                        </h1>

                        <p className="text-2xl sm:text-3xl text-slate-600 dark:text-slate-300 mb-4 font-medium">
                            MD Building AI Healthcare Products
                        </p>

                        <p className="text-lg text-slate-500 dark:text-slate-400 max-w-2xl mx-auto mb-12">
                            Bridging clinical medicine, AI/ML engineering, and product thinking to build solutions that truly address healthcare challenges.
                        </p>

                        <div className="flex flex-wrap justify-center gap-4">
                            <a
                                href="#projects"
                                className="group inline-flex items-center gap-2 bg-teal-600 text-white px-8 py-4 rounded-xl font-semibold hover:bg-teal-700 transition-all shadow-lg shadow-teal-600/30 hover:shadow-xl hover:shadow-teal-600/40"
                            >
                                View Projects
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </a>
                            <a
                                href="https://linkedin.com/in/fmmpinheiro"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 glass-card text-slate-700 dark:text-slate-200 px-8 py-4 rounded-xl font-semibold hover:bg-white/80 dark:hover:bg-slate-800/80 transition-all"
                            >
                                <Linkedin className="w-5 h-5" />
                                Connect
                            </a>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Projects Section */}
            <section id="projects" className="py-24 bg-white dark:bg-slate-950 transition-colors duration-300 print:hidden">
                <div className="max-w-7xl mx-auto px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-16"
                    >
                        <h2 className="font-display text-4xl sm:text-5xl font-bold text-slate-900 dark:text-white mb-4">
                            AI Healthcare Products
                        </h2>
                        <p className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
                            Full-stack MVP applications demonstrating product strategy, clinical expertise, and technical execution.
                        </p>
                    </motion.div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {projects.map((project, index) => {
                            const Icon = project.icon;
                            return (
                                <motion.div
                                    key={project.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.6, delay: index * 0.1 }}
                                    className="group relative glass-card overflow-hidden hover:scale-[1.02] hover:shadow-2xl hover:shadow-teal-900/10 dark:hover:shadow-teal-900/20 transition-all duration-300"
                                >
                                    {/* Gradient Header */}
                                    <div className={`h-32 bg-gradient-to-br ${project.color} relative overflow-hidden transition-transform duration-500`}>
                                        <div className="absolute inset-0 bg-black/10"></div>
                                        <div className="absolute top-4 right-4 glass-panel p-3 rounded-xl shadow-lg">
                                            <Icon className="w-8 h-8 text-white" />
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div className="p-6 relative z-10 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm">
                                        <h3 className="font-display text-2xl font-bold text-slate-900 dark:text-white mb-2 group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">
                                            {project.name}
                                        </h3>
                                        <p className="text-sm font-semibold text-teal-600 dark:text-teal-400 mb-3">
                                            {project.tagline}
                                        </p>
                                        <p className="text-slate-600 dark:text-slate-300 mb-4 leading-relaxed">
                                            {project.description}
                                        </p>

                                        {/* Features */}
                                        <div className="flex flex-wrap gap-2 mb-6">
                                            {project.features.map((feature) => (
                                                <span
                                                    key={feature}
                                                    className="text-xs bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 px-3 py-1 rounded-full font-medium"
                                                >
                                                    {feature}
                                                </span>
                                            ))}
                                        </div>

                                        <div className="flex gap-4">
                                            {/* Launch Button */}
                                            <a
                                                href={project.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center gap-2 text-teal-600 dark:text-teal-400 font-semibold hover:text-teal-700 dark:hover:text-teal-300 group-hover:gap-3 transition-all active:scale-95 origin-left"
                                            >
                                                Launch App
                                                <ExternalLink className="w-4 h-4" />
                                            </a>

                                            {/* Architecture Button */}
                                            <button
                                                onClick={() => setSelectedArchitectureId(project.id)}
                                                className="inline-flex items-center gap-2 text-slate-500 dark:text-slate-400 font-semibold hover:text-slate-700 dark:hover:text-slate-200 transition-colors active:scale-95"
                                            >
                                                <Code className="w-4 h-4" />
                                                System Design
                                            </button>
                                        </div>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>

                {/* Architecture Modal */}
                {selectedArchitectureId && (
                    <ArchitectureModal
                        isOpen={!!selectedArchitectureId}
                        onClose={() => setSelectedArchitectureId(null)}
                        data={architectureData[selectedArchitectureId]}
                    />
                )}
            </section>

            {/* Product Thinking Section */}
            <section id="thinking" className="py-24 bg-slate-50 dark:bg-slate-900 transition-colors duration-300 print:hidden">
                <div className="max-w-7xl mx-auto px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-16"
                    >
                        <h2 className="font-display text-4xl sm:text-5xl font-bold text-slate-900 dark:text-white mb-4">
                            Product Thinking
                        </h2>
                        <p className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
                            Deep dives into market analysis, product strategy, and requirements definition.
                        </p>
                    </motion.div>

                    {/* Unified Grid: 3 Columns for 6 Items */}
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

                        {/* PRDs */}
                        <Link
                            to="/documents/heartguide-prd"
                            className="glass-card p-8 group"
                        >
                            <div className="bg-blue-50 dark:bg-blue-900/30 w-14 h-14 rounded-xl flex items-center justify-center mb-6 group-hover:bg-blue-100 dark:group-hover:bg-blue-900/50 transition-colors">
                                <FileText className="w-7 h-7 text-blue-600 dark:text-blue-400" />
                            </div>
                            <h3 className="font-display text-xl font-bold text-slate-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                HeartGuide PRD
                            </h3>
                            <p className="text-slate-600 dark:text-slate-400 mb-4">
                                Requirements for AI-powered heart failure readmission prevention.
                            </p>
                            <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-semibold text-sm">
                                Read Document <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </div>
                        </Link>

                        <Link
                            to="/documents/breatheasy-prd"
                            className="glass-card p-8 group"
                        >
                            <div className="bg-cyan-50 dark:bg-cyan-900/30 w-14 h-14 rounded-xl flex items-center justify-center mb-6 group-hover:bg-cyan-100 dark:group-hover:bg-cyan-900/50 transition-colors">
                                <FileText className="w-7 h-7 text-cyan-600 dark:text-cyan-400" />
                            </div>
                            <h3 className="font-display text-xl font-bold text-slate-900 dark:text-white mb-3 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
                                BreathEasy PRD
                            </h3>
                            <p className="text-slate-600 dark:text-slate-400 mb-4">
                                Specs for smart asthma management with environmental trigger prediction.
                            </p>
                            <div className="flex items-center gap-2 text-cyan-600 dark:text-cyan-400 font-semibold text-sm">
                                Read Document <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </div>
                        </Link>

                        <Link
                            to="/documents/glucowise-prd"
                            className="glass-card p-8 group"
                        >
                            <div className="bg-indigo-50 dark:bg-indigo-900/30 w-14 h-14 rounded-xl flex items-center justify-center mb-6 group-hover:bg-indigo-100 dark:group-hover:bg-indigo-900/50 transition-colors">
                                <FileText className="w-7 h-7 text-indigo-600 dark:text-indigo-400" />
                            </div>
                            <h3 className="font-display text-xl font-bold text-slate-900 dark:text-white mb-3 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                                GlucoWise PRD
                            </h3>
                            <p className="text-slate-600 dark:text-slate-400 mb-4">
                                Specs for AI-driven diabetes coaching and lifestyle management.
                            </p>
                            <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-semibold text-sm">
                                Read Document <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </div>
                        </Link>

                        {/* Teardowns */}
                        <Link
                            to="/documents/sword-teardown"
                            className="glass-card p-8 group"
                        >
                            <div className="bg-purple-50 dark:bg-purple-900/30 w-14 h-14 rounded-xl flex items-center justify-center mb-6 group-hover:bg-purple-100 dark:group-hover:bg-purple-900/50 transition-colors">
                                <Search className="w-7 h-7 text-purple-600 dark:text-purple-400" />
                            </div>
                            <h3 className="font-display text-xl font-bold text-slate-900 dark:text-white mb-3 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                                Sword Health
                            </h3>
                            <p className="text-slate-600 dark:text-slate-400 mb-4">
                                Digital MSK care market analysis.
                            </p>
                            <div className="flex items-center gap-2 text-purple-600 dark:text-purple-400 font-semibold text-sm">
                                Read Analysis <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </div>
                        </Link>

                        <Link
                            to="/documents/omada-teardown"
                            className="glass-card p-8 group"
                        >
                            <div className="bg-emerald-50 dark:bg-emerald-900/30 w-14 h-14 rounded-xl flex items-center justify-center mb-6 group-hover:bg-emerald-100 dark:group-hover:bg-emerald-900/50 transition-colors">
                                <Search className="w-7 h-7 text-emerald-600 dark:text-emerald-400" />
                            </div>
                            <h3 className="font-display text-xl font-bold text-slate-900 dark:text-white mb-3 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                                Omada Health
                            </h3>
                            <p className="text-slate-600 dark:text-slate-400 mb-4">
                                "Virtual First" chronic care pioneer.
                            </p>
                            <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-semibold text-sm">
                                Read Analysis <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </div>
                        </Link>

                        <Link
                            to="/documents/hello-heart-teardown"
                            className="glass-card p-8 group"
                        >
                            <div className="bg-red-50 dark:bg-red-900/30 w-14 h-14 rounded-xl flex items-center justify-center mb-6 group-hover:bg-red-100 dark:group-hover:bg-red-900/50 transition-colors">
                                <Search className="w-7 h-7 text-red-600 dark:text-red-400" />
                            </div>
                            <h3 className="font-display text-xl font-bold text-slate-900 dark:text-white mb-3 group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors">
                                Hello Heart
                            </h3>
                            <p className="text-slate-600 dark:text-slate-400 mb-4">
                                Frictionless cardiovascular health monitoring.
                            </p>
                            <div className="flex items-center gap-2 text-red-600 dark:text-red-400 font-semibold text-sm">
                                Read Analysis <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </div>
                        </Link>



                    </div>
                </div>
            </section>

            {/* About Section */}
            <section id="about" className="py-24 bg-gradient-to-br from-slate-50 to-white dark:from-slate-900 dark:to-slate-950 transition-colors duration-300 print:bg-white print:py-0">
                <div className="max-w-6xl mx-auto px-6 print:px-0 print:max-w-none">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="flex flex-col md:flex-row justify-between items-center mb-12 print:hidden">
                            <h2 className="font-display text-4xl font-bold text-slate-900 dark:text-white">
                                About Me
                            </h2>
                            <button
                                onClick={() => window.print()}
                                className="mt-4 md:mt-0 inline-flex items-center gap-2 bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-6 py-2.5 rounded-xl font-bold hover:opacity-90 transition-all shadow-lg active:scale-95"
                            >
                                <FileText className="w-4 h-4" />
                                Download CV
                            </button>
                        </div>

                        {/* Print Header (Only visible when printing) */}
                        <div className="hidden print:block mb-8 border-b-2 border-slate-900 pb-4">
                            <h1 className="text-3xl font-bold text-slate-900">Francisco Pinheiro</h1>
                            <p className="text-lg text-slate-600">MD • Biomedical Engineer • AI Product Manager</p>
                            <div className="flex gap-4 mt-2 text-sm text-slate-500">
                                <span>fpinheiro921@gmail.com</span>
                                <span>linkedin.com/in/fmmpinheiro</span>
                                <span>github.com/fpinheiropt</span>
                            </div>
                        </div>

                        <p className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto mb-16 text-center print:text-left print:mb-8 print:text-base print:max-w-none print:text-slate-900">
                            Bridging clinical medicine, AI/ML engineering, and product thinking to build solutions that truly address healthcare challenges.
                        </p>

                        {/* Bio Card */}
                        <div className="glass-card p-8 mb-12 print:shadow-none print:border-none print:p-0 print:mb-8">
                            <p className="text-lg text-slate-700 dark:text-slate-300 leading-relaxed print:text-base print:text-slate-900">
                                {resumeData.bio}
                            </p>
                        </div>

                        {/* Work Experience Timeline */}
                        <div className="mb-16 print:mb-8">
                            <h3 className="font-display text-2xl font-bold text-slate-900 dark:text-white mb-8 print:text-xl print:mb-4">Work Experience</h3>
                            <div className="space-y-6 print:space-y-4">
                                {resumeData.experience.map((exp, index) => (
                                    <div key={index} className="glass-card p-6 border-l-4 border-teal-600 print:break-inside-avoid print:shadow-none print:border-l-2 print:border-slate-800 print:p-0 print:pl-4 print:bg-transparent hover:scale-[1.01] hover:bg-white/80 dark:hover:bg-slate-800/80 transition-all duration-300">
                                        <div className="flex flex-wrap justify-between items-start mb-2">
                                            <div>
                                                <h4 className="text-xl font-bold text-slate-900 dark:text-white print:text-lg print:text-slate-900">{exp.role}</h4>
                                                <p className="text-teal-600 dark:text-teal-400 font-semibold print:text-slate-700">{exp.company}</p>
                                            </div>
                                            <span className="text-sm font-medium text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-full print:bg-transparent print:p-0 print:text-slate-600">{exp.period}</span>
                                        </div>
                                        <ul className="space-y-2 text-slate-600 dark:text-slate-300 mt-4 print:mt-2">
                                            {exp.achievements.map((achievement, i) => (
                                                <li key={i} className="flex gap-2">
                                                    <span className="text-teal-600 dark:text-teal-400 font-bold print:hidden">•</span>
                                                    <span className="print:list-disc print:ml-4">{achievement}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Skills Matrix */}
                        <div className="mb-12 print:mb-8 print:break-inside-avoid">
                            <h3 className="font-display text-2xl font-bold text-slate-900 dark:text-white mb-8 print:text-xl print:mb-4">Skills & Expertise</h3>
                            <div className="grid md:grid-cols-3 gap-6 print:grid-cols-3 print:gap-4">
                                {/* Clinical */}
                                <div className="group bg-gradient-to-br from-teal-50 to-teal-100 dark:from-teal-900/30 dark:to-teal-800/30 rounded-2xl p-6 border border-teal-200 dark:border-teal-800/50 backdrop-blur-sm print:bg-transparent print:border print:border-slate-200 print:p-4 print:rounded-lg hover:-translate-y-1 hover:shadow-lg transition-all duration-300">
                                    <h4 className="font-display font-bold text-teal-900 dark:text-teal-300 mb-4 text-lg uppercase tracking-wide print:text-sm print:mb-2 print:text-slate-900 group-hover:text-teal-700 dark:group-hover:text-teal-200 transition-colors">Clinical Expertise</h4>
                                    <ul className="space-y-2">
                                        {resumeData.skills.clinical.map(skill => (
                                            <li key={skill} className="flex items-center gap-2 text-teal-800 dark:text-teal-200 print:text-slate-800 print:text-sm">
                                                <div className="flex gap-1 print:hidden group-hover:scale-110 transition-transform">
                                                    {[1, 2, 3, 4, 5].map(i => (
                                                        <div key={i} className="w-1.5 h-1.5 rounded-full bg-current opacity-80" />
                                                    ))}
                                                </div>
                                                <span className="font-medium">{skill}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                {/* Digital Health */}
                                <div className="group bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/30 rounded-2xl p-6 border border-blue-200 dark:border-blue-800/50 backdrop-blur-sm print:bg-transparent print:border print:border-slate-200 print:p-4 print:rounded-lg hover:-translate-y-1 hover:shadow-lg transition-all duration-300">
                                    <h4 className="font-display font-bold text-blue-900 dark:text-blue-300 mb-4 text-lg uppercase tracking-wide print:text-sm print:mb-2 print:text-slate-900 group-hover:text-blue-700 dark:group-hover:text-blue-200 transition-colors">Digital Health & AI</h4>
                                    <ul className="space-y-2">
                                        {resumeData.skills.digital.map(skill => (
                                            <li key={skill} className="flex items-center gap-2 text-blue-800 dark:text-blue-200 print:text-slate-800 print:text-sm">
                                                <div className="flex gap-1 print:hidden group-hover:scale-110 transition-transform">
                                                    {[1, 2, 3, 4, 5].map(i => (
                                                        <div key={i} className="w-1.5 h-1.5 rounded-full bg-current opacity-80" />
                                                    ))}
                                                </div>
                                                <span className="font-medium">{skill}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                {/* Technical */}
                                <div className="group bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800/50 dark:to-slate-900/50 rounded-2xl p-6 border border-slate-200 dark:border-slate-700 backdrop-blur-sm print:bg-transparent print:border print:border-slate-200 print:p-4 print:rounded-lg hover:-translate-y-1 hover:shadow-lg transition-all duration-300">
                                    <h4 className="font-display font-bold text-slate-800 dark:text-slate-200 mb-4 text-lg uppercase tracking-wide print:text-sm print:mb-2 print:text-slate-900 group-hover:text-slate-900 dark:group-hover:text-white transition-colors">Technical Stack</h4>
                                    <div className="flex flex-wrap gap-2">
                                        {resumeData.skills.technical.map(skill => (
                                            <span key={skill} className="bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-200 px-3 py-1 rounded-full text-sm font-medium border border-slate-200 dark:border-slate-600 print:bg-slate-100 print:text-slate-800 print:border print:border-slate-200 group-hover:border-slate-300 dark:group-hover:border-slate-500 transition-colors">
                                                {skill}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Education & Contact */}
                        <div className="glass-card p-8 print:shadow-none print:border-none print:p-0 print:break-inside-avoid">
                            <div className="grid sm:grid-cols-2 gap-8 mb-8 print:gap-4 print:mb-4">
                                <div>
                                    <h3 className="font-semibold text-slate-900 dark:text-white mb-4 text-lg print:text-lg print:mb-2">Education</h3>
                                    <ul className="space-y-3 text-slate-600 dark:text-slate-300 print:space-y-2">
                                        {resumeData.education.map((edu, i) => (
                                            <li key={i} className="flex flex-col">
                                                <span className="font-semibold text-slate-900 dark:text-white print:text-slate-900">{edu.degree}</span>
                                                <span className="text-sm print:text-slate-700">{edu.institution}</span>
                                                <span className="text-xs text-slate-500 dark:text-slate-400 print:text-slate-600">{edu.period}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div>
                                    <h3 className="font-semibold text-slate-900 dark:text-white mb-4 text-lg print:text-lg print:mb-2">Certifications</h3>
                                    <ul className="space-y-3 text-slate-600 dark:text-slate-300 print:space-y-2">
                                        {resumeData.certifications.map((cert, i) => (
                                            <li key={i} className="flex flex-col">
                                                <span className="font-semibold text-slate-900 dark:text-white print:text-slate-900">{cert.name}</span>
                                                <span className="text-sm print:text-slate-700">{cert.issuer}</span>
                                                <span className="text-xs text-slate-500 dark:text-slate-400 print:text-slate-600">{cert.date}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>

                            <div className="flex flex-wrap gap-4 pt-6 border-t border-slate-200 dark:border-slate-700">
                                <a
                                    href="https://linkedin.com/in/fmmpinheiro"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 text-slate-700 dark:text-slate-300 hover:text-teal-600 dark:hover:text-teal-400 transition-colors"
                                >
                                    <Linkedin className="w-5 h-5" />
                                    <span className="font-medium">LinkedIn</span>
                                </a>
                                <a
                                    href="https://github.com/fpinheiropt"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 text-slate-700 dark:text-slate-300 hover:text-teal-600 dark:hover:text-teal-400 transition-colors"
                                >
                                    <Github className="w-5 h-5" />
                                    <span className="font-medium">GitHub</span>
                                </a>
                                <a
                                    href="mailto:fpinheiro921@gmail.com"
                                    className="inline-flex items-center gap-2 text-slate-700 dark:text-slate-300 hover:text-teal-600 dark:hover:text-teal-400 transition-colors"
                                >
                                    <Mail className="w-5 h-5" />
                                    <span className="font-medium">Email</span>
                                </a>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-slate-900 text-white py-12 print:hidden">
                <div className="max-w-7xl mx-auto px-6 text-center">
                    <p className="text-slate-400 mb-4">
                        © 2025 Francisco Pinheiro. Built with React, TypeScript, and Tailwind CSS.
                    </p>
                    <p className="text-slate-500 text-sm italic">
                        "The future of healthcare is at the intersection of clinical expertise and artificial intelligence."
                    </p>
                </div>
            </footer>
        </div>
    );
}

export default Home;
