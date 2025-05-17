import { useEffect } from 'react';
import { motion } from 'framer-motion';

export default function PortfolioPage() {
  const portfolioImages = [
    {
      url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/1-NUDE-PROJECT.png-LvHhAkKKqp4ljDaNthKk0rjGFiz9Qw.jpeg",
    },
    {
      url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/2-NUDE-PROJECT.png-oIgobCfCYNt9Gcg52UnMdh0fpX6oTn.jpeg",
    },
    {
      url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/3-NUDE-PROJECT.png-PJbWTmrPxUCvavFAT8GpI8fsOCkVxF.jpeg",
    },
    {
      url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/4-NUDE-PROJECT.png-nxEAvaBEc6nI1c0cibwi2YIYT05eAD.jpeg",
    },
    {
      url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/5-NUDE-PROJECT.png-RXIEytz6zrVWTYX5xdmbZKkkQoe99y.jpeg",
    },
    {
      url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/6-NUDE-PROJECT.png-wOcGBGbVYrU210xNfwRNSypnZQA6qG.jpeg",
    },
    {
      url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/6.5-NUDE-PROJECT.png-3OQpRcsrRaEplSHo5nPadFoMJuckQZ.jpeg",
    },
    {
      url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/7-NUDE-PROJECT.png-qfxHQINTKZtwTqgqFJlwAJDXQoPkLM.jpeg",
    },
    {
      url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/8-NUDE-PROJECT.png-qf8KlLL0iFCuiLthMUY1ND9pOkaWKf.jpeg",
    },
    {
      url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/9-NUDE-PROJECT-gKTsrrvtO9belbfsGpDCmlEApoyexn.png",
    },
  ];

  // Hide navigation bar and disable body scroll when component mounts
  useEffect(() => {
    // Save original styles
    const originalBodyStyle = window.getComputedStyle(document.body).overflow;
    const navElement = document.querySelector('nav.fixed.top-0') as HTMLElement | null;
    const footerElement = document.querySelector('footer') as HTMLElement | null;
    const backgroundGridElements = document.querySelectorAll('.fixed.inset-0.overflow-hidden.pointer-events-none') as NodeListOf<HTMLElement>;
    
    // Save original display state of nav and footer
    const originalNavDisplay = navElement ? window.getComputedStyle(navElement).display : 'block';
    const originalFooterDisplay = footerElement ? window.getComputedStyle(footerElement).display : 'block';
    
    // Hide navigation, footer, and background grid
    if (navElement) navElement.style.display = 'none';
    if (footerElement) footerElement.style.display = 'none';
    backgroundGridElements.forEach(element => {
      element.style.display = 'none';
    });
    
    // Add escape key handler to go back
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        window.history.back();
      }
    };
    
    document.addEventListener('keydown', handleKeyDown);
    
    // Disable scroll on body
    document.body.style.overflow = 'hidden';
    
    // Restore original styles on unmount
    return () => {
      document.body.style.overflow = originalBodyStyle;
      if (navElement) navElement.style.display = originalNavDisplay;
      if (footerElement) footerElement.style.display = originalFooterDisplay;
      backgroundGridElements.forEach(element => {
        element.style.display = 'block';
      });
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <div className="bg-black h-screen w-screen overflow-y-scroll snap-y snap-mandatory">
      {portfolioImages.map((image, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="h-screen w-screen flex items-center justify-center snap-start"
        >
          <div className="relative w-full h-full">
            <img 
              src={image.url}
              alt={`Portfolio image ${index + 1}`}
              className="w-full h-full object-contain"
            />
          </div>
        </motion.div>
      ))}
    </div>
  );
} 