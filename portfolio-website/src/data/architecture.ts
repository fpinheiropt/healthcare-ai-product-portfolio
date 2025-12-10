import { Server, Database, Brain, Layers, Globe, Smartphone, Lock, Zap, ShieldCheck, Code, FileText, Activity, AlertTriangle } from 'lucide-react';

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
    }
};
