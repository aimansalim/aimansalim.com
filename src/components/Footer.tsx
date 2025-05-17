import { type FC } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Instagram, Linkedin, FileText, Home, User, Code, Image, Palette, Briefcase, MessageSquare } from 'lucide-react';

export const Footer: FC = () => {
  // Define navigation links with proper categorization
  const linkGroups = {
    main: [
      { path: '/', label: 'Home', icon: <Home className="w-3 h-3" /> },
      { path: '/about', label: 'About', icon: <User className="w-3 h-3" /> },
      { path: '/contact', label: 'Contact', icon: <MessageSquare className="w-3 h-3" /> }
    ],
    projects: [
      { path: '/projects', label: 'Projects', icon: <Code className="w-3 h-3" /> },
      { path: '/thumbnails', label: 'Thumbnails', icon: <Image className="w-3 h-3" /> },
      { path: '/projects/design', label: 'Design', icon: <Palette className="w-3 h-3" /> },
      { path: '/portfolio', label: 'Portfolio', icon: <Briefcase className="w-3 h-3" /> }
    ],
    social: [
      { url: 'https://www.instagram.com/aimannsalim', label: 'Instagram', icon: <Instagram className="w-3 h-3" /> },
      { url: 'https://www.linkedin.com/in/aimansalim', label: 'LinkedIn', icon: <Linkedin className="w-3 h-3" /> }
    ]
  };
  
  // Get current year for copyright
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-8 grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Navigation Column */}
          <div className="space-y-4">
            <h3 className="text-xs font-space-grotesk text-white/40 uppercase tracking-wider mb-4">Navigation</h3>
            <div className="grid grid-cols-1 gap-3">
              {linkGroups.main.map(link => (
                <Link 
                  key={link.path}
                  to={link.path} 
                  className="text-xs text-white/60 hover:text-white transition-colors flex items-center gap-2"
                >
                  {link.icon}
                  <span>{link.label}</span>
                </Link>
              ))}
            </div>
          </div>

          {/* Projects Column */}
          <div className="space-y-4">
            <h3 className="text-xs font-space-grotesk text-white/40 uppercase tracking-wider mb-4">Projects</h3>
            <div className="grid grid-cols-1 gap-3">
              {linkGroups.projects.map(link => (
                <Link 
                  key={link.path}
                  to={link.path} 
                  className="text-xs text-white/60 hover:text-white transition-colors flex items-center gap-2"
                >
                  {link.icon}
                  <span>{link.label}</span>
                </Link>
              ))}
            </div>
          </div>

          {/* Contact & Social Column */}
          <div className="space-y-4">
            <h3 className="text-xs font-space-grotesk text-white/40 uppercase tracking-wider mb-4">Connect</h3>
            
            {/* Contact Info */}
            <div className="space-y-3 mb-4">
              <a 
                href="mailto:info.boold@gmail.com" 
                className="text-xs text-white/60 hover:text-white transition-colors flex items-center gap-2"
              >
                <Mail className="w-3 h-3" />
                <span>info.boold@gmail.com</span>
              </a>
              <p className="text-xs text-white/60 flex items-center gap-2">
                <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                <span>Milan, Italy</span>
              </p>
            </div>
            
            {/* Social Links */}
            <div className="flex flex-col gap-3">
              {linkGroups.social.map(link => (
                <a 
                  key={link.url}
                  href={link.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-xs text-white/60 hover:text-white transition-colors flex items-center gap-2"
                >
                  {link.icon}
                  <span>{link.label}</span>
                </a>
              ))}
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