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

export default function DesignPage() {
  const videos: VideoData[] = [
    { id: "P5k2u9DlCho", views: "3.1M" },
    { id: "WQBHdqJTRbE", views: "1.5M" },
    { id: "t1ruNmcNCpU", views: "1.5M" },
    { id: "SwYpISNJdMY", views: "1.3M" },
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
        <div className="relative border border-white/10 overflow-hidden mb-16">
          {/* System Status Tag */}
          <div className="absolute top-0 right-0 z-20">
            <div className="flex items-center border border-white/10 bg-black">
              <div className="px-3 py-2 border-r border-white/10 flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-emerald-500 animate-pulse" />
                <span className="text-[10px] font-space-grotesk text-white/60 uppercase tracking-wider">Content Status</span>
              </div>
              <div className="px-3 py-2">
                <span className="text-[10px] font-space-grotesk text-white/60 uppercase tracking-wider">Online</span>
              </div>
            </div>
          </div>

          <div className="relative w-full overflow-hidden py-8">
            {/* Edge Gradients */}
            <div className="absolute inset-y-0 left-0 w-16 md:w-32 bg-gradient-to-r from-black to-transparent z-10" />
            <div className="absolute inset-y-0 right-0 w-16 md:w-32 bg-gradient-to-l from-black to-transparent z-10" />
            
            <div className="flex flex-col gap-8">
              {/* Top Row */}
              <div className="relative overflow-hidden" style={{ height: cardHeight }}>
                <motion.div
                  className="flex gap-8 md:gap-12 absolute left-0 p-0"
                  animate={{
                    x: [-calculateWidth(videos), 0],
                  }}
                  transition={{
                    x: {
                      repeat: Infinity,
                      repeatType: "loop",
                      duration: duration,
                      ease: "linear",
                    },
                  }}
                  style={{ width: calculateWidth(videos) * 2 }}
                >
                  {[...videos, ...videos].map((video, index) => (
                    <div
                      key={`top-${index}`}
                      className="relative flex-none"
                      style={{ width: cardWidth }}
                    >
                      <div className="relative border border-white/10" style={{ height: cardHeight }}>
                        <img
                          src={`https://img.youtube.com/vi/${video.id}/maxresdefault.jpg`}
                          alt={`Content ${index + 1}`}
                          className="absolute inset-0 w-full h-full object-cover bg-black"
                          loading="lazy"
                        />
                        <div className="absolute -top-3 -right-3 z-50 flex items-center bg-black border border-white/10">
                          <div className="px-3 py-1.5 flex items-center gap-2">
                            <svg 
                              className="text-emerald-500" 
                              width="12" 
                              height="12" 
                              viewBox="0 0 10 10" 
                              fill="none"
                            >
                              <path d="M2 8L8 2M8 2H3M8 2V7" stroke="currentColor" strokeWidth="1"/>
                            </svg>
                            <span className="text-[10px] md:text-xs font-space-grotesk text-white/80 uppercase tracking-wider">
                              {video.views}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </motion.div>
              </div>

              {/* Bottom Row */}
              <div className="relative overflow-hidden" style={{ height: cardHeight }}>
                <motion.div
                  className="flex gap-8 md:gap-12 absolute left-0 p-0"
                  animate={{
                    x: [0, -calculateWidth(bottomVideos)],
                  }}
                  transition={{
                    x: {
                      repeat: Infinity,
                      repeatType: "loop",
                      duration: duration,
                      ease: "linear",
                    },
                  }}
                  style={{ width: calculateWidth(bottomVideos) * 2 }}
                >
                  {[...bottomVideos, ...bottomVideos].map((video, index) => (
                    <div
                      key={`bottom-${index}`}
                      className="relative flex-none"
                      style={{ width: cardWidth }}
                    >
                      <div className="relative border border-white/10" style={{ height: cardHeight }}>
                        <img
                          src={`https://img.youtube.com/vi/${video.id}/maxresdefault.jpg`}
                          alt={`Content ${index + 1}`}
                          className="absolute inset-0 w-full h-full object-cover bg-black"
                          loading="lazy"
                        />
                        <div className="absolute -top-3 -right-3 z-50 flex items-center bg-black border border-white/10">
                          <div className="px-3 py-1.5 flex items-center gap-2">
                            <svg 
                              className="text-emerald-500" 
                              width="12" 
                              height="12" 
                              viewBox="0 0 10 10" 
                              fill="none"
                            >
                              <path d="M2 8L8 2M8 2H3M8 2V7" stroke="currentColor" strokeWidth="1"/>
                            </svg>
                            <span className="text-[10px] md:text-xs font-space-grotesk text-white/80 uppercase tracking-wider">
                              {video.views}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </motion.div>
              </div>
            </div>
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

        {/* Web Development Section */}
        <div className="relative border border-white/10 p-8 mb-16">
          <CornerDecorations />

          {/* Header */}
          <div className="relative border border-white/10 p-4 mb-8">
            <CornerDecorations />
            <div className="flex items-center gap-2">
              <div className="w-4 h-px bg-emerald-500" />
              <span className="text-xs text-emerald-500 uppercase tracking-wider font-medium">Web Development</span>
            </div>
          </div>

          {/* Content Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Left Column */}
            <div className="space-y-6">
              {/* Title & Description */}
              <div className="relative border border-white/10 p-4">
                <CornerDecorations />
                <h2 className="text-lg text-white font-medium mb-3">Financial Course Platform</h2>
                <p className="text-zinc-500 text-sm leading-relaxed">
                  Led the development of aledellagiusta's financial course platform, creating a high-conversion landing page that seamlessly integrates with Scalable's infrastructure.
                </p>
              </div>

              {/* Preview */}
              <div className="relative border border-white/10 p-1">
                <CornerDecorations />
                <a 
                  href="https://aledellagiusta.it" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="block relative overflow-hidden group"
                >
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/80 z-10" />
                  <div className="absolute bottom-2 left-2 z-20">
                    <div className="flex items-center gap-2 text-xs text-white/80">
                      <span className="font-space-grotesk tracking-wider">aledellagiusta.it</span>
                      <svg 
                        className="w-3 h-3 text-emerald-500" 
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
                    </div>
                  </div>
                  <div className="bg-zinc-900 relative" style={{ height: '120px' }}>
                    <div className="absolute inset-0 flex items-center justify-center border border-white/5">
                      <div className="text-white/20 text-xs font-space-grotesk tracking-wider">VISIT WEBSITE</div>
                    </div>
                  </div>
                </a>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4">
                <div className="relative border border-white/10 p-4">
                  <CornerDecorations />
                  <div className="text-2xl font-medium text-white mb-1">40K€+</div>
                  <div className="text-[10px] text-zinc-500 uppercase tracking-wider">First Month Sales</div>
                </div>
                <div className="relative border border-white/10 p-4">
                  <CornerDecorations />
                  <div className="text-2xl font-medium text-white mb-1">100%</div>
                  <div className="text-[10px] text-zinc-500 uppercase tracking-wider">Uptime</div>
                </div>
              </div>
            </div>

            {/* Right Column - Tech Stack */}
            <div className="relative border border-white/10 p-4">
              <CornerDecorations />
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-px bg-emerald-500" />
                  <h3 className="text-xs text-emerald-500 uppercase tracking-wider font-medium">Tech Stack</h3>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {["React", "TypeScript", "TailwindCSS", "Framer Motion", "Node.js", "AWS"].map((tech, index) => (
                    <div key={index} className="relative border border-white/10 px-3 py-2 group">
                      <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                      <span className="text-[10px] font-space-grotesk text-white/60 uppercase tracking-wider">{tech}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

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
