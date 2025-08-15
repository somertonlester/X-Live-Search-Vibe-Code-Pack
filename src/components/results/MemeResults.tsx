import React from 'react';
import { Flame, Share2, ArrowRight, Clock } from 'lucide-react';

interface MemeResultsProps {
  query: string;
}

export const MemeResults: React.FC<MemeResultsProps> = ({ query }) => {
  return (
    <div className="space-y-8">
      <div className="bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 overflow-hidden p-5 mb-8">
        <h2 className="font-semibold mb-4 flex items-center gap-2">
          <Flame className="w-5 h-5 text-electricCyan" />
          <span>Trending Memes & Viral Content</span>
        </h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {virality.map((item, index) => (
            <div key={index} className="flex items-center gap-3">
              <div className="w-16 h-16 flex-shrink-0 flex items-center justify-center">
                <div className="relative">
                  <div
                    className="w-12 h-12 rounded-full opacity-40"
                    style={{
                      background: `conic-gradient(${item.color} ${item.percentage}%, transparent 0)`,
                      transform: 'rotate(-90deg)'
                    }}
                  ></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Flame 
                      className="w-6 h-6"
                      style={{ color: item.color }}
                    />
                  </div>
                </div>
              </div>
              <div>
                <h3 className="font-medium">{item.name}</h3>
                <div className="flex items-center gap-2 text-xs text-white/70">
                  <span>{item.percentage}% viral</span>
                  <span>•</span>
                  <span>{item.shares} shares</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 auto-rows-min">
        {memeItems.map((meme, index) => (
          <MemeCard
            key={index}
            image={meme.image}
            caption={meme.caption}
            heat={meme.heat}
            shares={meme.shares}
            hours={meme.hours}
            index={index}
          />
        ))}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 overflow-hidden">
          <div className="p-5 border-b border-white/10">
            <h2 className="font-semibold flex items-center gap-2">
              <Clock className="w-5 h-5 text-electricCyan" />
              <span>Meme Evolution Timeline</span>
            </h2>
          </div>
          
          <div className="p-6">
            <div className="relative">
              <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-white/20"></div>
              
              {evolutionSteps.map((step, index) => (
                <div key={index} className="relative pl-12 pb-8">
                  <div className="absolute left-0 w-8 h-8 rounded-full bg-deepBlue border-4 border-electricCyan/50 z-10 flex items-center justify-center">
                    {index + 1}
                  </div>
                  <div className="bg-white/10 rounded-xl p-4">
                    <h3 className="font-medium mb-2">{step.title}</h3>
                    <p className="text-sm text-white/70 mb-3">{step.description}</p>
                    <div className="text-xs text-white/50">{step.date}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div className="bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 overflow-hidden">
          <div className="p-5 border-b border-white/10">
            <h2 className="font-semibold flex items-center gap-2">
              <Share2 className="w-5 h-5 text-electricCyan" />
              <span>Sharing Patterns</span>
            </h2>
          </div>
          
          <div className="p-6 space-y-4">
            {sharingPatterns.map((pattern, index) => (
              <div key={index} className="flex items-center gap-4">
                <div className="w-16 text-center">
                  <div className="text-lg font-bold">{pattern.percentage}%</div>
                  <div className="text-xs text-white/50">share rate</div>
                </div>
                
                <div className="flex-1">
                  <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                    <div 
                      className="h-full rounded-full"
                      style={{ 
                        width: `${pattern.percentage}%`,
                        backgroundColor: getShareColor(pattern.percentage)
                      }}
                    ></div>
                  </div>
                </div>
                
                <div className="w-24">
                  <div className="text-sm font-medium">{pattern.platform}</div>
                </div>
              </div>
            ))}
            
            <div className="pt-4 mt-4 border-t border-white/10">
              <button className="flex items-center gap-1 text-electricCyan text-sm">
                <span>View detailed analysis</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

interface MemeCardProps {
  image: string;
  caption: string;
  heat: number;
  shares: number;
  hours: number;
  index: number;
}

const MemeCard: React.FC<MemeCardProps> = ({ image, caption, heat, shares, hours, index }) => {
  // Determine the grid row span based on index to create a staggered look
  const getRowSpan = () => {
    return index % 3 === 0 ? 'row-span-1' : 'row-span-1';
  };
  
  // Get a color based on the heat value
  const getHeatColor = (heat: number) => {
    if (heat >= 90) return '#EF4444';
    if (heat >= 70) return '#F59E0B';
    if (heat >= 50) return '#10B981';
    return '#6B7280';
  };
  
  const heatColor = getHeatColor(heat);
  
  return (
    <div className={`group ${getRowSpan()} bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 overflow-hidden transition-all duration-300 hover:border-electricCyan/30`}>
      <div className="relative">
        <img 
          src={image} 
          alt={caption} 
          className="w-full h-auto transition-transform duration-500 group-hover:scale-[1.03]"
        />
        <div className="absolute top-3 right-3 bg-deepBlue/70 backdrop-blur-sm rounded-full px-2.5 py-1 flex items-center gap-1.5">
          <Flame 
            className="w-4 h-4"
            style={{ color: heatColor }}
          />
          <span className="text-xs font-medium">{heat}/100</span>
        </div>
      </div>
      <div className="p-4">
        <p className="text-sm mb-3">{caption}</p>
        <div className="flex items-center justify-between text-xs text-white/60">
          <div className="flex items-center gap-1">
            <Share2 className="w-3.5 h-3.5" />
            <span>{shares.toLocaleString()} shares</span>
          </div>
          <div>{hours}h ago</div>
        </div>
      </div>
    </div>
  );
};

const virality = [
  { name: 'AI Mistakes Memes', percentage: 94, shares: '325K', color: '#EF4444' },
  { name: 'Developer Humor', percentage: 82, shares: '198K', color: '#F59E0B' },
  { name: 'Tech CEO Reactions', percentage: 76, shares: '143K', color: '#F59E0B' },
  { name: 'Programming Jokes', percentage: 65, shares: '118K', color: '#10B981' },
  { name: 'Work From Home', percentage: 58, shares: '95K', color: '#10B981' },
  { name: 'Future Tech', percentage: 47, shares: '72K', color: '#6B7280' }
];

const memeItems = [
  {
    image: 'https://images.pexels.com/photos/1181271/pexels-photo-1181271.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    caption: 'When the AI generates exactly what you wanted on the 37th try',
    heat: 95,
    shares: 145000,
    hours: 8
  },
  {
    image: 'https://images.pexels.com/photos/7887142/pexels-photo-7887142.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    caption: 'Developer seeing their code in production for the first time',
    heat: 88,
    shares: 123000,
    hours: 12
  },
  {
    image: 'https://images.pexels.com/photos/4050388/pexels-photo-4050388.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    caption: 'How tech CEOs think they look announcing new AI features',
    heat: 82,
    shares: 98000,
    hours: 16
  },
  {
    image: 'https://images.pexels.com/photos/577585/pexels-photo-577585.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    caption: 'The moment you realize your weekend will be spent fixing bugs',
    heat: 79,
    shares: 87000,
    hours: 20
  },
  {
    image: 'https://images.pexels.com/photos/92904/pexels-photo-92904.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    caption: 'Work from home reality vs. expectations',
    heat: 74,
    shares: 76000,
    hours: 24
  },
  {
    image: 'https://images.pexels.com/photos/4050151/pexels-photo-4050151.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    caption: 'Machine learning models after being trained on biased data',
    heat: 67,
    shares: 65000,
    hours: 36
  },
  {
    image: 'https://images.pexels.com/photos/4050425/pexels-photo-4050425.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    caption: 'The face your coworker makes when you suggest a complete rewrite',
    heat: 62,
    shares: 58000,
    hours: 48
  },
  {
    image: 'https://images.pexels.com/photos/1311518/pexels-photo-1311518.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    caption: 'Future tech predictions vs. what we actually got',
    heat: 56,
    shares: 45000,
    hours: 72
  }
];

const evolutionSteps = [
  {
    title: 'Origin: AI Image Generation Errors',
    description: 'Started with users sharing humorous AI image generation mistakes.',
    date: 'April 12, 2024'
  },
  {
    title: 'Mainstream Adoption',
    description: 'Tech influencers began sharing their own examples, expanding reach.',
    date: 'April 15, 2024'
  },
  {
    title: 'Format Evolution',
    description: 'Evolved into side-by-side comparisons of prompts vs. results.',
    date: 'April 18, 2024'
  },
  {
    title: 'Peak Virality',
    description: 'Reached maximum engagement with "AI vs Reality" hashtag trend.',
    date: 'April 21, 2024'
  }
];

const sharingPatterns = [
  { platform: 'Twitter/X', percentage: 42 },
  { platform: 'Reddit', percentage: 28 },
  { platform: 'Instagram', percentage: 16 },
  { platform: 'LinkedIn', percentage: 8 },
  { platform: 'Facebook', percentage: 6 }
];

const getShareColor = (percentage: number) => {
  if (percentage >= 40) return '#00D9FF';
  if (percentage >= 20) return '#000000';
  return '#10B981';
};