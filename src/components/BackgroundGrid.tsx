import React, { useEffect, useState } from 'react';

export const BackgroundGrid = () => {
  const [dots, setDots] = useState<Array<{ x: number; y: number; delay: number; size: number }>>([]);

  useEffect(() => {
    const generateDots = () => {
      const newDots = [];
      const gridSize = 40;
      const cols = Math.floor(window.innerWidth / gridSize);
      const rows = Math.floor(window.innerHeight / gridSize);

      for (let i = 0; i < 150; i++) {
        const x = Math.floor(Math.random() * cols) * gridSize;
        const y = Math.floor(Math.random() * rows) * gridSize;
        newDots.push({
          x,
          y,
          delay: Math.random() * 4,
          size: Math.random() * 1 + 1
        });
      }
      setDots(newDots);
    };

    generateDots();
    window.addEventListener('resize', generateDots);
    return () => window.removeEventListener('resize', generateDots);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none">
      {/* Grid Pattern */}
      <div 
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `
            linear-gradient(to right, var(--grid-color) 1px, transparent 1px),
            linear-gradient(to bottom, var(--grid-color) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
          '--grid-color': 'var(--text-color)'
        } as React.CSSProperties}
      />

      {/* Radial Gradient */}
      <div className="absolute inset-0 bg-gradient-radial from-white/5 dark:from-black/5 via-transparent to-transparent" />

      {dots.map((dot, i) => (
        <div
          key={i}
          className="absolute rounded-full bg-white/20 animate-pulse-slow"
          style={{
            left: `${dot.x}px`,
            top: `${dot.y}px`,
            width: `${dot.size}px`,
            height: `${dot.size}px`,
            animationDelay: `${dot.delay}s`,
            opacity: 0.1
          }}
        />
      ))}
    </div>
  );
};