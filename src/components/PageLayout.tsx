import { motion } from 'framer-motion';
import { GridOverlay } from './GridOverlay';

interface PageLayoutProps {
  children: React.ReactNode;
  className?: string;
}

export const PageLayout = ({ children, className = '' }: PageLayoutProps) => {
  return (
    <div className={`min-h-screen bg-white dark:bg-black text-black dark:text-white relative font-space-grotesk transition-colors duration-300 ${className}`}>
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
