import React from 'react';
import { motion } from 'framer-motion';

interface ModernButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  href?: string;
  variant?: 'primary' | 'secondary' | 'glass';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  disabled?: boolean;
  glowEffect?: boolean;
}

export const ModernButton: React.FC<ModernButtonProps> = ({
  children,
  onClick,
  href,
  variant = 'primary',
  size = 'md',
  className = '',
  disabled = false,
  glowEffect = false,
}) => {
  const baseClasses = 'relative inline-flex items-center justify-center font-medium transition-all duration-300 focus-ring rounded-sm overflow-hidden';
  
  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };
  
  const variantClasses = {
    primary: 'bg-white text-black hover:bg-gray-100 hover:shadow-lg',
    secondary: 'bg-transparent text-white border border-white/20 hover:bg-white/5 hover:border-white/40',
    glass: 'glass glass-hover text-white',
  };
  
  const glowClasses = glowEffect ? 'animate-glow' : '';
  
  const combinedClasses = `${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${glowClasses} ${className}`;
  
  const buttonContent = (
    <>
      {/* Shimmer effect overlay */}
      <div className="absolute inset-0 shimmer opacity-0 hover:opacity-100 transition-opacity duration-300" />
      
      {/* Content */}
      <span className="relative z-10 flex items-center space-x-2">
        {children}
      </span>
    </>
  );
  
  if (href) {
    return (
      <motion.a
        href={href}
        className={combinedClasses}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
      >
        {buttonContent}
      </motion.a>
    );
  }
  
  return (
    <motion.button
      onClick={onClick}
      disabled={disabled}
      className={`${combinedClasses} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
      whileHover={disabled ? {} : { scale: 1.02 }}
      whileTap={disabled ? {} : { scale: 0.98 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
    >
      {buttonContent}
    </motion.button>
  );
}; 