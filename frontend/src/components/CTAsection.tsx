import React from 'react'
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const CTAsection: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, delay: 1.3, type: "spring", bounce: 0.4 }}
      className="mt-32 text-center bg-linear-to-r from-emerald-600 via-teal-600 to-cyan-600 dark:from-emerald-500 dark:via-teal-500 dark:to-cyan-500 rounded-3xl p-12 md:p-16 shadow-2xl shadow-emerald-500/30 relative overflow-hidden"
    >
      {/* Animated background elements */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"
      />
      <motion.div
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1
        }}
        className="absolute bottom-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"
      />

      <div className="relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4 }}
          className="text-3xl md:text-5xl font-bold text-white mb-6"
        >
          Ready to secure your digital life?
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5 }}
          className="text-xl text-emerald-50 mb-10 max-w-2xl mx-auto leading-relaxed"
        >
          Join thousands of users who trust SecureNest with their passwords
        </motion.p>
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Link
            to="/register"
            className="inline-block bg-white text-emerald-600 px-10 py-4 rounded-xl font-bold text-lg hover:bg-gray-50 transition-all shadow-xl hover:shadow-2xl"
          >
            Create Free Account
          </Link>
        </motion.div>
      </div>
    </motion.div>
  )
}

export default CTAsection;
