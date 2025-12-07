import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, RefreshCw, Copy, Check, Shield, Zap } from 'lucide-react';

interface PasswordGeneratorProps {
    onGenerate: (password: string) => void;
    onClose: () => void;
}

const PasswordGenerator: React.FC<PasswordGeneratorProps> = ({ onGenerate, onClose }) => {
    const [length, setLength] = useState(16);
    const [includeUppercase, setIncludeUppercase] = useState(true);
    const [includeLowercase, setIncludeLowercase] = useState(true);
    const [includeNumbers, setIncludeNumbers] = useState(true);
    const [includeSymbols, setIncludeSymbols] = useState(true);
    const [generatedPassword, setGeneratedPassword] = useState('');
    const [copied, setCopied] = useState(false);
    const [isGenerating, setIsGenerating] = useState(false);

    const getPasswordStrength = () => {
        if (!generatedPassword) return { label: 'None', color: 'bg-gray-300', width: '0%' };
        
        let strength = 0;
        if (length >= 12) strength += 25;
        if (length >= 16) strength += 10;
        if (includeUppercase) strength += 20;
        if (includeLowercase) strength += 20;
        if (includeNumbers) strength += 15;
        if (includeSymbols) strength += 25;

        if (strength >= 85) return { label: 'Very Strong', color: 'bg-emerald-500', width: '100%' };
        if (strength >= 70) return { label: 'Strong', color: 'bg-green-500', width: '75%' };
        if (strength >= 50) return { label: 'Medium', color: 'bg-amber-500', width: '50%' };
        return { label: 'Weak', color: 'bg-red-500', width: '25%' };
    };

    const generatePassword = async () => {
        setIsGenerating(true);
        
        let charset = '';
        if (includeUppercase) charset += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        if (includeLowercase) charset += 'abcdefghijklmnopqrstuvwxyz';
        if (includeNumbers) charset += '0123456789';
        if (includeSymbols) charset += '!@#$%^&*()_+-=[]{}|;:,.<>?';

        if (charset === '') {
            alert('Please select at least one character type');
            setIsGenerating(false);
            return;
        }

        // Simulate generation delay for animation
        await new Promise(resolve => setTimeout(resolve, 300));

        let password = '';
        for (let i = 0; i < length; i++) {
            password += charset.charAt(Math.floor(Math.random() * charset.length));
        }

        setGeneratedPassword(password);
        setCopied(false);
        setIsGenerating(false);
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(generatedPassword);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleUsePassword = () => {
        if (generatedPassword) {
            onGenerate(generatedPassword);
            onClose();
        }
    };

    const strength = getPasswordStrength();

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={onClose}
        >
            <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                transition={{ type: "spring", bounce: 0.4, duration: 0.6 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-white dark:bg-slate-800 rounded-2xl max-w-md w-full p-6 shadow-2xl border border-gray-200 dark:border-slate-700"
            >
                {/* Header */}
                <div className="flex justify-between items-center mb-6">
                    <div className="flex items-center space-x-3">
                        <motion.div
                            animate={{ rotate: [0, 360] }}
                            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                            className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center shadow-lg"
                        >
                            <Shield className="w-5 h-5 text-white" />
                        </motion.div>
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                            Password Generator
                        </h2>
                    </div>
                    <motion.button
                        whileHover={{ scale: 1.1, rotate: 90 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={onClose}
                        className="cursor-pointer p-2 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-xl transition-colors"
                    >
                        <X className="w-5 h-5 text-gray-700 dark:text-gray-300" />
                    </motion.button>
                </div>

                {/* Generated Password Display */}
                <AnimatePresence mode="wait">
                    {generatedPassword && (
                        <motion.div
                            initial={{ opacity: 0, y: -10, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -10, scale: 0.95 }}
                            transition={{ type: "spring", bounce: 0.5 }}
                            className="mb-6"
                        >
                            <div className="p-4 bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 rounded-xl border-2 border-emerald-200 dark:border-emerald-800 shadow-lg">
                                <div className="flex items-center justify-between mb-3">
                                    <p className="font-mono text-lg break-all flex-1 text-gray-900 dark:text-white font-semibold">
                                        {generatedPassword}
                                    </p>
                                    <motion.button
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.9 }}
                                        onClick={copyToClipboard}
                                        className="ml-3 p-2.5 hover:bg-emerald-100 dark:hover:bg-emerald-900/40 rounded-lg transition-colors"
                                    >
                                        <AnimatePresence mode="wait">
                                            {copied ? (
                                                <motion.div
                                                    key="check"
                                                    initial={{ scale: 0, rotate: -180 }}
                                                    animate={{ scale: 1, rotate: 0 }}
                                                    exit={{ scale: 0, rotate: 180 }}
                                                    transition={{ type: "spring", bounce: 0.6 }}
                                                >
                                                    <Check className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                                                </motion.div>
                                            ) : (
                                                <motion.div
                                                    key="copy"
                                                    initial={{ scale: 0, rotate: 180 }}
                                                    animate={{ scale: 1, rotate: 0 }}
                                                    exit={{ scale: 0, rotate: -180 }}
                                                >
                                                    <Copy className="w-5 h-5 text-gray-700 dark:text-gray-300" />
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </motion.button>
                                </div>
                                
                                {/* Strength Indicator */}
                                <div>
                                    <div className="flex justify-between items-center mb-2">
                                        <span className="text-xs font-medium text-gray-600 dark:text-gray-400">
                                            Password Strength
                                        </span>
                                        <span className={`text-xs font-bold ${strength.color.replace('bg-', 'text-')}`}>
                                            {strength.label}
                                        </span>
                                    </div>
                                    <div className="h-2 bg-gray-200 dark:bg-slate-700 rounded-full overflow-hidden">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            animate={{ width: strength.width }}
                                            transition={{ type: "spring", bounce: 0.3, duration: 0.8 }}
                                            className={`h-full ${strength.color} rounded-full`}
                                        />
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Length Slider */}
                <div className="mb-6">
                    <div className="flex justify-between items-center mb-3">
                        <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                            Password Length
                        </label>
                        <motion.span
                            key={length}
                            initial={{ scale: 1.3 }}
                            animate={{ scale: 1 }}
                            transition={{ type: "spring", bounce: 0.6 }}
                            className="text-lg font-bold text-emerald-600 dark:text-emerald-400"
                        >
                            {length}
                        </motion.span>
                    </div>
                    <input
                        type="range"
                        min="8"
                        max="32"
                        value={length}
                        onChange={(e) => setLength(parseInt(e.target.value))}
                        className="w-full h-2 bg-gray-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-emerald-600"
                        style={{
                            background: `linear-gradient(to right, rgb(16 185 129) 0%, rgb(16 185 129) ${((length - 8) / 24) * 100}%, rgb(229 231 235) ${((length - 8) / 24) * 100}%, rgb(229 231 235) 100%)`
                        }}
                    />
                    <div className="flex justify-between text-xs text-gray-500 dark:text-gray-500 mt-1">
                        <span>8</span>
                        <span>32</span>
                    </div>
                </div>

                {/* Options */}
                <div className="space-y-3 mb-6">
                    {[
                        { state: includeUppercase, setter: setIncludeUppercase, label: 'Uppercase Letters', sub: 'A-Z' },
                        { state: includeLowercase, setter: setIncludeLowercase, label: 'Lowercase Letters', sub: 'a-z' },
                        { state: includeNumbers, setter: setIncludeNumbers, label: 'Numbers', sub: '0-9' },
                        { state: includeSymbols, setter: setIncludeSymbols, label: 'Symbols', sub: '!@#$%...' }
                    ].map((option, index) => (
                        <motion.label
                            key={option.label}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="flex items-center justify-between p-3 bg-gray-50 dark:bg-slate-700/50 rounded-xl cursor-pointer hover:bg-gray-100 dark:hover:bg-slate-700 transition-all border border-transparent hover:border-emerald-200 dark:hover:border-emerald-800"
                        >
                            <div className="flex items-center space-x-3">
                                
                                    <input
                                        type="checkbox"
                                        checked={option.state}
                                        onChange={(e) => option.setter(e.target.checked)}
                                        className="w-5 h-5 accent-emerald-600 rounded border-gray-300 dark:border-slate-600 cursor-pointer"
                                    />
                                
                                <div>
                                    <div className="text-sm font-medium text-gray-900 dark:text-white">
                                        {option.label}
                                    </div>
                                    <div className="text-xs text-gray-500 dark:text-gray-400">
                                        {option.sub}
                                    </div>
                                </div>
                            </div>
                        </motion.label>
                    ))}
                </div>

                {/* Actions */}
                <div className="flex space-x-3">
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={generatePassword}
                        disabled={isGenerating}
                        className="cursor-pointer flex-1 flex items-center justify-center space-x-2 px-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 dark:from-emerald-500 dark:to-teal-500 dark:hover:from-emerald-600 dark:hover:to-teal-600 text-white rounded-xl font-semibold shadow-lg shadow-emerald-500/30 hover:shadow-xl hover:shadow-emerald-500/40 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <motion.div
                            animate={isGenerating ? { rotate: 360 } : {}}
                            transition={{ duration: 0.6, repeat: isGenerating ? Infinity : 0, ease: "linear" }}
                        >
                            <RefreshCw className="w-5 h-5" />
                        </motion.div>
                        <span>{isGenerating ? 'Generating...' : 'Generate'}</span>
                    </motion.button>

                    <AnimatePresence>
                        {generatedPassword && (
                            <motion.button
                                initial={{ opacity: 0, scale: 0.8, x: 20 }}
                                animate={{ opacity: 1, scale: 1, x: 0 }}
                                exit={{ opacity: 0, scale: 0.8, x: 20 }}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={handleUsePassword}
                                className="cursor-pointer flex-1 flex items-center justify-center space-x-2 px-6 py-3 bg-white dark:bg-slate-700 hover:bg-gray-50 dark:hover:bg-slate-600 text-gray-900 dark:text-white border-2 border-emerald-600 dark:border-emerald-500 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                            >
                                <Zap className="w-5 h-5" />
                                <span>Use Password</span>
                            </motion.button>
                        )}
                    </AnimatePresence>
                </div>
            </motion.div>
        </motion.div>
    );
};

export default PasswordGenerator;