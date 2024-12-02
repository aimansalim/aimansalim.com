import { motion } from 'framer-motion';

export const GridOverlay = () => {
  return (
    <div className="fixed inset-0 pointer-events-none">
      {/* Vertical Lines */}
      <div className="absolute inset-0 flex justify-between px-8">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="w-px h-full bg-white/10"
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ duration: 1, delay: i * 0.1 }}
          />
        ))}
      </div>

      {/* Horizontal Lines */}
      <div className="absolute inset-0 flex flex-col justify-between py-8">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="w-full h-px bg-white/10"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1, delay: i * 0.1 }}
          />
        ))}
      </div>
    </div>
  );
};
