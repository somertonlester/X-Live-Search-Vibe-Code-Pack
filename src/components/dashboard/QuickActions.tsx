import React from 'react';
import { Zap, BarChart2, Newspaper, Image, Clock, CheckCircle, UserCheck } from 'lucide-react';
import { useApp } from '../../contexts/AppContext';

export const QuickActions: React.FC = () => {
  const { setSearchQuery, setActiveView, setContentType, setIsSearching } = useApp();
  
  const handleActionClick = (query: string, type: 'sentiment' | 'news' | 'memes' | 'accounts' | 'timeline' | 'factCheck') => {
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
    <div className="max-w-5xl mx-auto">
      <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
        <Zap className="w-5 h-5 text-electricCyan" />
        <span>Quick Actions</span>
      </h2>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
        <ActionButton 
          icon={<Newspaper className="w-6 h-6" />}
          label="Breaking News" 
          onClick={() => handleActionClick("Breaking News Today", "news")}
        />
        <ActionButton 
          icon={<BarChart2 className="w-6 h-6" />}
          label="Sentiment Check" 
          onClick={() => handleActionClick("Current public sentiment analysis", "sentiment")}
        />
        <ActionButton 
          icon={<Image className="w-6 h-6" />}
          label="Viral Content" 
          onClick={() => handleActionClick("Most viral content this week", "memes")}
        />
        <ActionButton 
          icon={<UserCheck className="w-6 h-6" />}
          label="Tech Leaders" 
          onClick={() => handleActionClick("Tech leader discussions", "accounts")}
        />
        <ActionButton 
          icon={<Clock className="w-6 h-6" />}
          label="Event Timeline" 
          onClick={() => handleActionClick("Timeline of major tech events", "timeline")}
        />
        <ActionButton 
          icon={<CheckCircle className="w-6 h-6" />}
          label="Fact Check" 
          onClick={() => handleActionClick("Fact check trending claims", "factCheck")}
        />
      </div>
    </div>
  );
};

interface ActionButtonProps {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
}

const ActionButton: React.FC<ActionButtonProps> = ({ icon, label, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="flex flex-col items-center justify-center gap-3 bg-white/5 backdrop-blur-sm 
                 hover:bg-white/10 border border-white/10 hover:border-electricCyan/30
                 rounded-xl p-4 transition-all duration-300 group"
    >
      <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center
                     group-hover:bg-electricCyan/20 transition-colors duration-300">
        <div className="text-white/70 group-hover:text-electricCyan transition-colors duration-300">
          {icon}
        </div>
      </div>
      <span className="text-sm font-medium">{label}</span>
    </button>
  );
};