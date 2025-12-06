import { Server, Database, Brain, Layers, Globe, Smartphone, Lock, Zap } from 'lucide-react';

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
    }
};
