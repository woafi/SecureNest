import React from 'react';
import { motion } from 'framer-motion';
import { Eye, EyeOff, Copy, Check } from 'lucide-react';

interface Password {
    id: string;
    title: string;
    username?: string;
    password: string;
    url?: string;
    notes?: string;
    createdAt: string;
    updatedAt: string;
}

interface PasswordViewModeProps {
    password: Password | null;
    showPassword: boolean;
    copied: boolean;
    copiedUser: boolean;
    onTogglePassword: () => void;
    onCopyPassword: () => void;
    onCopyUsername: () => void;
}

const PasswordViewMode: React.FC<PasswordViewModeProps> = ({
    password,
    showPassword,
    copied,
    copiedUser,
    onTogglePassword,
    onCopyPassword,
    onCopyUsername
}) => {
    return (
        <div className="space-y-6">
            {/* Username field */}
            {password?.username && (
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                >
                    <label className="block text-sm font-semibold text-gray-600 dark:text-gray-400 mb-2">
                        Username / Email
                    </label>
                    <div className="p-4 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-slate-900 dark:to-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 flex items-center justify-between">
                        <p className="font-mono text-lg text-gray-900 dark:text-white">{password.username}</p>
                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={onCopyUsername}
                            className="cursor-pointer p-2 hover:bg-emerald-100 dark:hover:bg-emerald-900/40 rounded-lg transition-all duration-300"
                        >
                            {copiedUser ? (
                                <Check className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                            ) : (
                                <Copy className="w-5 h-5 text-gray-700 dark:text-gray-300" />
                            )}
                        </motion.button>
                    </div>
                </motion.div>
            )}

            {/* Password field with visibility toggle and copy */}
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 }}
            >
                <label className="block text-sm font-semibold text-gray-600 dark:text-gray-400 mb-2">
                    Password
                </label>
                <div className="p-4 bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 rounded-xl border border-emerald-200 dark:border-emerald-800 flex items-center justify-between">
                    <p className="font-mono text-lg flex-1 text-gray-900 dark:text-white">
                        {showPassword ? password?.password : '••••••••••••'}
                    </p>
                    <div className="flex space-x-2">
                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={onTogglePassword}
                            className="cursor-pointer p-2 hover:bg-emerald-100 dark:hover:bg-emerald-900/40 rounded-lg transition-all duration-300 text-gray-700 dark:text-gray-300"
                        >
                            {showPassword ? (
                                <EyeOff className="w-5 h-5" />
                            ) : (
                                <Eye className="w-5 h-5" />
                            )}
                        </motion.button>
                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={onCopyPassword}
                            className="cursor-pointer p-2 hover:bg-emerald-100 dark:hover:bg-emerald-900/40 rounded-lg transition-all duration-300"
                        >
                            {copied ? (
                                <Check className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                            ) : (
                                <Copy className="w-5 h-5 text-gray-700 dark:text-gray-300" />
                            )}
                        </motion.button>
                    </div>
                </div>
            </motion.div>

            {/* URL field */}
            {password?.url && (
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                >
                    <label className="block text-sm font-semibold text-gray-600 dark:text-gray-400 mb-2">
                        Website URL
                    </label>
                    <div className="p-4 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-slate-900 dark:to-slate-800 rounded-xl border border-gray-200 dark:border-slate-700">
                        <a
                            href={password.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 break-all font-medium transition-colors duration-300"
                        >
                            {password.url}
                        </a>
                    </div>
                </motion.div>
            )}

            {/* Notes field */}
            {password?.notes && (
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.35 }}
                >
                    <label className="block text-sm font-semibold text-gray-600 dark:text-gray-400 mb-2">
                        Notes
                    </label>
                    <div className="p-4 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-slate-900 dark:to-slate-800 rounded-xl border border-gray-200 dark:border-slate-700">
                        <p className="whitespace-pre-wrap text-gray-900 dark:text-white leading-relaxed">{password.notes}</p>
                    </div>
                </motion.div>
            )}

            {/* Metadata: Created and Updated dates */}
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="pt-6 border-t border-gray-200 dark:border-slate-700"
            >
                <div className="grid grid-cols-2 gap-6">
                    <div className="p-4 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl border border-blue-200 dark:border-blue-800">
                        <label className="block text-sm font-semibold text-gray-600 dark:text-gray-400 mb-2">
                            Created
                        </label>
                        <p className="font-semibold text-gray-900 dark:text-white">
                            {new Date(password?.createdAt || '').toLocaleDateString()}
                        </p>
                    </div>
                    <div className="p-4 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl border border-purple-200 dark:border-purple-800">
                        <label className="block text-sm font-semibold text-gray-600 dark:text-gray-400 mb-2">
                            Last Updated
                        </label>
                        <p className="font-semibold text-gray-900 dark:text-white">
                            {new Date(password?.updatedAt || '').toLocaleDateString()}
                        </p>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default PasswordViewMode;