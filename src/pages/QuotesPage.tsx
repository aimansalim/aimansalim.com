import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const quotes = [
  "Bury yourself in the work if you want to live forever.",
  "Legacy is underrated. Immortality is underrated.",
  "Building something that lasts forever— is forgotten, ignored, yet possible.",
  "Through extreme commitment to a mission bigger than yourself.",
  "Your name will live on the moment you forget yourself.",
  "The work comes first. You are just a vehicle for it.",
  "Your entire existence gets filtered down to one output.",
  "It is a beautiful, simple, impossible act of devotion.",
  "It's selfish, and selfless.",
  "To put every ounce of your soul into your cause.",
  "To give your life to something outside yourself,",
  "That makes other people's lives better.",
  "Forever is rare.",
  "Forever is worth chasing.",
  "Great work is done by people who are not afraid to be great.",
  "Create what you wish existed.",
  "Don't wait for permission.",
  "The more you create, the more you discover who you are.",
  "Ideas are worthless until you get them out of your head.",
  "Don't worry about failure. You only have to be right once.",
  "Make the things you wish existed in the world.",
  "Done is better than perfect.",
  "Be the designer of your own destiny."
];

const QuotesPage: React.FC = () => {
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    // Automatically cycle through quotes
    const interval = setInterval(() => {
      if (!isHovered) {
        setIsFading(true);
        setTimeout(() => {
          setCurrentQuoteIndex((prevIndex) => (prevIndex + 1) % quotes.length);
          setIsFading(false);
        }, 500);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [isHovered]);

  const handleMouseMove = (e: React.MouseEvent) => {
    setMousePosition({ x: e.clientX, y: e.clientY });
  };

  const handleClick = () => {
    setIsFading(true);
    setTimeout(() => {
      setCurrentQuoteIndex((prevIndex) => (prevIndex + 1) % quotes.length);
      setIsFading(false);
    }, 500);
  };

  return (
    <div 
      className="min-h-screen bg-black text-white flex items-center justify-center relative overflow-hidden"
      onMouseMove={handleMouseMove}
      onClick={handleClick}
    >
      {/* Subtle background grid */}
      <div className="absolute inset-0 grid grid-cols-[repeat(40,1fr)] grid-rows-[repeat(40,1fr)] opacity-10 pointer-events-none">
        {Array.from({ length: 41 }).map((_, i) => (
          <div key={`h-${i}`} className="absolute left-0 right-0 h-px bg-white/20" style={{ top: `${(i * 2.5)}%` }} />
        ))}
        {Array.from({ length: 41 }).map((_, i) => (
          <div key={`v-${i}`} className="absolute top-0 bottom-0 w-px bg-white/20" style={{ left: `${(i * 2.5)}%` }} />
        ))}
      </div>
      
      {/* Custom cursor */}
      {isHovered && (
        <div 
          className="fixed w-20 h-20 rounded-full bg-white/5 backdrop-blur-sm pointer-events-none z-10 transition-transform duration-100" 
          style={{ 
            left: mousePosition.x - 40, 
            top: mousePosition.y - 40,
            transform: 'translate(0, 0)'
          }}
        />
      )}

      {/* Centered quote */}
      <motion.div
        className="max-w-xl px-6 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: isFading ? 0 : 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.p 
          className="font-times text-3xl leading-tight tracking-tight cursor-none"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {quotes[currentQuoteIndex]}
        </motion.p>
      </motion.div>
    </div>
  );
};

export default QuotesPage; 