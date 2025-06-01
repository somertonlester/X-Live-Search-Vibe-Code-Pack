import React from 'react';
import { BarChart2, TrendingUp, MessageCircle } from 'lucide-react';

interface SentimentAnalysisProps {
  query: string;
}

export const SentimentAnalysis: React.FC<SentimentAnalysisProps> = ({ query }) => {
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <SentimentGauge value={65} type="positive" />
        <SentimentGauge value={25} type="negative" />
        <SentimentGauge value={10} type="neutral" />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 overflow-hidden">
          <div className="p-5 border-b border-white/10">
            <h2 className="font-semibold flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-electricCyan" />
              <span>Sentiment Trend Over Time</span>
            </h2>
          </div>
          
          <div className="p-6 h-64 flex items-end">
            {/* Simplified sentiment trend visualization */}
            {Array.from({ length: 14 }).map((_, i) => {
              const heights = [40, 45, 55, 60, 65, 60, 70, 80, 75, 65, 60, 55, 70, 75];
              const negHeights = [20, 25, 20, 15, 20, 25, 15, 10, 15, 20, 25, 30, 20, 15];
              
              return (
                <div key={i} className="flex-1 flex flex-col items-center justify-end">
                  <div 
                    className="w-full bg-green-500/40 rounded-t-sm"
                    style={{ height: `${heights[i]}%` }}
                  ></div>
                  <div 
                    className="w-full bg-red-500/40 rounded-b-sm"
                    style={{ height: `${negHeights[i]}%` }}
                  ></div>
                  <div className="text-xs text-white/50 mt-2">
                    {i + 1}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        
        <div className="bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 overflow-hidden">
          <div className="p-5 border-b border-white/10">
            <h2 className="font-semibold flex items-center gap-2">
              <MessageCircle className="w-5 h-5 text-electricCyan" />
              <span>Key Opinion Samples</span>
            </h2>
          </div>
          
          <div className="p-4 space-y-3">
            <OpinionBubble 
              text="This technology advancement is truly groundbreaking! Can't wait to see what's next." 
              sentiment="positive"
              engagement={1245}
            />
            <OpinionBubble 
              text="While I see the benefits, I'm concerned about the potential impacts on privacy." 
              sentiment="mixed"
              engagement={876}
            />
            <OpinionBubble 
              text="Completely opposed to this direction. We need stronger regulations immediately." 
              sentiment="negative"
              engagement={543}
            />
            <OpinionBubble 
              text="Following the developments closely, but no strong opinion formed yet." 
              sentiment="neutral"
              engagement={321}
            />
          </div>
        </div>
      </div>
      
      <div className="bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 overflow-hidden">
        <div className="p-5 border-b border-white/10">
          <h2 className="font-semibold flex items-center gap-2">
            <BarChart2 className="w-5 h-5 text-electricCyan" />
            <span>Emotion Cloud</span>
          </h2>
        </div>
        
        <div className="p-8 flex flex-wrap justify-center">
          {emotionWords.map((word, index) => (
            <div 
              key={index}
              className="px-3 py-1.5 m-2 rounded-full transition-all duration-300 hover:scale-110"
              style={{ 
                fontSize: `${word.size}px`,
                color: word.color,
                backgroundColor: `${word.color}20`
              }}
            >
              {word.text}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

interface SentimentGaugeProps {
  value: number;
  type: 'positive' | 'negative' | 'neutral';
}

const SentimentGauge: React.FC<SentimentGaugeProps> = ({ value, type }) => {
  const getColor = () => {
    switch (type) {
      case 'positive': return 'text-green-500';
      case 'negative': return 'text-red-500';
      case 'neutral': return 'text-gray-400';
      default: return 'text-gray-400';
    }
  };
  
  const getBgColor = () => {
    switch (type) {
      case 'positive': return 'from-green-500/20 to-green-500/5';
      case 'negative': return 'from-red-500/20 to-red-500/5';
      case 'neutral': return 'from-gray-400/20 to-gray-400/5';
      default: return 'from-gray-400/20 to-gray-400/5';
    }
  };
  
  const getTitle = () => {
    switch (type) {
      case 'positive': return 'Positive Sentiment';
      case 'negative': return 'Negative Sentiment';
      case 'neutral': return 'Neutral Sentiment';
      default: return 'Sentiment';
    }
  };
  
  return (
    <div className={`bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 p-6 ${getBgColor()} bg-gradient-to-b`}>
      <h3 className="text-lg font-medium mb-4">{getTitle()}</h3>
      
      <div className="flex justify-center mb-4">
        <div className="relative w-36 h-36 flex items-center justify-center">
          <svg className="w-full h-full" viewBox="0 0 100 100">
            <circle 
              cx="50" 
              cy="50" 
              r="45" 
              fill="transparent" 
              stroke="currentColor" 
              strokeWidth="10" 
              strokeDasharray={`${value * 2.83} ${283 - value * 2.83}`}
              strokeDashoffset="70.75"
              className={`${getColor()} opacity-20 transition-all duration-1000`}
              style={{ transformOrigin: 'center', transform: 'rotate(-90deg)' }}
            />
            <circle 
              cx="50" 
              cy="50" 
              r="45" 
              fill="transparent" 
              stroke="currentColor" 
              strokeWidth="10" 
              strokeDasharray={`${value * 2.83} ${283 - value * 2.83}`}
              strokeDashoffset="70.75"
              className={getColor()}
              style={{ transformOrigin: 'center', transform: 'rotate(-90deg)' }}
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center flex-col">
            <span className={`text-3xl font-bold ${getColor()}`}>{value}%</span>
          </div>
        </div>
      </div>
      
      <p className="text-white/70 text-center">Based on analysis of 1.2M tweets related to this topic.</p>
    </div>
  );
};

interface OpinionBubbleProps {
  text: string;
  sentiment: 'positive' | 'negative' | 'neutral' | 'mixed';
  engagement: number;
}

const OpinionBubble: React.FC<OpinionBubbleProps> = ({ text, sentiment, engagement }) => {
  const getBgColor = () => {
    switch (sentiment) {
      case 'positive': return 'bg-green-500/10 border-green-500/30';
      case 'negative': return 'bg-red-500/10 border-red-500/30';
      case 'neutral': return 'bg-gray-500/10 border-gray-500/30';
      case 'mixed': return 'bg-amber-500/10 border-amber-500/30';
      default: return 'bg-gray-500/10 border-gray-500/30';
    }
  };
  
  const getIndicatorColor = () => {
    switch (sentiment) {
      case 'positive': return 'bg-green-500';
      case 'negative': return 'bg-red-500';
      case 'neutral': return 'bg-gray-400';
      case 'mixed': return 'bg-amber-400';
      default: return 'bg-gray-400';
    }
  };
  
  return (
    <div className={`p-4 rounded-2xl border ${getBgColor()} relative`}>
      <div className="flex items-start">
        <div className={`w-3 h-3 rounded-full ${getIndicatorColor()} mt-1 mr-3 flex-shrink-0`}></div>
        <p className="text-sm">{text}</p>
      </div>
      <div className="text-xs text-white/50 mt-2 flex justify-end">
        {engagement.toLocaleString()} engagements
      </div>
    </div>
  );
};

const emotionWords = [
  { text: 'Excited', size: 24, color: '#10B981' },
  { text: 'Concerned', size: 20, color: '#F59E0B' },
  { text: 'Hopeful', size: 22, color: '#3B82F6' },
  { text: 'Frustrated', size: 18, color: '#EF4444' },
  { text: 'Optimistic', size: 26, color: '#10B981' },
  { text: 'Worried', size: 19, color: '#F59E0B' },
  { text: 'Impressed', size: 21, color: '#10B981' },
  { text: 'Skeptical', size: 23, color: '#F59E0B' },
  { text: 'Curious', size: 20, color: '#3B82F6' },
  { text: 'Disappointed', size: 17, color: '#EF4444' },
  { text: 'Amazed', size: 24, color: '#10B981' },
  { text: 'Neutral', size: 16, color: '#9CA3AF' },
  { text: 'Confused', size: 18, color: '#9CA3AF' },
  { text: 'Inspired', size: 22, color: '#10B981' },
  { text: 'Angry', size: 19, color: '#EF4444' }
];