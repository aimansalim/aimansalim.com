import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Code, Briefcase, Palette, Mail, Globe, ArrowRight, ExternalLink } from 'lucide-react';

interface SectionProps {
  children: React.ReactNode;
  title: string;
}

const Section: React.FC<SectionProps> = ({ children, title }) => (
  <div className="space-y-16">
    <div className="flex items-center space-x-4 sticky top-8 bg-black z-10 py-4">
      <h2 className="text-xs tracking-[0.2em] uppercase">{title}</h2>
      <div className="flex-1 hairline" />
    </div>
    {children}
  </div>
);

interface ProjectDetails {
  title: string;
  type: string;
  details: string[];
  tech: string[];
  link?: string;
  metrics: {
    key: string;
    value: string;
  }[];
  status: 'active' | 'completed' | 'development';
}

const projects: ProjectDetails[] = [
  {
    title: "CREATIVE DIRECTION",
    type: "Content Design & Branding",
    details: [
      "160M+ Views on YouTube",
      "High-Profile Collaborations",
      "Lead Thumbnail Designer",
      "Brand Identity Development"
    ],
    tech: ["Adobe Suite", "Figma", "After Effects"],
    link: "https://youtube.com/@aledellagiusta",
    metrics: [
      { key: "Views", value: "160M+" },
      { key: "CTR", value: "12.8%" },
      { key: "Collabs", value: "50+" }
    ],
    status: 'active'
  },
  {
    title: "BOOLD DESIGN",
    type: "Creative Agency",
    details: [
      "Founded & Led Creative Direction",
      "Platform Development",
      "Early AI Innovation (2021)",
      "UI/UX Development"
    ],
    tech: ["Next.js", "React", "TailwindCSS", "PostgreSQL", "Framer Motion"],
    link: "https://boold.it",
    metrics: [
      { key: "Projects", value: "10+" },
      { key: "Tech Stack", value: "5" },
      { key: "Founded", value: "2021" }
    ],
    status: 'active'
  },
  {
    title: "UNISPOT",
    type: "Student Platform",
    details: [
      "Study Room Finder Platform",
      "Real-time Availability",
      "Student Community Features",
      "Interactive Campus Map"
    ],
    tech: ["Next.js", "React", "TailwindCSS", "PostgreSQL", "WebSockets"],
    link: "https://uni-spot.vercel.app",
    metrics: [
      { key: "Users", value: "100+" },
      { key: "Rooms", value: "50+" },
      { key: "Status", value: "BETA" }
    ],
    status: 'development'
  },
  {
    title: "IT CONSULTANCY",
    type: "Technical Solutions",
    details: [
      "Process Automation",
      "System Integration",
      "Technical Architecture",
      "Legacy System Modernization"
    ],
    tech: ["Python", "OCR", "XML", "AS/400", "API Integration"],
    link: "#",
    metrics: [
      { key: "Systems", value: "5+" },
      { key: "Processes", value: "10+" },
      { key: "ROI", value: "40%" }
    ],
    status: 'completed'
  },
  {
    title: "CALORIE AI",
    type: "Health Tech",
    details: [
      "AI-Powered Calorie Tracking",
      "Real-time Image Analysis",
      "Nutrition Insights",
      "Smart Food Recognition"
    ],
    tech: ["Next.js", "OpenAI API", "TailwindCSS", "Vision AI"],
    link: "https://calories-ai.pages.dev",
    metrics: [
      { key: "Accuracy", value: "95%" },
      { key: "Response", value: "<1s" },
      { key: "Foods", value: "1000+" }
    ],
    status: 'active'
  }
];

const ProjectCard: React.FC<{ project: ProjectDetails }> = ({ project }) => (
  <a 
    href={project.link} 
    target="_blank" 
    rel="noopener noreferrer" 
    className="group relative block"
  >
    {/* Offset border effect */}
    <div className="absolute inset-0 border border-white/20 -translate-x-2 -translate-y-2 transition-transform group-hover:translate-x-0 group-hover:translate-y-0" />
    
    {/* Main container */}
    <div className="relative border border-white/20 bg-white/[0.01] p-6 space-y-4">
      {/* Corner decorations - Updated positioning */}
      <div className="absolute -top-px -left-px h-4 w-4 border-t border-l border-white/20" />
      <div className="absolute -top-px -right-px h-4 w-4 border-t border-r border-white/20" />
      <div className="absolute -bottom-px -left-px h-4 w-4 border-b border-l border-white/20" />
      <div className="absolute -bottom-px -right-px h-4 w-4 border-b border-r border-white/20" />

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <h3 className="text-sm tracking-wider">{project.title}</h3>
          <svg 
            className="w-3 h-3 text-white/60 group-hover:text-white transition-colors" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="1"
          >
            <path d="M7 17L17 7M17 7H7M17 7V17" />
          </svg>
        </div>
        <p className="text-xs text-white/60">{project.type}</p>
      </div>

      <div className="space-y-1">
        {project.details.map((detail, i) => (
          <p key={i} className="text-sm text-white/80">{detail}</p>
        ))}
      </div>

      <div className="flex flex-wrap gap-2">
        {project.tech.map((tech, i) => (
          <span key={i} className="text-xs px-2 py-1 border border-white/10 text-white/60">
            {tech}
          </span>
        ))}
      </div>

      <div className="grid grid-cols-3 gap-2">
        {project.metrics.map((metric, i) => (
          <div key={i} className="space-y-1">
            <p className="text-xs text-white/40">{metric.key}</p>
            <p className="text-sm">{metric.value}</p>
          </div>
        ))}
      </div>
    </div>
  </a>
);

const TechBox: React.FC<{
  icon: React.ReactNode;
  title: string;
  items: string[];
}> = ({ icon, title, items }) => (
  <div className="box-hairline p-6 space-y-4 swiss-hover">
    <div className="flex items-center space-x-3">
      {icon}
      <span className="text-sm">{title}</span>
    </div>
    <div className="hairline" />
    <div className="space-y-2">
      {items.map((item, i) => (
        <div key={i} className="text-sm text-white/60 flex items-center space-x-2 hover:text-white/80 transition-colors">
          <ArrowRight className="w-3 h-3 stroke-[1px]" />
          <span>{item}</span>
        </div>
      ))}
    </div>
  </div>
);

const CornerDecorations = () => (
  <>
    <div className="absolute top-0 left-0 h-4 w-4 border-t border-l border-white/20" />
    <div className="absolute top-0 right-0 h-4 w-4 border-t border-r border-white/20" />
    <div className="absolute bottom-0 left-0 h-4 w-4 border-b border-l border-white/20" />
    <div className="absolute bottom-0 right-0 h-4 w-4 border-b border-r border-white/20" />
  </>
);

const AboutPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-black pt-24 pb-16 font-space-grotesk">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Header */}
        <div className="relative border border-white/10 p-8 md:p-12">
          <CornerDecorations />
          <div className="flex items-center gap-2 mb-8">
            <div className="w-1 h-1 bg-white/40" />
            <div className="text-[10px] uppercase tracking-wider text-white/40">Personnel File</div>
            <div className="flex-1 h-px bg-white/10" />
          </div>
          
          <div className="space-y-8">
            <motion.h1 
              className="text-6xl font-light tracking-tight"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              AIMAN SALIM
            </motion.h1>
            
            <motion.div 
              className="text-sm text-white/60 flex items-center space-x-4"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <span>SOFTWARE ENGINEERING STUDENT</span>
              <span className="w-1 h-1 bg-white/20" />
              <span>ITALY</span>
            </motion.div>
            
            <div className="h-px bg-white/10" />
            
            <motion.p 
              className="text-base leading-relaxed max-w-2xl text-white/80"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Currently studying Software Engineering at 22, while running multiple projects:
              Creative Direction (160M+ Views), Technical Architecture, and Brand Development.
            </motion.p>
          </div>
        </div>

        {/* Projects */}
        <Section title="SELECTED PROJECTS">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {projects.map((project, index) => (
              <ProjectCard key={index} project={project} />
            ))}
          </div>
        </Section>

        {/* Technical Stack */}
        <Section title="TECHNICAL PROFICIENCY">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <TechBox
              icon={<Code className="w-4 h-4 stroke-[1px]" />}
              title="Development"
              items={["Next.js", "React", "TailwindCSS", "PostgreSQL", "Python"]}
            />
            <TechBox
              icon={<Palette className="w-4 h-4 stroke-[1px]" />}
              title="Design"
              items={["Adobe Suite", "Figma", "After Effects", "Photography"]}
            />
            <TechBox
              icon={<Briefcase className="w-4 h-4 stroke-[1px]" />}
              title="Business"
              items={["Brand Strategy", "Content Strategy", "Team Leadership", "Project Management"]}
            />
          </div>
        </Section>

        {/* Contact */}
        <Section title="CONTACT">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <motion.a 
              href="mailto:info.boold@gmail.com" 
              className="box-hairline p-6 flex items-center space-x-3 swiss-hover"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <Mail className="w-4 h-4 stroke-[1px]" />
              <span className="text-sm link-underline">info.boold@gmail.com</span>
            </motion.a>
            <motion.a 
              href="https://aimansalim.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="box-hairline p-6 flex items-center space-x-3 swiss-hover"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <Globe className="w-4 h-4 stroke-[1px]" />
              <span className="text-sm link-underline">aimansalim.com</span>
            </motion.a>
          </div>
        </Section>
      </div>
    </div>
  );
}

export default AboutPage;
