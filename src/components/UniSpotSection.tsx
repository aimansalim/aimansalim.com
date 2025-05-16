import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { StatusIndicator } from './StatusIndicator';

export const UniSpotSection = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  return (
    <section id="unispot" className="relative py-24">
      <div className="max-w-7xl mx-auto px-8 relative">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="space-y-16"
        >
          {/* Header */}
          <div className="text-center space-y-4">
            <h2 className="font-space-grotesk font-medium tracking-tight leading-none">
              <div className="flex items-center justify-center gap-2 mb-2">
                <div className="w-12 h-px bg-emerald-500"></div>
                <span className="text-sm text-emerald-500 uppercase tracking-wider font-light">Navigation System</span>
                <div className="w-12 h-px bg-emerald-500"></div>
              </div>
              <span className="text-[40px] text-zinc-500 block">UNISPOT</span>
              <span className="text-[40px] text-white block mt-1">UNIMORE MODENA</span>
            </h2>
            
            <p className="text-zinc-400 max-w-2xl mx-auto font-space-grotesk text-base mt-6">
              Real-time campus navigation system for Unimore University, featuring live occupancy tracking 
              and space optimization across Modena's academic facilities.
            </p>
          </div>

          {/* App Preview */}
          <div className="relative w-full overflow-hidden border border-white/10 backdrop-blur-sm bg-white/[0.02]">
            {/* Live Demo Indicator */}
            <div className="absolute top-4 right-4 z-20 flex items-center space-x-2">
              <StatusIndicator />
              <span className="text-white/60 uppercase tracking-widest text-xs">LIVE DEMO</span>
            </div>

            {/* Mobile version (9:16) */}
            <div className="md:hidden">
              <div className="relative w-full" style={{ paddingBottom: '177.78%' }}>
                <div className="absolute inset-0">
                  <iframe
                    src="https://uni-posti.vercel.app"
                    title="UniSpot Live Demo"
                    className="w-full h-full"
                    style={{ border: 'none' }}
                  />
                </div>
              </div>
            </div>

            {/* Desktop version (21:9) */}
            <div className="hidden md:block">
              <div className="relative w-full" style={{ paddingBottom: '42.86%' }}>
                <div className="absolute inset-0">
                  <iframe
                    src="https://uni-posti.vercel.app"
                    title="UniSpot Live Demo"
                    className="w-full h-full"
                    style={{ border: 'none' }}
                  />
                </div>
              </div>
            </div>

            {/* Corner Markers */}
            <div className="absolute top-0 left-0 h-8 w-8 border-t border-l border-white/20" />
            <div className="absolute top-0 right-0 h-8 w-8 border-t border-r border-white/20" />
            <div className="absolute bottom-0 left-0 h-8 w-8 border-b border-l border-white/20" />
            <div className="absolute bottom-0 right-0 h-8 w-8 border-b border-r border-white/20" />
          </div>

          {/* View Live Demo Button */}
          <div className="flex justify-center mt-8">
            <a 
              href="https://uni-posti.vercel.app" 
              target="_blank" 
              rel="noopener noreferrer"
              className="group relative"
            >
              <div className="absolute inset-0 border border-white/20 -translate-x-2 -translate-y-2 transition-transform group-hover:translate-x-0 group-hover:translate-y-0" />
              <div className="px-6 py-3 border border-white/20 relative bg-black transition-colors group-hover:bg-white group-hover:text-black">
                <span className="text-xs font-space-grotesk uppercase tracking-wider">VIEW PROJECT</span>
              </div>
            </a>
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
            {[
              {
                title: "TACTICAL MONITORING",
                description: "Secure campus surveillance and occupancy tracking",
                specs: ["< 5ms Response", "99.9% Combat Ready", "24/7 Active Duty"]
              },
              {
                title: "FIELD OPERATIONS",
                description: "Strategic deployment of resources across campus zones",
                specs: ["Live Intel Feed", "25 Sectors Mapped", "100+ Hot Zones"]
              },
              {
                title: "COMMAND CENTER",
                description: "Mission control infrastructure and deployment systems",
                specs: ["Next.js Core", "Secure Database", "Live Comms Link"]
              }
            ].map((feature, index) => (
              <div 
                key={index}
                className="relative border border-white/10 p-4"
              >
                {/* Corner Markers */}
                <div className="absolute top-0 left-0 h-4 w-4 border-t border-l border-white/20" />
                <div className="absolute top-0 right-0 h-4 w-4 border-t border-r border-white/20" />
                <div className="absolute bottom-0 left-0 h-4 w-4 border-b border-l border-white/20" />
                <div className="absolute bottom-0 right-0 h-4 w-4 border-b border-r border-white/20" />
                
                <div className="space-y-3">
                  {/* Title */}
                  <div className="flex items-center gap-2">
                    <div className="w-1 h-1 bg-white/40" />
                    <h3 className="text-xs font-space-grotesk text-white tracking-wider">{feature.title}</h3>
                  </div>
                  
                  {/* Description */}
                  <p className="text-[10px] text-white/60 font-space-grotesk tracking-wide">
                    {feature.description}
                  </p>
                  
                  {/* Specs */}
                  <div className="flex gap-3">
                    {feature.specs.map((spec, i) => (
                      <div 
                        key={i}
                        className="text-[8px] font-space-grotesk text-white/40 tracking-wider border border-white/10 px-2 py-1"
                      >
                        {spec}
                      </div>
                    ))}
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
