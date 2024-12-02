import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

export const NavigationBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 lg:px-8 py-4">
      <div className="max-w-7xl mx-auto">
        {/* Floating Navigation Container */}
        <div className="relative border border-white/10 bg-black">
          {/* Corner Decorations */}
          <div className="absolute top-0 left-0 h-4 w-4 border-t border-l border-white/20" />
          <div className="absolute top-0 right-0 h-4 w-4 border-t border-r border-white/20" />
          <div className="absolute bottom-0 left-0 h-4 w-4 border-b border-l border-white/20" />
          <div className="absolute bottom-0 right-0 h-4 w-4 border-b border-r border-white/20" />

          <div className="px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              {/* Logo/Home Link */}
              <Link 
                to="/" 
                className="text-white font-space-grotesk text-lg tracking-wider hover:text-emerald-500 transition-colors"
              >
                AIMAN SALIM
              </Link>

              {/* Desktop Navigation */}
              <div className="hidden md:flex items-center space-x-8">
                <Link 
                  to="/projects/unispot" 
                  className={`text-sm font-space-grotesk tracking-wider ${isActive('/projects/unispot') ? 'text-emerald-500' : 'text-white/60 hover:text-white'}`}
                >
                  UNISPOT
                </Link>
                <Link 
                  to="/projects/design" 
                  className={`text-sm font-space-grotesk tracking-wider ${isActive('/projects/design') ? 'text-emerald-500' : 'text-white/60 hover:text-white'}`}
                >
                  DESIGN
                </Link>
                <Link 
                  to="/contact" 
                  className={`text-sm font-space-grotesk tracking-wider ${isActive('/contact') ? 'text-emerald-500' : 'text-white/60 hover:text-white'}`}
                >
                  CONTACT
                </Link>
              </div>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="md:hidden relative z-50 w-8 h-8 flex items-center justify-center border border-white/10"
              >
                <div className="flex flex-col items-center justify-center gap-1">
                  <div className={`w-4 h-px bg-white transform transition-transform ${isOpen ? 'rotate-45 translate-y-0.5' : ''}`} />
                  <div className={`w-4 h-px bg-white transition-opacity ${isOpen ? 'opacity-0' : ''}`} />
                  <div className={`w-4 h-px bg-white transform transition-transform ${isOpen ? '-rotate-45 -translate-y-1' : ''}`} />
                </div>
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          <div 
            className={`md:hidden absolute top-full left-0 right-0 border-t border-white/10 bg-black transform transition-transform duration-200 ease-in-out ${isOpen ? 'translate-y-0' : '-translate-y-full'}`}
          >
            <div className="px-4 py-4 space-y-4">
              <Link 
                to="/projects/unispot" 
                className={`block text-sm font-space-grotesk tracking-wider ${isActive('/projects/unispot') ? 'text-emerald-500' : 'text-white/60'}`}
                onClick={() => setIsOpen(false)}
              >
                UNISPOT
              </Link>
              <Link 
                to="/projects/design" 
                className={`block text-sm font-space-grotesk tracking-wider ${isActive('/projects/design') ? 'text-emerald-500' : 'text-white/60'}`}
                onClick={() => setIsOpen(false)}
              >
                DESIGN
              </Link>
              <Link 
                to="/contact" 
                className={`block text-sm font-space-grotesk tracking-wider ${isActive('/contact') ? 'text-emerald-500' : 'text-white/60'}`}
                onClick={() => setIsOpen(false)}
              >
                CONTACT
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};
