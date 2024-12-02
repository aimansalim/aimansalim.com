import { useEffect, useState } from 'react';

interface Metrics {
  ttfb: number;
  fcp: number;
  lcp: number;
  uptime: number;
}

export const useSystemMetrics = () => {
  const [metrics, setMetrics] = useState<Metrics>({
    ttfb: 0,
    fcp: 0,
    lcp: 0,
    uptime: 99.9,
  });

  useEffect(() => {
    const getWebVitals = async () => {
      try {
        const response = await fetch('https://uni-posti.vercel.app');
        const startTime = performance.now();
        await response.text();
        const ttfb = performance.now() - startTime;

        // Get Web Vitals if available
        if ('performance' in window) {
          const paintEntries = performance.getEntriesByType('paint');
          const fcpEntry = paintEntries.find(entry => entry.name === 'first-contentful-paint');
          const lcpEntry = paintEntries.find(entry => entry.name === 'largest-contentful-paint');

          setMetrics(prev => ({
            ...prev,
            ttfb: Math.round(ttfb),
            fcp: fcpEntry ? Math.round(fcpEntry.startTime) : prev.fcp,
            lcp: lcpEntry ? Math.round(lcpEntry.startTime) : prev.lcp,
          }));
        }
      } catch (error) {
        console.error('Error fetching metrics:', error);
      }
    };

    getWebVitals();
    const interval = setInterval(getWebVitals, 60000); // Update every minute

    return () => clearInterval(interval);
  }, []);

  return metrics;
};
