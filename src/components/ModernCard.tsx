import React from 'react';
import { motion } from 'framer-motion';

interface ModernCardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  glow?: boolean;
  glass?: boolean;
  onClick?: () => void;
  href?: string;
}

export const ModernCard: React.FC<ModernCardProps> = ({
  children,
  className = '',
  hover = true,
  glow = false,
  glass = false,
  onClick,
  href,
}) => {
  const baseClasses = 'relative overflow-hidden transition-all duration-300';
  const glassClasses = glass ? 'glass' : 'bg-black border border-white/10';
  const hoverClasses = hover ? 'hover:transform hover:scale-[1.02] hover:shadow-2xl' : '';
  const glowClasses = glow ? 'animate-glow' : '';
  const interactiveClasses = (onClick || href) ? 'cursor-pointer' : '';
  
  const combinedClasses = `${baseClasses} ${glassClasses} ${hoverClasses} ${glowClasses} ${interactiveClasses} ${className}`;
  
  const cardContent = (
    <>
      {/* Gradient overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
      
      {/* Shimmer effect */}
      {hover && (
        <div className="absolute inset-0 shimmer opacity-0 hover:opacity-100 transition-opacity duration-500" />
      )}
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </>
  );
  
  if (href) {
    return (
      <motion.a
        href={href}
        className={combinedClasses}
        whileHover={hover ? { y: -4 } : {}}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        {cardContent}
      </motion.a>
    );
  }
  
  if (onClick) {
    return (
      <motion.div
        onClick={onClick}
        className={combinedClasses}
        whileHover={hover ? { y: -4 } : {}}
        whileTap={{ scale: 0.98 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        {cardContent}
      </motion.div>
    );
  }
  
  return (
    <motion.div
      className={combinedClasses}
      whileHover={hover ? { y: -4 } : {}}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      {cardContent}
    </motion.div>
  );
}; 