import { motion } from 'framer-motion';
import { GridOverlay } from './GridOverlay';
import { ReactNode } from 'react';

interface PageLayoutProps {
  children: ReactNode;
  className?: string;
}

export const PageLayout = ({ children, className = '' }: PageLayoutProps) => {
  return (
    <div className={`min-h-screen bg-black text-white relative font-space-grotesk ${className}`}>
      {/* Grid Overlay */}
      <GridOverlay />
      
      {/* Content */}
      <motion.div
        className="relative z-10 pt-24 px-8 pb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {children}
      </motion.div>
    </div>
  );
};
