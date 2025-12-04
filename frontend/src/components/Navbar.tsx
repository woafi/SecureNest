import React from 'react'
import { Shield, Moon, Sun } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';


const Navbar: React.FC = () => {
    const { theme, toggleTheme } = useTheme();

    return (
        <nav className='sticky border-b border-gray-200 dark:border-slate-700 transition-colors duration-700 top-0 z-50 backdrop-blur-sm bg-opacity-90 mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16 bg-white dark:bg-slate-900'>
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2">
                <Shield className="w-8 h-8 transition-colors duration-700 text-lime-600 dark:text-lime-400" />
                <span className="text-2xl font-bold transition-colors duration-700 bg-gradient-to-r from-lime-600 dark:from-lime-400 to-emerald-600 bg-clip-text text-transparent">
                    SecureNest
                </span>
            </Link>

            {/* Actions */}
            <div className="flex items-center space-x-4">
                {/* Theme Toggle */}
                <button
                    onClick={toggleTheme}
                    className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors"
                    aria-label="Toggle theme"
                >
                    {theme ? (
                        <Sun className="w-5 h-5 text-gray-300" />
                    ) : (
                        <Moon className="w-5 h-5 transition-colors duration-700 text-gray-700 dark:text-gray-300" />    
                    )}
                </button>

            </div>
        </nav>
    )
}

export default Navbar;
