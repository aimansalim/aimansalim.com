import React, { useState, useRef, useMemo, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, ExternalLink, Download } from 'lucide-react';
import { youtubeGalleryItems } from '../data/youtubeVideos';
import { quotes } from '../data/quotes';
import html2canvas from 'html2canvas';

interface GalleryItem {
  id: string;
  type: 'thumbnail' | 'website' | 'design' | 'business-card' | 'quote';
  title: string;
  description: string;
  imageUrl?: string;
  content?: string;
  sourceUrl?: string;
  aspectRatio: number;
}

// Define a more specific type for styled quotes
interface StyledQuoteItem extends GalleryItem {
  type: 'quote';
  fontFamily: 'times' | 'helvetica'; // Specify font family type
  textTransform: 'uppercase' | 'none'; // Specify text transform
  backgroundColor?: string;
  textColor?: string;
  textAlign?: 'center' | 'left' | 'right' | 'justify';
}

// Function to parse CSV content and create styled quote items (Helvetica, Uppercase)
const parseTweetsToStyledQuotes = (
  csvContent: string,
  sourceUsername: string,
  maxQuotes: number = 10 // Max quotes to pull from a single CSV
): StyledQuoteItem[] => {
  const lines = csvContent.split('\n');
  const headers = lines[0].split(',');
  const textIndex = headers.indexOf('text');
  const typeIndex = headers.indexOf('type');
  const tweetIdIndex = headers.indexOf('tweet_id');

  if (textIndex === -1 || typeIndex === -1 || tweetIdIndex === -1) {
    console.error('CSV headers missing required columns (text, type, tweet_id) for', sourceUsername);
    return [];
  }

  const parsedQuotes: StyledQuoteItem[] = [];
  for (let i = 1; i < lines.length && parsedQuotes.length < maxQuotes; i++) {
    // Handle potential commas within quoted fields by splitting carefully
    const values = lines[i].match(/(".*?"|[^",]+)(?=\s*,|\s*$)/g) || [];
    if (values.length > Math.max(textIndex, typeIndex, tweetIdIndex)) {
      const type = values[typeIndex]?.replace(/"/g, '').trim();
      const rawText = values[textIndex]?.replace(/"/g, '').trim();
      const tweetId = values[tweetIdIndex]?.replace(/'/g, '').trim();

      // Filter for original tweets, non-empty, and reasonable length
      if (type === 'Tweet' && rawText && rawText.length > 20 && rawText.length < 280 && !rawText.startsWith('RT')) {
        const isWhiteBg = Math.random() < 0.3; // 30% chance for white background
        const textAlignChoice = Math.random();
        let textAlign: 'center' | 'left' | 'right' | 'justify' = 'center';
        if (textAlignChoice < 0.2) textAlign = 'justify';
        else if (textAlignChoice < 0.4) textAlign = 'left';
        
        parsedQuotes.push({
          id: `tweet-${sourceUsername}-${tweetId || i}`,
          type: 'quote',
          title: `Tweet by @${sourceUsername}`,
          description: 'Insightful thought',
          content: rawText, // Keep original casing here, apply transform in style
          sourceUrl: `https://twitter.com/${sourceUsername}/status/${tweetId}`,
          aspectRatio: 0.9, 
          fontFamily: 'helvetica',
          textTransform: 'uppercase',
          backgroundColor: isWhiteBg ? 'white' : 'black',
          textColor: isWhiteBg ? 'black' : 'white',
          textAlign: textAlign,
        });
      }
    }
  }
  return parsedQuotes;
};

// Placeholder for CSV contents - In a real scenario, these would be fetched or imported
const zachPogrobTweetsCSV = `
tweet_id,text,language,type,bookmark_count,favorite_count,retweet_count,reply_count,view_count,created_at,client,hashtags,urls,media_type,media_urls
'1922710537105817791',"Fonts/letter styling and spacing - is unbelievably important",en,Tweet,5,15,0,3,3309,2025-05-14 19:48:08,"<a href=\"http://twitter.com/download/iphone\" rel=\"nofollow\">Twitter for iPhone</a>",,,,
'1922696138458579125',"THE BIG PICTURE IS EVERYTHING.",en,Tweet,0,9,0,0,2211,2025-05-14 18:50:56,"<a href=\"https://mobile.twitter.com\" rel=\"nofollow\">Twitter Web App</a>",,,,
'1922690981679464701',"\"\"We don't need to control him. We need to unleash him.\"\"",en,Tweet,98,490,45,4,104689,2025-05-14 18:30:26,"<a href=\"https://mobile.twitter.com\" rel=\"nofollow\">Twitter Web App</a>",,,photo,https://pbs.twimg.com/media/Gq7FOdLWwAEEfuO.png
'1922285957534941326',"I believe all humans should write online every day, forever. If not writing, then some creative medium- video, audio, photo, etc. For free- you build compounding awareness on yourself, your ideas, your mission. It's crazy to me the vast majority never do this. Crazy.",en,Tweet,159,473,33,47,33383,2025-05-13 15:41:01,"<a href=\"http://twitter.com/download/iphone\" rel=\"nofollow\">Twitter for iPhone</a>",,,,
'1922276616165642474',"The key to writing well is understanding that words are not just 'words.' The curvature of each letter matters. How words 'look,' as letters pieced together, matters. How words sound in the theater of the mind, matters so much. Great writing is great design.",en,Tweet,54,216,21,20,9999,2025-05-13 15:03:54,"<a href=\"http://twitter.com/download/iphone\" rel=\"nofollow\">Twitter for iPhone</a>",,,,
'1922040227809353921',"I don't care what you do for a living. I care what you're doing until death.",en,Tweet,29,220,21,8,8233,2025-05-12 23:24:34,"<a href=\"http://twitter.com/download/iphone\" rel=\"nofollow\">Twitter for iPhone</a>",,,,
`;

const blakeAndersonWTweetsCSV = `
tweet_id,text,language,type,bookmark_count,favorite_count,retweet_count,reply_count,view_count,created_at,client,hashtags,urls,media_type,media_urls
'191802077061218792',"The internet rewards generalizations and prescriptions. But most advice is bad. Learn how to listen to your gut.",en,Tweet,24,194,3,20,13806,2025-05-12 07:38:15,"<a href=\"https://mobile.twitter.com\" rel=\"nofollow\">Twitter Web App</a>",,,,
'1919749687801721000',"It's okay to drink beer with your friends! Don't let the cult of hyper-optimization convince you otherwise.",en,Tweet,23,398,9,32,28077,2025-05-06 15:42:47,"<a href=\"https://mobile.twitter.com\" rel=\"nofollow\">Twitter Web App</a>",,,,
'1919439995787419965',"App-to-web subscriptions will create massive opportunity in mobile apps. How much will median LTV increase?",en,Tweet,68,181,1,12,23108,2025-05-05 19:12:11,"<a href=\"https://mobile.twitter.com\" rel=\"nofollow\">Twitter Web App</a>",,,,
'1904010152073900165',"I fail more than I succeed, but I will never stop trying. I don't care about social ridicule. \"\"Failure is irrelevant unless it is catastrophic.\"\"",en,Tweet,101,606,20,44,40055,2025-03-24 04:19:29,"<a href=\"https://mobile.twitter.com\" rel=\"nofollow\">Twitter Web App</a>",,,,
'1903873487074193733',"I still plan to complete the $1m arr in 90 days challenge. But I cannot do it from the confines of an apartment anymore. Headed back to SD.",en,Tweet,173,843,4,87,122742,2025-03-23 19:16:26,"<a href=\"https://mobile.twitter.com\" rel=\"nofollow\">Twitter Web App</a>",,,,
`;

const apollonator3000TweetsCSV = `
tweet_id,text,language,type,bookmark_count,favorite_count,retweet_count,reply_count,view_count,created_at,client,hashtags,urls,media_type,media_urls
'1922927251592450327',"instead of just asking AI for the solution to your problem... you can simulate a \"\"board of experts\"\" discussion to get several unique insights, each coming from a different perspective this'll allow you to find fundamental truths shared across multiple communities - regardless of their bias",en,Tweet,36,40,1,8,911,2025-05-15 10:09:17,"<a href=\"https://mobile.twitter.com\" rel=\"nofollow\">Twitter Web App</a>",,,photo,https://pbs.twimg.com/media/Gq-bhxAXYAAiJD4.png
'1922706290637246807',"no matter how good AI gets, a broad prompt like \"\"generate some sales copy for my supplement\"\" will NEVER match the output you were expecting it will get better at following instructions, sure... but they still gotta be clear instructions",en,Tweet,28,125,3,21,13225,2025-05-14 19:31:16,"<a href=\"https://mobile.twitter.com\" rel=\"nofollow\">Twitter Web App</a>",,,,
'1922666964889071766',"funny observation... when i give a prompt a clickbait title like \"\"this prompt will change your life\"\" it ALWAYS gets 100k+ impressions when i give it a description that's actually useful to ppl that are making moves, it gets significantly less lesson in there",en,Tweet,135,279,13,33,21175,2025-05-14 16:55:00,"<a href=\"https://mobile.twitter.com\" rel=\"nofollow\">Twitter Web App</a>",,,,
'1922366062550499478',"which qualities make up a good life?",en,Tweet,32,131,2,65,16685,2025-05-13 20:59:19,"<a href=\"https://mobile.twitter.com\" rel=\"nofollow\">Twitter Web App</a>",,,,
'1922362357835046966',"writing in 2025 is simply being able to add context, conditions, a brand voice & a bias in your prompts context = the topic to write about conditions = the rules the LLM must follow brand voice = the writing style bias = instructing the LLM to look through a specific lens to skew the output in your favored direction if you add these 4 components to your prompt you will get amazing copy every single time",en,Tweet,390,313,25,11,27178,2025-05-13 20:44:36,"<a href=\"https://mobile.twitter.com\" rel=\"nofollow\">Twitter Web App</a>",,,,
`;

const aimanSalimTweetsCSV = `
tweet_id,text,language,type,bookmark_count,favorite_count,retweet_count,reply_count,view_count,created_at,client,hashtags,urls,media_type,media_urls
'1922402971477799237',"it has begun.",en,Tweet,0,0,0,0,56,2025-05-13 23:25:59,"<a href=\"https://mobile.twitter.com\" rel=\"nofollow\">Twitter Web App</a>",,,,
'1922031396740022498',"this is smart",en,Tweet,0,0,0,0,65,2025-05-12 22:49:29,"<a href=\"http://twitter.com/download/iphone\" rel=\"nofollow\">Twitter for iPhone</a>",,,,
'1920830564447187219',"facts",en,Tweet,0,0,0,0,18,2025-05-09 15:17:48,"<a href=\"http://twitter.com/download/iphone\" rel=\"nofollow\">Twitter for iPhone</a>",,,,
'1919885646337900882',"This is actually so true, 98th out of 190 is bad",en,Tweet,0,1,0,0,25,2025-05-07 00:43:02,"<a href=\"http://twitter.com/download/iphone\" rel=\"nofollow\">Twitter for iPhone</a>",,,,
'1915140276303347750',"gotta build something",en,Tweet,0,0,0,0,33,2025-04-23 22:26:38,"<a href=\"http://twitter.com/download/iphone\" rel=\"nofollow\">Twitter for iPhone</a>",,,,
'1906143556017750390',"The one thing AI can't replace is good taste.",en,Tweet,0,1,0,0,10,2025-03-30 01:36:52,"<a href=\"https://mobile.twitter.com\" rel=\"nofollow\">Twitter Web App</a>",,,,
`;


// Process CSV data into styled quote items
const zachPogrobStyledQuotes = parseTweetsToStyledQuotes(zachPogrobTweetsCSV, 'zachpogrob', 5);
const blakeAndersonWStyledQuotes = parseTweetsToStyledQuotes(blakeAndersonWTweetsCSV, 'blakeandersonw', 5);
const apollonator3000StyledQuotes = parseTweetsToStyledQuotes(apollonator3000TweetsCSV, 'apollonator3000', 5);
const aimanSalimStyledQuotes = parseTweetsToStyledQuotes(aimanSalimTweetsCSV, 'aimannsalim', 5);

// Existing quote items (from quotes.ts) - Times New Roman, original case
const originalStyledQuotes: StyledQuoteItem[] = quotes.slice(0, 15).map((quote, index) => ({ // Increased to 15 original quotes
  id: `original-quote-${index}`,
  type: 'quote',
  title: 'Inspirational Quote',
  description: 'Daily motivation',
  content: quote, // Original casing
  sourceUrl: 'https://aimansalim.com/quotes',
  aspectRatio: 0.9,
  fontFamily: 'times', // Times New Roman
  textTransform: 'none', // No forced case change
  backgroundColor: 'black', 
  textColor: 'white',
  textAlign: 'center',
}));

// Real images from your portfolio and design pages
const baseDesignItems: GalleryItem[] = [
  // Portfolio images - A4 portrait ratio (0.707)
  {
    id: 'design-1',
    type: 'design',
    title: 'Creative Design 1',
    description: 'Professional design work',
    imageUrl: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/1-NUDE-PROJECT.png-LvHhAkKKqp4ljDaNthKk0rjGFiz9Qw.jpeg',
    sourceUrl: 'https://aimansalim.com/portfolio',
    aspectRatio: 0.707 // A4 Portrait
  },
  {
    id: 'design-2',
    type: 'design',
    title: 'Creative Design 2',
    description: 'Professional design work',
    imageUrl: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/2-NUDE-PROJECT.png-oIgobCfCYNt9Gcg52UnMdh0fpX6oTn.jpeg',
    sourceUrl: 'https://aimansalim.com/portfolio',
    aspectRatio: 0.707 // A4 Portrait
  },
  {
    id: 'design-3',
    type: 'design',
    title: 'Creative Design 3',
    description: 'Professional design work',
    imageUrl: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/3-NUDE-PROJECT.png-PJbWTmrPxUCvavFAT8GpI8fsOCkVxF.jpeg',
    sourceUrl: 'https://aimansalim.com/portfolio',
    aspectRatio: 0.707 // A4 Portrait
  },
  {
    id: 'design-4',
    type: 'design',
    title: 'Creative Design 4',
    description: 'Professional design work',
    imageUrl: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/4-NUDE-PROJECT.png-nxEAvaBEc6nI1c0cibwi2YIYT05eAD.jpeg',
    sourceUrl: 'https://aimansalim.com/portfolio',
    aspectRatio: 0.707 // A4 Portrait
  },
  {
    id: 'design-5',
    type: 'design',
    title: 'Creative Design 5',
    description: 'Professional design work',
    imageUrl: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/5-NUDE-PROJECT.png-RXIEytz6zrVWTYX5xdmbZKkkQoe99y.jpeg',
    sourceUrl: 'https://aimansalim.com/portfolio',
    aspectRatio: 0.707 // A4 Portrait
  },
  {
    id: 'design-6',
    type: 'design',
    title: 'Creative Design 6',
    description: 'Professional design work',
    imageUrl: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/6-NUDE-PROJECT.png-wOcGBGbVYrU210xNfwRNSypnZQA6qG.jpeg',
    sourceUrl: 'https://aimansalim.com/portfolio',
    aspectRatio: 0.707 // A4 Portrait
  },
  // Business cards - standard business card ratio
  {
    id: 'business-card-1',
    type: 'business-card',
    title: 'Business Card Front',
    description: 'Business card design',
    imageUrl: '/images/FRONT.png',
    sourceUrl: 'https://aimansalim.com/business-card',
    aspectRatio: 1.75 // Business card ratio
  },
  {
    id: 'business-card-2',
    type: 'business-card',
    title: 'Business Card Back',
    description: 'Business card design',
    imageUrl: '/images/BACK.png',
    sourceUrl: 'https://aimansalim.com/business-card',
    aspectRatio: 1.75 // Business card ratio
  }
];

// Combine all gallery items
const allGalleryItems: GalleryItem[] = [
  ...baseDesignItems,
  ...youtubeGalleryItems,
  ...originalStyledQuotes,
  ...zachPogrobStyledQuotes,
  ...blakeAndersonWStyledQuotes,
  ...apollonator3000StyledQuotes,
  ...aimanSalimStyledQuotes,
];

// Simple shuffle function for one-time display
const shuffleArray = (array: GalleryItem[]) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

export default function GalleryPage() {
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);
  const [imagesLoaded, setImagesLoaded] = useState<Set<string>>(new Set());
  const quoteModalContentRef = useRef<HTMLParagraphElement>(null);

  const galleryItems = useMemo(() => shuffleArray(allGalleryItems), []);

  // Preload all images immediately
  useEffect(() => {
    const imageUrls = galleryItems
      .filter(item => item.imageUrl)
      .map(item => item.imageUrl!);
    
    imageUrls.forEach(url => {
      const img = new Image();
      img.onload = () => {
        setImagesLoaded(prev => new Set([...prev, url]));
      };
      img.src = url;
    });
  }, [galleryItems]);

  const handleItemClick = (item: GalleryItem) => {
    setSelectedItem(item);
  };

  const sendDirectEmail = (item: GalleryItem) => {
    const subject = `Design Request: ${item.title}`;
    const body = `Hi Aiman,\n\nI'm interested in creating something similar to "${item.title}".\n\nProject Details:\n- Type: ${item.type}\n- Description: ${item.description}\n\nPlease get back to me with a quote and timeline.\n\nBest regards`;
    const mailtoUrl = `mailto:info.boold@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailtoUrl;
  };

  // Download function for quotes - adapted from QuotesPage.tsx
  const downloadOpenedQuote = async () => {
    if (!selectedItem || selectedItem.type !== 'quote' || !selectedItem.content) return;

    const currentQuoteItem = selectedItem as StyledQuoteItem;
    const bgColor = currentQuoteItem.backgroundColor || 'black';
    const fgColor = currentQuoteItem.textColor || 'white';
    const align = currentQuoteItem.textAlign || 'center';
    const fontFam = currentQuoteItem.fontFamily === 'helvetica' 
      ? '"Helvetica Bold", Helvetica, Arial, sans-serif' 
      : '"Times New Roman MT Condensed", "Times New Roman", serif';
    const transform = currentQuoteItem.textTransform || 'none';

    const container = document.createElement('div');
    container.style.width = '1200px'; 
    container.style.height = '1600px';
    container.style.backgroundColor = bgColor;
    container.style.position = 'absolute';
    container.style.left = '-9999px'; // Off-screen
    container.style.display = 'flex';
    container.style.alignItems = 'center';
    container.style.justifyContent = 'center';
    container.style.fontFamily = fontFam;

    const contentP = document.createElement('p');
    contentP.style.color = fgColor;
    contentP.style.textAlign = align;
    contentP.style.padding = '10%'; 
    contentP.style.letterSpacing = '-0.04em';
    contentP.style.lineHeight = '1.15';
    contentP.style.fontSize = '54px'; // Larger font for download clarity
    contentP.style.fontFamily = 'inherit'; 
    contentP.style.textTransform = transform;
    contentP.textContent = selectedItem.content;
    
    container.appendChild(contentP);
    document.body.appendChild(container);

    try {
      const canvas = await html2canvas(container, {
        backgroundColor: '#000000',
        scale: 1.5, // Increase scale for higher resolution
        logging: false,
        allowTaint: true,
        useCORS: true,
      });
      const image = canvas.toDataURL('image/jpeg', 0.95);
      const link = document.createElement('a');
      link.href = image;
      link.download = `quote_${selectedItem.id}.jpg`;
      link.click();
    } catch (error) {
      console.error('Error generating quote image:', error);
    } finally {
      document.body.removeChild(container);
    }
  };

  return (
    <>
      <Helmet>
        <title>Gallery | Aiman Salim</title>
        <meta name="description" content="Creative gallery showcasing design work, thumbnails, and projects." />
        {/* Preload critical gallery images */}
        {galleryItems.slice(0, 20).filter(item => item.imageUrl).map(item => (
          <link key={item.id} rel="preload" as="image" href={item.imageUrl} />
        ))}
        {/* Disable image loading animations */}
        <style>{`
          img { 
            image-rendering: -webkit-optimize-contrast !important;
            image-rendering: crisp-edges !important;
            background: transparent !important;
          }
        `}</style>
      </Helmet>

      {/* Custom CSS to remove ALL blue highlights and selections */}
      <style>{`
        * {
          -webkit-tap-highlight-color: transparent !important;
          -webkit-touch-callout: none !important;
          -webkit-user-select: none !important;
          -khtml-user-select: none !important;
          -moz-user-select: none !important;
          -ms-user-select: none !important;
          user-select: none !important;
        }
        
        button, a, div, input, textarea {
          outline: none !important;
          box-shadow: none !important;
          border: none !important;
        }
        
        button:focus, a:focus, div:focus, input:focus, textarea:focus {
          outline: none !important;
          box-shadow: none !important;
          border: none !important;
          background-color: transparent !important;
        }
        
        button:active, a:active {
          background-color: transparent !important;
          color: inherit !important;
        }
        
        ::selection {
          background: transparent !important;
        }
        
        ::-moz-selection {
          background: transparent !important;
        }

        /* Remove ALL blue elements and ensure instant loading */
        img {
          background-color: transparent !important;
          background-image: none !important;
          will-change: auto !important;
        }
        
        /* Disable all browser loading indicators */
        img:not([src]) {
          opacity: 0 !important;
        }
        
        img[src] {
          opacity: 1 !important;
        }
        
        /* Force immediate rendering */
        .gallery-container {
          contain: layout style paint;
          will-change: auto;
        }
        
        .gallery-item {
          contain: layout style paint;
          will-change: auto;
          image-rendering: -webkit-optimize-contrast;
          image-rendering: crisp-edges;
        }

        /* Apple-like edge styling */
        .apple-edge {
          border-radius: 12px;
          position: relative;
          overflow: hidden;
        }
        
        .apple-edge::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          border-radius: 12px;
          padding: 0.5px;
          background: linear-gradient(135deg, 
            rgba(255, 255, 255, 0.15) 0%, 
            rgba(255, 255, 255, 0.05) 25%, 
            rgba(255, 255, 255, 0.02) 50%, 
            rgba(255, 255, 255, 0.05) 75%, 
            rgba(255, 255, 255, 0.15) 100%
          );
          mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          mask-composite: xor;
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          pointer-events: none;
          z-index: 1;
        }

        .apple-edge-quote {
          border-radius: 12px;
          position: relative;
          overflow: hidden;
        }
        
        .apple-edge-quote::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          border-radius: 12px;
          padding: 0.5px;
          background: linear-gradient(135deg, 
            rgba(128, 128, 128, 0.15) 0%, 
            rgba(128, 128, 128, 0.05) 25%, 
            rgba(128, 128, 128, 0.02) 50%, 
            rgba(128, 128, 128, 0.05) 75%, 
            rgba(128, 128, 128, 0.15) 100%
          );
          mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          mask-composite: xor;
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          pointer-events: none;
          z-index: 1;
        }
      `}</style>

      <div className="min-h-screen bg-black text-white pt-24 pb-8">
        {/* Aesthetic Masonry Grid with Proper Aspect Ratios */}
        <div className="max-w-7xl mx-auto px-4 gallery-container">
          <div className="columns-2 sm:columns-3 md:columns-4 lg:columns-5 xl:columns-6 gap-4">
            {galleryItems.map((item, index) => {
              return (
                <div
                  key={item.id}
                  className="break-inside-avoid mb-4 group cursor-pointer transition-transform duration-200 ease-out hover:scale-[1.02] hover:rotate-0.5 gallery-item"
                  onClick={() => handleItemClick(item)}
                >
                  {item.type === 'quote' ? (
                    // Quote card - styled with Helvetica Bold and new properties
                    <div 
                      className="relative apple-edge-quote p-4 transition-all duration-300 h-full flex flex-col justify-center items-center"
                      style={{ 
                        aspectRatio: item.aspectRatio,
                        backgroundColor: (item as StyledQuoteItem).backgroundColor || 'black',
                        fontFamily: (item as StyledQuoteItem).fontFamily === 'helvetica' 
                                      ? '"Helvetica Bold", Helvetica, Arial, sans-serif' 
                                      : '"Times New Roman MT Condensed", "Times New Roman", serif',
                      }}
                    >
                      <p 
                        className="w-full relative z-10" // Ensures text respects padding and alignment
                        style={{
                          color: (item as StyledQuoteItem).textColor || 'white',
                          letterSpacing: '-0.04em', // Low kerning
                          lineHeight: '1.15',
                          fontSize: (item as StyledQuoteItem).fontFamily === 'helvetica' 
                                      ? 'clamp(10px, 1.5vw, 14px)' // Helvetica smaller
                                      : 'clamp(13px, 1.8vw, 16px)', // Times slightly larger for gallery
                          textTransform: (item as StyledQuoteItem).textTransform || 'none',
                          textAlign: (item as StyledQuoteItem).textAlign || 'center',
                          maxWidth: '95%',
                          overflowWrap: 'break-word',
                          wordBreak: 'break-word', // Allow breaking words if needed for justify
                          padding: '5px', // Minimal padding inside card
                        }}
                      >
                        {item.content}
                      </p>
                      {/* Quote hover overlay - simplified & centered icon */}
                      <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-all duration-150 flex items-center justify-center rounded-xl z-20">
                        <div className="flex space-x-2">
                          <a
                            href={item.sourceUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="p-2 bg-white/90 text-black rounded-full hover:bg-white transition-colors duration-150 backdrop-blur-sm scale-90 group-hover:scale-100"
                          >
                            <ExternalLink className="w-3 h-3" />
                          </a>
                          {/* Placeholder for potential second icon if needed later */}
                        </div>
                      </div>
                    </div>
                  ) : (
                    // Image card
                    <div className="relative apple-edge overflow-hidden bg-black transition-all duration-300">
                      <div 
                        className="w-full relative z-10"
                        style={{ aspectRatio: item.aspectRatio }}
                      >
                        <img
                          src={item.imageUrl}
                          alt={item.title}
                          className="w-full h-full object-cover rounded-xl"
                          loading="eager"
                          decoding="async"
                          style={{
                            backgroundColor: 'transparent',
                            minHeight: 'auto'
                          }}
                        />
                      </div>
                      
                      {/* Elegant hover overlay - icons centered, text label removed */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-150 flex items-center justify-center rounded-xl z-20">
                        <div className="flex space-x-2">
                          {/* Mail button shown for relevant image types */}
                          {(item.type === 'thumbnail' || item.type === 'design' || item.type === 'business-card') && (
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                sendDirectEmail(item);
                              }}
                              className="p-2 bg-white/90 text-black rounded-full hover:bg-white transition-colors duration-150 backdrop-blur-sm scale-90 group-hover:scale-100"
                            >
                              <Mail className="w-3 h-3" />
                            </button>
                          )}
                          {item.sourceUrl && (
                            <a
                              href={item.sourceUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={(e) => e.stopPropagation()}
                              className="p-2 bg-white/90 text-black rounded-full hover:bg-white transition-colors duration-150 backdrop-blur-sm scale-90 group-hover:scale-100"
                            >
                              <ExternalLink className="w-3 h-3" />
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Military-style Item Detail Modal */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedItem(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-black border border-white/10 max-w-4xl w-full max-h-[90vh] overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative">
                <button
                  onClick={() => setSelectedItem(null)}
                  className="absolute top-4 right-4 z-10 p-2 bg-black/80 border border-white/20 hover:bg-black transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>

                {selectedItem.type === 'quote' ? (
                  // Quote modal - styled with Helvetica Bold and new properties
                  <div 
                    className="w-full h-full flex flex-col items-center justify-center p-4 md:p-8 relative"
                    style={{ 
                      fontFamily: (selectedItem as StyledQuoteItem).fontFamily === 'helvetica' 
                                    ? '"Helvetica Bold", Helvetica, Arial, sans-serif' 
                                    : '"Times New Roman MT Condensed", "Times New Roman", serif',
                      backgroundColor: (selectedItem as StyledQuoteItem).backgroundColor || 'black',
                    }} 
                  >
                    <p 
                      ref={quoteModalContentRef}
                      className="text-center" 
                      style={{
                        color: (selectedItem as StyledQuoteItem).textColor || 'white',
                        letterSpacing: '-0.04em', 
                        lineHeight: '1.15',
                        fontSize: (selectedItem as StyledQuoteItem).fontFamily === 'helvetica'
                                    ? 'clamp(26px, 4vw, 42px)' // Helvetica modal font size
                                    : 'clamp(28px, 4.5vw, 48px)', // Times modal font size
                        maxWidth: '800px',
                        padding: '5% 0',
                        textTransform: (selectedItem as StyledQuoteItem).textTransform || 'none', 
                        textAlign: (selectedItem as StyledQuoteItem).textAlign || 'center',
                        wordBreak: 'break-word',
                      }}
                    >
                      {(selectedItem as StyledQuoteItem).content}
                    </p>
                    {/* Download button for quote modal */}
                    <button
                      onClick={downloadOpenedQuote}
                      className="absolute bottom-6 right-6 z-20 p-3 bg-white/90 text-black rounded-full hover:bg-white transition-colors backdrop-blur-sm"
                      aria-label="Download quote"
                    >
                      <Download className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  // Image modal
                  <div className="bg-black flex items-center justify-center min-h-[300px] border-b border-white/10">
                    <img
                      src={selectedItem.imageUrl}
                      alt={selectedItem.title}
                      className="max-w-full max-h-[70vh] object-contain"
                      loading="eager"
                      decoding="async"
                      style={{
                        backgroundColor: 'transparent',
                        imageRendering: '-webkit-optimize-contrast'
                      }}
                    />
                  </div>
                )}

                <div className="p-4 bg-black border-t border-white/10">
                  <div className="flex items-center justify-center space-x-3">
                    {(selectedItem.type === 'thumbnail' || selectedItem.type === 'design' || selectedItem.type === 'business-card') && (
                      <button
                        onClick={() => sendDirectEmail(selectedItem)}
                        className="flex items-center space-x-2 px-4 py-2 bg-white text-black border border-white/20 hover:bg-gray-100 transition-colors text-sm"
                      >
                        <Mail className="w-3 h-3" />
                        <span>REQUEST</span>
                      </button>
                    )}
                    
                    {selectedItem.sourceUrl && (
                      <a
                        href={selectedItem.sourceUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center space-x-2 px-4 py-2 bg-black text-white border border-white/20 hover:bg-white/5 transition-colors text-sm"
                      >
                        <ExternalLink className="w-3 h-3" />
                        <span>{selectedItem.type === 'quote' ? 'SEE ALL QUOTES' : 'VIEW'}</span>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
} 