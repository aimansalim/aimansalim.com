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
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px]" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:160px_160px]" />
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