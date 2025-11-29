import { motion } from 'framer-motion';
import { Heart, Wind, Droplet, Github, Linkedin, Mail, ExternalLink, ArrowRight } from 'lucide-react';

function App() {
    const projects = [
        {
            id: 'heartguide',
            name: 'HeartGuide AI',
            tagline: 'Heart Failure Readmission Prevention',
            description: 'AI-powered clinical decision support system reducing 30-day readmissions through real-time monitoring and predictive analytics.',
            icon: Heart,
            color: 'from-red-500 to-pink-600',
            url: 'https://heartguide-ai.vercel.app',
            features: ['Risk Prediction', 'Patient Monitoring', 'Provider Dashboard']
        },
        {
            id: 'breatheasy',
            name: 'BreathEasy AI',
            tagline: 'Smart Asthma Management',
            description: 'Intelligent asthma management platform with environmental monitoring, peak flow tracking, and exacerbation prediction.',
            icon: Wind,
            color: 'from-teal-500 to-cyan-600',
            url: 'https://breatheasy-ai.vercel.app',
            features: ['Peak Flow Tracking', 'Environmental Alerts', 'AI Care Assistant']
        },
        {
            id: 'glucowise',
            name: 'GlucoWise AI',
            tagline: 'Intelligent Glucose Monitoring',
            description: 'Type 2 diabetes coaching platform combining continuous glucose insights with personalized AI-driven lifestyle recommendations.',
            icon: Droplet,
            color: 'from-blue-500 to-indigo-600',
            url: 'https://glucowise-ai.vercel.app',
            features: ['Glucose Tracking', 'Meal Logging', 'Personalized Insights']
        }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
            {/* Hero Section */}
            <section className="relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-teal-50 via-blue-50 to-purple-50 opacity-60"></div>
                <div className="relative max-w-7xl mx-auto px-6 py-24 sm:py-32">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-center"
                    >
                        <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full border border-slate-200 mb-8">
                            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                            <span className="text-sm font-medium text-slate-700">Available for Product Roles</span>
                        </div>

                        <h1 className="font-display text-5xl sm:text-7xl font-bold text-slate-900 mb-6 tracking-tight">
                            Francisco Pinheiro
                        </h1>

                        <p className="text-2xl sm:text-3xl text-slate-600 mb-4 font-medium">
                            MD Building AI Healthcare Products
                        </p>

                        <p className="text-lg text-slate-500 max-w-2xl mx-auto mb-12">
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
                                className="inline-flex items-center gap-2 bg-white text-slate-700 px-8 py-4 rounded-xl font-semibold hover:bg-slate-50 transition-all border border-slate-200 shadow-sm"
                            >
                                <Linkedin className="w-5 h-5" />
                                Connect
                            </a>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Projects Section */}
            <section id="projects" className="py-24 bg-white">
                <div className="max-w-7xl mx-auto px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-16"
                    >
                        <h2 className="font-display text-4xl sm:text-5xl font-bold text-slate-900 mb-4">
                            AI Healthcare Products
                        </h2>
                        <p className="text-xl text-slate-600 max-w-3xl mx-auto">
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
                                    className="group relative bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-2xl hover:shadow-slate-200 transition-all duration-300"
                                >
                                    {/* Gradient Header */}
                                    <div className={`h-32 bg-gradient-to-br ${project.color} relative overflow-hidden`}>
                                        <div className="absolute inset-0 bg-black/10"></div>
                                        <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm p-3 rounded-xl">
                                            <Icon className="w-8 h-8 text-white" />
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div className="p-6">
                                        <h3 className="font-display text-2xl font-bold text-slate-900 mb-2">
                                            {project.name}
                                        </h3>
                                        <p className="text-sm font-semibold text-teal-600 mb-3">
                                            {project.tagline}
                                        </p>
                                        <p className="text-slate-600 mb-4 leading-relaxed">
                                            {project.description}
                                        </p>

                                        {/* Features */}
                                        <div className="flex flex-wrap gap-2 mb-6">
                                            {project.features.map((feature) => (
                                                <span
                                                    key={feature}
                                                    className="text-xs bg-slate-100 text-slate-700 px-3 py-1 rounded-full font-medium"
                                                >
                                                    {feature}
                                                </span>
                                            ))}
                                        </div>

                                        {/* Launch Button */}
                                        <a
                                            href={project.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-2 text-teal-600 font-semibold hover:text-teal-700 group-hover:gap-3 transition-all"
                                        >
                                            Launch App
                                            <ExternalLink className="w-4 h-4" />
                                        </a>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* About Section */}
            <section className="py-24 bg-gradient-to-br from-slate-50 to-white">
                <div className="max-w-4xl mx-auto px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <h2 className="font-display text-4xl font-bold text-slate-900 mb-8 text-center">
                            About Me
                        </h2>

                        <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm">
                            <p className="text-lg text-slate-700 leading-relaxed mb-6">
                                I'm a physician with a Master's in Biomedical Engineering, transitioning into AI Product Management in healthcare.
                                I combine deep clinical expertise with technical skills in AI/ML to build products that truly address healthcare challenges.
                            </p>

                            <div className="grid sm:grid-cols-2 gap-6 mb-8">
                                <div>
                                    <h3 className="font-semibold text-slate-900 mb-3">Education</h3>
                                    <ul className="space-y-2 text-slate-600">
                                        <li>• MD - Universidade do Porto</li>
                                        <li>• MSc Biomedical Engineering - IST Lisboa</li>
                                    </ul>
                                </div>
                                <div>
                                    <h3 className="font-semibold text-slate-900 mb-3">Technical Skills</h3>
                                    <ul className="space-y-2 text-slate-600">
                                        <li>• Python, TensorFlow, PyTorch</li>
                                        <li>• React, TypeScript, Tailwind</li>
                                        <li>• Product Strategy & PRD Writing</li>
                                    </ul>
                                </div>
                            </div>

                            <div className="flex flex-wrap gap-4 pt-6 border-t border-slate-200">
                                <a
                                    href="https://linkedin.com/in/fmmpinheiro"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 text-slate-700 hover:text-teal-600 transition-colors"
                                >
                                    <Linkedin className="w-5 h-5" />
                                    <span className="font-medium">LinkedIn</span>
                                </a>
                                <a
                                    href="https://github.com/fpinheiropt"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 text-slate-700 hover:text-teal-600 transition-colors"
                                >
                                    <Github className="w-5 h-5" />
                                    <span className="font-medium">GitHub</span>
                                </a>
                                <a
                                    href="mailto:fpinheiro921@gmail.com"
                                    className="inline-flex items-center gap-2 text-slate-700 hover:text-teal-600 transition-colors"
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
            <footer className="bg-slate-900 text-white py-12">
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

export default App;
