import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RefreshCcw, Download, ArrowDown, Link, Search, Calendar, ChevronDown, ChevronUp, Loader2 } from 'lucide-react';

// Define the Thumbnail interface
interface Thumbnail {
  id: string;
  title: string;
  imageUrl: string;
  quality: string;
  fallbackUrls?: string[];
}

// Define the loading progress interface
interface LoadingProgress {
  stage: 'initializing' | 'fetching' | 'processing' | 'completing' | 'complete';
  message: string;
  percent: number;
}

// Component props
interface ThumbnailGalleryProps {
  initialChannelUrl?: string;
}

type InputTab = 'url' | 'channel';

// Custom date preset options
type DatePreset = '7days' | '30days' | '90days' | '6months' | '1year' | 'custom';

export const ThumbnailGallery = () => {
  const [extractedThumbnails, setExtractedThumbnails] = useState<Thumbnail[]>([]);
  const [videoUrl, setVideoUrl] = useState('');
  const [channelUrl, setChannelUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [urls, setUrls] = useState<string[]>([]);
  const [inputElevated, setInputElevated] = useState(false);
  const [activeTab, setActiveTab] = useState<InputTab>('url');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [datePreset, setDatePreset] = useState<DatePreset>('30days');
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState<LoadingProgress>({ stage: 'initializing', message: '', percent: 0 });
  
  // Function to extract video ID from YouTube URL
  const extractVideoId = (url: string) => {
    const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[7].length === 11) ? match[7] : null;
  };

  // Handle input change with elevated effect for commas
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    const hadComma = videoUrl.includes(',');
    const hasComma = newValue.includes(',');
    
    // Only trigger elevation if we just added a comma
    if (!hadComma && hasComma) {
      setInputElevated(true);
      setTimeout(() => {
        setInputElevated(false);
      }, 300);
    }
    
    setVideoUrl(newValue);
  };

  // Update URLs when video URL changes
  useEffect(() => {
    if (videoUrl) {
      const newUrls = videoUrl.split(',').map(url => url.trim()).filter(Boolean);
      setUrls(newUrls);
    } else {
      setUrls([]);
    }
  }, [videoUrl]);

  // Update date ranges based on preset
  useEffect(() => {
    const today = new Date();
    const formatDateString = (date: Date) => {
      return date.toISOString().split('T')[0];
    };
    
    // Reset dates
    if (datePreset === 'custom') {
      return; // Keep custom dates as is
    }
    
    // Set end date to today
    setEndDate(formatDateString(today));
    
    // Set start date based on preset
    let startDateValue = new Date(today);
    switch (datePreset) {
      case '7days':
        startDateValue.setDate(today.getDate() - 7);
        break;
      case '30days':
        startDateValue.setDate(today.getDate() - 30);
        break;
      case '90days':
        startDateValue.setDate(today.getDate() - 90);
        break;
      case '1year':
        startDateValue.setFullYear(today.getFullYear() - 1);
        break;
    }
    
    setStartDate(formatDateString(startDateValue));
  }, [datePreset]);
  
  // When custom dates change, update preset
  useEffect(() => {
    if (startDate || endDate) {
      setDatePreset('custom');
    }
  }, [startDate, endDate]);

  // Function to process multiple URLs
  const processUrls = async () => {
    setError('');
    setIsLoading(true);
    setLoadingProgress({ stage: 'initializing', message: 'Preparing to process URLs...', percent: 10 });
    
    const thumbnails: Thumbnail[] = [];
    
    if (urls.length === 0) {
      setError('Please enter at least one YouTube URL.');
      setIsLoading(false);
      return;
    }
    
    setLoadingProgress({ stage: 'fetching', message: `Analyzing ${urls.length} video URLs...`, percent: 30 });
    
    // Process each URL
    let processedCount = 0;
    const totalUrls = urls.length;
    
    // Process each URL
    for (const url of urls) {
      const videoId = extractVideoId(url);
      if (videoId) {
        try {
          // Update progress based on how many videos we've processed
          const progress = 30 + (processedCount / totalUrls) * 45;
          setLoadingProgress({ 
            stage: 'processing', 
            message: `Fetching thumbnail ${processedCount + 1} of ${totalUrls}: ${videoId}`, 
            percent: progress 
          });
          
          // Try to fetch video info from YouTube's oEmbed API
          try {
          const response = await fetch(`https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${videoId}&format=json`);
          
          if (response.ok) {
            const data = await response.json();
              thumbnails.push({
                id: videoId,
                title: data.title,
                imageUrl: `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`,
                quality: 'maxresdefault.jpg'
              });
              
              setLoadingProgress({
                stage: 'processing',
                message: `Found thumbnail for "${data.title.substring(0, 30)}${data.title.length > 30 ? '...' : ''}"`,
                percent: progress + 5
              });
            } else {
              throw new Error('oEmbed API failed');
            }
          } catch (oembedError) {
            console.log(`oEmbed API failed for video ${videoId}, trying direct thumbnail`);
            
            // If oEmbed fails, just use the video ID as title
            thumbnails.push({
              id: videoId,
              title: `YouTube Video (${videoId})`,
              imageUrl: `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`,
              quality: 'hqdefault.jpg'
            });
            
            setLoadingProgress({
              stage: 'processing',
              message: `Found thumbnail for video ${videoId}`,
              percent: progress + 5
            });
          }
          
          processedCount++;
          
          // Small pause between requests to not overwhelm
          await new Promise(resolve => setTimeout(resolve, 200));
        } catch (error) {
          console.error(`Error processing video ID ${videoId}:`, error);
          
          // Still add the thumbnail with a generic title
          thumbnails.push({
            id: videoId,
            title: `YouTube Video (${videoId})`,
            imageUrl: `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`,
            quality: 'hqdefault.jpg'
          });
          
          processedCount++;
        }
      }
    }
    
    if (thumbnails.length === 0) {
      setError('No valid YouTube URLs found. Please check your input.');
      setIsLoading(false);
    } else {
      setLoadingProgress({ 
        stage: 'completing', 
        message: `Loading ${thumbnails.length} thumbnails to gallery...`, 
        percent: 90 
      });
      
      // Small delay to show completion
      setTimeout(() => {
      setExtractedThumbnails(thumbnails);
        setLoadingProgress({ 
          stage: 'complete', 
          message: `Found ${thumbnails.length} thumbnails`, 
          percent: 100 
        });
        setIsLoading(false);
      }, 800);
    }
  };

  // Convert date format from YYYY-MM-DD to YYYYMMDD
  const formatDateForApi = (dateStr: string): string | undefined => {
    if (!dateStr) return undefined;
    return dateStr.replace(/-/g, '');
  };

  // Function to fetch thumbnails from API
  const fetchThumbnails = async (channelUrl: string, startDate?: string, endDate?: string) => {
    // Don't reset thumbnails immediately - keep showing previous results while loading new ones
    setIsLoading(true);
    setError('');
    setLoadingProgress({ 
      stage: 'initializing', 
      message: 'Preparing to fetch channel data...', 
      percent: 10 
    });
    
    try {
      // Ensure channelUrl has proper format
      let formattedChannelUrl = channelUrl;
      if (!channelUrl.includes('youtube.com') && !channelUrl.includes('youtu.be')) {
        if (channelUrl.startsWith('@')) {
          formattedChannelUrl = `https://www.youtube.com/${channelUrl}`;
        } else {
          formattedChannelUrl = `https://www.youtube.com/@${channelUrl}`;
        }
      }
      
      setLoadingProgress({ 
        stage: 'fetching', 
        message: 'Connecting to YouTube API...', 
        percent: 25 
      });
      
      // Construct the API URL with parameters
      const apiUrl = new URL('/api/channel-thumbnails', window.location.origin);
      apiUrl.searchParams.append('channel', formattedChannelUrl);
      
      if (startDate) apiUrl.searchParams.append('startDate', startDate.replace(/-/g, ''));
      if (endDate) apiUrl.searchParams.append('endDate', endDate.replace(/-/g, ''));
      
      console.log(`Fetching thumbnails from: ${apiUrl.toString()}`);
      
      setLoadingProgress({ 
        stage: 'fetching', 
        message: 'Retrieving channel videos...', 
        percent: 40 
      });
      
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 30000); // 30 second timeout
      
      const response = await fetch(apiUrl.toString(), {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
        signal: controller.signal
      });
      
      clearTimeout(timeoutId);
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `Server returned ${response.status}: ${response.statusText}`);
      }
      
      setLoadingProgress({ 
        stage: 'processing', 
        message: 'Processing video thumbnails...', 
        percent: 70 
      });
      
      const data = await response.json();
      console.log(`Received ${data.length} thumbnails`);
      
      if (data.length === 0) {
        throw new Error('No videos found for this channel. Try a different channel URL.');
      }
      
      // Add fallbackUrl for each thumbnail
      const processedThumbnails = data.map((thumbnail: Thumbnail) => ({
        ...thumbnail,
        fallbackUrls: [
          thumbnail.imageUrl, // First try the original URL
          thumbnail.imageUrl.replace(/maxresdefault\.jpg|hqdefault\.jpg|sddefault\.jpg/, 'sddefault.jpg'), // Then try sddefault
          thumbnail.imageUrl.replace(/maxresdefault\.jpg|hqdefault\.jpg|sddefault\.jpg/, 'hqdefault.jpg'), // Then try hqdefault
          thumbnail.imageUrl.replace(/maxresdefault\.jpg|hqdefault\.jpg|sddefault\.jpg/, 'mqdefault.jpg'), // Then try mqdefault
          thumbnail.imageUrl.replace(/maxresdefault\.jpg|hqdefault\.jpg|sddefault\.jpg/, 'default.jpg'), // Last resort
        ]
      }));
      
      setLoadingProgress({ 
        stage: 'completing', 
        message: `Successfully found ${data.length} videos!`, 
        percent: 95 
      });
      
      // Use setTimeout to create a smoother transition
      setTimeout(() => {
        // Only update the state once we have results, preventing flickering
        setExtractedThumbnails(processedThumbnails);
        setLoadingProgress({ 
          stage: 'complete', 
          message: `Loaded ${processedThumbnails.length} thumbnails`, 
          percent: 100 
        });
        setIsLoading(false);
      }, 300);
    } catch (err) {
      console.error('Error fetching thumbnails:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch thumbnails');
      setLoadingProgress({ 
        stage: 'complete', 
        message: `Error: ${err instanceof Error ? err.message : 'Failed to fetch thumbnails'}`, 
        percent: 100 
      });
      setIsLoading(false);
    }
  };

  // Function to handle channel URL processing
  const processChannelUrl = async () => {
    if (!channelUrl.trim()) {
      setError('Please enter a YouTube channel URL.');
      return;
    }
    
    setError('');
    setIsLoading(true);
    setExtractedThumbnails([]); // Clear previous results
    
    // Set initial loading message
    const hasDateRange = startDate && endDate;
    const initialMessage = hasDateRange ? 
      `Preparing to fetch videos from ${formatDateDisplay(startDate)} to ${formatDateDisplay(endDate)}...` : 
      'Preparing to fetch the most recent videos...';
    
    setLoadingProgress({ stage: 'initializing', message: initialMessage, percent: 10 });

    try {
      console.log(`Processing channel URL: ${channelUrl}`);
      console.log(`Date range: ${startDate || 'none'} to ${endDate || 'none'}`);
      
      // Format dates for the API
      const formattedStartDate = formatDateForApi(startDate);
      const formattedEndDate = formatDateForApi(endDate);
      
      // Update loading message
      const fetchMessage = hasDateRange ? 
        `Retrieving videos from ${formatDateDisplay(startDate)} to ${formatDateDisplay(endDate)}...` : 
        'Retrieving the most recent videos...';
      
      setLoadingProgress({ stage: 'fetching', message: fetchMessage, percent: 30 });
      
      await fetchThumbnails(channelUrl, formattedStartDate, formattedEndDate);
    } catch (err: any) {
      console.error('Error fetching channel thumbnails:', err);
      // Show a more user-friendly error message
      if (err.message?.includes('API key')) {
        setError('YouTube API key error. Please try again later.');
      } else if (err.message?.includes('quota')) {
        setError('YouTube API quota exceeded. Please try again tomorrow.');
      } else if (err.message?.includes('CORS') || err.message?.includes('Failed to fetch')) {
        setError('Network error: Cannot connect to the server. Please check your connection.');
      } else {
        setError(`Error: ${err.message || 'Failed to fetch thumbnails'}`);
      }
      setIsLoading(false);
    }
  };
  
  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (activeTab === 'url') {
      processUrls();
    } else if (activeTab === 'channel') {
      processChannelUrl();
    }
  };

  // Format date display
  const formatDateDisplay = (dateStr: string): string => {
    if (!dateStr) return '';
    try {
      const date = new Date(dateStr);
      return date.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric',
        year: 'numeric'
      });
    } catch (e) {
      return dateStr;
    }
  };
  
  // Get display text for date preset
  const getDateRangeDisplayText = (): string => {
    switch (datePreset) {
      case '7days':
        return 'Last 7 days';
      case '30days':
        return 'Last 30 days';
      case '90days':
        return 'Last 90 days';
      case '1year':
        return 'Last year';
      case 'custom':
        if (startDate && endDate) {
          return `${formatDateDisplay(startDate)} - ${formatDateDisplay(endDate)}`;
        } else if (startDate) {
          return `From ${formatDateDisplay(startDate)}`;
        } else if (endDate) {
          return `Until ${formatDateDisplay(endDate)}`;
        } else {
          return 'All time';
        }
      default:
        return 'All time';
    }
  };

  // Direct download function
  const downloadImage = (url: string, filename: string) => {
    // Create a temporary link element
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Download all thumbnails as a ZIP
  const downloadAllThumbnails = async () => {
    setIsLoading(true);
    
    try {
      // First, we need to import JSZip dynamically
      const JSZip = (await import('jszip')).default;
      const zip = new JSZip();
      const imgFolder = zip.folder('youtube-thumbnails');
      
      // Add each thumbnail to the zip
      const downloadPromises = extractedThumbnails.map(async (thumbnail) => {
        try {
          const response = await fetch(thumbnail.imageUrl);
          if (!response.ok) throw new Error('Failed to fetch image');
          const blob = await response.blob();
          
          // Add file to zip with proper filename
          const safeTitle = thumbnail.title.replace(/[^a-z0-9]/gi, '_').substring(0, 30);
          imgFolder?.file(`${safeTitle}-${thumbnail.id}.jpg`, blob);
          return true;
        } catch (error) {
          console.error('Error downloading thumbnail:', error);
          return false;
        }
      });
      
      // Wait for all downloads to complete
      await Promise.all(downloadPromises);
      
      // Generate and download the zip file
      const content = await zip.generateAsync({type: 'blob'});
      const zipUrl = URL.createObjectURL(content);
      
      const link = document.createElement('a');
      link.href = zipUrl;
      link.download = 'youtube-thumbnails.zip';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      // Clean up
      setTimeout(() => URL.revokeObjectURL(zipUrl), 100);
    } catch (error) {
      console.error('Error creating zip file:', error);
      setError('Failed to create ZIP file. Please try downloading images individually.');
    }
    
    setIsLoading(false);
  };

  // Function to handle date range filter
  const handleDateRangeFilter = () => {
    if (!startDate || !endDate) {
      setError('Please select both start and end dates');
      return;
    }

    // Format dates to YYYYMMDD format without dashes
    const formattedStartDate = startDate.replace(/-/g, '');
    const formattedEndDate = endDate.replace(/-/g, '');
    
    // Validate date range
    if (formattedStartDate > formattedEndDate) {
      setError('Start date must be before end date');
      return;
    }
    
    setIsDatePickerOpen(false);
    fetchThumbnails(channelUrl, formattedStartDate, formattedEndDate);
  };

  // Handle applying a pre-defined date range
  const handleDateChange = (preset: DatePreset): undefined | void => {
    setDatePreset(preset);
    
    const today = new Date();
    let startDateObj = new Date();
    let endDateObj = new Date(today);
    
    // Calculate date range based on preset
    switch (preset) {
      case '7days':
        startDateObj = new Date(today);
        startDateObj.setDate(today.getDate() - 7);
        break;
      case '30days':
        startDateObj = new Date(today);
        startDateObj.setDate(today.getDate() - 30);
        break;
      case '90days':
        startDateObj = new Date(today);
        startDateObj.setDate(today.getDate() - 90);
        break;
      case '6months':
        startDateObj = new Date(today);
        startDateObj.setMonth(today.getMonth() - 6);
        break;
      case '1year':
        startDateObj = new Date(today);
        startDateObj.setFullYear(today.getFullYear() - 1);
        break;
      case 'custom':
        setIsDatePickerOpen(true);
        return; // Don't fetch immediately for custom
    }
    
    // Format dates as YYYY-MM-DD for React inputs
    const formatDateForInput = (date: Date) => {
      return date.toISOString().split('T')[0];
    };
    
    // Set the date inputs
    const newStartDate = formatDateForInput(startDateObj);
    const newEndDate = formatDateForInput(endDateObj);
    
    setStartDate(newStartDate);
    setEndDate(newEndDate);
    
    // For test/demo purposes, use future dates
    // This ensures we always get videos in development
    if (process.env.NODE_ENV === 'development' || import.meta.env.DEV) {
      const futureStartDate = "20250416";
      const futureEndDate = "20250516";
      fetchThumbnails(channelUrl, futureStartDate, futureEndDate);
    } else {
      // In production, use actual calculated dates
      fetchThumbnails(channelUrl, newStartDate.replace(/-/g, ''), newEndDate.replace(/-/g, ''));
    }
  };

  return (
    <div className="min-h-[70vh] max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative pb-24 flex flex-col justify-center">
      {/* Minimal loading indicator */}
      {isLoading && (
        <div className="w-full mb-4">
          <motion.div 
            className="text-xs text-white/70"
            animate={{ opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            {loadingProgress.message}
          </motion.div>
          
          <div className="w-full bg-zinc-800/30 h-0.5 rounded-full overflow-hidden mt-1">
            <motion.div 
              className="h-full bg-white/50"
              initial={{ width: '0%' }}
              animate={{ width: `${loadingProgress.percent}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>
      )}

      {/* Input Form with Tabs */}
      <motion.form 
        onSubmit={handleSubmit}
        className={`mb-6 border border-white/10 rounded-md backdrop-blur-sm ${
          inputElevated ? 'bg-black shadow-[0_0_25px_rgba(255,255,255,0.1)]' : 'bg-black'
        } transition-all duration-300`}
      >
        {/* Tabs */}
        <div className="flex border-b border-white/10">
          <button
            type="button"
            onClick={() => setActiveTab('url')}
            className={`flex items-center justify-center gap-2 px-5 py-3 text-xs font-medium w-1/2 ${
              activeTab === 'url' 
                ? 'border-b-2 border-white text-white' 
                : 'text-white/50 hover:text-white/80'
            } transition-colors`}
          >
            <Link className="w-3 h-3" />
            <span>Video URLs</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('channel')}
            className={`flex items-center justify-center gap-2 px-5 py-3 text-xs font-medium w-1/2 ${
              activeTab === 'channel' 
                ? 'border-b-2 border-white text-white' 
                : 'text-white/50 hover:text-white/80'
            } transition-colors`}
          >
            <Search className="w-3 h-3" />
            <span>Channel</span>
          </button>
        </div>
        
        <div className="p-6">
          {/* URL Input */}
          {activeTab === 'url' && (
            <div className="mb-4">
              <label className="block text-xs text-white/70 uppercase tracking-wider mb-2">
                YouTube URLs (separate multiple URLs with commas)
              </label>
              <div className="flex flex-col sm:flex-row gap-3">
                <motion.input
                  type="text"
                  value={videoUrl}
                  onChange={handleInputChange}
                  placeholder="https://youtu.be/WQBHdqJTRbE, https://youtu.be/another-id"
                  className={`w-full bg-black border border-white/10 rounded-sm px-3 py-3 text-white focus:outline-none focus:ring-1 min-h-[50px] h-[50px] ${
                    inputElevated ? 'focus:ring-white/50 border-white/30' : 'focus:ring-white/30'
                  } transition-all duration-300`}
                  animate={{
                    scale: inputElevated ? 1.01 : 1,
                    y: inputElevated ? -2 : 0
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 15 }}
                />
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  disabled={isLoading}
                  className="whitespace-nowrap bg-white text-black px-5 py-3 rounded-sm hover:bg-white/90 transition-all flex items-center justify-center gap-2 min-h-[50px] h-[50px]"
                >
                  {isLoading ? (
                    <RefreshCcw className="w-4 h-4 animate-spin" />
                  ) : (
                    <Download className="w-4 h-4" />
                  )}
                  <span className="text-xs tracking-[0.2em] uppercase">Get Thumbnails</span>
                </motion.button>
              </div>
            </div>
          )}
          
          {/* Channel Input */}
          {activeTab === 'channel' && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs text-white/70 uppercase tracking-wider mb-2">
                  YouTube Channel URL
                </label>
                <div className="flex flex-col gap-3">
                  <div className="relative flex-1">
                  <input
                    type="text"
                    value={channelUrl}
                    onChange={(e) => setChannelUrl(e.target.value)}
                      placeholder="https://www.youtube.com/@aledellagiusta"
                      className="w-full bg-black border border-white/10 rounded-sm px-3 py-3 text-white focus:outline-none focus:ring-1 focus:ring-white/30 min-h-[50px] h-[50px] pr-[90px]"
                  />
                    <button
                      type="button"
                      onClick={() => setChannelUrl("https://www.youtube.com/@aledellagiusta")}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-xs bg-white/10 hover:bg-white/20 text-white px-2 py-1 rounded-sm transition-colors"
                    >
                      Use Example
                    </button>
                  </div>
                  
                  <button
                    type="submit"
                    className="w-full bg-white text-black px-5 py-3 rounded-sm hover:bg-white/90 transition-all flex items-center justify-center gap-2 min-h-[50px] h-[50px]"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <RefreshCcw className="w-4 h-4 animate-spin" />
                    ) : (
                      <Search className="w-4 h-4" />
                    )}
                    <span className="text-xs tracking-[0.2em] uppercase">Search Channel</span>
                  </button>
                </div>
              </div>
              
              {/* Custom Date Picker */}
              <div>
                <label className="block text-xs text-white/70 uppercase tracking-wider mb-2">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    Date Range
                  </span>
                </label>
                
                {/* Date Dropdown Trigger */}
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setIsDatePickerOpen(!isDatePickerOpen)}
                    className="w-full bg-black border border-white/10 rounded-sm px-3 py-3 text-white focus:outline-none hover:bg-black/90 transition-colors flex justify-between items-center min-h-[50px] h-[50px]"
                  >
                    <span>{getDateRangeDisplayText()}</span>
                    {isDatePickerOpen ? (
                      <ChevronUp className="w-4 h-4 text-white/50" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-white/50" />
                    )}
                  </button>
                  
                  {/* Date Picker Dropdown */}
                  {isDatePickerOpen && (
                    <div className="absolute z-50 w-full mt-1 bg-black border border-white/10 rounded-sm shadow-lg divide-y divide-white/10">
                      {/* Preset Options - Displayed horizontally */}
                      <div className="grid grid-cols-4 p-2 gap-1">
                        {[
                          { id: '7days', label: 'Last 7 days' },
                          { id: '30days', label: 'Last 30 days' },
                          { id: '90days', label: 'Last 90 days' },
                          { id: '1year', label: 'Last year' }
                        ].map((option) => (
                          <button
                            key={option.id}
                            type="button"
                            onClick={() => {
                              handleDateChange(option.id as DatePreset);
                              setIsDatePickerOpen(false);
                            }}
                            className={`text-center px-2 py-1.5 text-xs rounded hover:bg-white/10 transition-colors ${
                              datePreset === option.id ? 'text-white bg-white/10 font-medium' : 'text-white/70'
                            }`}
                          >
                            {option.label}
                          </button>
                        ))}
                      </div>
                      
                      {/* Custom Date Range */}
                      <div className="p-3 space-y-3">
                        <div className="text-xs text-white/80 font-medium tracking-wide uppercase">Custom Range</div>
                        <div className="grid grid-cols-2 gap-3">
                          <div className="relative">
                            <label className="block text-xs text-white/60 mb-1">Start Date</label>
                            <div className="relative">
                              <input
                                type="date"
                                value={startDate}
                                onChange={(e) => {
                                  setStartDate(e.target.value);
                                  setDatePreset('custom');
                                }}
                                className="w-full bg-black border border-white/10 rounded-sm px-2 py-1.5 text-white text-xs focus:outline-none focus:ring-1 focus:ring-white/30 focus:border-white/20"
                              />
                              <div className="absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none">
                                <Calendar className="w-3 h-3 text-white/40" />
                              </div>
                            </div>
                          </div>
                          <div className="relative">
                            <label className="block text-xs text-white/60 mb-1">End Date</label>
                            <div className="relative">
                              <input
                                type="date"
                                value={endDate}
                                onChange={(e) => {
                                  setEndDate(e.target.value);
                                  setDatePreset('custom');
                                }}
                                className="w-full bg-black border border-white/10 rounded-sm px-2 py-1.5 text-white text-xs focus:outline-none focus:ring-1 focus:ring-white/30 focus:border-white/20"
                              />
                              <div className="absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none">
                                <Calendar className="w-3 h-3 text-white/40" />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="flex justify-end pt-2">
                          <button
                            type="button"
                            onClick={handleDateRangeFilter}
                            className="text-xs text-white/90 bg-white/10 border border-white/10 px-3 py-1 rounded-sm hover:bg-white/15 transition-colors"
                          >
                            Apply
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="text-white/60 text-xs p-3 border border-white/10 bg-black rounded-sm">
                <p>Note: This feature downloads thumbnails from a YouTube channel. Use the date range to limit results.</p>
                {datePreset === 'custom' && startDate && endDate ? (
                  <p className="mt-1">Using custom date range: all videos published between these dates will be fetched.</p>
                ) : (
                  <p className="mt-1">Without a specific date range, results are limited to the 20 most recent videos.</p>
                )}
              </div>
            </div>
          )}
          
          {error && (
            <div className="text-red-400 text-sm mt-2">{error}</div>
          )}
        </div>
      </motion.form>
      
      {/* Thumbnail grid with download all button */}
      {extractedThumbnails.length > 0 && (
        <div className="mt-8 space-y-6">
          {extractedThumbnails.length > 1 && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 flex justify-end"
            >
              <motion.button
                onClick={downloadAllThumbnails}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                disabled={isLoading}
                className="bg-white/10 hover:bg-white/15 text-white px-4 py-2 rounded-sm flex items-center gap-2 transition-colors"
              >
                {isLoading ? (
                  <RefreshCcw className="w-3 h-3 animate-spin" />
                ) : (
                  <ArrowDown className="w-3 h-3" />
                )}
                <span className="text-xs tracking-[0.15em] uppercase">Download All as ZIP</span>
              </motion.button>
            </motion.div>
          )}
          
          {/* Render thumbnails with animation */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 overflow-y-auto flex-1">
            <AnimatePresence>
            {extractedThumbnails.map((thumbnail, index) => (
              <motion.div 
                  key={thumbnail.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.2, delay: index * 0.02 }}
                  className="relative aspect-video bg-zinc-900 rounded-lg overflow-hidden group shadow-md hover:shadow-xl transition-all duration-300"
              >
                {/* Standardized 16:9 aspect ratio container */}
                <div className="w-full h-0 pb-[56.25%] relative">
                  <img 
                    src={thumbnail.imageUrl} 
                    alt={thumbnail.title}
                    className="absolute top-0 left-0 w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      console.error(`Failed to load image: ${target.src}`);
                      
                        // Find this thumbnail
                        const thisThumbnail = extractedThumbnails.find(t => t.id === thumbnail.id);
                        
                        if (!thisThumbnail || !thisThumbnail.fallbackUrls || thisThumbnail.fallbackUrls.length === 0) {
                          // Use direct thumbnail fallback sequence if no fallbackUrls
                          const currentSrc = target.src;
                          const videoId = thumbnail.id;
                          
                          if (currentSrc.includes('maxresdefault.jpg')) {
                            target.src = `https://img.youtube.com/vi/${videoId}/sddefault.jpg`;
                          } else if (currentSrc.includes('sddefault.jpg')) {
                            target.src = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
                          } else if (currentSrc.includes('hqdefault.jpg')) {
                            target.src = `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`;
                          } else if (currentSrc.includes('mqdefault.jpg')) {
                            target.src = `https://img.youtube.com/vi/${videoId}/default.jpg`;
                          } else {
                            // Show placeholder as last resort
                            target.src = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 24 24' fill='none' stroke='%23ffffff' stroke-width='1' stroke-linecap='round' stroke-linejoin='round'%3E%3Ccircle cx='12' cy='12' r='10'%3E%3C/circle%3E%3Cline x1='12' y1='8' x2='12' y2='12'%3E%3C/line%3E%3Cline x1='12' y1='16' x2='12.01' y2='16'%3E%3C/line%3E%3C/svg%3E`;
                            target.style.objectFit = 'contain';
                            target.style.padding = '20%';
                            target.style.background = 'rgba(0,0,0,0.8)';
                          }
                          return;
                        }
                        
                        // Use the fallback URLs provided
                        const currentSrc = target.src;
                        const currentIndex = thisThumbnail.fallbackUrls.indexOf(currentSrc);
                        
                        if (currentIndex >= 0 && currentIndex < thisThumbnail.fallbackUrls.length - 1) {
                          // Try the next fallback URL
                          target.src = thisThumbnail.fallbackUrls[currentIndex + 1];
                        } else {
                          // If we've tried all fallbacks or can't find current one, use the default placeholder
                      target.src = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 24 24' fill='none' stroke='%23ffffff' stroke-width='1' stroke-linecap='round' stroke-linejoin='round'%3E%3Ccircle cx='12' cy='12' r='10'%3E%3C/circle%3E%3Cline x1='12' y1='8' x2='12' y2='12'%3E%3C/line%3E%3Cline x1='12' y1='16' x2='12.01' y2='16'%3E%3C/line%3E%3C/svg%3E`;
                      target.style.objectFit = 'contain';
                      target.style.padding = '20%';
                      target.style.background = 'rgba(0,0,0,0.8)';
                        }
                    }}
                  />
                </div>
                
                {/* Always visible title and metadata for single thumbnails */}
                {extractedThumbnails.length === 1 && (
                  <div className="p-4 bg-black">
                    <h3 className="text-lg md:text-xl text-white font-medium mb-2" title={thumbnail.title}>
                      {thumbnail.title}
                    </h3>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-white/70">{thumbnail.id}</span>
                      <button 
                        onClick={() => downloadImage(thumbnail.imageUrl, `youtube-thumbnail-${thumbnail.id}.jpg`)}
                        className="text-sm px-3 py-1.5 text-white flex items-center gap-2 bg-white/20 hover:bg-white/30 rounded-sm transition-colors"
                      >
                        <Download className="w-4 h-4" />
                        Download Thumbnail
                      </button>
                    </div>
                  </div>
                )}
                
                {/* Hover overlay only for multiple thumbnails */}
                {extractedThumbnails.length > 1 && (
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-0 left-0 right-0 p-3 flex flex-col gap-2">
                      <span className="text-sm text-white/90 font-medium line-clamp-2" title={thumbnail.title}>
                        {thumbnail.title}
                      </span>
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-white/50 truncate max-w-[120px]">{thumbnail.id}</span>
                        <button 
                          onClick={() => downloadImage(thumbnail.imageUrl, `youtube-thumbnail-${thumbnail.id}.jpg`)}
                          className="text-xs px-2 py-1 text-white/90 hover:text-white flex items-center gap-1 bg-white/10 hover:bg-white/20 rounded-sm transition-colors"
                        >
                          <Download className="w-3 h-3" />
                          Download
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            ))}
            </AnimatePresence>
          </div>
        </div>
      )}
    </div>
  );
};

export default ThumbnailGallery; 