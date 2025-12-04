import React from 'react'
import { motion } from 'framer-motion';
import { Shield, Lock, Zap, Eye, Smartphone, Cloud } from 'lucide-react';


const FeaturesGrid: React.FC = () => {
    const features = [
        {
            icon: <Lock className="w-6 h-6" />,
            title: 'Military-Grade Encryption',
            description: 'AES-256-GCM encryption keeps your passwords secure',
        },
        {
            icon: <Zap className="w-6 h-6" />,
            title: 'Lightning Fast',
            description: 'Access your passwords instantly, whenever you need them',
        },
        {
            icon: <Eye className="w-6 h-6" />,
            title: 'Zero-Knowledge',
            description: 'We never see your passwords, only you can decrypt them',
        },
        {
            icon: <Smartphone className="w-6 h-6" />,
            title: 'Responsive Design',
            description: 'Works seamlessly across all your devices',
        },
        {
            icon: <Cloud className="w-6 h-6" />,
            title: 'Cloud Sync',
            description: 'Your passwords synced securely across devices',
        },
        {
            icon: <Shield className="w-6 h-6" />,
            title: 'Firebase Auth',
            description: 'Industry-standard authentication with Google integration',
        },
    ];
  return (
    <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    className="mt-32 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.7 + index * 0.1 }}
                            whileHover={{ scale: 1.05, y: -5 }}
                            className="card rounded-lg p-6 transition-shadow ease-in-out duration-300 hover:shadow-2xl"
                        >
                            <div className="w-12 h-12 bg-gradient-to-br from-green-500 dark:from-lime-400 to-emerald-600 flex items-center justify-center text-white mb-4">
                                {feature.icon}
                            </div>
                            <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">
                                {feature.title}
                            </h3>
                            <p className="text-gray-600 dark:text-gray-400">{feature.description}</p>
                        </motion.div>
                    ))}
                </motion.div>
  )
}

export default FeaturesGrid;
