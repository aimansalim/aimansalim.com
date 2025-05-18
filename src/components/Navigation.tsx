import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

interface NavigationProps {
  onMenuOpen: () => void;
}

export const Navigation = ({ onMenuOpen }: NavigationProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;
  
  // Centralized navigation items for consistency
  const navigationItems = [
    { path: '/', label: 'HOME', id: '00', mobileOnly: true },
    { path: '/about', label: 'ABOUT', id: '01' },
    { path: '/projects', label: 'PROJECTS', id: '02' },
    { path: '/thumbnails', label: 'THUMBNAILS', id: '03' },
    { path: '/projects/design', label: 'DESIGN', id: '04' },
    { path: '/contact', label: 'CONTACT', id: '05', isButton: true }
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Main Navigation Container */}
        <div className="relative border border-white/10 bg-black/80 backdrop-blur-sm">
          {/* Corner Decorations */}
          <div className="absolute top-0 left-0 h-4 w-4 border-t border-l border-white/20" />
          <div className="absolute top-0 right-0 h-4 w-4 border-t border-r border-white/20" />
          <div className="absolute bottom-0 left-0 h-4 w-4 border-b border-l border-white/20" />
          <div className="absolute bottom-0 right-0 h-4 w-4 border-b border-r border-white/20" />

          <div className="px-4 py-4">
            <div className="flex items-center justify-between">
              {/* Logo/Home Link */}
              <Link 
                to="/" 
                className="text-white font-space-grotesk text-xs sm:text-sm tracking-[0.0em] hover:text-emerald-500 transition-colors"
              >
                AIMAN SALIM
              </Link>

              {/* Desktop Navigation */}
              <div className="hidden md:flex items-center space-x-8">
                {navigationItems.filter(item => !item.mobileOnly).map((item) => (
                  <Link 
                    key={item.path}
                    to={item.path} 
                    className={`text-xs sm:text-sm font-space-grotesk tracking-wider ${
                      item.isButton 
                        ? `px-3 py-1.5 border border-white/20 hover:border-white/40 transition-colors ${
                            isActive(item.path) ? 'text-emerald-500 border-emerald-500' : 'text-white/60 hover:text-white'
                          }`
                        : isActive(item.path) ? 'text-emerald-500' : 'text-white/60 hover:text-white'
                    }`}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>

              {/* Mobile Menu Button */}
              <button
                onClick={() => {
                  setIsOpen(!isOpen);
                  onMenuOpen();
                }}
                className="md:hidden relative z-50 w-10 h-10 border border-white/10 flex items-center justify-center bg-black"
                aria-label="Toggle menu"
              >
                <div className="w-5 h-5 flex flex-col justify-center items-center gap-1.5">
                  <div className={`w-full h-px bg-white transform transition-all duration-200 ${isOpen ? 'rotate-45 translate-y-1' : ''}`} />
                  <div className={`w-full h-px bg-white transform transition-all duration-200 ${isOpen ? 'opacity-0 scale-0' : ''}`} />
                  <div className={`w-full h-px bg-white transform transition-all duration-200 ${isOpen ? '-rotate-45 -translate-y-1' : ''}`} />
                </div>
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          <div 
            className={`md:hidden absolute top-full left-0 right-0 bg-black border-t border-white/10 transform transition-all duration-300 ease-in-out ${
              isOpen ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-0 pointer-events-none'
            }`}
          >
            <div className="p-4 space-y-4">
              {/* Mobile Menu Items with Military-Style Design */}
              {navigationItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className={`block relative border border-white/10 ${
                    isActive(item.path) ? 'bg-black' : 'bg-black/50'
                  }`}
                >
                  <div className="absolute top-0 left-0 h-full w-1 bg-emerald-500 transform origin-left transition-transform duration-200"
                       style={{ transform: isActive(item.path) ? 'scaleX(1)' : 'scaleX(0)' }} />
                  <div className="p-4 flex items-center justify-between group">
                    <div className="flex items-center space-x-3">
                      <span className="text-[10px] font-mono text-white/40">/{item.id}/</span>
                      <span className={`text-sm tracking-wider font-space-grotesk ${
                        isActive(item.path) ? 'text-emerald-500' : 'text-white/60'
                      }`}>
                        {item.label}
                      </span>
                    </div>
                    <div className={`w-4 h-4 border border-white/10 flex items-center justify-center ${
                      isActive(item.path) ? 'bg-emerald-500' : 'bg-transparent'
                    }`}>
                      {isActive(item.path) && (
                        <div className="w-1.5 h-1.5 bg-black" />
                      )}
                    </div>
                  </div>
                </Link>
              ))}

              {/* System Status Indicator */}
              <div className="mt-6 border-t border-white/10 pt-4">
                <div className="flex items-center justify-between text-[10px] font-mono">
                  <span className="text-white/40">SYSTEM_STATUS</span>
                  <div className="flex items-center space-x-2">
                    <span className="text-emerald-500">ONLINE</span>
                    <div className="w-1.5 h-1.5 bg-emerald-500" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};