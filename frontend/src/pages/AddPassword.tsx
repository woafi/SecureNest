import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Save, ArrowLeft, Sparkles, AlertCircle, Eye, EyeOff } from 'lucide-react';

import PasswordGenerator from '../components/PasswordGenerator';
import api from '../services/api';

const AddPassword: React.FC = () => {
    const [title, setTitle] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [url, setUrl] = useState('');
    const [notes, setNotes] = useState('');
    const [isShown, setIsShown] = useState<boolean>(false);
    const [showGenerator, setShowGenerator] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleShownPassword = () => setIsShown((prev) => !prev);


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            await api.post('/api/passwords', {
                title,
                username: username || undefined,
                password,
                url: url || undefined,
                notes: notes || undefined,
            });
            navigate('/dashboard');
        } catch (err: any) {
            // Handle validation errors
            if (err.response?.data?.errors) {
                const errorMessages = err.response.data.errors.map((e: any) => e.msg).join(', ');
                setError(errorMessages);
            } else {
                setError(err.response?.data?.error || 'Failed to save password');
            }
        } finally {
            setLoading(false);
        }
    };

    const handleGeneratePassword = (generatedPassword: string) => {
        setPassword(generatedPassword);
    };

    return (
        <>
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, type: "spring", bounce: 0.4 }}
                    className="mb-8 select-none"
                >
                    <motion.button
                        whileHover={{ x: -5 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => navigate('/dashboard')}
                        className="cursor-pointer flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400 mb-4 transition-colors duration-300 group"
                    >
                        <ArrowLeft className="w-5 h-5 transition-transform duration-300 group-hover:-translate-x-1" />
                        <span className="font-medium">Back to Dashboard</span>
                    </motion.button>

                    <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent mb-2">
                        Add New Password
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400 text-lg">
                        Save a new password to your secure vault
                    </p>
                </motion.div>

                {/* Form */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1, type: "spring", bounce: 0.4 }}
                    className="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-xl border border-gray-200 dark:border-slate-700"
                >
                    {error && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.3 }}
                            className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border-2 border-red-200 dark:border-red-800 rounded-xl flex items-start space-x-3"
                        >
                            <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                            <p className="text-sm text-red-700 dark:text-red-400 font-medium">{error}</p>
                        </motion.div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Title */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2 }}
                        >
                            <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
                                Title <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder="e.g., Gmail, Facebook, Banking"
                                className="w-full px-4 py-3 bg-gray-50 dark:bg-slate-900 border-2 border-gray-200 dark:border-slate-700 rounded-xl focus:border-emerald-500 dark:focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 dark:focus:ring-emerald-900/30 outline-none transition-all duration-300 text-gray-900 dark:text-white placeholder-gray-400"
                                required
                            />
                        </motion.div>

                        {/* Username / Email */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.25 }}
                        >
                            <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
                                Username / Email <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                placeholder="username@example.com"
                                className="w-full px-4 py-3 bg-gray-50 dark:bg-slate-900 border-2 border-gray-200 dark:border-slate-700 rounded-xl focus:border-emerald-500 dark:focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 dark:focus:ring-emerald-900/30 outline-none transition-all duration-300 text-gray-900 dark:text-white placeholder-gray-400"
                                required
                            />
                        </motion.div>

                        {/* Password */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.3 }}
                        >
                            <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
                                Password <span className="text-red-500">*</span>
                            </label>
                            <div className="flex space-x-3 flex-wrap gap-2 sm:gap-0">
                                <div className='flex items-center flex-1 relative'>
                                    <input
                                        type={isShown ? "text" : "password"}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="••••••••"
                                        className="flex-1 px-4 py-3 bg-gray-50 dark:bg-slate-900 border-2 border-gray-200 dark:border-slate-700 rounded-xl focus:border-emerald-500 dark:focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 dark:focus:ring-emerald-900/30 outline-none transition-all duration-300 text-gray-900 dark:text-white placeholder-gray-400"
                                        required
                                    />
                                    <motion.button
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.9 }}
                                        type="button"
                                        onClick={handleShownPassword}
                                        className='absolute right-3 cursor-pointer hover:text-emerald-600 dark:hover:text-emerald-400 text-gray-400'>
                                        {isShown ? (
                                            <Eye className="w-5 h-5"/>
                                        ) : (
                                            <EyeOff className="w-5 h-5"/>
                                        )}
                                    </motion.button>
                                </div>

                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    type="button"
                                    onClick={() => setShowGenerator(true)}
                                    className="cursor-pointer flex items-center space-x-2 px-5 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 dark:from-purple-500 dark:to-pink-500 dark:hover:from-purple-600 dark:hover:to-pink-600 text-white rounded-xl font-semibold shadow-lg shadow-purple-500/30 hover:shadow-xl hover:shadow-purple-500/40 transition-all duration-300 whitespace-nowrap"
                                >
                                    <Sparkles className="w-4 h-4" />
                                    <span>Generate</span>
                                </motion.button>
                            </div>
                        </motion.div>

                        {/* Website URL */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.35 }}
                        >
                            <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
                                Website URL <span className="text-gray-500">(optional)</span>
                            </label>
                            <input
                                type="text"
                                value={url}
                                onChange={(e) => setUrl(e.target.value)}
                                placeholder="https://example.com"
                                className="w-full px-4 py-3 bg-gray-50 dark:bg-slate-900 border-2 border-gray-200 dark:border-slate-700 rounded-xl focus:border-emerald-500 dark:focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 dark:focus:ring-emerald-900/30 outline-none transition-all duration-300 text-gray-900 dark:text-white placeholder-gray-400"
                            />
                        </motion.div>

                        {/* Notes */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.4 }}
                        >
                            <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
                                Notes <span className="text-gray-500">(optional)</span>
                            </label>
                            <textarea
                                value={notes}
                                onChange={(e) => setNotes(e.target.value)}
                                placeholder="Additional notes or security questions..."
                                className="w-full px-4 py-3 bg-gray-50 dark:bg-slate-900 border-2 border-gray-200 dark:border-slate-700 rounded-xl focus:border-emerald-500 dark:focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 dark:focus:ring-emerald-900/30 outline-none transition-all duration-300 text-gray-900 dark:text-white placeholder-gray-400 min-h-[120px] resize-none"
                                rows={4}
                            />
                        </motion.div>

                        {/* Cancel and Save */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.45 }}
                            className="flex space-x-4 pt-6"
                        >
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                type="button"
                                onClick={() => navigate('/dashboard')}
                                className="cursor-pointer flex-1 px-6 py-3 bg-gray-100 dark:bg-slate-700 hover:bg-gray-200 dark:hover:bg-slate-600 text-gray-700 dark:text-gray-300 rounded-xl font-semibold transition-all duration-300 border-2 border-transparent hover:border-gray-300 dark:hover:border-slate-500"
                            >
                                Cancel
                            </motion.button>
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                type="submit"
                                disabled={loading}
                                className="cursor-pointer flex-1 px-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 dark:from-emerald-500 dark:to-teal-500 dark:hover:from-emerald-600 dark:hover:to-teal-600 text-white rounded-xl font-semibold shadow-lg shadow-emerald-500/30 hover:shadow-xl hover:shadow-emerald-500/40 transition-all duration-300 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {loading ? (
                                    <motion.div
                                        animate={{ rotate: 360 }}
                                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                        className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                                    />
                                ) : (
                                    <>
                                        <Save className="w-5 h-5 " />
                                        <span>Save Password</span>
                                    </>
                                )}
                            </motion.button>
                        </motion.div>
                    </form>
                </motion.div>
            </div>

            {showGenerator && (
                <PasswordGenerator
                    onGenerate={handleGeneratePassword}
                    onClose={() => setShowGenerator(false)}
                />
            )}
        </>
    );
};

export default AddPassword;