// import React from 'react';
import { motion } from 'framer-motion';

const ApiIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
    <path d="M4 4H20V20H4V4Z" />
    <path d="M4 12H20" />
    <path d="M12 4V20" />
  </svg>
);

const DatabaseIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
    <path d="M4 6h16M4 10h16M4 14h16M4 18h16" />
    <rect x="4" y="4" width="16" height="16" />
  </svg>
);

const InterfaceIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
    <path d="M4 4H20V20H4V4Z" />
    <path d="M8 8H16" />
    <path d="M8 12H16" />
    <path d="M8 16H12" />
  </svg>
);

const CornerDecorations = () => (
  <>
    <div className="absolute top-0 left-0 h-4 w-4 border-t border-l border-white/20" />
    <div className="absolute top-0 right-0 h-4 w-4 border-t border-r border-white/20" />
    <div className="absolute bottom-0 left-0 h-4 w-4 border-b border-l border-white/20" />
    <div className="absolute bottom-0 right-0 h-4 w-4 border-b border-r border-white/20" />
  </>
);

const UniSpotPage = () => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-black pt-24 pb-16 font-space-grotesk"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Project Header */}
        <div className="relative border border-white/10 p-6 md:p-8 mb-8">
          <CornerDecorations />
          <div className="flex items-center gap-2 mb-4">
            <div className="w-12 h-px bg-emerald-500"></div>
            <span className="text-xs md:text-sm text-emerald-500 uppercase tracking-wider font-light">Campus Navigation System</span>
            <div className="w-12 h-px bg-emerald-500"></div>
          </div>
          <div className="space-y-2 md:space-y-4">
            <h1 className="text-[28px] md:text-[40px] leading-none text-zinc-500">UNISPOT</h1>
            <h2 className="text-[28px] md:text-[40px] leading-none text-white">UNIMORE MODENA</h2>
          </div>
        </div>

        {/* Live Demo Map - Prominent Position */}
        <div className="relative border border-white/10 overflow-hidden mb-16">
          <CornerDecorations />
          {/* Smart Live Demo Tag */}
          <div className="absolute top-0 right-0 z-20">
            <div className="flex items-center border border-white/10 bg-black">
              <div className="px-3 py-2 border-r border-white/10 flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-emerald-500 animate-pulse" />
                <span className="text-[10px] font-space-grotesk text-white/60 uppercase tracking-wider">System Status</span>
              </div>
              <div className="px-3 py-2">
                <span className="text-[10px] font-space-grotesk text-emerald-500 uppercase tracking-wider">Online</span>
              </div>
            </div>
          </div>
          <iframe
            src="https://uni-posti.vercel.app"
            title="UniSpot Live Demo"
            className="w-full h-[600px] border-none"
          />
        </div>

        {/* Project Details Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {/* Role */}
          <div className="relative border border-white/10 p-8">
            <CornerDecorations />
            <h3 className="text-emerald-500 text-xs tracking-wider mb-4">ROLE</h3>
            <ul className="space-y-2">
              <li className="text-zinc-300 text-sm">Solo Developer</li>
              <li className="text-zinc-300 text-sm">API Integration</li>
              <li className="text-zinc-300 text-sm">System Architecture</li>
            </ul>
          </div>
          
          {/* Technologies */}
          <div className="relative border border-white/10 p-8">
            <CornerDecorations />
            <h3 className="text-emerald-500 text-xs tracking-wider mb-4">TECHNOLOGIES</h3>
            <ul className="space-y-2">
              <li className="text-zinc-300 text-sm">React Native</li>
              <li className="text-zinc-300 text-sm">Node.js</li>
              <li className="text-zinc-300 text-sm">Unimore API</li>
            </ul>
          </div>
          
          {/* Timeline */}
          <div className="relative border border-white/10 p-8">
            <CornerDecorations />
            <h3 className="text-emerald-500 text-xs tracking-wider mb-4">TIMELINE</h3>
            <p className="text-zinc-300 text-sm">2023 - Present</p>
          </div>
        </div>

        {/* Technical Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="group relative h-[320px]">
            <div className="absolute inset-0 border border-white/20 -translate-x-2 -translate-y-2 transition-transform group-hover:translate-x-0 group-hover:translate-y-0" />
            <div className="relative h-full border border-white/20 bg-white/[0.01]">
              <div className="absolute inset-0 p-8 flex flex-col">
                <CornerDecorations />
                <div className="mb-8 text-emerald-500">
                  <ApiIcon />
                </div>
                <h3 className="text-white text-lg mb-4">API INTEGRATION</h3>
                <p className="text-zinc-400 text-sm">
                  Successfully reverse-engineered and integrated the undocumented Unimore API, enabling real-time access to classroom availability data.
                </p>
              </div>
            </div>
          </div>

          <div className="group relative h-[320px]">
            <div className="absolute inset-0 border border-white/20 -translate-x-2 -translate-y-2 transition-transform group-hover:translate-x-0 group-hover:translate-y-0" />
            <div className="relative h-full border border-white/20 bg-white/[0.01]">
              <div className="absolute inset-0 p-8 flex flex-col">
                <CornerDecorations />
                <div className="mb-8 text-emerald-500">
                  <DatabaseIcon />
                </div>
                <h3 className="text-white text-lg mb-4">DATA PROCESSING</h3>
                <p className="text-zinc-400 text-sm">
                  Efficient data processing system that transforms raw university data into actionable information about classroom availability.
                </p>
              </div>
            </div>
          </div>

          <div className="group relative h-[320px]">
            <div className="absolute inset-0 border border-white/20 -translate-x-2 -translate-y-2 transition-transform group-hover:translate-x-0 group-hover:translate-y-0" />
            <div className="relative h-full border border-white/20 bg-white/[0.01]">
              <div className="absolute inset-0 p-8 flex flex-col">
                <CornerDecorations />
                <div className="mb-8 text-emerald-500">
                  <InterfaceIcon />
                </div>
                <h3 className="text-white text-lg mb-4">USER INTERFACE</h3>
                <p className="text-zinc-400 text-sm">
                  Clean, functional interface that allows students to quickly find and navigate to available study spaces across campus.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default UniSpotPage;
