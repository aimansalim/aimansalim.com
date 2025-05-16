import ThumbnailGallery from '../components/ThumbnailGallery';

const ThumbnailsPage = () => {
  return (
    <main className="min-h-screen flex flex-col">
      {/* Header with UniSpot styling */}
      <section className="pt-32 pb-16 relative">
        <div className="absolute inset-0 bg-gradient-radial from-white/5 via-transparent to-transparent" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center space-y-4">
            <h2 className="font-space-grotesk font-medium tracking-tight leading-none">
              <div className="flex items-center justify-center gap-2 mb-2">
                <div className="w-12 h-px bg-emerald-500"></div>
                <span className="text-sm text-emerald-500 uppercase tracking-wider font-light">YouTube Tools</span>
                <div className="w-12 h-px bg-emerald-500"></div>
              </div>
              <span className="text-[40px] text-zinc-500 block">YOUTUBE</span>
              <span className="text-[40px] text-white block mt-1">THUMBNAIL TOOL</span>
            </h2>
            
            <p className="text-zinc-400 max-w-2xl mx-auto font-space-grotesk text-base mt-6">
              Extract high-quality thumbnails from YouTube videos or channels. 
              Download single images or bulk export entire channels with date filtering.
            </p>
          </div>
        </div>
      </section>

      {/* Thumbnail Gallery - Flex-grow to push footer to bottom */}
      <section className="flex-grow flex items-center justify-center pb-16">
        <ThumbnailGallery />
      </section>
    </main>
  );
};

export default ThumbnailsPage; 