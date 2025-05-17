import React, { useState, useEffect, useRef } from 'react';
// @ts-ignore
import { Helmet } from 'react-helmet';
import { quotes } from '../data/quotes';
import html2canvas from 'html2canvas';

export default function QuotesPage() {
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isEditing, setIsEditing] = useState(false);
  const [editableText, setEditableText] = useState('');
  const [padding, setPadding] = useState(16);
  const quoteRef = useRef<HTMLDivElement>(null);
  const downloadRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  
  // Function to advance to next quote
  const nextQuote = () => {
    if (!isTransitioning && !isEditing) {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentQuoteIndex((prevIndex) => (prevIndex + 1) % quotes.length);
        setIsTransitioning(false);
      }, 500);
    }
  };
  
  // Function to go to previous quote
  const prevQuote = () => {
    if (!isTransitioning && !isEditing) {
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
      if (isEditing) return;
      
      switch (e.key) {
        case 'ArrowRight':
        case ' ':
        case 'Enter':
          nextQuote();
          break;
        case 'ArrowLeft':
          prevQuote();
          break;
        case 'e':
        case 'E':
          // Easter egg to enable editing mode
          handleQuoteClick();
          break;
        default:
          break;
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isTransitioning, isEditing]);
  
  // Auto-cycle quotes every 10 seconds if not editing
  useEffect(() => {
    if (isEditing) return;
    
    const interval = setInterval(() => {
      nextQuote();
    }, 10000);
    
    return () => clearInterval(interval);
  }, [isTransitioning, isEditing]);
  
  useEffect(() => {
    // Update editable text when current quote changes
    setEditableText(quotes[currentQuoteIndex]);
  }, [currentQuoteIndex]);
  
  // Handle download quote image
  const downloadQuote = async () => {
    if (!downloadRef.current) return;
    
    try {
      const canvas = await html2canvas(downloadRef.current, {
        backgroundColor: '#000000',
        scale: 3, // Higher resolution
        logging: false,
        allowTaint: true,
        useCORS: true
      });
      
      const image = canvas.toDataURL('image/jpeg', 0.95);
      const link = document.createElement('a');
      link.href = image;
      link.download = 'quote.jpg';
      link.click();
    } catch (error) {
      console.error('Error generating image:', error);
    }
  };
  
  // Handle quote click to toggle edit mode
  const handleQuoteClick = () => {
    if (!isEditing) {
      setIsEditing(true);
      setEditableText(quotes[currentQuoteIndex]);
      
      // Focus textarea after state updates
      setTimeout(() => {
        if (textareaRef.current) {
          textareaRef.current.focus();
        }
      }, 10);
    }
  };
  
  // Handle completing edit
  const handleEditComplete = () => {
    setIsEditing(false);
  };
  
  // Handle padding change
  const handlePaddingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPadding(Number(e.target.value));
  };
  
  return (
    <>
      <Helmet>
        <title>Quotes | Aiman Salim</title>
        <meta name="description" content="Inspirational quotes" />
      </Helmet>
      
      <div 
        className="min-h-screen flex flex-col items-center justify-center bg-black text-white cursor-pointer relative overflow-hidden"
        onClick={isEditing ? undefined : nextQuote}
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
              {isEditing ? (
                <div className="flex flex-col gap-4">
                  <textarea
                    ref={textareaRef}
                    value={editableText}
                    onChange={(e) => setEditableText(e.target.value)}
                    className="w-full max-w-xl mx-auto h-64 bg-transparent text-white border border-white/10 p-4 rounded-none font-condensed tracking-[0.03em] leading-[1.25] text-center text-xl"
                    style={{ letterSpacing: '0.03em', lineHeight: '1.25' }}
                  />
                  
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-4">
                    <div className="flex items-center gap-2 w-full max-w-xs">
                      <span className="text-xs text-white/50">Padding: {padding}%</span>
                      <input
                        type="range"
                        min="5"
                        max="30"
                        value={padding}
                        onChange={handlePaddingChange}
                        className="w-full h-1 bg-gray-700 rounded-lg appearance-none cursor-pointer"
                      />
                    </div>
                    
                    <div className="flex gap-2">
                      <button 
                        onClick={downloadQuote}
                        className="px-4 py-1 bg-transparent border border-white/20 text-white/80 text-xs hover:bg-white/5"
                      >
                        Download
                      </button>
                      <button 
                        onClick={handleEditComplete}
                        className="px-4 py-1 bg-transparent border border-white/20 text-white/80 text-xs hover:bg-white/5"
                      >
                        Done
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div
                  ref={quoteRef}
                  className="w-full max-w-3xl mx-auto cursor-pointer" 
                  onClick={(e) => {
                    e.stopPropagation();
                    handleQuoteClick();
                  }}
                >
                  <p className="font-condensed text-white tracking-[0.03em] leading-[1.25] text-center text-base sm:text-lg md:text-xl lg:text-2xl px-4 py-6"
                     style={{ letterSpacing: '0.03em', lineHeight: '1.25' }}>
                    {quotes[currentQuoteIndex]}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
        
        {/* Hidden reference div for downloading */}
        <div className="hidden">
          <div 
            ref={downloadRef}
            className="bg-black w-[1200px] h-[1600px] flex items-center justify-center"
          >
            <div className="w-full h-full flex items-center justify-center" style={{ padding: `${padding}%` }}>
              <p className="font-condensed text-white tracking-[0.03em] leading-[1.25] text-center text-[64px]"
                 style={{ letterSpacing: '0.03em', lineHeight: '1.25' }}>
                {editableText || quotes[currentQuoteIndex]}
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