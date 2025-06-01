import React, { useEffect, useState } from 'react';
import { Loader2 } from 'lucide-react';

interface SearchLoadingProps {
  query: string;
  contentType: 'sentiment' | 'news' | 'memes' | 'accounts' | 'timeline' | 'factCheck' | null;
}

export const SearchLoading: React.FC<SearchLoadingProps> = ({ query, contentType }) => {
  const [loadingMessage, setLoadingMessage] = useState('');
  
  useEffect(() => {
    const messages = {
      sentiment: [
        'Analyzing sentiment patterns...',
        'Processing emotional signals...',
        'Categorizing opinion clusters...'
      ],
      news: [
        'Gathering breaking stories...',
        'Analyzing news sources...',
        'Evaluating story importance...'
      ],
      memes: [
        'Tracking viral content...',
        'Measuring engagement metrics...',
        'Mapping meme evolution...'
      ],
      accounts: [
        'Analyzing influential voices...',
        'Processing conversation threads...',
        'Evaluating key statements...'
      ],
      timeline: [
        'Building historical timeline...',
        'Mapping event connections...',
        'Analyzing temporal patterns...'
      ],
      factCheck: [
        'Cross-referencing sources...',
        'Evaluating claim credibility...',
        'Building evidence matrix...'
      ],
      default: [
        'Processing social signals...',
        'Analyzing conversation patterns...',
        'Extracting meaningful insights...'
      ]
    };
    
    const messageList = contentType ? messages[contentType] : messages.default;
    let currentIndex = 0;
    
    setLoadingMessage(messageList[0]);
    
    const interval = setInterval(() => {
      currentIndex = (currentIndex + 1) % messageList.length;
      setLoadingMessage(messageList[currentIndex]);
    }, 2000);
    
    return () => clearInterval(interval);
  }, [contentType]);
  
  return (
    <div className="flex flex-col items-center justify-center py-24">
      <div className="relative mb-10">
        <div className="w-16 h-16 rounded-full border-4 border-electricCyan/30 flex items-center justify-center">
          <Loader2 className="w-8 h-8 text-electricCyan animate-spin" />
        </div>
        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
          <div className="w-24 h-24 rounded-full bg-electricCyan/20 animate-ping"></div>
        </div>
      </div>
      
      <h2 className="text-xl font-medium mb-2">Searching for "{query}"</h2>
      <p className="text-white/70">{loadingMessage}</p>
    </div>
  );
};