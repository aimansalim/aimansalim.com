import { motion } from 'framer-motion';

interface VideoData {
  id: string;
  views: string;
}

const TrendingIcon = () => (
  <svg className="w-3 h-3 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
  </svg>
);

export const ContentGallery = () => {
  const videos: VideoData[] = [
    { id: "P5k2u9DlCho", views: "3.1M" },
    { id: "WQBHdqJTRbE", views: "1.5M" },
    { id: "t1ruNmcNCpU", views: "1.5M" },
    { id: "bniJeerctfo", views: "1.3M" },
  ];

  const bottomVideos: VideoData[] = [
    { id: "bniJeerctfo", views: "1.1M" },
    { id: "E3dZFmpyIao", views: "956K" },
    { id: "iDZRDU73ax4", views: "1.1M" },
    { id: "-kXlPk9cikM", views: "1.0M" },
  ];

  const cardWidth = 320;
  const gapSize = 24;
  const duration = 20;

  const calculateWidth = (videoArray: VideoData[]) => {
    return (cardWidth + gapSize) * videoArray.length;
  };

  return (
    <div className="space-y-8">
      {/* Top Row */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-y-0 left-0 w-16 md:w-32 bg-gradient-to-r from-black to-transparent z-10" />
        <div className="absolute inset-y-0 right-0 w-16 md:w-32 bg-gradient-to-l from-black to-transparent z-10" />
        
        <motion.div
          className="flex gap-8"
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
                alt=""
                className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-2 right-2 z-20 flex items-center gap-1 text-xs text-white/80">
                <span>{video.views}</span>
                <TrendingIcon />
              </div>
            </motion.a>
          ))}
        </motion.div>
      </div>

      {/* Bottom Row */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-y-0 left-0 w-16 md:w-32 bg-gradient-to-r from-black to-transparent z-10" />
        <div className="absolute inset-y-0 right-0 w-16 md:w-32 bg-gradient-to-l from-black to-transparent z-10" />
        
        <motion.div
          className="flex gap-8"
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
                alt=""
                className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-2 right-2 z-20 flex items-center gap-1 text-xs text-white/80">
                <span>{video.views}</span>
                <TrendingIcon />
              </div>
            </motion.a>
          ))}
        </motion.div>
      </div>
    </div>
  );
};