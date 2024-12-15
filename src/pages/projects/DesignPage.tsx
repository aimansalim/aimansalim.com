import { type FC } from 'react';
import { motion } from 'framer-motion';

interface VideoData {
  id: string;
  views: string;
}

interface BrandData {
  name: string;
  url: string;
}

const StatBox = ({ number, label }: { number: string; label: string }) => (
  <div className="group relative">
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

const BrandIcon: FC<{ name: string; url: string }> = ({ name, url }) => (
  <a 
    href={url}
    target="_blank"
    rel="noopener noreferrer" 
    className="border border-white/10 px-4 py-3 flex items-center justify-center hover:bg-white/5 transition-colors min-w-[200px]"
  >
    <span className="text-sm font-space-grotesk text-white/60 uppercase tracking-wider">{name}</span>
  </a>
);

const CornerDecorations = () => (
  <>
    <div className="absolute top-0 left-0 h-4 w-4 border-t border-l border-white/20" />
    <div className="absolute top-0 right-0 h-4 w-4 border-t border-r border-white/20" />
    <div className="absolute bottom-0 left-0 h-4 w-4 border-b border-l border-white/20" />
    <div className="absolute bottom-0 right-0 h-4 w-4 border-b border-r border-white/20" />
  </>
);

const ProjectSection = () => (
  <div className="relative border border-white/10 p-8 md:p-12">
    <CornerDecorations />
    
    {/* Header */}
    <div className="flex items-center gap-2 mb-12">
      <div className="w-1 h-1 bg-white/40" />
      <div className="text-[10px] uppercase tracking-wider text-white/40">Web Development</div>
      <div className="flex-1 h-px bg-white/10" />
    </div>

    {/* Title & Description */}
    <div className="space-y-8 mb-12">
      <h2 className="text-4xl font-light tracking-tight">Financial Course Platform</h2>
      <p className="text-base text-white/60 max-w-2xl leading-relaxed">
        Led the development of aledellagiusta's financial course platform, creating a high-conversion 
        landing page that seamlessly integrates with Scalable's infrastructure.
      </p>
    </div>

    {/* Project Info Grid */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
      {/* Link Section */}
      <div className="space-y-4">
        <div className="text-sm text-white/40 uppercase tracking-wider">Project URL</div>
        <a 
          href="https://aledellagiusta.it" 
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-white hover:text-white/80 transition-colors"
        >
          <span>aledellagiusta.it</span>
          <svg 
            className="w-4 h-4 text-emerald-500" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" 
            />
          </svg>
        </a>
      </div>

      {/* Metrics Grid */}
      <div className="col-span-2 grid grid-cols-2 gap-8">
        <div className="space-y-4">
          <div className="text-sm text-white/40 uppercase tracking-wider">First Month Sales</div>
          <div className="text-3xl font-light">40K€+</div>
        </div>
        <div className="space-y-4">
          <div className="text-sm text-white/40 uppercase tracking-wider">Platform Uptime</div>
          <div className="text-3xl font-light">100%</div>
        </div>
      </div>
    </div>

    {/* Tech Stack */}
    <div className="space-y-6">
      <div className="text-sm text-white/40 uppercase tracking-wider">Tech Stack</div>
      <div className="flex flex-wrap gap-4">
        {[
          'React',
          'TypeScript',
          'TailwindCSS',
          'Framer Motion',
          'Node.js'
        ].map((tech, index) => (
          <div 
            key={index}
            className="relative border border-white/10 px-4 py-2 hover:border-white/20 transition-colors"
          >
            <CornerDecorations />
            <span className="text-sm">{tech}</span>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default function DesignPage() {
  const videos: VideoData[] = [
    { id: "P5k2u9DlCho", views: "3.1M" },
    { id: "WQBHdqJTRbE", views: "1.5M" },
    { id: "bniJeerctfo", views: "1.3M" },
    { id: "t1ruNmcNCpU", views: "1.5M" },
  ];

  const bottomVideos: VideoData[] = [
    { id: "bniJeerctfo", views: "1.1M" },
    { id: "E3dZFmpyIao", views: "956K" },
    { id: "iDZRDU73ax4", views: "1.1M" },
    { id: "-kXlPk9cikM", views: "1.0M" },
  ];

  const cardWidth = 280;
  const cardHeight = Math.floor(cardWidth * (9/16));
  const gapSize = 40;
  const duration = 80;

  const brandsLeft: BrandData[] = [
    { name: "Revolut", url: "https://www.revolut.com/" },
    { name: "Netflix", url: "https://www.netflix.com/" },
    { name: "Fastweb", url: "https://www.fastweb.it/" },
    { name: "Unobravo", url: "https://www.unobravo.com/" },
    { name: "Trade Republic", url: "https://www.traderepublic.com/" },
    { name: "Young Platform", url: "https://youngplatform.com/" },
  ];

  const brandsRight: BrandData[] = [
    { name: "NordVPN", url: "https://nordvpn.com/" },
    { name: "AirUp", url: "https://www.air-up.com/" },
    { name: "Satispay", url: "https://www.satispay.com/" },
    { name: "Buddy Bank", url: "https://www.buddybank.com/" },
    { name: "Hello Fresh", url: "https://www.hellofresh.com/" },
  ];

  const calculateWidth = (items: VideoData[] | BrandData[]) => (cardWidth + gapSize) * items.length;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-black py-24"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Project Header */}
        <div className="relative border border-white/10 p-6 md:p-8 mb-16">
          <CornerDecorations />
          <div className="flex items-center gap-2 mb-4">
            <div className="w-4 h-px bg-emerald-500" />
            <span className="text-xs md:text-sm text-emerald-500 uppercase tracking-wider font-light">Content Creation</span>
          </div>
          <div className="space-y-2 md:space-y-4">
            <h1 className="text-[28px] md:text-[40px] leading-none text-zinc-500">DESIGN</h1>
            <h2 className="text-[28px] md:text-[40px] leading-none text-white">PORTFOLIO</h2>
          </div>
          <p className="text-zinc-400 max-w-2xl text-sm md:text-base mt-6">
            Lead designer for Ale Della Giusta's YouTube channel since May 2021, contributing to growth from 3 to 15+ team members and 190M+ views.
          </p>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <StatBox number="190M+" label="TOTAL VIEWS" />
          <StatBox number="400+" label="LAYERS PER DESIGN" />
          <StatBox number="15+" label="TEAM GROWTH" />
        </div>

        {/* Content Gallery */}
        <div className="space-y-8 -mx-8 md:-mx-12">
          {/* Top Row */}
          <div className="relative overflow-hidden py-4">
            <div className="absolute inset-y-0 left-0 w-16 md:w-32 bg-gradient-to-r from-black to-transparent z-10" />
            <div className="absolute inset-y-0 right-0 w-16 md:w-32 bg-gradient-to-l from-black to-transparent z-10" />
            
            <motion.div
              className="flex gap-8 pl-8 md:pl-12"
              animate={{
                x: [-calculateWidth(videos), 0],
              }}
              transition={{
                x: {
                  repeat: Infinity,
                  repeatType: "loop",
                  duration: 20,
                  ease: "linear",
                },
              }}
            >
              {[...videos, ...videos].map((video, index) => (
                <motion.a
                  key={index}
                  href={`https://youtube.com/watch?v=${video.id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative aspect-video w-[320px] flex-none border border-white/10 overflow-hidden"
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10" />
                  <img 
                    src={`https://img.youtube.com/vi/${video.id}/maxresdefault.jpg`}
                    alt={`Video thumbnail ${index + 1}`}
                    className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-2 right-2 z-20 flex items-center gap-1 text-xs text-white/80">
                    <span>{video.views}</span>
                    <svg 
                      className="w-3 h-3" 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth={2} 
                        d="M14 5l7 7m0 0l-7 7m7-7H3" 
                      />
                    </svg>
                  </div>
                </motion.a>
              ))}
            </motion.div>
          </div>

          {/* Bottom Row */}
          <div className="relative overflow-hidden py-4">
            <div className="absolute inset-y-0 left-0 w-16 md:w-32 bg-gradient-to-r from-black to-transparent z-10" />
            <div className="absolute inset-y-0 right-0 w-16 md:w-32 bg-gradient-to-l from-black to-transparent z-10" />
            
            <motion.div
              className="flex gap-8 pl-8 md:pl-12"
              animate={{
                x: [0, -calculateWidth(bottomVideos)],
              }}
              transition={{
                x: {
                  repeat: Infinity,
                  repeatType: "loop",
                  duration: 20,
                  ease: "linear",
                },
              }}
            >
              {[...bottomVideos, ...bottomVideos].map((video, index) => (
                <motion.a
                  key={index}
                  href={`https://youtube.com/watch?v=${video.id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative aspect-video w-[320px] flex-none border border-white/10 overflow-hidden"
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10" />
                  <img 
                    src={`https://img.youtube.com/vi/${video.id}/maxresdefault.jpg`}
                    alt={`Video thumbnail ${index + 1}`}
                    className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-2 right-2 z-20 flex items-center gap-1 text-xs text-white/80">
                    <span>{video.views}</span>
                    <svg 
                      className="w-3 h-3" 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth={2} 
                        d="M14 5l7 7m0 0l-7 7m7-7H3" 
                      />
                    </svg>
                  </div>
                </motion.a>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Experience Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div className="border border-white/10 p-8">
            <h3 className="text-emerald-500 text-sm tracking-wider mb-6">ROLE EVOLUTION</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-px h-full bg-white/10" />
                <div>
                  <div className="text-white text-sm font-medium mb-1">2021 - PRESENT</div>
                  <div className="text-zinc-500 text-sm">Started as sole designer for aledellagiusta, developing a unique documentary style that helped grow from 3 to 15+ team members.</div>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-px h-full bg-white/10" />
                <div>
                  <div className="text-white text-sm font-medium mb-1">2023</div>
                  <div className="text-zinc-500 text-sm">Team growth to 15+ members, company formation, €600K revenue achievement.</div>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-px h-full bg-white/10" />
                <div>
                  <div className="text-white text-sm font-medium mb-1">2024</div>
                  <div className="text-zinc-500 text-sm">Continued evolution of design system and brand identity.</div>
                </div>
              </div>
            </div>
          </div>

          <div className="border border-white/10 p-8">
            <h3 className="text-emerald-500 text-sm tracking-wider mb-6">DESIGN APPROACH</h3>
            <div className="space-y-4">
              <div className="text-zinc-500 text-sm">
                Each design is meticulously crafted with over 400 layers, where every detail is manually placed and thoughtfully considered. Our documentary style combines:
              </div>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-emerald-500" />
                  <span className="text-zinc-300">Strategic visual hierarchy</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-emerald-500" />
                  <span className="text-zinc-300">Precise typography</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-emerald-500" />
                  <span className="text-zinc-300">Handcrafted compositions</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <ProjectSection />

        {/* Brand Collaborations */}
        <div className="mt-12 grid grid-cols-1 gap-y-6">
          {/* Top Row - Left to Right */}
          <div className="relative overflow-hidden h-[52px]">
            <motion.div
              className="flex gap-4 absolute left-0"
              animate={{
                x: [-calculateWidth(brandsLeft), 0],
              }}
              transition={{
                duration,
                ease: "linear",
                repeat: Infinity,
                repeatType: "loop",
              }}
              style={{ width: calculateWidth(brandsLeft) * 2 }}
            >
              {[...brandsLeft, ...brandsLeft].map((brand, index) => (
                <BrandIcon key={`left-${index}`} name={brand.name} url={brand.url} />
              ))}
            </motion.div>
          </div>

          {/* Bottom Row - Right to Left */}
          <div className="relative overflow-hidden h-[52px]">
            <motion.div
              className="flex gap-4 absolute left-0"
              animate={{
                x: [0, -calculateWidth(brandsRight)],
              }}
              transition={{
                duration,
                ease: "linear",
                repeat: Infinity,
                repeatType: "loop",
              }}
              style={{ width: calculateWidth(brandsRight) * 2 }}
            >
              {[...brandsRight, ...brandsRight].map((brand, index) => (
                <BrandIcon key={`right-${index}`} name={brand.name} url={brand.url} />
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
