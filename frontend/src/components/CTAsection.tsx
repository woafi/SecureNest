import React from 'react'
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const CTAsection: React.FC = () => {
  return (
    <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.3 }}
          className="mt-32 text-center bg-gradient-to-r from-green-500 to-emerald-600 rounded-3xl p-12 shadow-2xl"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
            Ready to secure your digital life?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of users who trust SecureNest with their passwords
          </p>
          <Link
            to="/register"
            className="inline-block bg-white text-primary-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transform hover:scale-105 transition-all shadow-lg"
          >
            Create Free Account
          </Link>
        </motion.div>
  )
}

export default CTAsection;
