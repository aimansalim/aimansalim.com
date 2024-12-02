import React from 'react';

export default function ProjectsPage() {
  return (
    <div className="min-h-screen bg-black text-white py-24">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="flex items-center gap-2 mb-12">
          <div className="w-1 h-1 bg-white/40" />
          <div className="text-[10px] uppercase tracking-wider text-white/40">Operations</div>
          <div className="flex-1 h-px bg-white/10" />
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 gap-6">
          {/* BOOLD AI */}
          <div className="border border-white/10">
            <div className="p-8 space-y-6">
              <div className="flex items-center gap-2">
                <div className="w-1 h-1 bg-emerald-500/50" />
                <div className="text-[10px] uppercase tracking-wider text-white/40">BOOLD AI</div>
                <span className="ml-auto text-[10px] uppercase tracking-wider text-emerald-500/50">Beta</span>
              </div>

              <div>
                <h2 className="text-2xl font-medium mb-3">"Decide Like a Human. Act Like an AI."</h2>
                <p className="text-white/60 leading-relaxed max-w-2xl">
                  AI-powered copywriting tool for businesses and entrepreneurs, leveraging advanced
                  GPT-3 technology for strategic content creation and business planning.
                </p>
              </div>

              <div className="grid grid-cols-4 gap-3">
                {[
                  "AI Copywriting",
                  "GPT-3 Technology",
                  "Strategic Planning",
                  "Business Solutions"
                ].map((tech, i) => (
                  <div key={i} className="px-3 py-2 border border-white/10 hover:border-white/20">
                    <span className="text-xs text-white/60">{tech}</span>
                  </div>
                ))}
              </div>

              <a 
                href="https://boold.co" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="inline-flex items-center gap-2 text-xs text-white/40 hover:text-white/60"
              >
                <span className="uppercase tracking-wider">Get Early Access</span>
                <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </a>
            </div>
          </div>

          {/* BOOLD Design */}
          <div className="border border-white/10">
            <div className="p-8 space-y-6">
              <div className="flex items-center gap-2">
                <div className="w-1 h-1 bg-white/40" />
                <div className="text-[10px] uppercase tracking-wider text-white/40">BOOLD Design</div>
              </div>

              <div>
                <h2 className="text-2xl font-medium mb-3">"Innova con il design, racconta con il marketing."</h2>
                <p className="text-white/60 leading-relaxed max-w-2xl">
                  Creative agency in Modena specializing in branding, web design, and social media management.
                  Delivering modern and functional digital experiences tailored to business needs.
                </p>
              </div>

              <div className="grid grid-cols-4 gap-3">
                {[
                  "Brand Identity",
                  "Web Design",
                  "Social Media",
                  "Content Creation"
                ].map((service, i) => (
                  <div key={i} className="px-3 py-2 border border-white/10 hover:border-white/20">
                    <span className="text-xs text-white/60">{service}</span>
                  </div>
                ))}
              </div>

              <a 
                href="https://boold.it" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="inline-flex items-center gap-2 text-xs text-white/40 hover:text-white/60"
              >
                <span className="uppercase tracking-wider">View Operations</span>
                <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </a>
            </div>
          </div>

          {/* UniSpot Project */}
          <div className="border border-white/10">
            <div className="p-8 space-y-6">
              {/* Project Preview */}
              <div className="relative aspect-[21/9] border border-white/10 overflow-hidden">
                <iframe
                  src="https://uni-posti.vercel.app"
                  title="UniSpot Live Demo"
                  className="absolute inset-0 w-full h-full"
                  style={{ border: 'none' }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/90 to-transparent">
                  <div className="absolute inset-0 bg-[radial-gradient(#ffffff11_1px,transparent_1px)] [background-size:16px_16px]" />
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <div className="inline-flex items-center gap-2 mb-3 px-2 py-1 border border-white/20 bg-black/50">
                    <div className="w-1 h-1 bg-emerald-500/50" />
                    <span className="text-[10px] uppercase tracking-wider text-white/60">Mission Objective</span>
                  </div>
                  
                  <h2 className="text-3xl text-white mb-3 font-medium tracking-wide">UniSpot</h2>
                  <p className="text-white/60 text-lg max-w-2xl leading-relaxed">
                    Real-time campus navigation system for Unimore University, featuring live occupancy tracking 
                    and space optimization across Modena's academic facilities.
                  </p>
                </div>
              </div>

              {/* Project Stats */}
              <div className="grid grid-cols-3 gap-3">
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
                    className={`relative border border-white/10 p-4 hover:border-white/20 transition-colors
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
              <div>
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
