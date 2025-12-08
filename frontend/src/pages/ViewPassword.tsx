import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, AlertCircle } from 'lucide-react';
import PasswordGenerator from '../components/PasswordGenerator';
import PasswordHeader from '../components/PasswordHeader';
import PasswordViewMode from '../components/PasswordViewMode';
import PasswordEditMode from '../components/PasswordEditMode';
import LoadingSpinner from '../components/LoadingSpinner';
import api from '../services/api';

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

const ViewPassword: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    // State management
    const [password, setPassword] = useState<Password | null>(null);
    const [showPassword, setShowPassword] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [copied, setCopied] = useState(false);
    const [copiedUser, setCopiedUser] = useState(false);
    const [showGenerator, setShowGenerator] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    // Edit form state
    const [editForm, setEditForm] = useState({
        title: '',
        username: '',
        password: '',
        url: '',
        notes: ''
    });

    // Fetch password on mount
    useEffect(() => {
        fetchPassword();
    }, [id]);

    const fetchPassword = async () => {
        try {
            const response = await api.get(`/api/passwords/${id}`);
            const pwd = response.data.password;
            setPassword(pwd);
            setEditForm({
                title: pwd.title,
                username: pwd.username || '',
                password: pwd.password,
                url: pwd.url || '',
                notes: pwd.notes || ''
            });
        } catch (err: any) {
            setError('Failed to load password');
        } finally {
            setLoading(false);
        }
    };

    // Handle copy password
    const handleCopyPassword = () => {
        if (password) {
            navigator.clipboard.writeText(password.password);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };
    // Handle copy user/email
    const handleCopyUsername = () => {
        if (password) {
            navigator.clipboard.writeText(password.username!);
            setCopiedUser(true);
            setTimeout(() => setCopiedUser(false), 2000);
        }
    };

    // Handle update password
    const handleUpdate = async () => {
        setError('');
        setLoading(true);
        try {
            await api.put(`/api/passwords/${id}`, editForm);
            await fetchPassword();
            setIsEditing(false);
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

    // Handle delete password
    const handleDelete = async () => {
        if (!confirm('Are you sure you want to delete this password?')) return;

        try {
            await api.delete(`/api/passwords/${id}`);
            navigate('/dashboard');
        } catch (err: any) {
            setError(err.response?.data?.error || 'Failed to delete password');
        }
    };

    // Handle cancel edit
    const handleCancelEdit = () => {
        if (password) {
            setEditForm({
                title: password.title,
                username: password.username || '',
                password: password.password,
                url: password.url || '',
                notes: password.notes || ''
            });
        }
        setIsEditing(false);
    };

    // Loading state
    if (loading && !password) {
        return <LoadingSpinner />;
    }

    // Error state
    if (error && !password) {
        return (
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="max-w-3xl mx-auto px-4 py-20 text-center"
            >
                <motion.div
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                >
                    <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-6" />
                </motion.div>
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">
                    Error Loading Password
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mb-8 text-lg">{error}</p>
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => navigate('/dashboard')}
                    className="cursor-pointer px-8 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 dark:from-emerald-500 dark:to-teal-500 dark:hover:from-emerald-600 dark:hover:to-teal-600 text-white rounded-xl font-semibold shadow-lg shadow-emerald-500/30 hover:shadow-xl hover:shadow-emerald-500/40 transition-all duration-300"
                >
                    Back to Dashboard
                </motion.button>
            </motion.div>
        );
    }

    return (
        <>
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Back button and header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, type: "spring", bounce: 0.4 }}
                    className="mb-8"
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

                    <PasswordHeader
                        isEditing={isEditing}
                        passwordTitle={password?.title}
                        onEdit={() => setIsEditing(true)}
                        onDelete={handleDelete}
                    />
                </motion.div>

                {/* Main content card */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1, type: "spring", bounce: 0.4 }}
                    className="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-xl border border-gray-200 dark:border-slate-700"
                >
                    {/* Error message */}
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

                    {/* Toggle between edit and view mode */}
                    {isEditing ? (
                        <PasswordEditMode
                            editForm={editForm}
                            setEditForm={setEditForm}
                            loading={loading}
                            onCancel={handleCancelEdit}
                            onSave={handleUpdate}
                            onGeneratePassword={() => setShowGenerator(true)}
                        />
                    ) : (
                        <PasswordViewMode
                            password={password}
                            showPassword={showPassword}
                            copied={copied}
                            copiedUser={copiedUser}
                            onTogglePassword={() => setShowPassword(!showPassword)}
                            onCopyPassword={handleCopyPassword}
                            onCopyUsername={handleCopyUsername}
                        />
                    )}
                </motion.div>
            </div>

            {/* Password generator modal */}
            {showGenerator && (
                <PasswordGenerator
                    onGenerate={(pwd) => setEditForm(prev => ({ ...prev, password: pwd }))}
                    onClose={() => setShowGenerator(false)}
                />
            )}
        </>
    );
};

export default ViewPassword;