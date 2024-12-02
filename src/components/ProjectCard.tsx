import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ExternalLink, Github } from 'lucide-react';

interface ProjectCardProps {
  title: string;
  description: string;
  tags: string[];
  image: string;
  coordinates: string;
  links?: {
    demo?: string;
    github?: string;
  };
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  title,
  description,
  tags,
  image,
  coordinates,
  links
}) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6 }}
      className="group relative bg-[#111111]/90 backdrop-blur-xl border border-[#1A1A1A] rounded-sm overflow-hidden hover:border-white/20 transition-all duration-300"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/[0.02] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      <div className="relative">
        <div className="relative h-48 overflow-hidden">
          <img 
            src={image} 
            alt={title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <span className="absolute top-2 right-2 text-[10px] text-white/30 font-mono">{coordinates}</span>
        </div>

        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-xl font-bold tracking-wide">{title}</h3>
            <div className="flex gap-2">
              {links?.demo && (
                <a 
                  href={links.demo}
                  className="p-2 hover:bg-white/10 rounded-sm transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ExternalLink size={16} />
                </a>
              )}
              {links?.github && (
                <a 
                  href={links.github}
                  className="p-2 hover:bg-white/10 rounded-sm transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Github size={16} />
                </a>
              )}
            </div>
          </div>

          <p className="text-gray-400 mb-4 text-sm leading-relaxed">{description}</p>

          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span 
                key={tag}
                className="px-3 py-1 bg-white/5 hover:bg-white/10 rounded-sm text-xs tracking-wider uppercase transition-colors"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="mt-4 pt-4 border-t border-white/5">
            <div className="flex items-center space-x-2">
              <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
              <span className="text-xs text-zinc-500">SYSTEM STATUS: OPERATIONAL</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};