import React from 'react';
import { motion } from 'framer-motion';
import { Edit, Trash2 } from 'lucide-react';

interface PasswordHeaderProps {
    isEditing: boolean;
    passwordTitle?: string;
    onEdit: () => void;
    onDelete: () => void;
}

const PasswordHeader: React.FC<PasswordHeaderProps> = ({
    isEditing,
    passwordTitle,
    onEdit,
    onDelete
}) => {
    return (
        <div className="flex items-center justify-between">
            <div>
                <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent mb-2">
                    {isEditing ? 'Edit Password' : passwordTitle}
                </h1>
                <p className="text-gray-600 dark:text-gray-400 text-lg">
                    {isEditing ? 'Update your password details' : 'View and manage password'}
                </p>
            </div>

            {/* Action buttons (only in view mode) */}
            {!isEditing && (
                <div className="flex space-x-2">
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={onEdit}
                        className="cursor-pointer flex items-center space-x-2 px-4 py-2 bg-gray-100 dark:bg-slate-700 hover:bg-emerald-50 dark:hover:bg-emerald-900/30 text-gray-700 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400 rounded-xl font-medium transition-all duration-300 border-2 border-transparent hover:border-emerald-200 dark:hover:border-emerald-800"
                    >
                        <Edit className="w-4 h-4" />
                        <span>Edit</span>
                    </motion.button>
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={onDelete}
                        className="cursor-pointer p-3 bg-red-50 dark:bg-red-900/20 hover:bg-red-100 dark:hover:bg-red-900/40 text-red-600 dark:text-red-400 rounded-xl transition-all duration-300 border-2 border-transparent hover:border-red-200 dark:hover:border-red-800"
                    >
                        <Trash2 className="w-4 h-4" />
                    </motion.button>
                </div>
            )}
        </div>
    );
};

export default PasswordHeader;