import { motion } from "framer-motion";
import { Search, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function SearchAddPassword({ searchQuery, setSearchQuery }: { searchQuery: string; setSearchQuery: (query: string) => void }) {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1, type: "spring", bounce: 0.4 }}
      className="flex flex-col sm:flex-row gap-4 mb-8"
    >
      <div className="flex-1 relative group">
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 group-hover:text-emerald-500 transition-colors duration-300" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search passwords..."
          className="w-full pl-12 pr-4 py-3 bg-white dark:bg-slate-800 border-2 border-gray-200 dark:border-slate-700 rounded-xl focus:border-emerald-500 dark:focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 dark:focus:ring-emerald-900/30 outline-none transition-all duration-300 text-gray-900 dark:text-white placeholder-gray-400 shadow-sm hover:shadow-md"
        />
      </div>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => navigate("/add-password")}
        className="cursor-pointer flex items-center justify-center space-x-2 px-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 dark:from-emerald-500 dark:to-teal-500 dark:hover:from-emerald-600 dark:hover:to-teal-600 text-white rounded-xl font-semibold shadow-lg shadow-emerald-500/30 hover:shadow-xl hover:shadow-emerald-500/40 transition-all duration-300 whitespace-nowrap"
      >
        <Plus className="w-5 h-5" />
        <span>Add Password</span>
      </motion.button>
    </motion.div>
  );
}
