"use client";

import { motion } from "framer-motion";
import { Bell, Search, Settings, LogOut } from "lucide-react";
import { useState } from "react";

interface TopNavbarProps {
  userName: string;
  notifications?: number;
}

export const TopNavbar: React.FC<TopNavbarProps> = ({
  userName,
  notifications = 3,
}) => {
  const [searchFocused, setSearchFocused] = useState(false);

  return (
    <motion.div
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="fixed top-0 left-64 right-0 h-16 bg-gray-900/30 backdrop-blur-md border-b border-gray-800/50 z-30"
    >
      <div className="h-full px-6 flex items-center justify-between">
        {/* Search Bar */}
        <div className="flex-1 max-w-xl">
          <motion.div
            className={`
              flex items-center gap-3 px-4 py-2 rounded-lg
              bg-gray-800/30 border transition-all duration-300
              ${searchFocused ? "border-primary/50 shadow-lg shadow-primary/20" : "border-gray-700/50"}
            `}
            whileHover={{ scale: 1.01 }}
          >
            <Search className="w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search markets, assets, or signals..."
              className="flex-1 bg-transparent text-sm text-white placeholder:text-gray-500 outline-none"
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setSearchFocused(false)}
            />
            <kbd className="hidden sm:inline-flex items-center px-2 py-1 text-xs font-mono text-gray-400 bg-gray-800/50 rounded">
              ⌘K
            </kbd>
          </motion.div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">
          {/* Notifications */}
          <motion.button
            className="relative p-2 rounded-lg bg-gray-800/30 hover:bg-gray-800/50 border border-gray-700/50 transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Bell className="w-5 h-5 text-gray-400" />
            {notifications > 0 && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-1 -right-1 w-5 h-5 bg-accent text-white text-xs font-bold rounded-full flex items-center justify-center"
              >
                {notifications}
              </motion.span>
            )}
          </motion.button>

          {/* Settings */}
          <motion.button
            className="p-2 rounded-lg bg-gray-800/30 hover:bg-gray-800/50 border border-gray-700/50 transition-all duration-300"
            whileHover={{ scale: 1.05, rotate: 90 }}
            whileTap={{ scale: 0.95 }}
          >
            <Settings className="w-5 h-5 text-gray-400" />
          </motion.button>

          {/* Logout */}
          <motion.button
            className="p-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 border border-red-500/50 transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <LogOut className="w-5 h-5 text-red-400" />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};
