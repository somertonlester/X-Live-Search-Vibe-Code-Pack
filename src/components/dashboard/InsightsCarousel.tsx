import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, BarChart2, Newspaper, Image, UserCheck } from 'lucide-react';
import { useApp } from '../../contexts/AppContext';

export const InsightsCarousel: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const { setSearchQuery, setActiveView, setContentType, setIsSearching } = useApp();
  
  const handlePrev = () => {
    setActiveIndex(prev => (prev === 0 ? insightCards.length - 1 : prev - 1));
  };
  
  const handleNext = () => {
    setActiveIndex(prev => (prev === insightCards.length - 1 ? 0 : prev + 1));
  };
  
  const handleCardClick = (insight: typeof insightCards[0]) => {
    setSearchQuery(insight.title);
    setActiveView('results');
    setContentType(insight.type);
    setIsSearching(true);
    
    // Simulate search completion after 1.5 seconds
    setTimeout(() => {
      setIsSearching(false);
    }, 1500);
  };
  
  return (
    <div className="relative">
      <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
        <span className="text-electricCyan">//</span> Recent Insights
      </h2>
      
      <div className="overflow-hidden rounded-2xl">
        <div 
          className="flex transition-transform duration-500 ease-out"
          style={{ transform: `translateX(-${activeIndex * 100}%)` }}
        >
          {insightCards.map((card, index) => (
            <div key={index} className="w-full flex-shrink-0">
              <button 
                onClick={() => handleCardClick(card)}
                className="w-full text-left block"
              >
                <div 
                  className="aspect-[16/9] bg-cover bg-center rounded-2xl overflow-hidden relative"
                  style={{ backgroundImage: `url(${card.image})` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-deepBlue via-transparent to-transparent"></div>
                  <div className="absolute inset-0 p-6 flex flex-col justify-end">
                    <div className="flex items-center gap-2 mb-3">
                      {card.type === 'sentiment' && <BarChart2 className="w-5 h-5 text-electricCyan" />}
                      {card.type === 'news' && <Newspaper className="w-5 h-5 text-electricCyan" />}
                      {card.type === 'memes' && <Image className="w-5 h-5 text-electricCyan" />}
                      {card.type === 'accounts' && <UserCheck className="w-5 h-5 text-electricCyan" />}
                      <span className="text-sm font-medium text-electricCyan">
                        {card.type === 'sentiment' && 'Sentiment Analysis'}
                        {card.type === 'news' && 'News Analysis'}
                        {card.type === 'memes' && 'Viral Content'}
                        {card.type === 'accounts' && 'Account Analysis'}
                      </span>
                    </div>
                    <h3 className="text-2xl font-bold">{card.title}</h3>
                    <p className="text-white/70 mt-2">{card.description}</p>
                  </div>
                </div>
              </button>
            </div>
          ))}
        </div>
      </div>
      
      <div className="flex justify-between mt-4">
        <div className="flex gap-2">
          {insightCards.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === activeIndex 
                  ? 'bg-electricCyan w-8' 
                  : 'bg-white/20 hover:bg-white/40'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
        
        <div className="flex gap-2">
          <button
            onClick={handlePrev}
            className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors duration-200"
            aria-label="Previous slide"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <button
            onClick={handleNext}
            className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors duration-200"
            aria-label="Next slide"
          >
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

const insightCards = [
  {
    type: 'sentiment' as const,
    title: 'Public Sentiment on AI Regulation',
    description: 'Analysis of 1.2M tweets reveals shifting attitudes toward AI safety measures.',
    image: 'https://images.pexels.com/photos/8386434/pexels-photo-8386434.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  },
  {
    type: 'news' as const,
    title: 'Tech Sector Layoffs: The Complete Story',
    description: 'Tracking the recent wave of tech layoffs and public reaction on social media.',
    image: 'https://images.pexels.com/photos/6457544/pexels-photo-6457544.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  },
  {
    type: 'memes' as const,
    title: 'How Memes Are Shaping Tech Culture',
    description: 'The viral content defining attitudes toward technology companies in 2024.',
    image: 'https://images.pexels.com/photos/7599900/pexels-photo-7599900.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  },
  {
    type: 'accounts' as const,
    title: 'Influential Tech Voices Analysis',
    description: `Who's driving the conversation in tech? An analysis of the most influential accounts.`,
    image: 'https://images.pexels.com/photos/5426403/pexels-photo-5426403.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  }
];