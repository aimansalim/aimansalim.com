import React, { useState, useEffect } from 'react';
// @ts-ignore
import { Helmet } from 'react-helmet';
import { quotes } from '../data/quotes';

export default function QuotesPage() {
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  // Function to advance to next quote
  const nextQuote = () => {
    if (!isTransitioning) {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentQuoteIndex((prevIndex) => (prevIndex + 1) % quotes.length);
        setIsTransitioning(false);
      }, 500);
    }
  };
  
  // Function to go to previous quote
  const prevQuote = () => {
    if (!isTransitioning) {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentQuoteIndex((prevIndex) => 
          prevIndex === 0 ? quotes.length - 1 : prevIndex - 1
        );
        setIsTransitioning(false);
      }, 500);
    }
  };
  
  // Update mouse position for the light effect
  const handleMouseMove = (e: React.MouseEvent) => {
    setMousePosition({
      x: e.clientX,
      y: e.clientY
    });
  };
  
  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowRight':
        case ' ':
        case 'Enter':
          nextQuote();
          break;
        case 'ArrowLeft':
          prevQuote();
          break;
        default:
          break;
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isTransitioning]);
  
  // Auto-cycle quotes every 10 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      nextQuote();
    }, 10000);
    
    return () => clearInterval(interval);
  }, [isTransitioning]);
  
  return (
    <>
      <Helmet>
        <title>Quotes | Aiman Salim</title>
        <meta name="description" content="Inspirational quotes" />
      </Helmet>
      
      <div 
        className="min-h-screen flex flex-col items-center justify-center bg-black text-white cursor-pointer relative overflow-hidden"
        onClick={nextQuote}
        onMouseMove={handleMouseMove}
      >
        {/* Subtle radial gradient background that follows mouse */}
        <div 
          className="absolute w-[40vw] h-[40vw] rounded-full opacity-[0.07] pointer-events-none bg-gradient-radial from-white via-white/50 to-transparent blur-xl transition-all duration-1000 ease-out"
          style={{
            left: `${mousePosition.x - 400}px`,
            top: `${mousePosition.y - 400}px`,
          }}
        />
        
        <div className="max-w-4xl w-full px-4 sm:px-6 z-10">
          <div className="text-center">
            <div className={`transition-opacity duration-500 ease-in-out ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}>
              <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-mono tracking-wide leading-relaxed text-white max-w-3xl mx-auto whitespace-pre-line p-4 sm:py-6">
                {quotes[currentQuoteIndex]}
              </p>
            </div>
          </div>
        </div>
        
        {/* Subtle grid background */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="h-full w-full grid grid-cols-[repeat(20,1fr)] grid-rows-[repeat(20,1fr)]">
            {Array.from({ length: 21 }).map((_, i) => (
              <div key={`h-${i}`} className="absolute left-0 right-0 h-px bg-white/20" style={{ top: `${(i * 5)}%` }} />
            ))}
            {Array.from({ length: 21 }).map((_, i) => (
              <div key={`v-${i}`} className="absolute top-0 bottom-0 w-px bg-white/20" style={{ left: `${(i * 5)}%` }} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
} 