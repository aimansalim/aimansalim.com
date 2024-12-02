import { motion } from 'framer-motion';

interface VideoData {
  id: string;
  views: string;
}

const TrendingIcon = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M2 10L10 2" stroke="currentColor" strokeWidth="1" />
    <path d="M4 2H10V8" stroke="currentColor" strokeWidth="1" />
  </svg>
);

export const ContentGallery = () => {
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

  const cardWidth = 320;
  const cardHeight = Math.floor(cardWidth * (9/16));
  const gapSize = 24;
  const duration = 30;

  const calculateWidth = (items: VideoData[]) => (cardWidth + gapSize) * items.length;

  return (
    <div className="relative bg-black w-full h-full">
      <div className="relative w-full h-full overflow-hidden py-8 md:py-16">
        {/* Edge Gradients */}
        <div className="absolute inset-y-0 left-0 w-8 md:w-16 bg-gradient-to-r from-black to-transparent z-10" />
        <div className="absolute inset-y-0 right-0 w-8 md:w-16 bg-gradient-to-l from-black to-transparent z-10" />
        
        <div className="absolute inset-0 flex flex-col justify-center gap-6 md:gap-12">
          {/* Top Row - Left to Right */}
          <div className="relative overflow-hidden" style={{ height: cardHeight }}>
            <motion.div
              className="flex gap-3 md:gap-6 absolute left-0 p-0"
              animate={{
                x: [-calculateWidth(videos)/2, -calculateWidth(videos)],
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
              {[...videos, ...videos, ...videos, ...videos].map((video, index) => (
                <div
                  key={`top-${index}`}
                  className="relative flex-none w-[260px] md:w-[300px]"
                >
                  <div className="flex flex-col">
                    {/* Views Tag */}
                    <div className="absolute -top-2 -right-2 z-50 flex items-center bg-black border border-white/10">
                      <div className="px-2 py-1 flex items-center gap-1.5">
                        <TrendingIcon />
                        <span className="text-[8px] md:text-[10px] font-space-grotesk text-white/80 uppercase tracking-wider">
                          {video.views}
                        </span>
                      </div>
                    </div>
                    {/* Image container */}
                    <div className="relative border border-white/10" style={{ height: `${cardHeight}px` }}>
                      <img
                        src={`https://img.youtube.com/vi/${video.id}/maxresdefault.jpg`}
                        alt={`Content ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    {/* Info below image */}
                    <div className="mt-2">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <div className="text-[8px] md:text-[10px] font-space-grotesk text-white uppercase tracking-wider">
                            THUMBNAIL_{String(index + 1).padStart(3, '0')}
                          </div>
                          <div className="text-[6px] md:text-[8px] font-space-grotesk text-white/60 uppercase tracking-wider">
                            DOCUMENTARY
                          </div>
                        </div>
                        <div className="text-[6px] md:text-[8px] font-space-grotesk text-white/60 uppercase tracking-wider">
                          SEC.{String.fromCharCode(65 + (index % 4))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Bottom Row - Right to Left */}
          <div className="relative overflow-hidden" style={{ height: cardHeight }}>
            <motion.div
              className="flex gap-3 md:gap-6 absolute right-0 p-0"
              animate={{
                x: [calculateWidth(bottomVideos)/2, 0],
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
              {[...bottomVideos, ...bottomVideos, ...bottomVideos, ...bottomVideos].map((video, index) => (
                <div
                  key={`bottom-${index}`}
                  className="relative flex-none w-[260px] md:w-[300px]"
                >
                  <div className="flex flex-col">
                    {/* Views Tag */}
                    <div className="absolute -top-2 -right-2 z-50 flex items-center bg-black border border-white/10">
                      <div className="px-2 py-1 flex items-center gap-1.5">
                        <TrendingIcon />
                        <span className="text-[8px] md:text-[10px] font-space-grotesk text-white/80 uppercase tracking-wider">
                          {video.views}
                        </span>
                      </div>
                    </div>
                    {/* Image container */}
                    <div className="relative border border-white/10" style={{ height: `${cardHeight}px` }}>
                      <img
                        src={`https://img.youtube.com/vi/${video.id}/maxresdefault.jpg`}
                        alt={`Content ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    {/* Info below image */}
                    <div className="mt-2">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <div className="text-[8px] md:text-[10px] font-space-grotesk text-white uppercase tracking-wider">
                            THUMBNAIL_{String(index + 1).padStart(3, '0')}
                          </div>
                          <div className="text-[6px] md:text-[8px] font-space-grotesk text-white/60 uppercase tracking-wider">
                            DOCUMENTARY
                          </div>
                        </div>
                        <div className="text-[6px] md:text-[8px] font-space-grotesk text-white/60 uppercase tracking-wider">
                          SEC.{String.fromCharCode(65 + (index % 4))}
                        </div>
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
  );
};