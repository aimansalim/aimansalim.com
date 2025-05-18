import React from 'react';
import { motion } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

export const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <motion.button
      onClick={toggleTheme}
      className="relative w-10 h-10 rounded-full border border-white/10 bg-black/80 backdrop-blur-sm hover:border-white/20 transition-colors"
      whileTap={{ scale: 0.95 }}
      animate={{ rotate: theme === 'dark' ? 0 : 180 }}
      transition={{ duration: 0.5, ease: 'easeInOut' }}
    >
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          initial={false}
          animate={{ 
            opacity: theme === 'dark' ? 1 : 0,
            scale: theme === 'dark' ? 1 : 0.5
          }}
          transition={{ duration: 0.2 }}
        >
          <Moon className="w-4 h-4 text-white/60" />
        </motion.div>
        <motion.div
          initial={false}
          animate={{ 
            opacity: theme === 'light' ? 1 : 0,
            scale: theme === 'light' ? 1 : 0.5
          }}
          transition={{ duration: 0.2 }}
        >
          <Sun className="w-4 h-4 text-white/60" />
        </motion.div>
      </div>
    </motion.button>
  );
}; 