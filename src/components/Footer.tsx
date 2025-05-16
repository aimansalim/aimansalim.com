import { type FC } from 'react';
import { Link } from 'react-router-dom';
import { Mail } from 'lucide-react';

export const Footer: FC = () => {
  // Define navigation links to match main navigation
  const navigationLinks = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About' },
    { path: '/projects', label: 'Projects' },
    { path: '/thumbnails', label: 'Thumbnails' },
    { path: '/projects/design', label: 'Design' },
    { path: '/contact', label: 'Contact' }
  ];
  
  // Get current year for copyright
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-8 grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Navigation Links */}
          <div className="space-y-4">
            <div className="border border-white/10 p-4">
              <h3 className="text-xs font-space-grotesk text-white/40 uppercase tracking-wider mb-4">Navigation</h3>
              <nav className="space-y-2">
                {navigationLinks.map(link => (
                  <Link 
                    key={link.path}
                    to={link.path} 
                    className="block text-xs text-white/60 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <div className="border border-white/10 p-4">
              <h3 className="text-xs font-space-grotesk text-white/40 uppercase tracking-wider mb-4">Contact</h3>
              <div className="space-y-2">
                <a 
                  href="mailto:info.boold@gmail.com" 
                  className="block text-xs text-white/60 hover:text-white transition-colors flex items-center gap-2"
                >
                  <Mail className="w-3 h-3" />
                  info.boold@gmail.com
                </a>
                <p className="text-xs text-white/60">Milan, Italy</p>
              </div>
            </div>
          </div>

          {/* Social Links */}
          <div className="space-y-4">
            <div className="border border-white/10 p-4">
              <h3 className="text-xs font-space-grotesk text-white/40 uppercase tracking-wider mb-4">Social</h3>
              <div className="grid grid-cols-2 gap-2">
                <a 
                  href="https://www.instagram.com/aimannsalim" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="border border-white/10 px-3 py-2 text-xs text-white/60 hover:bg-white/5 transition-colors flex items-center gap-2"
                >
                  <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                    <rect x="2" y="2" width="20" height="20" />
                    <circle cx="12" cy="12" r="5" />
                    <circle cx="18" cy="6" r="1" />
                  </svg>
                  Instagram
                </a>
                <a 
                  href="https://www.linkedin.com/in/aimansalim" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="border border-white/10 px-3 py-2 text-xs text-white/60 hover:bg-white/5 transition-colors flex items-center gap-2"
                >
                  <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                    <rect x="2" y="2" width="20" height="20" />
                    <path d="M8 10v8M8 6v1M16 18v-6c0-2-1-3-3-3s-3 1-3 3" />
                  </svg>
                  LinkedIn
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="py-4 border-t border-white/10">
          <p className="text-[10px] text-white/40 text-center font-space-grotesk tracking-wider">
            Aiman Salim &copy; {currentYear}
            {/* Easter egg link to quotes - intentionally subtle */}
            <Link to="/quotes" className="cursor-default inline-block ml-1 hover:text-white/20 transition-colors" aria-label="Quotes">∞</Link>
          </p>
        </div>
      </div>
    </footer>
  );
};