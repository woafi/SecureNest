import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, X, Save, Eye, EyeOff } from 'lucide-react';

interface EditForm {
    title: string;
    username: string;
    password: string;
    url: string;
    notes: string;
}

interface PasswordEditModeProps {
    editForm: EditForm;
    setEditForm: React.Dispatch<React.SetStateAction<EditForm>>;
    loading: boolean;
    onCancel: () => void;
    onSave: () => void;
    onGeneratePassword: () => void;
}

const PasswordEditMode: React.FC<PasswordEditModeProps> = ({
    editForm,
    setEditForm,
    loading,
    onCancel,
    onSave,
    onGeneratePassword
}) => {
    // Update specific field in form
    const updateField = (field: keyof EditForm, value: string) => {
        setEditForm(prev => ({ ...prev, [field]: value }));
    };
    const [isShown, setIsShown] = useState<boolean>(false);
    const handleShownPassword = () => setIsShown((prev) => !prev);

    return (
        <div className="space-y-6">
            {/* Title field */}
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
            >
                <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">Title</label>
                <input
                    type="text"
                    value={editForm.title}
                    onChange={(e) => updateField('title', e.target.value)}
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-slate-900 border-2 border-gray-200 dark:border-slate-700 rounded-xl focus:border-emerald-500 dark:focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 dark:focus:ring-emerald-900/30 outline-none transition-all duration-300 text-gray-900 dark:text-white"
                    required
                />
            </motion.div>

            {/* Username field */}
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.25 }}
            >
                <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">Username / Email</label>
                <input
                    type="text"
                    value={editForm.username}
                    onChange={(e) => updateField('username', e.target.value)}
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-slate-900 border-2 border-gray-200 dark:border-slate-700 rounded-xl focus:border-emerald-500 dark:focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 dark:focus:ring-emerald-900/30 outline-none transition-all duration-300 text-gray-900 dark:text-white"
                />
            </motion.div>

            {/* Password field with generator button */}
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
            >
                <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">Password</label>
                <div className="flex space-x-3">
                    <div className='flex items-center flex-1 relative'>
                        <input
                            type={isShown ? "text" : "password"}
                            value={editForm.password}
                            onChange={(e) => updateField('password', e.target.value)}
                            className="flex-1 px-4 py-3 bg-gray-50 dark:bg-slate-900 border-2 border-gray-200 dark:border-slate-700 rounded-xl focus:border-emerald-500 dark:focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 dark:focus:ring-emerald-900/30 outline-none transition-all duration-300 text-gray-900 dark:text-white"
                            required
                        />
                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            type="button"
                            onClick={handleShownPassword}
                            className='absolute right-3 cursor-pointer hover:text-emerald-600 dark:hover:text-emerald-400 text-gray-400'>
                            {isShown ? (
                                <Eye className="w-5 h-5" />
                            ) : (
                                <EyeOff className="w-5 h-5" />
                            )}
                        </motion.button>
                    </div>
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        type="button"
                        onClick={onGeneratePassword}
                        className="cursor-pointer flex items-center space-x-2 px-5 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 dark:from-purple-500 dark:to-pink-500 dark:hover:from-purple-600 dark:hover:to-pink-600 text-white rounded-xl font-semibold shadow-lg shadow-purple-500/30 hover:shadow-xl hover:shadow-purple-500/40 transition-all duration-300 whitespace-nowrap"
                    >
                        <Sparkles className="w-4 h-4" />
                        <span>Generate</span>
                    </motion.button>
                </div>
            </motion.div>

            {/* URL field */}
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.35 }}
            >
                <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">Website URL</label>
                <input
                    type="url"
                    value={editForm.url}
                    onChange={(e) => updateField('url', e.target.value)}
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-slate-900 border-2 border-gray-200 dark:border-slate-700 rounded-xl focus:border-emerald-500 dark:focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 dark:focus:ring-emerald-900/30 outline-none transition-all duration-300 text-gray-900 dark:text-white"
                />
            </motion.div>

            {/* Notes field */}
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
            >
                <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">Notes</label>
                <textarea
                    value={editForm.notes}
                    onChange={(e) => updateField('notes', e.target.value)}
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-slate-900 border-2 border-gray-200 dark:border-slate-700 rounded-xl focus:border-emerald-500 dark:focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 dark:focus:ring-emerald-900/30 outline-none transition-all duration-300 text-gray-900 dark:text-white min-h-[120px] resize-none"
                    rows={4}
                />
            </motion.div>

            {/* Action buttons */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45 }}
                className="flex space-x-4 pt-6"
            >
                <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={onCancel}
                    className="cursor-pointer flex-1 px-6 py-3 bg-gray-100 dark:bg-slate-700 hover:bg-gray-200 dark:hover:bg-slate-600 text-gray-700 dark:text-gray-300 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center space-x-2"
                >
                    <X className="w-4 h-4" />
                    <span>Cancel</span>
                </motion.button>
                <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={onSave}
                    disabled={loading}
                    className="cursor-pointer flex-1 px-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 dark:from-emerald-500 dark:to-teal-500 dark:hover:from-emerald-600 dark:hover:to-teal-600 text-white rounded-xl font-semibold shadow-lg shadow-emerald-500/30 hover:shadow-xl hover:shadow-emerald-500/40 transition-all duration-300 flex items-center justify-center space-x-2 disabled:opacity-50"
                >
                    {loading ? (
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                            className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                        />
                    ) : (
                        <>
                            <Save className="w-4 h-4" />
                            <span>Save Changes</span>
                        </>
                    )}
                </motion.button>
            </motion.div>
        </div>
    );
};

export default PasswordEditMode;