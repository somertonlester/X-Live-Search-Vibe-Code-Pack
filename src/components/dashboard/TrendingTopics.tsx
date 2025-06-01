import React from 'react';
import { TrendingUp } from 'lucide-react';
import { useApp } from '../../contexts/AppContext';

export const TrendingTopics: React.FC = () => {
  const { setSearchQuery, setActiveView, setContentType, setIsSearching } = useApp();
  
  const handleTopicClick = (topic: string) => {
    setSearchQuery(topic);
    setActiveView('results');
    setContentType('news');
    setIsSearching(true);
    
    // Simulate search completion after 1.5 seconds
    setTimeout(() => {
      setIsSearching(false);
    }, 1500);
  };
  
  return (
    <div className="bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 overflow-hidden">
      <div className="p-5 border-b border-white/10 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-electricCyan" />
          <h2 className="font-semibold">Trending Topics</h2>
        </div>
        <span className="text-xs text-white/50">Live Updates</span>
      </div>
      
      <div className="p-2 space-y-1">
        {trendingTopics.map((topic, index) => (
          <TopicItem 
            key={index}
            rank={index + 1}
            topic={topic.topic}
            mentions={topic.mentions}
            sentiment={topic.sentiment}
            onClick={() => handleTopicClick(topic.topic)}
          />
        ))}
      </div>
    </div>
  );
};

interface TopicItemProps {
  rank: number;
  topic: string;
  mentions: number;
  sentiment: 'positive' | 'negative' | 'neutral' | 'mixed';
  onClick: () => void;
}

const TopicItem: React.FC<TopicItemProps> = ({ rank, topic, mentions, sentiment, onClick }) => {
  const getSentimentColor = () => {
    switch (sentiment) {
      case 'positive': return 'bg-green-500';
      case 'negative': return 'bg-red-500';
      case 'neutral': return 'bg-gray-400';
      case 'mixed': return 'bg-amber-400';
      default: return 'bg-gray-400';
    }
  };
  
  const formatMentions = (count: number) => {
    if (count >= 1000000) {
      return `${(count / 1000000).toFixed(1)}M`;
    } else if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}K`;
    } else {
      return count.toString();
    }
  };
  
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-3 w-full p-3 rounded-xl hover:bg-white/10 transition-colors duration-200 text-left group"
    >
      <div className="w-7 h-7 flex items-center justify-center bg-white/10 rounded-full text-sm font-medium">
        {rank}
      </div>
      <div className="flex-1">
        <p className="font-medium group-hover:text-electricCyan transition-colors duration-200">
          {topic}
        </p>
        <div className="flex items-center gap-2 text-xs text-white/50 mt-1">
          <span>{formatMentions(mentions)} mentions</span>
          <div className="w-1.5 h-1.5 rounded-full bg-white/20"></div>
          <div className="flex items-center gap-1">
            <div className={`w-2 h-2 rounded-full ${getSentimentColor()}`}></div>
            <span>{sentiment}</span>
          </div>
        </div>
      </div>
      <div className="w-12 h-12 relative overflow-hidden rounded-lg opacity-70 group-hover:opacity-100 transition-opacity duration-200">
        <div className={`absolute inset-0 ${getSentimentColor()} opacity-20`}></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className={`w-6 h-6 ${getSentimentColor()} rounded-full opacity-40 animate-pulse`}></div>
        </div>
      </div>
    </button>
  );
};

const trendingTopics = [
  { topic: "Artificial Intelligence", mentions: 1245000, sentiment: 'mixed' as const },
  { topic: "Climate Action", mentions: 895000, sentiment: 'positive' as const },
  { topic: "Tech Layoffs", mentions: 567000, sentiment: 'negative' as const },
  { topic: "SpaceX Launch", mentions: 423000, sentiment: 'positive' as const },
  { topic: "Stock Market", mentions: 356000, sentiment: 'neutral' as const },
  { topic: "Political Debate", mentions: 289000, sentiment: 'mixed' as const },
  { topic: "New iPhone", mentions: 245000, sentiment: 'positive' as const }
];