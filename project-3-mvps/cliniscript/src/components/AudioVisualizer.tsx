import { motion } from 'framer-motion';

interface AudioVisualizerProps {
    isActive: boolean;
}

export default function AudioVisualizer({ isActive }: AudioVisualizerProps) {
    if (!isActive) return null;

    return (
        <div className="flex items-center justify-center gap-1 h-12">
            {[...Array(8)].map((_, i) => (
                <motion.div
                    key={i}
                    className="w-2 bg-blue-500 rounded-full"
                    animate={{
                        height: ["20%", "100%", "20%"],
                        opacity: [0.5, 1, 0.5]
                    }}
                    transition={{
                        duration: 0.8,
                        repeat: Infinity,
                        repeatType: "reverse",
                        delay: i * 0.1,
                        ease: "easeInOut"
                    }}
                    style={{
                        height: "40%"
                    }}
                />
            ))}
        </div>
    );
}
