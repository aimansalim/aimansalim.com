import React from 'react';

interface StatusIndicatorProps {
  className?: string;
}

export const StatusIndicator = ({ className = "" }: StatusIndicatorProps) => {
  return (
    <div className={`w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse ${className}`} />
  );
};
