import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, X, Maximize2, Minimize2 } from 'lucide-react';
import { useState } from 'react';

interface Project {
  url: string;
  title: string;
  description: string;
  imageUrl: string;
}

const projects: Project[] = [
  {
    url: "https://uni-posti.vercel.app",
    title: "UNISPOT",
    description: "University study spots finder and review platform",
    imageUrl: "https://shot.screenshotapi.net/screenshot/d9e7c2d1-8f7d-42b0-8f0e-e9e7b916e3e9.png?token=WQXJ7KG-G5MMQR8-PVFMMQK-DPQMZ3P&width=1024&height=576&output=image&url=https%3A%2F%2Funi-posti.vercel.app%2F"
  },
  {
    url: "https://boold.co",
    title: "BOOLD AI",
    description: "AI-powered copywriting tool for businesses and entrepreneurs",
    imageUrl: "https://shot.screenshotapi.net/screenshot/d9e7c2d1-8f7d-42b0-8f0e-e9e7b916e3e9.png?token=WQXJ7KG-G5MMQR8-PVFMMQK-DPQMZ3P&width=1024&height=576&output=image&url=https%3A%2F%2Fboold.co%2F"
  },
  {
    url: "https://boold.it",
    title: "BOOLD DESIGN",
    description: "Creative agency specializing in branding and web design",
    imageUrl: "https://shot.screenshotapi.net/screenshot/d9e7c2d1-8f7d-42b0-8f0e-e9e7b916e3e9.png?token=WQXJ7KG-G5MMQR8-PVFMMQK-DPQMZ3P&width=1024&height=576&output=image&url=https%3A%2F%2Fboold.it%2F"
  }
];

export const ProjectsSection = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isInteractive, setIsInteractive] = useState(false);

  const handleClose = () => {
    setSelectedProject(null);
    setIsFullscreen(false);
    setIsInteractive(false);
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
    setIsInteractive(!isFullscreen); // Enable interaction only when fullscreen
  };

  return (
    <>
      <motion.div 
        className="border border-white/20 p-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.7 }}
      >
        <h2 className="text-lg tracking-wider mb-8 flex items-center gap-4">
          <ExternalLink className="w-5 h-5 stroke-[1px]" />
          PROJECTS
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <motion.button
              key={index}
              onClick={() => setSelectedProject(project)}
              className="group block text-left"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              <div className="relative border border-white/20 overflow-hidden">
                {/* Project Preview */}
                <div className="relative" style={{ paddingBottom: '56.25%' }}>
                  <div className="absolute inset-0 bg-black/50 group-hover:bg-black/30 transition-colors duration-300" />
                  <img
                    src={project.imageUrl}
                    alt={project.title}
                    className="absolute inset-0 w-full h-full object-cover filter grayscale"
                    loading="lazy"
                  />
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-8 h-8 border border-white/20 flex items-center justify-center bg-black/50 backdrop-blur-sm">
                      <Maximize2 className="w-4 h-4 stroke-[1px]" />
                    </div>
                  </div>
                </div>
                {/* Project Info */}
                <div className="absolute bottom-0 left-0 right-0 bg-black/80 backdrop-blur-sm border-t border-white/20 p-4">
                  <h3 className="text-sm tracking-wider mb-1 font-medium">{project.title}</h3>
                  <p className="text-xs text-white/60">{project.description}</p>
                </div>
              </div>
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Preview Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8"
          >
            {/* Backdrop */}
            <motion.div
              className="absolute inset-0 bg-black/90 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleClose}
            />

            {/* Modal Content */}
            <motion.div
              className={`relative w-full bg-black border border-white/20 overflow-hidden ${
                isFullscreen ? 'fixed inset-4 md:inset-8' : 'max-w-6xl aspect-video'
              }`}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
            >
              {/* Header */}
              <div className="absolute top-0 left-0 right-0 z-10 flex items-center justify-between bg-black/80 backdrop-blur-sm border-b border-white/20 p-4">
                <div>
                  <h3 className="text-sm tracking-wider font-medium">{selectedProject.title}</h3>
                  <p className="text-xs text-white/60">{selectedProject.description}</p>
                </div>
                <div className="flex items-center gap-4">
                  <a
                    href={selectedProject.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 flex items-center justify-center border border-white/20 hover:bg-white/10 transition-colors"
                  >
                    <ExternalLink className="w-4 h-4 stroke-[1px]" />
                  </a>
                  <button
                    onClick={toggleFullscreen}
                    className="w-8 h-8 flex items-center justify-center border border-white/20 hover:bg-white/10 transition-colors"
                  >
                    {isFullscreen ? (
                      <Minimize2 className="w-4 h-4 stroke-[1px]" />
                    ) : (
                      <Maximize2 className="w-4 h-4 stroke-[1px]" />
                    )}
                  </button>
                  <button
                    onClick={handleClose}
                    className="w-8 h-8 flex items-center justify-center border border-white/20 hover:bg-white/10 transition-colors"
                  >
                    <X className="w-4 h-4 stroke-[1px]" />
                  </button>
                </div>
              </div>

              {/* Content */}
              <div className={`w-full ${isFullscreen ? 'h-full pt-[57px]' : 'aspect-video'}`}>
                {isInteractive ? (
                  <iframe
                    src={selectedProject.url}
                    className="w-full h-full"
                    style={{ background: 'white' }}
                  />
                ) : (
                  <div className="relative w-full h-full">
                    <img
                      src={selectedProject.imageUrl}
                      alt={selectedProject.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="bg-black/80 backdrop-blur-sm border border-white/20 p-4 text-sm">
                        Click expand to interact with the website
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
