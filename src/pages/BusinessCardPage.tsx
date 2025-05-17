import React, { useRef, useState } from 'react';
// @ts-ignore
import { Helmet } from 'react-helmet';
import html2canvas from 'html2canvas';
// @ts-ignore
import { jsPDF } from 'jspdf';
import { Command, Download } from 'lucide-react';

// Business card dimensions in mm (standard size is 85mm x 55mm)
const CARD_WIDTH_MM = 85;
const CARD_HEIGHT_MM = 55;

// Pixel ratio for better quality
const PIXEL_RATIO = 3;

// Paths to the business card images
const FRONT_IMAGE = '/images/business-card/front.png';
const BACK_IMAGE = '/images/business-card/back.png';

export default function BusinessCardPage() {
  const frontCardRef = useRef<HTMLDivElement>(null);
  const backCardRef = useRef<HTMLDivElement>(null);
  const [isDownloading, setIsDownloading] = useState(false);
  const [showFront, setShowFront] = useState(true);

  // Function to download as image
  const downloadAsImage = async () => {
    const cardRef = showFront ? frontCardRef : backCardRef;
    if (!cardRef.current) return;
    setIsDownloading(true);

    try {
      const canvas = await html2canvas(cardRef.current, {
        backgroundColor: '#000000',
        scale: PIXEL_RATIO,
        logging: false,
        allowTaint: true,
        useCORS: true
      });

      const image = canvas.toDataURL('image/png', 1.0);
      const link = document.createElement('a');
      link.href = image;
      link.download = `aiman-salim-business-card-${showFront ? 'front' : 'back'}.png`;
      link.click();
    } catch (error) {
      console.error('Error generating image:', error);
    } finally {
      setIsDownloading(false);
    }
  };

  // Function to download both sides as PNG
  const downloadBothSidesPNG = async () => {
    if (!frontCardRef.current || !backCardRef.current) return;
    setIsDownloading(true);

    try {
      // Download front
      const link = document.createElement('a');
      link.href = FRONT_IMAGE;
      link.download = 'aiman-salim-business-card-front.png';
      link.click();
      
      // Small delay before downloading back
      setTimeout(() => {
        const link2 = document.createElement('a');
        link2.href = BACK_IMAGE;
        link2.download = 'aiman-salim-business-card-back.png';
        link2.click();
        setIsDownloading(false);
      }, 500);
    } catch (error) {
      console.error('Error downloading images:', error);
      setIsDownloading(false);
    }
  };

  // Function to download as PDF
  const downloadAsPDF = async () => {
    const cardRef = showFront ? frontCardRef : backCardRef;
    if (!cardRef.current) return;
    setIsDownloading(true);

    try {
      const canvas = await html2canvas(cardRef.current, {
        backgroundColor: '#000000',
        scale: PIXEL_RATIO,
        logging: false,
        allowTaint: true,
        useCORS: true
      });

      // Create PDF with correct business card dimensions
      const pdf = new jsPDF({
        orientation: 'landscape',
        unit: 'mm',
        format: [CARD_WIDTH_MM, CARD_HEIGHT_MM]
      });

      const imgData = canvas.toDataURL('image/png', 1.0);
      pdf.addImage(imgData, 'PNG', 0, 0, CARD_WIDTH_MM, CARD_HEIGHT_MM);
      pdf.save(`aiman-salim-business-card-${showFront ? 'front' : 'back'}.pdf`);
    } catch (error) {
      console.error('Error generating PDF:', error);
    } finally {
      setIsDownloading(false);
    }
  };

  // Function to download both sides as PDF
  const downloadBothSidesPDF = async () => {
    if (!frontCardRef.current || !backCardRef.current) return;
    setIsDownloading(true);

    try {
      const frontCanvas = await html2canvas(frontCardRef.current, {
        backgroundColor: '#000000',
        scale: PIXEL_RATIO,
        logging: false,
        allowTaint: true,
        useCORS: true
      });

      const backCanvas = await html2canvas(backCardRef.current, {
        backgroundColor: '#000000',
        scale: PIXEL_RATIO,
        logging: false,
        allowTaint: true,
        useCORS: true
      });

      // Create PDF with correct business card dimensions
      const pdf = new jsPDF({
        orientation: 'landscape',
        unit: 'mm',
        format: [CARD_WIDTH_MM, CARD_HEIGHT_MM]
      });

      // Add front side
      const frontImgData = frontCanvas.toDataURL('image/png', 1.0);
      pdf.addImage(frontImgData, 'PNG', 0, 0, CARD_WIDTH_MM, CARD_HEIGHT_MM);
      
      // Add back side on a new page
      pdf.addPage([CARD_WIDTH_MM, CARD_HEIGHT_MM], 'landscape');
      const backImgData = backCanvas.toDataURL('image/png', 1.0);
      pdf.addImage(backImgData, 'PNG', 0, 0, CARD_WIDTH_MM, CARD_HEIGHT_MM);
      
      pdf.save('aiman-salim-business-card-both-sides.pdf');
    } catch (error) {
      console.error('Error generating PDF:', error);
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Business Card | Aiman Salim</title>
        <meta name="description" content="Aiman Salim's business card" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
      </Helmet>

      <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white p-4">
        {/* Toggle Button */}
        <div className="mb-6 flex items-center">
          <button 
            onClick={() => setShowFront(true)}
            className={`px-4 py-2 text-sm transition-colors ${showFront ? 'bg-white text-black' : 'bg-white/10 text-white'}`}
          >
            Front
          </button>
          <button 
            onClick={() => setShowFront(false)}
            className={`px-4 py-2 text-sm transition-colors ${!showFront ? 'bg-white text-black' : 'bg-white/10 text-white'}`}
          >
            Back
          </button>
        </div>
        
        {/* Business Card Preview */}
        <div className="mb-8 relative" style={{ width: '340px', height: 'auto' }}>
          {/* Front Side Card */}
          <div
            ref={frontCardRef}
            className={`w-full transition-opacity duration-300 ${showFront ? 'opacity-100 block' : 'opacity-0 hidden'}`}
          >
            <img 
              src={FRONT_IMAGE} 
              alt="Business Card Front" 
              className="w-full h-auto"
            />
          </div>

          {/* Back Side Card */}
          <div
            ref={backCardRef}
            className={`w-full transition-opacity duration-300 ${!showFront ? 'opacity-100 block' : 'opacity-0 hidden'}`}
          >
            <img 
              src={BACK_IMAGE} 
              alt="Business Card Back" 
              className="w-full h-auto"
            />
          </div>
        </div>

        {/* Download Buttons */}
        <div className="flex flex-col gap-3">
          <button
            onClick={downloadBothSidesPDF}
            disabled={isDownloading}
            className="group relative overflow-hidden w-[240px] flex items-center justify-center px-8 py-4 bg-black border border-white/10 hover:bg-white/5 transition-colors"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-transparent opacity-20" />
            <span className="text-[10px] tracking-[0.2em] text-white/90 uppercase relative">
              {isDownloading ? 'Processing...' : 'Download PDF'}
            </span>
            <Command className="h-3 w-3 ml-2 transition-transform group-hover:rotate-12 relative" />
          </button>
          
          <button
            onClick={downloadBothSidesPNG}
            disabled={isDownloading}
            className="group relative overflow-hidden w-[240px] flex items-center justify-center px-8 py-4 bg-white/10 hover:bg-white/15 transition-colors"
          >
            <span className="text-[10px] tracking-[0.2em] text-white/90 uppercase relative">
              {isDownloading ? 'Processing...' : 'Download PNG Files'}
            </span>
            <Download className="h-3 w-3 ml-2 transition-transform group-hover:translate-y-[1px] relative" />
          </button>
        </div>

        {/* Instructions */}
        <p className="mt-8 text-white/50 text-xs max-w-md text-center">
          This is a digital business card designed for print. Standard business card size (85mm × 55mm).
        </p>
      </div>
    </>
  );
} 