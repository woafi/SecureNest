import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Plus, Loader, AlertCircle } from 'lucide-react';
import api from '../services/api';

import DashboardHeader from '../components/DashboardHeader';
import PasswordCard from '../components/PasswordCard';
import SearchAddPassword from '../components/Search&ADD';

interface Password {
    id: string;
    title: string;
    username?: string;
    url?: string;
    notes?: string;
    createdAt: string;
    updatedAt: string;
}

const Dashboard: React.FC = () => {
    const [passwords, setPasswords] = useState<Password[]>([]);
    const [filteredPasswords, setFilteredPasswords] = useState<Password[]>([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const navigate = useNavigate();

    useEffect(() => {
        fetchPasswords();
    }, []);

    useEffect(() => {
        if (searchQuery) {
            const filtered = passwords.filter(
                (pwd) =>
                    pwd.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    pwd.username?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    pwd.url?.toLowerCase().includes(searchQuery.toLowerCase())
            );
            setFilteredPasswords(filtered);
        } else {
            setFilteredPasswords(passwords);
        }
    }, [searchQuery, passwords]);

    const fetchPasswords = async () => {
        try {
            const response = await api.get('/api/passwords');
            setPasswords(response.data.passwords);
            setFilteredPasswords(response.data.passwords);
        } catch (error) {
            console.error('Failed to fetch passwords:', error);
            setError('Failed to fetch passwords');
        } finally {
            setLoading(false);
        }
    };

    // Error state
    if (error) {
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
                    Error Loading Passwords
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mb-8 text-lg">{error}</p>
            </motion.div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Header */}
            <DashboardHeader />
            {/* Search and Add */}
            <SearchAddPassword
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
            />
            {/* Password List */}
            {loading ? (
                <div className="flex items-center justify-center py-20">
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    >
                        <Loader className="w-10 h-10 text-emerald-600 dark:text-emerald-400" />
                    </motion.div>
                </div>
            ) : filteredPasswords.length === 0 ? (
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, type: "spring", bounce: 0.5 }}
                    className="text-center py-20"
                >
                    <motion.div
                        animate={{
                            y: [0, -10, 0],
                        }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                        className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-emerald-100 to-teal-100 dark:from-emerald-900/30 dark:to-teal-900/30 rounded-2xl mb-6 shadow-lg"
                    >
                        <Plus className="w-10 h-10 text-emerald-600 dark:text-emerald-400" />
                    </motion.div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                        {searchQuery ? 'No passwords found' : 'No passwords yet'}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-8 text-lg">
                        {searchQuery
                            ? 'Try adjusting your search query'
                            : 'Get started by adding your first password'}
                    </p>
                    {!searchQuery && (
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => navigate('/add-password')}
                            className="cursor-pointer px-8 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 dark:from-emerald-500 dark:to-teal-500 dark:hover:from-emerald-600 dark:hover:to-teal-600 text-white rounded-xl font-semibold shadow-lg shadow-emerald-500/30 hover:shadow-xl hover:shadow-emerald-500/40 transition-all duration-300"
                        >
                            Add Your First Password
                        </motion.button>
                    )}
                </motion.div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredPasswords.map((password, index) => (
                        <motion.div
                            key={password.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{
                                duration: 0.4,
                                delay: index * 0.05,
                                type: "spring",
                                bounce: 0.4
                            }}
                            whileHover={{
                                scale: 1.03,
                                y: -5,
                                transition: { duration: 0.2 }
                            }}
                        >
                            <PasswordCard
                                id={password.id}
                                title={password.title}
                                username={password.username}
                                url={password.url}
                                onClick={() => navigate(`/password/${password.id}`)}
                            />
                        </motion.div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Dashboard;