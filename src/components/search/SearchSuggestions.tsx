import React from 'react';
import { TrendingUp, BarChart, Award, AlertCircle, Clock } from 'lucide-react';
import { useApp } from '../../contexts/AppContext';

interface SearchSuggestionsProps {
  setSearchQuery: (query: string) => void;
}

export const SearchSuggestions: React.FC<SearchSuggestionsProps> = ({ setSearchQuery }) => {
  const { setActiveView, setContentType, setIsSearching } = useApp();
  
  const handleSuggestionClick = (query: string, type: 'sentiment' | 'news' | 'memes' | 'accounts' | 'timeline' | 'factCheck') => {
    setSearchQuery(query);
    setActiveView('results');
    setContentType(type);
    setIsSearching(true);
    
    // Simulate search completion after 1.5 seconds
    setTimeout(() => {
      setIsSearching(false);
    }, 1500);
  };
  
  return (
    <div className="absolute w-full bg-white/10 backdrop-blur-lg border border-white/20 border-t-0 rounded-b-2xl overflow-hidden z-50">
      <div className="p-2 space-y-1">
        <SuggestionItem 
          icon={<TrendingUp className="w-4 h-4 text-electricCyan" />}
          label="Trending topics about AI today" 
          onClick={() => handleSuggestionClick("Trending topics about AI today", "news")}
        />
        <SuggestionItem 
          icon={<BarChart className="w-4 h-4 text-green-400" />}
          label="Sentiment analysis for climate change discussions" 
          onClick={() => handleSuggestionClick("Sentiment analysis for climate change discussions", "sentiment")}
        />
        <SuggestionItem 
          icon={<Award className="w-4 h-4 text-amber-400" />}
          label="Most viral tech memes this week" 
          onClick={() => handleSuggestionClick("Most viral tech memes this week", "memes")}
        />
        <SuggestionItem 
          icon={<AlertCircle className="w-4 h-4 text-red-400" />}
          label="Fact check: Recent statements about the economy" 
          onClick={() => handleSuggestionClick("Fact check: Recent statements about the economy", "factCheck")}
        />
        <SuggestionItem 
          icon={<Clock className="w-4 h-4 text-purple-400" />}
          label="Timeline of cryptocurrency discussions" 
          onClick={() => handleSuggestionClick("Timeline of cryptocurrency discussions", "timeline")}
        />
      </div>
      
      <div className="bg-white/5 p-2">
        <h4 className="text-xs text-white/50 px-3 py-1">Recent Searches</h4>
        <div className="space-y-1">
          <RecentSearchItem 
            label="Tech layoffs 2024" 
            onClick={() => handleSuggestionClick("Tech layoffs 2024", "news")}
          />
          <RecentSearchItem 
            label="@elonmusk tweets about AI" 
            onClick={() => handleSuggestionClick("@elonmusk tweets about AI", "accounts")}
          />
        </div>
      </div>
    </div>
  );
};

interface SuggestionItemProps {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
}

const SuggestionItem: React.FC<SuggestionItemProps> = ({ icon, label, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-3 w-full px-3 py-2 rounded-lg hover:bg-white/10 transition-colors duration-200 text-left"
    >
      <div className="flex-shrink-0">{icon}</div>
      <span className="text-sm text-white">{label}</span>
    </button>
  );
};

interface RecentSearchItemProps {
  label: string;
  onClick: () => void;
}

const RecentSearchItem: React.FC<RecentSearchItemProps> = ({ label, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-3 w-full px-3 py-2 rounded-lg hover:bg-white/10 transition-colors duration-200 text-left"
    >
      <span className="text-sm text-white/80">{label}</span>
    </button>
  );
};