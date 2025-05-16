// import React from 'react';
import { motion } from 'framer-motion';
import { ContentGallery } from './ContentGallery';

const StatBox = ({ number, label }: { number: string; label: string }) => (
  <div className="group relative">
    <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    <div className="absolute inset-0 border border-white/20 -translate-x-2 -translate-y-2 transition-transform group-hover:translate-x-0 group-hover:translate-y-0" />
    <div className="border border-white/10 p-4 relative bg-black">
      <div className="absolute top-0 right-0 w-8 h-8">
        <div className="absolute top-0 right-0 w-full h-full border-t border-r border-white/20" />
        <div className="absolute top-0 right-0 w-2 h-2 bg-emerald-500/20" />
      </div>
      <div className="flex items-baseline gap-1">
        <div className="text-3xl font-medium font-space-grotesk">{number}</div>
        <div className="text-emerald-500 text-sm">▲</div>
      </div>
      <div className="text-sm text-zinc-500 uppercase tracking-wider mt-1">{label}</div>
    </div>
  </div>
);

const ActionButton = ({ label, href }: { label: string; href: string }) => (
  <a 
    href={href} 
    target="_blank" 
    rel="noopener noreferrer"
    className="group relative"
  >
    <div className="absolute inset-0 border border-white/20 -translate-x-2 -translate-y-2 transition-transform group-hover:translate-x-0 group-hover:translate-y-0" />
    <div className="px-6 py-3 border border-white/20 relative bg-black transition-colors group-hover:bg-white group-hover:text-black">
      <span className="text-xs font-space-grotesk uppercase tracking-wider">{label}</span>
    </div>
  </a>
);

export const ContentCreatorSection = () => {
  return (
    <section id="content-creator" className="relative py-32">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-black/95 to-black" />
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative aspect-video bg-black border border-white/10"
          >
            {/* Corner Markers */}
            <div className="absolute top-0 left-0 h-8 w-8">
              <div className="absolute top-0 left-0 w-full h-full border-t border-l border-white/20" />
              <div className="absolute top-0 left-0 w-2 h-2 bg-emerald-500/20" />
            </div>
            <div className="absolute top-0 right-0 h-8 w-8">
              <div className="absolute top-0 right-0 w-full h-full border-t border-r border-white/20" />
              <div className="absolute top-0 right-0 w-2 h-2 bg-emerald-500/20" />
            </div>
            <div className="absolute bottom-0 left-0 h-8 w-8">
              <div className="absolute bottom-0 left-0 w-full h-full border-b border-l border-white/20" />
              <div className="absolute bottom-0 left-0 w-2 h-2 bg-emerald-500/20" />
            </div>
            <div className="absolute bottom-0 right-0 h-8 w-8">
              <div className="absolute bottom-0 right-0 w-full h-full border-b border-r border-white/20" />
              <div className="absolute bottom-0 right-0 w-2 h-2 bg-emerald-500/20" />
            </div>

            {/* Status Indicator */}
            <div className="absolute -top-3 -right-3 z-50 flex items-center bg-black border border-white/10">
              <div className="px-2 py-1 flex items-center gap-1.5">
                <motion.div
                  className="w-1.5 h-1.5 rounded-full bg-emerald-500"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [1, 0.7, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
                <span className="text-[8px] font-space-grotesk text-white/80 uppercase tracking-wider">LIVE FEED</span>
              </div>
            </div>

            <ContentGallery />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="space-y-8">
              <div className="space-y-2">
                <h2 className="font-space-grotesk font-medium tracking-tight leading-none mb-16">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <div className="w-12 h-px bg-emerald-500"></div>
                    <span className="text-sm text-emerald-500 uppercase tracking-wider font-light">Content Creation</span>
                    <div className="w-12 h-px bg-emerald-500"></div>
                  </div>
                  <span className="text-[40px] text-zinc-500 block">GRAPHIC DESIGN</span>
                  <span className="text-[40px] text-white block mt-1">THUMBNAILS</span>
                </h2>
                <p className="text-zinc-400 font-space-grotesk text-base leading-relaxed max-w-lg">
                  Architecting high-impact content systems that have driven 190M+ views. 
                  Deploying advanced engagement algorithms and innovative presentation frameworks 
                  for maximum content effectiveness.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <StatBox number="190M+" label="Total Views" />
                <StatBox number="1.2M+" label="Subscribers" />
              </div>

              <div className="flex flex-wrap gap-4 pt-4">
                <ActionButton label="VIEW DESIGNS" href="/projects/design" />
          
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
