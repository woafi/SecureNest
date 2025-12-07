import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Globe, Lock } from 'lucide-react';

interface PasswordCardProps {
    id: string;
    title: string;
    username?: string;
    url?: string;
    onClick: () => void;
}

const PasswordCard: React.FC<PasswordCardProps> = ({ title, username, url, onClick }) => {
    const [isHovered, setIsHovered] = useState(false);

    const getInitials = (name: string) => {
        return name
            .split(' ')
            .map((word) => word[0])
            .join('')
            .toUpperCase()
            .slice(0, 2);
    };

    const getColorFromString = (str: string) => {
        const colors = [
            'from-blue-500 to-blue-600',
            'from-purple-500 to-purple-600',
            'from-pink-500 to-pink-600',
            'from-emerald-500 to-emerald-600',
            'from-amber-500 to-amber-600',
            'from-rose-500 to-rose-600',
            'from-indigo-500 to-indigo-600',
            'from-cyan-500 to-cyan-600',
            'from-violet-500 to-violet-600',
            'from-fuchsia-500 to-fuchsia-600',
        ];
        const index = str.charCodeAt(0) % colors.length;
        return colors[index];
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ 
                y: -8,
                transition: { 
                    type: "spring", 
                    stiffness: 400, 
                    damping: 10 
                }
            }}
            whileTap={{ scale: 0.97 }}
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
            onClick={onClick}
            className="relative group cursor-pointer"
        >
            {/* Glow effect on hover */}
            <motion.div
                className="absolute -inset-0.5 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl opacity-0 group-hover:opacity-20 blur transition-opacity duration-500"
                animate={isHovered ? { scale: 1.02 } : { scale: 1 }}
            />
            
            {/* Main card */}
            <div className="relative bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg hover:shadow-2xl dark:shadow-slate-900/50 transition-shadow duration-300 border border-gray-100 dark:border-slate-700">
                <div className="flex items-start space-x-4">
                    {/* Animated Icon */}
                    <motion.div
                        whileHover={{ 
                            rotate: [0, -10, 10, -10, 0],
                            transition: { duration: 0.5 }
                        }}
                        className="flex-shrink-0"
                    >
                        <div
                            className={`w-14 h-14 rounded-xl bg-gradient-to-br ${getColorFromString(
                                title
                            )} flex items-center justify-center text-white font-bold text-lg shadow-lg transform group-hover:scale-110 transition-transform duration-300`}
                        >
                            {getInitials(title)}
                        </div>
                    </motion.div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                        <motion.h3 
                            className="text-lg font-bold text-gray-900 dark:text-white truncate mb-1"
                            animate={isHovered ? { x: 2 } : { x: 0 }}
                            transition={{ type: "spring", stiffness: 300 }}
                        >
                            {title}
                        </motion.h3>
                        
                        {username && (
                            <motion.p 
                                className="text-sm text-gray-600 dark:text-gray-400 truncate"
                                animate={isHovered ? { x: 2 } : { x: 0 }}
                                transition={{ type: "spring", stiffness: 300, delay: 0.05 }}
                            >
                                {username}
                            </motion.p>
                        )}
                        
                        {url && (
                            <motion.div 
                                className="flex items-center space-x-1.5 mt-2"
                                animate={isHovered ? { x: 2 } : { x: 0 }}
                                transition={{ type: "spring", stiffness: 300, delay: 0.1 }}
                            >
                                <Globe className="w-3.5 h-3.5 text-gray-400 dark:text-gray-500" />
                                <p className="text-xs text-gray-500 dark:text-gray-500 truncate">
                                    {url}
                                </p>
                            </motion.div>
                        )}
                    </div>
                </div>

                {/* Password indicator with animation */}
                <div className="flex items-center justify-between mt-5 pt-4 border-t border-gray-100 dark:border-slate-700">
                    <div className="flex space-x-1">
                        {[...Array(8)].map((_, i) => (
                            <motion.div
                                key={i}
                                initial={{ scale: 1 }}
                                animate={isHovered ? {
                                    scale: [1, 1.3, 1],
                                    backgroundColor: isHovered ? '#10b981' : undefined
                                } : { scale: 1 }}
                                transition={{
                                    duration: 0.3,
                                    delay: i * 0.05,
                                    repeat: isHovered ? Infinity : 0,
                                    repeatDelay: 0.8
                                }}
                                className="w-1.5 h-1.5 rounded-full bg-gray-300 dark:bg-slate-600"
                            />
                        ))}
                    </div>
                    
                    <motion.div
                        animate={isHovered ? { 
                            rotate: [0, -10, 10, -10, 0],
                            scale: [1, 1.1, 1]
                        } : {}}
                        transition={{ duration: 0.5 }}
                    >
                        <Lock className="w-4 h-4 text-gray-400 dark:text-gray-600" />
                    </motion.div>
                </div>

                {/* Hover indicator */}
                <motion.div
                    className="absolute top-4 right-4 w-2 h-2 rounded-full bg-emerald-500"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={isHovered ? { 
                        scale: 1, 
                        opacity: 1,
                    } : { 
                        scale: 0, 
                        opacity: 0 
                    }}
                    transition={{ type: "spring", stiffness: 500, damping: 15 }}
                />
            </div>
        </motion.div>
    );
};

export default PasswordCard;