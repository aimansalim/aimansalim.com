import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Command, ChevronRight, ExternalLink } from 'lucide-react';
import { BackgroundGrid } from './components/BackgroundGrid';
import { Navigation } from './components/Navigation';
import { NavigationBar } from './components/NavigationBar';
import UniSpotPage from './pages/projects/UniSpotPage';
import DesignPage from './pages/projects/DesignPage';
import SuccessPage from './pages/success';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import { ContactForm } from './components/ContactForm';
import { Footer } from './components/Footer';
import { ExperienceSection } from './components/ExperienceSection';
import { UniSpotSection } from './components/UniSpotSection';
import { StatusIndicator } from './components/StatusIndicator';
import { ContentCreatorSection } from './components/ContentCreatorSection';
import { ScrollToTop } from './components/ScrollToTop';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuOpen = () => {
    setIsMenuOpen(true);
  };

  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen bg-black text-white relative">
        <NavigationBar />
        <BackgroundGrid />
        <Navigation onMenuOpen={handleMenuOpen} />
        
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
                    <div className="inline-flex items-center space-x-2 mb-4 px-4 py-2 border border-white/10 rounded-sm bg-white/5 backdrop-blur-sm">
                      <StatusIndicator />
                      
                      <span className="text-white/60 uppercase tracking-widest text-sm">Working Status: Active</span>
                    </div>
                    
                    <h1 className="font-space-grotesk font-medium tracking-tight leading-none">

                      <span className="text-[56px] text-zinc-500 block">AIMAN SALIM</span>
                      <span className="text-[56px] text-white block mt-1">THE CREATOR'S ENGINEER</span>
                    </h1>
                    
                    <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-12 leading-relaxed">
                      Building AI-powered tools for the future of content creation. 
                      Combining engineering precision with design excellence to develop 
                      innovative solutions that empower creators.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6 mb-24">
                      <motion.a
                        href="#unispot-section"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 bg-[#111111] border border-[#1A1A1A] rounded-sm hover:bg-white hover:text-black transition-colors group"
                      >
                        <span className="mr-2 tracking-wider text-sm font-medium">VIEW PROJECTS</span>
                        <Command className="transition-transform group-hover:rotate-12" />
                      </motion.a>
                      <motion.a
                        href="#contact"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 bg-white text-black hover:bg-zinc-100 rounded-sm transition-colors"
                      >
                        <span className="mr-2 tracking-wider text-sm font-medium">INITIATE CONTACT</span>
                        <ExternalLink className="h-4 w-4" />
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
                <div className="absolute inset-0 bg-gradient-radial from-blue-500/5 via-transparent to-transparent" />
                <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 relative">
                  <ContactForm />
                </div>
              </section>
            </main>
          } />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/success" element={<SuccessPage />} />
          <Route path="/projects/unispot" element={<UniSpotPage />} />
          <Route path="/projects/design" element={<DesignPage />} />
          <Route path="/contact" element={
            <div className="pt-32 pb-16">
              <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                <ContactForm />
              </div>
            </div>
          } />
        </Routes>
        
        <Footer />
      </div>
    </Router>
  );
}

export default App;