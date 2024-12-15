import React from 'react';
import { ExperienceSection } from '../components/ExperienceSection';
import { UniSpotSection } from '../components/UniSpotSection';
import { ContentCreatorSection } from '../components/ContentCreatorSection';
import { Link } from 'react-router-dom';

const HomePage: React.FC = () => {
  return (
    <div className="container mx-auto px-4">
      <ExperienceSection />
      <UniSpotSection />
      <ContentCreatorSection />
      <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6 mb-24 px-4 sm:px-0">
        <Link
          to="/projects"
          className="w-[240px] flex items-center justify-center px-8 py-4 bg-black border border-white/10 rounded-[2px] hover:bg-white/5 transition-colors group relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-transparent opacity-20" />
          <div className="flex items-center justify-center">
            <span className="text-[10px] tracking-[0.2em] text-white/90 uppercase relative mr-2">View Projects</span>
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="24" 
              height="24" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              className="lucide lucide-command h-3 w-3 transition-transform group-hover:rotate-12 relative"
            >
              <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
            </svg>
          </div>
        </Link>
        <a
          href="#contact"
          className="w-[240px] flex items-center justify-center px-8 py-4 bg-white text-black rounded-[2px] hover:bg-zinc-100 transition-colors relative overflow-hidden"
        >
          <div className="flex items-center justify-center">
            <span className="text-[10px] tracking-[0.2em] uppercase mr-2">Initiate Contact</span>
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="24" 
              height="24" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              className="lucide lucide-external-link h-3 w-3"
            >
              <path d="M15 3h6v6" />
              <path d="M10 14 21 3" />
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
            </svg>
          </div>
        </a>
      </div>
    </div>
  );
};

export default HomePage;
