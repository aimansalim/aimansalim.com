import { useState, useCallback } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Command, ChevronRight, ExternalLink } from 'lucide-react';
import { BackgroundGrid } from './components/BackgroundGrid';
import { Navigation } from './components/Navigation';
import UniSpotPage from './pages/projects/UniSpotPage';
import DesignPage from './pages/projects/DesignPage';
import SuccessPage from './pages/success';
import AboutPage from './pages/AboutPage';
import { ContactForm } from './components/ContactForm';
import { Footer } from './components/Footer';
import { ExperienceSection } from './components/ExperienceSection';
import { UniSpotSection } from './components/UniSpotSection';
import { StatusIndicator } from './components/StatusIndicator';
import { ContentCreatorSection } from './components/ContentCreatorSection';
import { ScrollToTop } from './components/ScrollToTop';
import ProjectsPage from './pages/ProjectsPage';
import ThumbnailsPage from './pages/ThumbnailsPage';
import QuotesPage from './pages/QuotesPage';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuOpen = useCallback(() => {
    setIsMenuOpen(prev => !prev);
  }, []);

  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen bg-black text-white relative flex flex-col">
        <BackgroundGrid />
        <Navigation onMenuOpen={handleMenuOpen} />
        
        <div className="flex-grow">
          <Routes>
            <Route path="/" element={
              <main className="pt-16">
                {/* Hero Section */}
                <section className="min-h-[90vh] flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-radial from-white/5 via-transparent to-transparent" />
                  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8 }}
                      className="text-center relative"
                    >
                      <div className="inline-flex items-center space-x-2 mt-24 sm:mt-12 mb-12 px-3 py-1.5 bg-black border border-white/10 rounded-[2px] backdrop-blur-sm relative">
                        <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-transparent opacity-20" />
                        <StatusIndicator />
                        <span className="text-[10px] tracking-[0.2em] text-white/50 uppercase relative">Working Status: Active</span>
                      </div>
                      
                      <h1 className="font-space-grotesk font-medium tracking-tight leading-none mb-12">
                        <span className="text-[40px] sm:text-[56px] text-zinc-500 block">AIMAN SALIM</span>
                        <span className="text-[40px] sm:text-[56px] text-white block mt-1">THE CREATOR'S ENGINEER</span>
                      </h1>
                      
                      <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-12 leading-relaxed">
                        Building tools I wish I had & designing stuff I want to see.
                      </p>

                      <div className="flex flex-col sm:flex-row items-center sm:items-center justify-center space-y-3 sm:space-y-0 sm:space-x-6 mb-24 px-4 sm:px-0">
                        <motion.a
                          href="#unispot-section"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="w-[240px] flex items-center justify-center px-8 py-4 bg-black border border-white/10 rounded-[2px] hover:bg-white/5 transition-colors group relative overflow-hidden"
                        >
                          <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-transparent opacity-20" />
                          <span className="text-[10px] tracking-[0.2em] text-white/90 uppercase relative">View Projects</span>
                          <Command className="h-3 w-3 ml-2 transition-transform group-hover:rotate-12 relative" />
                        </motion.a>
                        <motion.a
                          href="#contact"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="w-[240px] flex items-center justify-center px-8 py-4 bg-white text-black rounded-[2px] hover:bg-zinc-100 transition-colors relative overflow-hidden"
                        >
                          <span className="text-[10px] tracking-[0.2em] uppercase">Initiate Contact</span>
                          <ExternalLink className="h-3 w-3 ml-2" />
                        </motion.a>
                      </div>

                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1 }}
                        className="relative bottom-0 left-1/2 transform -translate-x-1/2"
                      >
                        <a href="#projects" className="flex flex-col items-center space-y-2 text-white/40 hover:text-white/60 transition-colors">
                          <span className="text-xs tracking-wider">SCROLL TO EXPLORE</span>
                          <ChevronRight className="h-4 w-4 rotate-90" />
                        </a>
                      </motion.div>
                    </motion.div>
                  </div>
                </section>

                {/* UniSpot Section */}
                <section id="unispot-section">
                  <UniSpotSection />
                </section>

                {/* Content Creator Section */}
                <ContentCreatorSection />

                {/* Experience Section */}
                <ExperienceSection />

                {/* Contact Section */}
                <section id="contact" className="py-32 relative">
                  <div className="absolute inset-0 bg-gradient-radial from-white/5 via-transparent to-transparent" />
                  <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 relative">
                    <ContactForm />
                  </div>
                </section>
              </main>
            } />
            <Route path="/projects" element={<ProjectsPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/success" element={<SuccessPage />} />
            <Route path="/projects/unispot" element={<UniSpotPage />} />
            <Route path="/projects/design" element={<DesignPage />} />
            <Route path="/thumbnails" element={<ThumbnailsPage />} />
            <Route path="/quotes" element={<QuotesPage />} />
            <Route path="/contact" element={
              <div className="pt-32 pb-16">
                <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                  <ContactForm />
                </div>
              </div>
            } />
          </Routes>
        </div>
        
        <Footer />
      </div>
    </Router>
  );
}

export default App;