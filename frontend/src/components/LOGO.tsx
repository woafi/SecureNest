import React from 'react'
import { motion } from 'framer-motion';
import { Shield } from 'lucide-react';
import { Link } from 'react-router-dom';

const LOGO: React.FC = () => {
  return (
    <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="inline-flex items-center justify-center w-20 h-20 mb-8 bg-gradient-to-br from-lime-400 to-emerald-600 rounded-2xl shadow-lg"
          >
            <Shield className="w-12 h-12 text-white" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-5xl md:text-7xl font-extrabold mb-6"
          >
            <span className="bg-gradient-to-r from-lime-500 dark:from-lime-400 via-green-600 to-emerald-600 bg-clip-text text-transparent">
              Your Passwords,
            </span>
            <br />
            <span className="text-gray-900 dark:text-white">Perfectly Secured</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-xl font-semibold text-gray-600 dark:text-gray-300 mb-12 max-w-2xl mx-auto"
          >
            SecureNest is a modern, beautiful password manager built with military-grade
            encryption. Secure your digital life with confidence.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link
              to="/register"
              className="text-gray-600 dark:text-gray-300 dark:bg-slate-800 rounded-lg px-8 py-4 text-lg shadow-lg hover:shadow-xl transition-all ease-in-out transform hover:-translate-y-1 font-bold"
            >
              Get Started Free
            </Link>
            <Link
              to="/login"
              className="text-gray-600 dark:text-gray-300 dark:bg-slate-800 rounded-lg px-8 py-4 text-lg shadow-lg hover:shadow-xl transition-all ease-in-out transform hover:-translate-y-1 font-bold"
            >
              Sign In
            </Link>
          </motion.div>
        </motion.div>
  )
}

export default LOGO;
