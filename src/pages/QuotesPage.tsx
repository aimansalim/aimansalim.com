import React, { useState, useEffect, useRef } from 'react';
// @ts-ignore
import { Helmet } from 'react-helmet';
import { quotes } from '../data/quotes';
import html2canvas from 'html2canvas';

export default function QuotesPage() {
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isDownloading, setIsDownloading] = useState(false);
  const quoteRef = useRef<HTMLDivElement>(null);
  
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
  
  // Handle download quote image
  const downloadQuote = async () => {
    if (!quoteRef.current) return;
    
    setIsDownloading(true);
    
    try {
      // Create a full-screen version for download
      const container = document.createElement('div');
      container.style.width = '1200px';
      container.style.height = '1600px';
      container.style.backgroundColor = 'black';
      container.style.position = 'absolute';
      container.style.left = '-9999px';
      container.style.display = 'flex';
      container.style.alignItems = 'center';
      container.style.justifyContent = 'center';
      
      const content = document.createElement('p');
      content.style.fontFamily = '"Times New Roman MT Condensed", "Times New Roman", serif';
      content.style.color = 'white';
      content.style.fontSize = '34px';
      content.style.textAlign = 'center';
      content.style.padding = '15%';
      content.style.letterSpacing = '-0.4em';
      content.style.lineHeight = '1.15';
      content.textContent = quotes[currentQuoteIndex];
      
      container.appendChild(content);
      document.body.appendChild(container);
      
      const canvas = await html2canvas(container, {
        backgroundColor: '#000000',
        scale: 1.5,
        logging: false,
        allowTaint: true,
        useCORS: true
      });
      
      document.body.removeChild(container);
      
      const image = canvas.toDataURL('image/jpeg', 0.95);
      const link = document.createElement('a');
      link.href = image;
      link.download = 'quote.jpg';
      link.click();
    } catch (error) {
      console.error('Error generating image:', error);
    } finally {
      setIsDownloading(false);
    }
  };
  
  // Handle touch events for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    const touchX = e.touches[0].clientX;
    const windowWidth = window.innerWidth;
    
    // Store the initial touch position
    const touchStartX = touchX;
    
    const handleTouchEnd = (e: TouchEvent) => {
      const touchEndX = e.changedTouches[0].clientX;
      const diffX = touchEndX - touchStartX;
      
      // Swipe left (next quote)
      if (diffX < -50) {
        nextQuote();
      }
      // Swipe right (previous quote)
      else if (diffX > 50) {
        prevQuote();
      }
      // Tap (next quote)
      else if (Math.abs(diffX) < 10) {
        nextQuote();
      }
      
      document.removeEventListener('touchend', handleTouchEnd);
    };
    
    document.addEventListener('touchend', handleTouchEnd, { once: true });
  };
  
  return (
    <>
      <Helmet>
        <title>Quotes | Aiman Salim</title>
        <meta name="description" content="Inspirational quotes" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
      </Helmet>
      
      <div 
        className="min-h-screen flex flex-col items-center justify-center bg-black text-white cursor-pointer relative overflow-hidden"
        onClick={nextQuote}
        onMouseMove={handleMouseMove}
        onTouchStart={handleTouchStart}
      >
        {/* Subtle radial gradient background that follows mouse */}
        <div 
          className="absolute w-[40vw] h-[40vw] rounded-full opacity-[0.07] pointer-events-none bg-gradient-radial from-white via-white/50 to-transparent blur-xl transition-all duration-1000 ease-out"
          style={{
            left: `${mousePosition.x - 400}px`,
            top: `${mousePosition.y - 400}px`,
          }}
        />
        
        <div className="max-w-4xl w-full px-4 sm:px-6 md:px-8 lg:px-12 z-10">
          <div className="text-center">
            <div className={`transition-opacity duration-500 ease-in-out ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}>
              <div
                ref={quoteRef}
                className="w-full max-w-4xl mx-auto relative py-8 md:py-12"
              >
                <p className="font-condensed text-white leading-[1.15] text-center px-4"
                   style={{ 
                     letterSpacing: '-0.04em', 
                     lineHeight: '1.15',
                     fontSize: 'clamp(28px, 4.5vw, 54px)',
                     maxWidth: '100%',
                     overflowWrap: 'break-word',
                     wordBreak: 'keep-all'
                   }}>
                  {quotes[currentQuoteIndex]}
                </p>
                
                {/* Minimal download button */}
                <div 
                  className="absolute bottom-0 right-0 p-2 cursor-pointer opacity-0 hover:opacity-70 transition-opacity"
                  onClick={(e) => {
                    e.stopPropagation();
                    downloadQuote();
                  }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="7 10 12 15 17 10" />
                    <line x1="12" y1="15" x2="12" y2="3" />
                  </svg>
                </div>
              </div>
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