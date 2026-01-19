import React from 'react'
import { motion } from 'framer-motion';
import { Shield, Lock, Zap, Eye, Smartphone, Cloud } from 'lucide-react';


const FeaturesGrid: React.FC = () => {
    const features = [
        {
            icon: <Lock className="w-6 h-6" />,
            title: 'Military-Grade Encryption',
            description: 'AES-256-GCM encryption keeps your passwords secure',
            gradient: 'from-emerald-500 to-teal-600',
        },
        {
            icon: <Zap className="w-6 h-6" />,
            title: 'Lightning Fast',
            description: 'Access your passwords instantly, whenever you need them',
            gradient: 'from-yellow-500 to-orange-600',
        },
        {
            icon: <Eye className="w-6 h-6" />,
            title: 'Zero-Knowledge',
            description: 'We never see your passwords, only you can decrypt them',
            gradient: 'from-blue-500 to-cyan-600',
        },
        {
            icon: <Smartphone className="w-6 h-6" />,
            title: 'Responsive Design',
            description: 'Works seamlessly across all your devices',
            gradient: 'from-purple-500 to-pink-600',
        },
        {
            icon: <Cloud className="w-6 h-6" />,
            title: 'Cloud Sync',
            description: 'Your passwords synced securely across devices',
            gradient: 'from-indigo-500 to-blue-600',
        },
        {
            icon: <Shield className="w-6 h-6" />,
            title: 'Firebase Auth',
            description: 'Industry-standard authentication with Google integration',
            gradient: 'from-rose-500 to-red-600',
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
                    transition={{
                        duration: 0.6,
                        delay: 0.7 + index * 0.1,
                        type: "spring",
                        bounce: 0.4
                    }}
                    whileHover={{
                        scale: 1.05,
                        y: -10,
                        transition: { duration: 0.2 }
                    }}
                    className="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 ease-in-out border border-gray-100 dark:border-slate-700 group cursor-pointer"
                >
                    <motion.div
                        whileHover={{ rotate: 360, scale: 1.1 }}
                        transition={{ duration: 0.6 }}
                        className={`w-14 h-14 bg-gradient-to-br ${feature.gradient} rounded-xl flex items-center justify-center text-white mb-5 shadow-lg group-hover:shadow-xl transition-shadow duration-300`}
                    >
                        {feature.icon}
                    </motion.div>
                    <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors duration-300">
                        {feature.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                        {feature.description}
                    </p>
                </motion.div>
            ))}
        </motion.div>
    )
}

export default FeaturesGrid;
