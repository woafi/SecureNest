import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import { Moon, Sun, LogOut, Settings, Shield, Menu, X } from 'lucide-react';

const Navbar: React.FC = () => {
    const { user, logout } = useAuth();
    const { theme, toggleTheme } = useTheme();
    const navigate = useNavigate();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const handleLogout = async () => {
        try {
            await logout();
            navigate('/login');
            setIsMobileMenuOpen(false);
        } catch (error) {
            console.error('Logout failed:', error);
        }
    };

    const closeMobileMenu = () => {
        setIsMobileMenuOpen(false);
    };

    return (
        <nav className="bg-white dark:bg-slate-900 border-b border-gray-200 dark:border-slate-700 sticky top-0 z-50 backdrop-blur-md bg-opacity-95 dark:bg-opacity-95 shadow-sm transition-colors duration-700">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <Link
                        to={user ? '/dashboard' : '/'}
                        className="flex items-center space-x-2 group"
                        onClick={closeMobileMenu}
                    >
                        <div className="relative">
                            <Shield className="w-8 h-8 text-emerald-600 dark:text-emerald-400 transition-all duration-300 group-hover:scale-110 group-hover:rotate-12" />
                            <div className="absolute inset-0 bg-emerald-500 blur-lg opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
                        </div>
                        <span className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 dark:from-emerald-400 dark:to-teal-400 bg-clip-text text-transparent">
                            SecureNest
                        </span>
                    </Link>



                    {/* Desktop Actions */}
                    <div className="hidden md:flex items-center space-x-3">
                        {/* Theme Toggle */}
                        <button
                            onClick={toggleTheme}
                            className="cursor-pointer relative p-2.5 rounded-xl hover:bg-gray-100 dark:hover:bg-slate-800 transition-all duration-300 hover:scale-110 active:scale-95 group"
                            aria-label="Toggle theme"
                        >
                            {theme ? (
                                <Sun className="w-5 h-5 text-gray-300 transition-transform duration-300 group-hover:rotate-90" />
                            ) : (
                                <Moon className="w-5 h-5 text-gray-700 dark:text-gray-300 transition-transform duration-300 group-hover:rotate-12" />
                            )}
                        </button>

                        {/* User Menu */}
                        {user && (
                            <>
                                <Link
                                    to="/settings"
                                    className="cursor-pointer relative p-2.5 rounded-xl hover:bg-gray-100 dark:hover:bg-slate-800 transition-all duration-300 hover:scale-110 active:scale-95 group"
                                    aria-label="Settings"
                                >
                                    <Settings className="w-5 h-5 text-gray-700 dark:text-gray-300 transition-transform duration-300 group-hover:rotate-90" />
                                </Link>

                                <button
                                    onClick={handleLogout}
                                    className="cursor-pointer flex items-center space-x-2 px-4 py-2 bg-gray-100 dark:bg-slate-800 hover:bg-emerald-50 dark:hover:bg-emerald-900/30 rounded-xl transition-all duration-300 hover:scale-105 active:scale-95 border border-transparent hover:border-emerald-200 dark:hover:border-emerald-800 group"
                                >
                                    <LogOut className="w-4 h-4 text-gray-700 dark:text-gray-300 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors duration-300" />
                                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors duration-300">
                                        Logout
                                    </span>
                                </button>
                            </>
                        )}
                    </div>

                    <div className='flex md:hidden'>
                        {/* Theme Toggle */}
                        <button
                            onClick={toggleTheme}
                            className="cursor-pointer relative p-2.5 rounded-xl hover:bg-gray-100 dark:hover:bg-slate-800 transition-all duration-300 hover:scale-110 active:scale-95 group"
                            aria-label="Toggle theme"
                        >
                            {theme ? (
                                <Sun className="w-5 h-5 text-gray-300 transition-transform duration-300 group-hover:rotate-90" />
                            ) : (
                                <Moon className="w-5 h-5 text-gray-700 dark:text-gray-300 transition-transform duration-300 group-hover:rotate-12" />
                            )}
                        </button>

                        {/* Mobile Menu Button */}
                        {user && (
                            <motion.button
                                whileTap={{ scale: 0.9 }}
                                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                                className="p-2.5 rounded-xl hover:bg-gray-100 dark:hover:bg-slate-800 transition-all duration-300"
                                aria-label="Toggle mobile menu"
                            >
                                <AnimatePresence mode="wait">
                                    {isMobileMenuOpen ? (
                                        <motion.div
                                            key="close"
                                            initial={{ rotate: -90, opacity: 0 }}
                                            animate={{ rotate: 0, opacity: 1 }}
                                            exit={{ rotate: 90, opacity: 0 }}
                                            transition={{ duration: 0.2 }}
                                        >
                                            <X className="w-6 h-6 text-gray-700 dark:text-gray-300" />
                                        </motion.div>
                                    ) : (
                                        <motion.div
                                            key="menu"
                                            initial={{ rotate: 90, opacity: 0 }}
                                            animate={{ rotate: 0, opacity: 1 }}
                                            exit={{ rotate: -90, opacity: 0 }}
                                            transition={{ duration: 0.2 }}
                                        >
                                            <Menu className="w-6 h-6 text-gray-700 dark:text-gray-300" />
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.button>
                        )}
                    </div>
                </div>
            </div>

            {/* Mobile Dropdown Menu */}
            <AnimatePresence>
                {isMobileMenuOpen && user && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="md:hidden overflow-hidden border-t border-gray-200 dark:border-slate-700"
                    >
                        <motion.div
                            initial={{ y: -20 }}
                            animate={{ y: 0 }}
                            exit={{ y: -20 }}
                            transition={{ duration: 0.3 }}
                            className="px-4 py-4 space-y-3 transition-colors duration-700 bg-gray-50 dark:bg-slate-800/50"
                        >
                            {/* Theme Toggle Mobile */}
                            {/* <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={toggleTheme}
                                className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl bg-white dark:bg-slate-800 hover:bg-gray-100 dark:hover:bg-slate-700 transition-all duration-300 border border-gray-200 dark:border-slate-600"
                            >
                                {theme ? (
                                    <>
                                        <Sun className="w-5 h-5 text-gray-700 dark:text-gray-300" />
                                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                            Light Mode
                                        </span>
                                    </>
                                ) : (
                                    <>
                                        <Moon className="w-5 h-5 text-gray-700 dark:text-gray-300" />
                                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                            Dark Mode
                                        </span>
                                    </>
                                )}
                            </motion.button> */}

                            {/* Settings Mobile */}
                            <motion.div
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                <Link
                                    to="/settings"
                                    onClick={closeMobileMenu}
                                    className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl bg-white dark:bg-slate-800 hover:bg-gray-100 dark:hover:bg-slate-700 transition-all duration-300 border border-gray-200 dark:border-slate-600"
                                >
                                    <Settings className="w-5 h-5 text-gray-700 dark:text-gray-300" />
                                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Settings
                                    </span>
                                </Link>
                            </motion.div>

                            {/* Logout Mobile */}
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={handleLogout}
                                className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl bg-emerald-50 dark:bg-emerald-900/30 hover:bg-emerald-100 dark:hover:bg-emerald-900/50 transition-all duration-300 border border-emerald-200 dark:border-emerald-800"
                            >
                                <LogOut className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                                <span className="text-sm font-medium text-emerald-600 dark:text-emerald-400">
                                    Logout
                                </span>
                            </motion.button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;