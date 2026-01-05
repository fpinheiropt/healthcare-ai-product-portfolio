import {
    Server, Database, Brain, Layers, Globe, Smartphone, Lock, Zap, ShieldCheck, Code, FileText, Activity, AlertTriangle, Monitor, Mic, Sparkles, Users, Layout, CheckCircle,
    Play,
    Pill,
    Network,
    Leaf
} from 'lucide-react';

export interface TechStackItem {
    name: string;
    category: 'frontend' | 'backend' | 'ai' | 'infra';
}

export interface ArchitectureData {
    id: string;
    title: string;
    diagramType: 'flow' | 'layer';
    techStack: TechStackItem[];
    dataFlow: {
        step: number;
        label: string;
        description: string;
        icon?: any;
    }[];
    keyDecisions: {
        title: string;
        description: string;
        type: 'privacy' | 'performance' | 'scalability' | 'security';
    }[];
}

export const architectureData: Record<string, ArchitectureData> = {
    'heartguide': {
        id: 'heartguide',
        title: 'HeartGuide AI Architecture',
        diagramType: 'flow',
        techStack: [
            { name: 'React', category: 'frontend' },
            { name: 'Python (FastAPI)', category: 'backend' },
            { name: 'TensorFlow Lite', category: 'ai' },
            { name: 'PostgreSQL', category: 'infra' }
        ],
        dataFlow: [
            { step: 1, label: 'Patient Input', description: 'Daily vitals & symptoms via PWA', icon: Smartphone },
            { step: 2, label: 'Secure Gateway', description: 'JWT Authentication & HIPAA Compliance Layer', icon: Lock },
            { step: 3, label: 'Risk Engine', description: 'Monte Carlo Simulation on 30-day readmission risk', icon: Brain },
            { step: 4, label: 'Clinical Dashboard', description: 'Real-time alert prioritisation for providers', icon: Layers }
        ],
        keyDecisions: [
            { title: 'Edge Inference', description: 'Risk scoring runs locally for immediate feedback even offline.', type: 'performance' },
            { title: 'FHIR Interoperability', description: 'Data structure maps to FHIR resources for EHR integration.', type: 'scalability' }
        ]
    },
    'breatheasy': {
        id: 'breatheasy',
        title: 'BreathEasy System Design',
        diagramType: 'layer',
        techStack: [
            { name: 'Next.js', category: 'frontend' },
            { name: 'OpenWeather API', category: 'infra' },
            { name: 'Scikit-learn', category: 'ai' },
            { name: 'Redis', category: 'backend' }
        ],
        dataFlow: [
            { step: 1, label: 'Env Sensors', description: 'Real-time AQI, Pollen, and Weather data ingestion', icon: Globe },
            { step: 2, label: 'Trigger Model', description: 'Personalized vulnerability mapping (Logistic Regression)', icon: Brain },
            { step: 3, label: 'Alert Service', description: 'Push notifications via Service Workers', icon: Zap },
            { step: 4, label: 'User Action', description: 'Medication adherence logging', icon: Smartphone }
        ],
        keyDecisions: [
            { title: 'Serverless Functions', description: 'API routes handle external weather fetching to hide keys.', type: 'security' },
            { title: 'Geo-Spatial Caching', description: 'Redis caches environmental data by grid cell to reduce API costs.', type: 'performance' }
        ]
    },
    'glucowise': {
        id: 'glucowise',
        title: 'GlucoWise Prediction Pipeline',
        diagramType: 'flow',
        techStack: [
            { name: 'React Native (Web)', category: 'frontend' },
            { name: 'Node.js', category: 'backend' },
            { name: 'XGBoost', category: 'ai' },
            { name: 'MongoDB', category: 'infra' }
        ],
        dataFlow: [
            { step: 1, label: 'Meal Photo', description: 'Computer Vision estimation of carb content', icon: Smartphone },
            { step: 2, label: 'Glycemic Model', description: 'XGBoost regression on User specific response', icon: Brain },
            { step: 3, label: 'Insulin Calc', description: 'Bolus recommendation engine (Human-in-loop)', icon: Server },
            { step: 4, label: 'Feedback Loop', description: 'Post-prandial glucose validates prediction', icon: Database }
        ],
        keyDecisions: [
            { title: 'Hybrid Compute', description: 'Heavy CV tasks offloaded to cloud; simple regression runs local.', type: 'performance' },
            { title: 'Time-Series DB', description: 'MongoDB optimized for storing continuous CGM streams.', type: 'scalability' }
        ]
    },
    'triage-os': {
        id: 'triage-os',
        title: 'HealthLine AI Logic Engine',
        diagramType: 'flow',
        techStack: [
            { name: 'React', category: 'frontend' },
            { name: 'TypeScript', category: 'backend' },
            { name: 'State Machine', category: 'ai' },
            { name: 'Tailwind', category: 'frontend' }
        ],
        dataFlow: [
            { step: 1, label: 'Symptom NLP', description: 'Keyword extraction to match Protocol (e.g., "Chest Pain")', icon: Smartphone },
            { step: 2, label: 'Protocol Engine', description: 'Loads specific Red-Flag question sets (JSON)', icon: Database },
            { step: 3, label: 'Safety Check', description: 'Binary "Yes/No" evaluation of life threats', icon: ShieldCheck },
            { step: 4, label: 'ESI Scoring', description: 'Deterministic assignment of Acuity Level (1-5)', icon: Brain }
        ],
        keyDecisions: [
            { title: 'No-Black-Box', description: 'Uses deterministic algorithms instead of LLMs for clinical safety assurance.', type: 'security' },
            { title: 'Client-Side Privacy', description: 'All triage logic runs in-browser; zero data leaves the device.', type: 'privacy' }
        ]
    },
    'surge-commander': {
        id: 'surge-commander',
        title: 'Surge Commander Logic Engine',
        diagramType: 'flow',
        techStack: [
            { name: 'React', category: 'frontend' },
            { name: 'TypeScript', category: 'backend' },
            { name: 'Recharts', category: 'frontend' },
            { name: 'System Dynamics', category: 'ai' }
        ],
        dataFlow: [
            { step: 1, label: 'Control Inputs', description: 'User defines Inflow Rate and Hospital Capacity params', icon: Smartphone },
            { step: 2, label: 'Capacity Engine', description: 'Calculates delta of Arrival vs. Discharge rates', icon: Brain },
            { step: 3, label: 'Queue Logic', description: 'Overflows excess patients to Waiting Room buffer', icon: Layers },
            { step: 4, label: 'Viz Layer', description: 'Recharts renders real-time bed occupancy loops', icon: Globe }
        ],
        keyDecisions: [
            { title: 'System Dynamics', description: 'Models hospital flow as stocks (beds) and flows (admissions) logic.', type: 'scalability' },
            { title: 'Client-Side Sim', description: 'Entire mathematical model runs in-browser at 60fps.', type: 'performance' }
        ]
    },
    'careflow-architect': {
        id: 'careflow-architect',
        title: 'CareFlow Protocol Logic',
        diagramType: 'flow',
        techStack: [
            { name: 'React', category: 'frontend' },
            { name: 'React Flow', category: 'ai' },
            { name: 'TypeScript', category: 'backend' },
            { name: 'JSON', category: 'infra' }
        ],
        dataFlow: [
            { step: 1, label: 'Visual Editor', description: 'Clinician drags "Nodes" (Questions) onto Canvas', icon: Smartphone },
            { step: 2, label: 'React Flow', description: 'Manages node positions and edge connections state', icon: Layers },
            { step: 3, label: 'Validation', description: 'Ensures all nodes are connected (no orphans)', icon: ShieldCheck },
            { step: 4, label: 'JSON Export', description: 'Compiles graph into machine-readable "Triage Protocol"', icon: Code }
        ],
        keyDecisions: [
            { title: 'No-Code/Low-Code', description: 'Empowers clinicians to update logic without engineering bottlenecks.', type: 'scalability' },
            { title: 'Standard Interchange', description: 'Outputs generic JSON compatible with any rule engine (e.g., Triage-Os).', type: 'scalability' }
        ]
    },
    'docu-flow': {
        id: 'docu-flow',
        title: 'DocuFlow Generation Pipeline',
        diagramType: 'flow',
        techStack: [
            { name: 'React', category: 'frontend' },
            { name: 'TypeScript', category: 'backend' },
            { name: 'Template Engine', category: 'ai' },
            { name: 'Tailwind', category: 'frontend' }
        ],
        dataFlow: [
            { step: 1, label: 'Structured Input', description: 'Clinician toggles findings in granular UI components', icon: Smartphone },
            { step: 2, label: 'State Manager', description: 'React State aggregates HPI, Vitals, and Plan data', icon: Database },
            { step: 3, label: 'Logic Engine', description: 'TemplateEngine maps boolean states to clinical narrative', icon: Brain },
            { step: 4, label: 'Formatted Note', description: 'Output rendered as Copy-Paste ready rich text', icon: FileText }
        ],
        keyDecisions: [
            { title: 'Deterministic Output', description: 'Uses rigorous templates instead of LLMs to guarantee zero hallucinations.', type: 'security' },
            { title: 'Local Processing', description: 'All note generation happens in-browser; no patient data touches a server.', type: 'privacy' }
        ]
    },
    'sentinel': {
        id: 'sentinel',
        title: 'Sentinel AI',
        diagramType: 'layer',
        techStack: [
            { name: 'React', category: 'frontend' },
            { name: 'Framer Motion', category: 'frontend' },
            { name: 'PoseNet (Sim)', category: 'ai' },
            { name: 'WebSockets', category: 'backend' }
        ],
        dataFlow: [
            { step: 1, label: 'Video Feed', description: 'CCTV Stream Capture', icon: Activity },
            { step: 2, label: 'Inference', description: 'Pose & Vital Estimation', icon: Brain },
            { step: 3, label: 'Triage', description: 'Risk Score Assignment', icon: AlertTriangle },
            { step: 4, label: 'Alert', description: 'Nurse Station Notification', icon: ShieldCheck }
        ],
        keyDecisions: [
            { title: 'Edge Processing', description: 'Privacy-first; no video stored cloud-side.', type: 'privacy' },
            { title: 'Visual Overlay', description: 'Augmented Reality interface for rapid scan.', type: 'performance' }
        ]
    },
    'cliniscript': {
        id: 'cliniscript',
        title: 'CliniScript (Ambient AI)',
        diagramType: 'flow',
        techStack: [
            { name: 'React (Visualizer)', category: 'frontend' },
            { name: 'WebSpeech API (Sim)', category: 'ai' },
            { name: 'NLP / Regex', category: 'backend' },
            { name: 'Tailwind V4', category: 'frontend' }
        ],
        dataFlow: [
            { step: 1, label: 'Audio Stream', description: 'Real-time voice capture (Microphone)', icon: Mic },
            { step: 2, label: 'Transcription', description: 'Speech-to-Text Conversion', icon: FileText },
            { step: 3, label: 'Structuring', description: 'LLM Extraction (SOAP Format)', icon: Brain },
            { step: 4, label: 'EHR Sync', description: 'Structured Data push to Medical Record', icon: Sparkles }
        ],
        keyDecisions: [
            { title: 'Privacy First', description: 'Local processing (simulation) ensuring PHI never leaves the secure context.', type: 'security' },
            { title: 'Human-in-the-Loop', description: 'AI drafts the note, but physician sign-off is mandatory.', type: 'security' }
        ]
    },
    'sepsis-sentinel': {
        id: 'sepsis-sentinel',
        title: 'SepsisSentinel Architecture',
        diagramType: 'flow',
        techStack: [
            { name: 'React', category: 'frontend' },
            { name: 'TypeScript', category: 'backend' },
            { name: 'NEWS2 Engine', category: 'ai' },
            { name: 'Tailwind V4', category: 'frontend' }
        ],
        dataFlow: [
            { step: 1, label: 'Vital Simulation', description: 'Generates HR, BP, O2 streams (Mock IO)', icon: Activity },
            { step: 2, label: 'NEWS2 Calc', description: 'Real-time scoring (Royal College of Physicians)', icon: Brain },
            { step: 3, label: 'Trend Analysis', description: 'Detects deterioration (Clinical Drift) over time', icon: Monitor },
            { step: 4, label: 'Alert Trigger', description: 'Red/Amber flags notify clinician of sepsis risk', icon: ShieldCheck }
        ],
        keyDecisions: [
            { title: 'Standardized Scoring', description: 'Strict adherence to NEWS2 protocol ensures clinical validity.', type: 'security' },
            { title: 'Client-Side Sim', description: 'Vital sign variations are calculated locally for responsive demos.', type: 'performance' }
        ]
    },
    'flowmaster': {
        id: 'flowmaster',
        title: 'FlowMaster Architecture',
        diagramType: 'flow',
        techStack: [
            { name: 'React', category: 'frontend' },
            { name: 'TypeScript', category: 'backend' },
            { name: 'Random Forest Sim', category: 'ai' },
            { name: 'Recharts', category: 'frontend' }
        ],
        dataFlow: [
            { step: 1, label: 'Patient Inflow', description: 'Simulates admission stream & clinical attributes', icon: Users },
            { step: 2, label: 'Discharge Engine', description: 'Predicts LOS based on social/clinical complexity', icon: Brain },
            { step: 3, label: 'Capacity Viz', description: 'Projected bed occupancy vs physical limits', icon: Layers },
            { step: 4, label: 'Bottleneck Alert', description: 'Flags "delayed" discharges affecting throughput', icon: AlertTriangle }
        ],
        keyDecisions: [
            { title: 'Operational Twin', description: 'Simulates hospital flow dynamics to prove "throughput" concepts.', type: 'scalability' },
            { title: 'Visual Analytics', description: 'Uses extensive charting to demonstrate data storytelling skills.', type: 'performance' }
        ]
    },
    'portersmart': {
        id: 'portersmart',
        title: 'PorterSmart Logistics Engine',
        diagramType: 'flow',
        techStack: [
            { name: 'React', category: 'frontend' },
            { name: 'TypeScript', category: 'backend' },
            { name: 'TSP Algorithm', category: 'ai' },
            { name: 'Framer Motion', category: 'frontend' }
        ],
        dataFlow: [
            { step: 1, label: 'Job Request', description: 'Ward requests patient transport (A -> B)', icon: Smartphone },
            { step: 2, label: 'Logistics Engine', description: 'Calculates distance matrix between all active jobs', icon: Brain },
            { step: 3, label: 'Route Optimization', description: 'Solves Traveling Salesman Problem (Nearest Neighbor)', icon: Network },
            { step: 4, label: 'Dispatch', description: 'Assigns optimal job to nearest idle porter', icon: Zap }
        ],
        keyDecisions: [
            { title: 'Client-Side Optimization', description: 'TSP algorithm runs in-browser for immediate dispatch feedback.', type: 'performance' },
            { title: 'Geo-Spatial Visualization', description: 'SVG-based map provides real-time situational awareness.', type: 'scalability' }
        ]
    },
    'mindbridge': {
        id: 'mindbridge',
        title: 'MindBridge Triage Engine',
        diagramType: 'flow',
        techStack: [
            { name: 'React', category: 'frontend' },
            { name: 'TypeScript', category: 'backend' },
            { name: 'Clinical Logic', category: 'ai' },
            { name: 'Framer Motion', category: 'frontend' }
        ],
        dataFlow: [
            { step: 1, label: 'User Input', description: 'Answers PHQ-9/GAD-7 questions via chat UI', icon: Smartphone },
            { step: 2, label: 'Scoring Engine', description: 'Real-time summation and severity stratification', icon: Brain },
            { step: 3, label: 'Risk Analysis', description: 'Maps score to clinical depression/anxiety thresholds', icon: Activity },
            { step: 4, label: 'Triage Output', description: 'Generates recommendation and crisis resources', icon: FileText }
        ],
        keyDecisions: [
            { title: 'Privacy First', description: 'All assessment logic runs locally in-browser; no data stored.', type: 'privacy' },
            { title: 'Conversational UI', description: 'Chat interface reduces cognitive load compared to long forms.', type: 'performance' }
        ]
    },
    'patho-ai': {
        id: 'patho-ai',
        title: 'Patho-AI Staging',
        diagramType: 'flow',
        techStack: [
            { name: 'React', category: 'frontend' },
            { name: 'TypeScript', category: 'backend' },
            { name: 'TNM Logic', category: 'ai' },
            { name: 'Framer Motion', category: 'frontend' }
        ],
        dataFlow: [
            { step: 1, label: 'Clinical Input', description: 'Clinician selects T, N, M values via interactive UI', icon: Smartphone },
            { step: 2, label: 'Staging Engine', description: 'Lookup algorithm matches criteria to AJCC 8th Ed. tables', icon: Brain },
            { step: 3, label: 'Validation', description: 'Checks for impossible combinations (e.g., T0 with M1)', icon: Activity },
            { step: 4, label: 'Output', description: 'Returns prognostic stage group (e.g., IIIA) and guidelines', icon: FileText }
        ],
        keyDecisions: [
            { title: 'Deterministic Logic', description: 'Uses hard-coded clinical rules instead of ML for 100% explainability.', type: 'security' },
            { title: 'Instant Feedback', description: 'Stage updates in real-time as inputs change.', type: 'performance' }
        ]
    },
    'gestalink': {
        id: 'gestalink',
        title: 'Maternal Care Agent',
        diagramType: 'flow',
        techStack: [
            { name: 'React', category: 'frontend' },
            { name: 'TypeScript', category: 'backend' },
            { name: 'Risk Engine', category: 'ai' },
            { name: 'Framer Motion', category: 'frontend' }
        ],
        dataFlow: [
            { step: 1, label: 'Symptom Monitor', description: 'Patient logs potential preeclampsia signs (headache, vision)', icon: Smartphone },
            { step: 2, label: 'Safety Agent', description: 'Engine scans inputs against ACOG clinical guidelines', icon: Brain },
            { step: 3, label: 'Risk Stratification', description: 'Classifies status as Low (Green) to High (Red)', icon: Activity },
            { step: 4, label: 'Guidance Output', description: 'Delivers actionable advice (e.g., "Go to Triage")', icon: FileText }
        ],
        keyDecisions: [
            { title: 'Deterministic Safety', description: 'Uses zero-hallucination rule sets for high-stakes maternal health.', type: 'security' },
            { title: 'Empathic UI', description: 'Warm colors and soft animations reduce patient anxiety.', type: 'privacy' }
        ]
    },
    'rxoptimize': {
        id: 'rxoptimize',
        title: 'Pharmacist Safety Agent',
        diagramType: 'flow',
        techStack: [
            { name: 'React', category: 'frontend' },
            { name: 'TypeScript', category: 'backend' },
            { name: 'Interaction Logic', category: 'ai' },
            { name: 'Lucide Icons', category: 'frontend' }
        ],
        dataFlow: [
            { step: 1, label: 'Regimen Input', description: 'User adds medications to the active patient profile', icon: Pill },
            { step: 2, label: 'Safety Scanner', description: 'Agent cross-references drugs against interaction rules', icon: Brain },
            { step: 3, label: 'Risk Analysis', description: 'Flags Contraindicated, Major, or Moderate risks', icon: Activity },
            { step: 4, label: 'Clinical Output', description: 'Provides specific management guidelines for each risk', icon: FileText }
        ],
        keyDecisions: [
            { title: 'Back-Office Design', description: 'Dense, high-contrast UI covering complex data for clinicians.', type: 'performance' },
            { title: 'Proactive Alerting', description: 'Agent pushes safety warnings immediately, acting as a second pair of eyes.', type: 'security' }
        ]
    },
    'ecoward': {
        id: 'ecoward',
        title: 'Sustainability Agent',
        diagramType: 'flow',
        techStack: [
            { name: 'React', category: 'frontend' },
            { name: 'TypeScript', category: 'backend' },
            { name: 'Carbon Engine', category: 'ai' },
            { name: 'Tailwind v4', category: 'frontend' }
        ],
        dataFlow: [
            { step: 1, label: 'Sensor Input', description: 'IoT sensors on HVAC and Waste Bins feed real-time data', icon: Network },
            { step: 2, label: 'Eco-Engine', description: 'Agent calculates carbon footprint and detects anomalies', icon: Leaf },
            { step: 3, label: 'Optimization', description: 'Identifies energy spikes during peak hours', icon: Zap },
            { step: 4, label: 'Action Plan', description: 'Suggests specific operational changes to reduce load', icon: FileText }
        ],
        keyDecisions: [
            { title: 'Green Computing', description: 'Lightweight code architecture to minimize device energy consumption.', type: 'performance' },
            { title: 'Visual Impact', description: 'Gamified dashboard (Real-time CO2e saved) drives staff behavior change.', type: 'privacy' }
        ]
    }
};
