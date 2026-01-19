import React from 'react'
import { motion } from 'framer-motion';

const DashboardHeader: React.FC = () => {
    return (
        <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, type: "spring", bounce: 0.4 }}
            className="mb-8 select-none"
        >
            <h1 className="text-5xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent mb-2">
                Password <span>Vault</span>
            </h1>
            <p className="text-gray-600 dark:text-gray-400 text-lg">
                Manage your passwords securely in one place
            </p>
        </motion.div>
    )
}

export default DashboardHeader;
