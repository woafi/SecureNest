import React from 'react';
import { motion } from 'framer-motion';
import { User, Mail, Shield } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';

const Settings: React.FC = () => {
    const { user } = useAuth();
    const { theme, toggleTheme } = useTheme();

    return (
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, type: "spring", bounce: 0.4 }}
                    className="mb-8"
                >
                    <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent mb-2">
                        Account Settings
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400 text-lg">
                        Manage your account preferences and security settings
                    </p>
                </motion.div>

                {/* Profile Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1, type: "spring", bounce: 0.4 }}
                    className="bg-white dark:bg-slate-800 transition-colors duration-700 rounded-2xl p-8 mb-6 shadow-xl border border-gray-200 dark:border-slate-700"
                >
                    <div className="flex items-center space-x-4 mb-6">
                        <motion.div
                            whileHover={{ scale: 1.1, rotate: 360 }}
                            transition={{ duration: 0.6 }}
                            className="w-20 h-20 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center shadow-lg shadow-emerald-500/30"
                        >
                            <User className="w-10 h-10 text-white" />
                        </motion.div>
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                                {user?.displayName || 'User'}
                            </h2>
                            <p className="text-gray-600 dark:text-gray-400">{user?.email}</p>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <motion.div
                            whileHover={{ scale: 1.02, x: 5 }}
                            transition={{ duration: 0.2 }}
                            className="flex items-center space-x-4 p-5 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-slate-900 dark:to-slate-800 rounded-xl border border-gray-200 dark:border-slate-700"
                        >
                            <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                                <Mail className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                            </div>
                            <div>
                                <p className="text-sm font-semibold text-gray-600 dark:text-gray-400">Email</p>
                                <p className="font-medium text-gray-900 dark:text-white">{user?.email}</p>
                            </div>
                        </motion.div>

                        <motion.div
                            whileHover={{ scale: 1.02, x: 5 }}
                            transition={{ duration: 0.2 }}
                            className="flex items-center space-x-4 p-5 bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 rounded-xl border border-emerald-200 dark:border-emerald-800"
                        >
                            <div className="p-3 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg">
                                <Shield className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                            </div>
                            <div>
                                <p className="text-sm font-semibold text-gray-600 dark:text-gray-400">Account Status</p>
                                <p className="font-semibold text-emerald-600 dark:text-emerald-400">Active & Secured</p>
                            </div>
                        </motion.div>
                    </div>
                </motion.div>

                {/* Appearance Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2, type: "spring", bounce: 0.4 }}
                    className="hidden sm:block bg-white dark:bg-slate-800 transition-colors duration-700 rounded-2xl p-8 mb-6 shadow-xl border border-gray-200 dark:border-slate-700"
                >
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                        Appearance
                    </h2>

                    <motion.div
                        whileHover={{ scale: 1.02 }}
                        transition={{ duration: 0.2 }}
                        className="flex items-center justify-between p-5 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-slate-900 dark:to-slate-800 rounded-xl border border-gray-200 dark:border-slate-700"
                    >
                        <div>
                            <p className="font-semibold text-gray-900 dark:text-white mb-1">Dark Mode</p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                Toggle between light and dark themes
                            </p>
                        </div>
                        <motion.button
                            whileTap={{ scale: 0.95 }}
                            onClick={toggleTheme}
                            className={`relative inline-flex h-9 w-16 items-center rounded-full transition-all duration-300 shadow-inner ${
                                theme  
                                    ? 'bg-gradient-to-r from-emerald-600 to-teal-600' 
                                    : 'bg-gray-300'
                            }`}
                        >
                            <motion.span
                                layout
                                transition={{ type: "spring", stiffness: 700, damping: 30 }}
                                className={`inline-block h-7 w-7 transform rounded-full bg-white shadow-lg flex items-center justify-center ${
                                    theme  ? 'translate-x-8' : 'translate-x-1'
                                }`}
                            >
                                {theme? '🌙' : '☀️'}
                            </motion.span>
                        </motion.button>
                    </motion.div>
                </motion.div>

                {/* Security Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3, type: "spring", bounce: 0.4 }}
                    className="bg-white dark:bg-slate-800 transition-colors duration-700 rounded-2xl p-8 shadow-xl border border-gray-200 dark:border-slate-700"
                >
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                        Security
                    </h2>

                    <div className="space-y-4">
                        <motion.div
                            whileHover={{ scale: 1.02, x: 5 }}
                            transition={{ duration: 0.2 }}
                            className="p-5 bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 border-2 border-emerald-200 dark:border-emerald-800 rounded-xl"
                        >
                            <div className="flex items-start space-x-4">
                                <motion.div
                                    animate={{ 
                                        rotate: [0, 10, -10, 0],
                                    }}
                                    transition={{ 
                                        duration: 2,
                                        repeat: Infinity,
                                        ease: "easeInOut"
                                    }}
                                    className="p-3 bg-emerald-100 dark:bg-emerald-900/40 rounded-lg"
                                >
                                    <Shield className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
                                </motion.div>
                                <div className="flex-1">
                                    <p className="font-bold text-emerald-900 dark:text-emerald-100 mb-1 text-lg">
                                        AES-256-GCM Encryption
                                    </p>
                                    <p className="text-sm text-emerald-700 dark:text-emerald-300 leading-relaxed">
                                        All your passwords are encrypted with military-grade encryption
                                    </p>
                                </div>
                            </div>
                        </motion.div>

                        <motion.div
                            whileHover={{ scale: 1.02, x: 5 }}
                            transition={{ duration: 0.2 }}
                            className="p-5 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border-2 border-blue-200 dark:border-blue-800 rounded-xl"
                        >
                            <div className="flex items-start space-x-4">
                                <motion.div
                                    animate={{ 
                                        rotate: [0, -10, 10, 0],
                                    }}
                                    transition={{ 
                                        duration: 2,
                                        repeat: Infinity,
                                        ease: "easeInOut",
                                        delay: 1
                                    }}
                                    className="p-3 bg-blue-100 dark:bg-blue-900/40 rounded-lg"
                                >
                                    <Shield className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                                </motion.div>
                                <div className="flex-1">
                                    <p className="font-bold text-blue-900 dark:text-blue-100 mb-1 text-lg">
                                        Firebase Authentication
                                    </p>
                                    <p className="text-sm text-blue-700 dark:text-blue-300 leading-relaxed">
                                        Industry-standard authentication protecting your account
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </motion.div>
            </div>
    );
};

export default Settings;