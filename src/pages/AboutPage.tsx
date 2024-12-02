import { motion } from 'framer-motion';
import { useState } from 'react';

const CornerDecorations = () => (
  <>
    <div className="absolute top-0 left-0 h-4 w-4 border-t border-l border-white/20" />
    <div className="absolute top-0 right-0 h-4 w-4 border-t border-r border-white/20" />
    <div className="absolute bottom-0 left-0 h-4 w-4 border-b border-l border-white/20" />
    <div className="absolute bottom-0 right-0 h-4 w-4 border-b border-r border-white/20" />
  </>
);

const ProjectPreview = ({ title, image, tech, description }: { 
  title: string; 
  image: string; 
  tech: string[]; 
  description: string;
}) => (
  <div className="absolute -top-2 left-1/2 -translate-x-1/2 -translate-y-full mb-2 w-[320px] opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none z-50">
    <div className="relative border border-white/10 bg-black/95 backdrop-blur-sm">
      <CornerDecorations />
      
      {/* Preview Image */}
      <div className="relative aspect-video w-full border-b border-white/10 overflow-hidden">
        <img src={image} alt={title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        <div className="absolute bottom-2 left-2 right-2">
          <div className="flex flex-wrap gap-1">
            {tech.map((item, i) => (
              <div key={i} className="px-1.5 py-0.5 bg-black/80 border border-white/10">
                <span className="text-[8px] text-white/60 uppercase tracking-wider">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Content */}
      <div className="p-3 space-y-2">
        <div className="flex items-center gap-2">
          <div className="w-1 h-1 bg-emerald-500/50" />
          <div className="text-xs text-white/80 uppercase tracking-wider">{title}</div>
        </div>
        <div className="text-[10px] text-white/60 leading-relaxed">
          {description}
        </div>
      </div>
      
      {/* Bottom Arrow */}
      <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 border-r border-b border-white/10 bg-black rotate-45" />
    </div>
  </div>
);

export default function Page() {
  const [isOperationsExpanded, setIsOperationsExpanded] = useState(false);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-black pt-16 pb-16 font-space-grotesk"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Intro Section */}


        {/* Personnel File */}
        <div className="border border-white/10 p-8">
          {/* Header */}
          <div className="flex items-center gap-2 mb-6">
            <div className="w-1 h-1 bg-white/40" />
            <div className="text-[10px] uppercase tracking-wider text-white/40">Personnel File</div>
            <div className="flex-1 h-px bg-white/10" />
            <div className="text-[10px] uppercase tracking-wider text-white/40">ID.0001</div>
          </div>

          {/* Profile Content */}
          <div className="grid grid-cols-[240px,1fr] gap-8">
            {/* Image Column */}
            <div className="space-y-4">
              <div className="relative aspect-square border border-white/10 overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.1)_1px,transparent_1px)] [background-size:8px_8px]" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.05)_2px,transparent_2px)] [background-size:16px_16px]" />
                <img
                  src="https://uploads-ssl.webflow.com/6481cd195a1b6affcccd1c08/6481e7306f5db9f2d072ff7c_Untitled%20design%20(2).png"
                  alt="Profile"
                  className="object-cover grayscale"
                />
              </div>
              
              {/* Social Links */}
              <div className="space-y-2">
                {[
                  { label: "GitHub", url: "https://github.com/aimansalim" },
                  { label: "LinkedIn", url: "https://linkedin.com/in/aimansalim" },
                  { label: "Instagram", url: "https://instagram.com/aimannsalim" }
                ].map((link, i) => (
                  <a
                    key={i}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-xs text-white/40 hover:text-white/60"
                  >
                    <div className="w-1 h-1 bg-white/20" />
                    <span className="uppercase tracking-wider">{link.label}</span>
                    <svg className="w-3 h-3 ml-auto" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </a>
                ))}
              </div>
            </div>

            {/* Info Column */}
            <div className="space-y-8">
              <div>
                <h1 className="text-3xl font-medium mb-4">Aiman Salim</h1>
                <p className="text-white/60 leading-relaxed">
                  Software engineer focused on building high-performance web applications 
                  and digital experiences. Specializing in modern web technologies and 
                  system architecture design.
                </p>
              </div>

              {/* Core Skills */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-1 h-1 bg-white/40" />
                  <div className="text-[10px] uppercase tracking-wider text-white/40">Core Skills</div>
                  <div className="flex-1 h-px bg-white/10" />
                </div>
                <div className="grid grid-cols-4 gap-2">
                  {[
                    "System Architecture",
                    "Full Stack Development",
                    "UI/UX Design",
                    "Performance Optimization",
                    "Real-time Systems",
                    "Database Design",
                    "API Development",
                    "Cloud Infrastructure"
                  ].map((skill, i) => (
                    <div key={i} className="px-3 py-2 border border-white/10 hover:border-white/20">
                      <span className="text-xs text-white/60">{skill}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Operations Section */}
        <div className="border border-white/10">
          {/* Expandable Header */}
          <button 
            onClick={() => setIsOperationsExpanded(!isOperationsExpanded)}
            className="w-full p-4 flex items-center gap-2 hover:bg-white/5 transition-colors"
          >
            <div className="w-1 h-1 bg-white/40" />
            <div className="text-[10px] uppercase tracking-wider text-white/40">Active Operations</div>
            <div className="flex-1 h-px bg-white/10" />
            <svg 
              className={`w-4 h-4 text-white/40 transition-transform ${isOperationsExpanded ? 'rotate-180' : ''}`}
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2"
            >
              <path d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {/* Expandable Content */}
          <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isOperationsExpanded ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'}`}>
            <div className="p-4 grid grid-cols-2 gap-3">
              {/* BOOLD Design */}
              <div className="group border border-white/10 p-4 hover:border-white/20 transition-all hover:bg-white/5">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-1 h-1 bg-white/40" />
                  <div className="text-[10px] uppercase tracking-wider text-white/40">BOOLD Design</div>
                </div>
                <p className="text-sm text-white/80 mb-3 font-medium italic">
                  "Innova con il design, racconta con il marketing."
                </p>
                <div className="space-y-3 mb-4">
                  <div className="flex items-center gap-2">
                    <div className="w-1 h-1 bg-white/20" />
                    <span className="text-sm text-white/60">Creative Agency in Modena</span>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div className="px-2 py-1 border border-white/10 group-hover:border-white/20">
                    <span className="text-[10px] uppercase tracking-wider text-white/40">Brand Identity</span>
                  </div>
                  <div className="px-2 py-1 border border-white/10 group-hover:border-white/20">
                    <span className="text-[10px] uppercase tracking-wider text-white/40">Web Design</span>
                  </div>
                  <div className="px-2 py-1 border border-white/10 group-hover:border-white/20">
                    <span className="text-[10px] uppercase tracking-wider text-white/40">Social Media</span>
                  </div>
                  <div className="px-2 py-1 border border-white/10 group-hover:border-white/20">
                    <span className="text-[10px] uppercase tracking-wider text-white/40">Content</span>
                  </div>
                </div>
                <a 
                  href="https://boold.it" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="mt-4 inline-flex items-center gap-2 text-xs text-white/40 hover:text-white/60"
                >
                  <span className="uppercase tracking-wider">View Operations</span>
                  <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </a>
              </div>

              {/* BOOLD AI */}
              <div className="group border border-white/10 p-4 hover:border-white/20 transition-all hover:bg-white/5">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-1 h-1 bg-emerald-500/50" />
                  <div className="text-[10px] uppercase tracking-wider text-white/40">BOOLD AI</div>
                  <span className="ml-auto text-[10px] uppercase tracking-wider text-emerald-500/50">Beta</span>
                </div>
                <p className="text-sm text-white/80 mb-3 font-medium italic">
                  "Decide Like a Human. Act Like an AI."
                </p>
                <div className="space-y-3 mb-4">
                  <div className="flex items-center gap-2">
                    <div className="w-1 h-1 bg-white/20" />
                    <span className="text-sm text-white/60">AI-Powered Copywriting Tool</span>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div className="px-2 py-1 border border-white/10 group-hover:border-white/20">
                    <span className="text-[10px] uppercase tracking-wider text-white/40">GPT-3 Tech</span>
                  </div>
                  <div className="px-2 py-1 border border-white/10 group-hover:border-white/20">
                    <span className="text-[10px] uppercase tracking-wider text-white/40">AI Writing</span>
                  </div>
                  <div className="px-2 py-1 border border-white/10 group-hover:border-white/20">
                    <span className="text-[10px] uppercase tracking-wider text-white/40">Strategic</span>
                  </div>
                  <div className="px-2 py-1 border border-white/10 group-hover:border-white/20">
                    <span className="text-[10px] uppercase tracking-wider text-white/40">Business</span>
                  </div>
                </div>
                <a 
                  href="https://boold.co" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="mt-4 inline-flex items-center gap-2 text-xs text-white/40 hover:text-white/60"
                >
                  <span className="uppercase tracking-wider">Get Early Access</span>
                  <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* UniSpot Project */}
        <div className="border border-white/10">
          <div className="p-8 space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-1 h-1 bg-emerald-500/50" />
                <span className="text-sm uppercase tracking-wider text-white/80">Featured Project</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-emerald-500/20 animate-pulse" />
                <span className="text-[10px] uppercase tracking-wider text-white/40">Live System</span>
              </div>
            </div>

            <div className="relative aspect-[21/9] border border-white/10 overflow-hidden">
              <iframe
                src="https://uni-posti.vercel.app"
                title="UniSpot Live Demo"
                className="absolute inset-0 w-full h-full"
                style={{ border: 'none' }}
              />
              {/* Enhanced military-style overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/90 to-transparent">
                <div className="absolute inset-0 bg-[radial-gradient(#ffffff11_1px,transparent_1px)] [background-size:16px_16px]" />
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-8">
                {/* Top tactical border */}
                <div className="absolute top-0 left-6 right-6 h-px bg-white/10" />
                <div className="absolute top-0 left-6 w-8 h-px bg-white/40" />
                <div className="absolute top-0 right-6 w-8 h-px bg-white/40" />
                
                {/* Content */}
                <div className="relative">
                  {/* Military-style label */}
                  <div className="inline-flex items-center gap-2 mb-3 px-2 py-1 border border-white/20 bg-black/50">
                    <div className="w-1 h-1 bg-emerald-500/50" />
                    <span className="text-[10px] uppercase tracking-wider text-white/60">Mission Objective</span>
                  </div>
                  
                  <h2 className="text-3xl text-white mb-3 font-medium tracking-wide">UniSpot</h2>
                  
                  {/* Description with tactical styling */}
                  <div className="relative max-w-2xl border-l border-white/20 pl-4">
                    <p className="text-white/60 text-lg leading-relaxed">
                      Real-time campus navigation system for Unimore University, featuring live occupancy tracking 
                      and space optimization across Modena's academic facilities.
                    </p>
                    
                    {/* Tactical details */}
                    <div className="mt-4 grid grid-cols-3 gap-4">
                      <div className="border-l border-white/20 pl-2">
                        <div className="text-[10px] uppercase tracking-wider text-white/40">Status</div>
                        <div className="text-sm text-emerald-500/80">Operational</div>
                      </div>
                      <div className="border-l border-white/20 pl-2">
                        <div className="text-[10px] uppercase tracking-wider text-white/40">Coverage</div>
                        <div className="text-sm text-white/80">25+ Buildings</div>
                      </div>
                      <div className="border-l border-white/20 pl-2">
                        <div className="text-[10px] uppercase tracking-wider text-white/40">Response</div>
                        <div className="text-sm text-white/80">5ms Latency</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Corner decorations */}
              <div className="absolute top-4 left-4 w-3 h-3 border-l border-t border-white/20" />
              <div className="absolute top-4 right-4 w-3 h-3 border-r border-t border-white/20" />
              <div className="absolute bottom-4 left-4 w-3 h-3 border-l border-b border-white/20" />
              <div className="absolute bottom-4 right-4 w-3 h-3 border-r border-b border-white/20" />
            </div>

            {/* Project Stats */}
            <div className="grid grid-cols-3 gap-3 mt-6">
              {[
                { label: "Latency", value: "5ms", highlight: true },
                { label: "Buildings", value: "25+", highlight: false },
                { label: "Zones", value: "100+", highlight: false },
                { label: "Uptime", value: "99.9%", highlight: true },
                { label: "Users", value: "5000+", highlight: false },
                { label: "Updates", value: "Real-time", highlight: true }
              ].map((stat, i) => (
                <div 
                  key={i} 
                  className={`relative border border-white/10 p-4 hover:border-white/20 transition-all hover:bg-white/5
                    ${stat.highlight ? 'border-l-emerald-500/50' : ''}`}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <div className={`w-1 h-1 ${stat.highlight ? 'bg-emerald-500/50' : 'bg-white/20'}`} />
                    <div className="text-[10px] uppercase tracking-wider text-white/40">{stat.label}</div>
                  </div>
                  <div className="text-xl font-medium text-white/80">{stat.value}</div>
                </div>
              ))}
            </div>

            {/* Tech Stack */}
            <div className="mt-8">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-1 h-1 bg-emerald-500/50" />
                <div className="text-[10px] uppercase tracking-wider text-white/40">Tech Stack</div>
                <div className="flex-1 h-px bg-white/10" />
              </div>
              
              <div className="grid grid-cols-4 gap-3">
                {[
                  { name: "Next.js", type: "Frontend", highlight: true },
                  { name: "React", type: "Frontend", highlight: false },
                  { name: "TypeScript", type: "Language", highlight: true },
                  { name: "PostgreSQL", type: "Database", highlight: true },
                  { name: "WebSocket", type: "Real-time", highlight: true },
                  { name: "TailwindCSS", type: "Styling", highlight: false },
                  { name: "Framer Motion", type: "Animation", highlight: false },
                  { name: "Vercel", type: "Deploy", highlight: false }
                ].map((tech, i) => (
                  <div 
                    key={i}
                    className={`group relative border border-white/10 p-3 hover:border-white/20 transition-colors
                      ${tech.highlight ? 'border-l-emerald-500/50' : ''}`}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <div className={`w-1 h-1 ${tech.highlight ? 'bg-emerald-500/50' : 'bg-white/20'}`} />
                      <div className="text-[10px] uppercase tracking-wider text-white/40">{tech.type}</div>
                    </div>
                    <div className="text-sm text-white/80">{tech.name}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* View Project Button */}
            <div className="flex justify-end">
              <a 
                href="https://uni-posti.vercel.app" 
                target="_blank" 
                rel="noopener noreferrer"
                className="group relative inline-block"
              >
                <div className="absolute inset-0 border border-white/20 -translate-x-1 -translate-y-1 transition-transform group-hover:translate-x-0 group-hover:translate-y-0" />
                <div className="px-6 py-3 border border-white/20 relative bg-black transition-all group-hover:bg-white group-hover:text-black">
                  <span className="text-xs uppercase tracking-wider">View Project</span>
                </div>
              </a>
            </div>
          </div>
        </div>

        {/* Education & Experience Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Education Section */}
          <div className="relative border border-white/10 p-6 md:p-8">
            <CornerDecorations />
            <div className="flex items-center gap-2 mb-6">
              <div className="w-4 h-px bg-white/20" />
              <span className="text-xs text-white/60 uppercase tracking-wider">Education Record</span>
            </div>

            <div className="relative border border-white/10 p-4">
              <div className="absolute top-0 right-0 p-2 border-l border-b border-white/10 bg-black">
                <span className="text-[10px] uppercase tracking-wider text-white/40">2022-2025</span>
              </div>
              
              <div className="pt-6">
                <h3 className="text-lg font-medium mb-2">Bachelor Degree in Software Engineering</h3>
                <p className="text-sm text-white/60 mb-4">UniMoRe, Modena</p>
                
                <div className="space-y-4">
                  <div className="border border-white/10 p-3">
                    <div className="text-[10px] uppercase tracking-wider text-white/40 mb-2">Current Thesis</div>
                    <p className="text-sm text-white/80">"Integrazione di Sistemi di Estrazione Dati per l'Automazione della Gestione Ordini nella Logistica e Catena di Fornitura"</p>
                  </div>

                  <div className="border border-white/10 p-3">
                    <div className="text-[10px] uppercase tracking-wider text-white/40 mb-2">Key Courses</div>
                    <div className="grid grid-cols-1 gap-2 text-sm text-white/60">
                      <div className="flex items-center gap-2">
                        <div className="w-1 h-1 bg-white/20" />
                        <span>Apprendimento ed evoluzione in sistemi artificiali</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-1 h-1 bg-white/20" />
                        <span>Fondamenti di Telecomunicazioni</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-1 h-1 bg-white/20" />
                        <span>Basi di Dati e Lab.</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-1 h-1 bg-white/20" />
                        <span>Calcolatori Elettronici e Lab.</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Experience Section */}
          <div className="relative border border-white/10 p-6 md:p-8">
            <CornerDecorations />
            <div className="flex items-center gap-2 mb-6">
              <div className="w-4 h-px bg-white/20" />
              <span className="text-xs text-white/60 uppercase tracking-wider">Mission History</span>
            </div>

            <div className="space-y-4">
              <div className="relative border border-white/10 p-4">
                <div className="absolute top-0 right-0 p-2 border-l border-b border-white/10 bg-black">
                  <span className="text-[10px] uppercase tracking-wider text-white/40">Sept 2024 - present</span>
                </div>
                
                <div className="pt-6">
                  <h3 className="text-lg font-medium mb-2">Supply Chain Optimization Developer</h3>
                  <p className="text-sm text-white/60 mb-2">Independent</p>
                  <p className="text-sm text-white/80">Creato il sw per prendere in input diversi formati e dare come output un formato unico xml che sia coerente con il sistema del cliente ovvero AS/400</p>
                </div>
              </div>

              <div className="relative border border-white/10 p-4">
                <div className="absolute top-0 right-0 p-2 border-l border-b border-white/10 bg-black">
                  <span className="text-[10px] uppercase tracking-wider text-white/40">May 2021 - present</span>
                </div>
                
                <div className="pt-6">
                  <h3 className="text-lg font-medium mb-2">Freelance Designer & Developer</h3>
                  <p className="text-sm text-white/60 mb-4">
                    <span className="border border-white/10 px-2 py-1">Milan</span>
                    <span className="mx-2 text-white/20">|</span>
                    <span className="border border-white/10 px-2 py-1">Remote, Italy</span>
                  </p>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="group relative border border-white/10 p-3 hover:border-white/20 transition-colors">
                      <ProjectPreview
                        title="Technical Content Creation"
                        image="https://img.youtube.com/vi/P5k2u9DlCho/maxresdefault.jpg"
                        tech={["YouTube", "Technical Education", "Software Engineering"]}
                        description="Creating high-impact technical content focused on software engineering, system design, and development best practices."
                      />
                      <div className="text-[10px] uppercase tracking-wider text-white/40 mb-2">Content Creation</div>
                      <div className="flex items-center gap-2">
                        <div className="w-1 h-1 bg-white/20" />
                        <span className="text-sm text-white/80">190M+ Views</span>
                      </div>
                    </div>

                    <div className="group relative border border-white/10 p-3 hover:border-white/20 transition-colors">
                      <ProjectPreview
                        title="Full-Stack Development"
                        image="/unispot-preview.png"
                        tech={["Next.js", "React", "Node.js", "PostgreSQL"]}
                        description="Building high-performance web applications with real-time capabilities and modern tech stacks."
                      />
                      <div className="text-[10px] uppercase tracking-wider text-white/40 mb-2">Development</div>
                      <div className="flex items-center gap-2">
                        <div className="w-1 h-1 bg-white/20" />
                        <span className="text-sm text-white/80">Web Applications</span>
                      </div>
                    </div>

                    <div className="group relative border border-white/10 p-3 hover:border-white/20 transition-colors">
                      <ProjectPreview
                        title="Design Systems"
                        image="/design-preview.png"
                        tech={["Figma", "UI/UX", "Design Systems", "Prototyping"]}
                        description="Creating cohesive design systems and user experiences for web and mobile applications."
                      />
                      <div className="text-[10px] uppercase tracking-wider text-white/40 mb-2">UI/UX Design</div>
                      <div className="flex items-center gap-2">
                        <div className="w-1 h-1 bg-white/20" />
                        <span className="text-sm text-white/80">Design Systems</span>
                      </div>
                    </div>

                    <div className="group relative border border-white/10 p-3 hover:border-white/20 transition-colors">
                      <ProjectPreview
                        title="System Architecture"
                        image="/architecture-preview.png"
                        tech={["Distributed Systems", "Cloud Native", "Microservices"]}
                        description="Designing and implementing scalable system architectures for enterprise applications."
                      />
                      <div className="text-[10px] uppercase tracking-wider text-white/40 mb-2">Architecture</div>
                      <div className="flex items-center gap-2">
                        <div className="w-1 h-1 bg-white/20" />
                        <span className="text-sm text-white/80">System Design</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
