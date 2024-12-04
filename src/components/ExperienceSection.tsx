import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

// Custom geometric icons with 1px strokes
const CodeIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
    <path d="M8 4L4 8L8 12" />
    <path d="M16 4L20 8L16 12" />
    <path d="M15 2L9 14" />
  </svg>
);

const ContentIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
    <path d="M4 4H20V16H4V4Z" />
    <path d="M8 20H16" />
    <path d="M12 16V20" />
    <path d="M10 10L15 10" />
  </svg>
);

const SystemIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
    <path d="M4 4H20V20H4V4Z" />
    <path d="M4 9H20" />
    <path d="M4 14H20" />
    <path d="M9 4V20" />
    <path d="M14 4V20" />
  </svg>
);

export const ExperienceSection = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const experiences = [
    {
      Icon: CodeIcon,
      title: "SOFTWARE ENGINEERING",
      period: "2021 - PRESENT",
      description: "Studying at Unimore University in Modena. Created UniSpot, a real-time occupancy tracking system and other projects.",
      technologies: ["PYTHON", "REACT", "TYPESCRIPT", "AI/ML"]
    },
    {
      Icon: ContentIcon,
      title: "DESIGNER",
      period: "2021 - PRESENT",
      description: "Collaborating with Ale Della Giusta, reaching 190M+ views through strategic graphic design of hundreds of documentary thumbnails.",
      technologies: ["DESIGN", "WEB DEV", "STRATEGY"]
    },
    {
      Icon: SystemIcon,
      title: "SYSTEM ARCHITECTURE",
      period: "2024 - PRESENT",
      description: "Designing and implementing scalable architectures with high-grade security standards for enterprise applications.",
      technologies: ["CLOUD.INFRA", "SECURITY", "PERF.OPT"]
    }
  ];

  return (
    <section id="experience" className="py-32 relative">
      {/* Background tint */}
      <div className="absolute inset-0 bg-black/20" />
      
      <div className="max-w-7xl mx-auto px-8 relative">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-space-grotesk font-medium tracking-tight leading-none mb-16">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-4 h-px bg-emerald-500" />
              <span className="text-sm text-emerald-500 uppercase tracking-wider font-light">Professional History</span>
            </div>
            <span className="text-[40px] text-zinc-500 block">WORK</span>
            <span className="text-[40px] text-white block mt-1">EXPERIENCE</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {experiences.map((exp, index) => (
              <div key={index} className="group relative h-[480px]">
                {/* Offset border effect */}
                <div className="absolute inset-0 border border-white/20 -translate-x-2 -translate-y-2 transition-transform group-hover:translate-x-0 group-hover:translate-y-0" />
                
                {/* Main container */}
                <div className="relative h-full border border-white/20 bg-white/[0.01]">
                  {/* Content wrapper */}
                  <div className="absolute inset-0 p-8 flex flex-col">
                    {/* Corner decorations */}
                    <div className="absolute top-0 left-0 h-4 w-4 border-t border-l border-white/20" />
                    <div className="absolute top-0 right-0 h-4 w-4 border-t border-r border-white/20" />
                    <div className="absolute bottom-0 left-0 h-4 w-4 border-b border-l border-white/20" />
                    <div className="absolute bottom-0 right-0 h-4 w-4 border-b border-r border-white/20" />
                    
                    {/* Icon section */}
                    <div className="mb-8">
                      <exp.Icon />
                    </div>

                    {/* Content section with flex-grow to ensure consistent spacing */}
                    <div className="flex-1 flex flex-col">
                      <div className="mb-4">
                        <h3 className="text-base font-space-grotesk font-medium text-white mb-2">{exp.title}</h3>
                        <p className="text-xs font-space-grotesk text-zinc-500 tracking-wider">{exp.period}</p>
                      </div>

                      <p className="text-sm font-space-grotesk text-zinc-400 leading-relaxed flex-grow">
                        {exp.description}
                      </p>
                      
                      {/* Technologies section always at bottom */}
                      <div className="mt-8 flex flex-wrap gap-4">
                        {exp.technologies.map((tech) => (
                          <div key={tech} className="px-4 py-2 border border-white/20 bg-black/20">
                            <span className="text-[10px] font-space-grotesk text-white uppercase tracking-wider">
                              {tech}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};