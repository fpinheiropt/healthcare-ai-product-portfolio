export interface Experience {
    role: string;
    company: string;
    period: string;
    achievements: string[];
}

export interface Education {
    degree: string;
    institution: string;
    period: string;
}

export interface SkillCategory {
    category: string;
    items: string[];
}

export const resumeData = {
    bio: "I'm an Internal Medicine Resident with a Master's in Biomedical Engineering, transitioning into AI Product Management in healthcare. I combine deep clinical expertise with technical skills in AI/ML to build products that deliver real-world impact.",
    experience: [
        {
            role: "Internal Medicine Resident",
            company: "ULS Braga",
            period: "2024 - Present",
            achievements: [
                "Redesigned digital workflows, improving care coordination by 25%",
                "Identified that 70% of chronic disease follow-ups are routine guideline implementations (ideal for AI automation)",
                "Collaborated with clinicians and administrators to translate clinical inefficiencies into actionable product features"
            ]
        },
        {
            role: "Medical Intern",
            company: "Centro Hospitalar de Leiria",
            period: "2023",
            achievements: [
                "Rotations: Internal Medicine (4mo), General Surgery (3mo), Pediatrics (2mo), Primary Care (3mo)",
                "Cross-functional care delivery across multiple specialties in high-volume clinical settings"
            ]
        },
        {
            role: "MSc Researcher",
            company: "Stem Cell Bioengineering Lab (IBB/IST)",
            period: "2015",
            achievements: [
                "Conducted research on cardiac regenerative therapies using mesenchymal stem cells",
                "Applied quantitative modeling and data analysis to evaluate therapeutic efficacy"
            ]
        }
    ],
    education: [
        {
            degree: "MD in Medicine",
            institution: "Faculdade de Medicina da Universidade do Porto",
            period: "2016 - 2022"
        },
        {
            degree: "MSc Biomedical Engineering",
            institution: "Instituto Superior Técnico / TU Delft",
            period: "2010 - 2015"
        }
    ],
    certifications: [
        {
            name: "Medical License",
            issuer: "Ordem dos Médicos (Portugal)",
            date: "July 2022"
        },
        {
            name: "CAE (C1 Advanced)",
            issuer: "Cambridge Assessment English",
            date: "2008"
        }
    ],
    skills: {
        clinical: [
            "Internal Medicine",
            "Diagnostic Reasoning",
            "Evidence-Based Medicine",
            "Clinical Operations"
        ],
        digital: [
            "AI Clinical Workflows",
            "Product Design",
            "Data Analysis",
            "EHR Systems"
        ],
        technical: [
            "React", "TypeScript", "Python", "Next.js", "TensorFlow", "Tailwind CSS", "Gemini API", "scikit-learn"
        ]
    }
};
