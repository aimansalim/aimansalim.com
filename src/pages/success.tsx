import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Check, Download, ArrowLeft } from 'lucide-react';

const SuccessPage = () => {
  const [countdown, setCountdown] = useState(10);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);

  // Simulate digital delivery
  useEffect(() => {
    // In a real implementation, this would verify the purchase and generate actual download links
    const timer = setTimeout(() => {
      setDownloadUrl('/downloads/pacchetti-thumbnails-template.zip');
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  // Countdown to redirect
  useEffect(() => {
    if (countdown <= 0) return;
    
    const timer = setInterval(() => {
      setCountdown(c => c - 1);
    }, 1000);
    
    return () => clearInterval(timer);
  }, [countdown]);

  return (
    <main className="min-h-screen flex flex-col">
      <section className="pt-32 pb-16 relative flex-grow flex flex-col items-center justify-center">
        <div className="absolute inset-0 bg-gradient-radial from-white/5 via-transparent to-transparent" />
        
        <div className="max-w-2xl mx-auto w-full px-4 sm:px-6 relative">
          <div className="bg-zinc-900/50 border border-white/10 p-8 rounded-lg text-center space-y-6">
            {/* Success Icon */}
            <div className="mx-auto w-20 h-20 rounded-full bg-emerald-500/20 flex items-center justify-center mb-6">
              <Check className="w-10 h-10 text-emerald-500" />
            </div>
            
            <h1 className="text-3xl font-space-grotesk text-white">Thank You for Your Purchase!</h1>
            
            <p className="text-zinc-400 text-lg">
              Your order for the Pacchetti Thumbnails Template has been completed successfully.
            </p>
            
            {/* Download section */}
            <div className="bg-black/30 p-6 rounded-md">
              <h2 className="text-white font-medium mb-4">Download Your Templates</h2>
              
              {downloadUrl ? (
                <a
                  href={downloadUrl}
                  download
                  className="flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white py-3 px-6 rounded-sm transition-colors w-full"
                >
                  <Download className="w-4 h-4" />
                  Download Templates
                </a>
              ) : (
                <div className="flex items-center justify-center gap-4 py-3 px-6 bg-zinc-800 rounded-sm">
                  <div className="w-4 h-4 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin" />
                  <span className="text-white">Preparing your download...</span>
                </div>
              )}
              
              <p className="text-xs text-zinc-500 mt-3">
                Your download link will also be sent to your email for future reference.
              </p>
            </div>
            
            {/* Return to shop */}
            <div className="pt-4">
              <Link
                to="/shop"
                className="inline-flex items-center gap-2 text-emerald-500 hover:text-emerald-400 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Return to Shop {countdown > 0 ? `(Redirecting in ${countdown}s)` : ''}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default SuccessPage;
