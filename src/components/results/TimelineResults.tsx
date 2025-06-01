import React, { useState } from 'react';
import { Clock, ChevronLeft, ChevronRight, ArrowRight, Info, BarChart2, Play } from 'lucide-react';

interface TimelineResultsProps {
  query: string;
}

export const TimelineResults: React.FC<TimelineResultsProps> = ({ query }) => {
  const [activeIndex, setActiveIndex] = useState(3); // Set to a middle event by default
  
  const handlePrev = () => {
    if (activeIndex > 0) {
      setActiveIndex(activeIndex - 1);
    }
  };
  
  const handleNext = () => {
    if (activeIndex < timelineEvents.length - 1) {
      setActiveIndex(activeIndex + 1);
    }
  };
  
  return (
    <div className="space-y-8">
      <div className="bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 overflow-hidden">
        <div className="p-5 border-b border-white/10 flex items-center justify-between">
          <h2 className="font-semibold flex items-center gap-2">
            <Clock className="w-5 h-5 text-electricCyan" />
            <span>Event Timeline</span>
          </h2>
          
          <button className="flex items-center gap-1 text-electricCyan text-sm">
            <Play className="w-4 h-4" />
            <span>Playback Mode</span>
          </button>
        </div>
        
        <div className="relative py-6">
          <div className="absolute left-0 right-0 top-1/2 transform -translate-y-1/2 h-0.5 bg-white/20"></div>
          
          <div className="relative flex justify-between px-8 max-w-5xl mx-auto">
            {timelineEvents.map((event, index) => (
              <button
                key={index}
                className={`w-6 h-6 rounded-full border-2 transition-all duration-300 z-10 flex items-center justify-center
                          ${index === activeIndex
                            ? 'border-electricCyan bg-electricCyan'
                            : 'border-white/40 bg-deepBlue hover:border-white/70'
                          }`}
                onClick={() => setActiveIndex(index)}
              >
                {index === activeIndex && (
                  <div className="absolute w-3 h-3 bg-white rounded-full"></div>
                )}
              </button>
            ))}
          </div>
          
          <div className="flex justify-between px-4 max-w-5xl mx-auto mt-4 text-xs text-white/50">
            <div>{timelineEvents[0].date}</div>
            <div>{timelineEvents[timelineEvents.length - 1].date}</div>
          </div>
        </div>
        
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <button
              onClick={handlePrev}
              disabled={activeIndex === 0}
              className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-200
                        ${activeIndex === 0
                          ? 'text-white/30 cursor-not-allowed'
                          : 'bg-white/10 hover:bg-white/20 text-white'
                        }`}
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            
            <h3 className="text-xl font-bold">{timelineEvents[activeIndex].title}</h3>
            
            <button
              onClick={handleNext}
              disabled={activeIndex === timelineEvents.length - 1}
              className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-200
                        ${activeIndex === timelineEvents.length - 1
                          ? 'text-white/30 cursor-not-allowed'
                          : 'bg-white/10 hover:bg-white/20 text-white'
                        }`}
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <div 
                className="aspect-video bg-cover bg-center rounded-xl overflow-hidden mb-4"
                style={{ backgroundImage: `url(${timelineEvents[activeIndex].image})` }}
              ></div>
              
              <div className="flex items-center justify-between text-sm text-white/70 mb-4">
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span>{timelineEvents[activeIndex].date}</span>
                </div>
                
                <div className="flex items-center gap-2">
                  <div className="px-2 py-0.5 rounded-full bg-white/10">
                    {timelineEvents[activeIndex].category}
                  </div>
                  
                  <div className={`px-2 py-0.5 rounded-full flex items-center gap-1 ${
                    timelineEvents[activeIndex].impact === 'High' 
                      ? 'bg-red-500/20 text-red-400' 
                      : timelineEvents[activeIndex].impact === 'Medium'
                        ? 'bg-amber-500/20 text-amber-400'
                        : 'bg-blue-500/20 text-blue-400'
                  }`}>
                    <span>{timelineEvents[activeIndex].impact} Impact</span>
                  </div>
                </div>
              </div>
              
              <p className="text-white/80">
                {timelineEvents[activeIndex].description}
              </p>
              
              <button className="mt-4 flex items-center gap-1 text-electricCyan text-sm">
                <span>Read full details</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
            
            <div className="space-y-6">
              <div className="bg-white/5 rounded-xl p-4">
                <h4 className="font-medium mb-3 flex items-center gap-2">
                  <Info className="w-4 h-4 text-electricCyan" />
                  <span>Key Takeaways</span>
                </h4>
                
                <ul className="space-y-2">
                  {timelineEvents[activeIndex].keyPoints.map((point, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm">
                      <div className="w-1.5 h-1.5 rounded-full bg-electricCyan mt-1.5 flex-shrink-0"></div>
                      <span className="text-white/80">{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="bg-white/5 rounded-xl p-4">
                <h4 className="font-medium mb-3 flex items-center gap-2">
                  <BarChart2 className="w-4 h-4 text-electricCyan" />
                  <span>Public Reaction</span>
                </h4>
                
                <div className="space-y-3">
                  <div className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span>Positive</span>
                      <span>{timelineEvents[activeIndex].sentiment.positive}%</span>
                    </div>
                    <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                      <div 
                        className="h-full rounded-full bg-green-500"
                        style={{ width: `${timelineEvents[activeIndex].sentiment.positive}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  <div className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span>Negative</span>
                      <span>{timelineEvents[activeIndex].sentiment.negative}%</span>
                    </div>
                    <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                      <div 
                        className="h-full rounded-full bg-red-500"
                        style={{ width: `${timelineEvents[activeIndex].sentiment.negative}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  <div className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span>Neutral</span>
                      <span>{timelineEvents[activeIndex].sentiment.neutral}%</span>
                    </div>
                    <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                      <div 
                        className="h-full rounded-full bg-gray-400"
                        style={{ width: `${timelineEvents[activeIndex].sentiment.neutral}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 overflow-hidden">
        <div className="p-5 border-b border-white/10">
          <h2 className="font-semibold">Related Events</h2>
        </div>
        
        <div className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {relatedEvents.map((event, index) => (
            <button
              key={index}
              className="bg-white/5 hover:bg-white/10 rounded-xl p-4 text-left transition-colors duration-200"
            >
              <h3 className="font-medium mb-2 line-clamp-2">{event.title}</h3>
              <div className="flex items-center justify-between text-xs text-white/60">
                <span>{event.date}</span>
                <span className="px-2 py-0.5 rounded-full bg-white/10">
                  {event.category}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

const timelineEvents = [
  {
    title: "Initial Research Findings Published",
    date: "January 15, 2024",
    category: "Research",
    impact: "Medium",
    description: "The first comprehensive research papers on cryptocurrency market dynamics were published, highlighting the potential for decentralized finance to disrupt traditional banking systems. These early findings sparked debate in financial circles.",
    image: "https://images.pexels.com/photos/6771900/pexels-photo-6771900.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    keyPoints: [
      "Identified key patterns in market behavior",
      "Established correlation between social media and price movements",
      "Challenged traditional economic models",
      "Highlighted regulatory gaps"
    ],
    sentiment: {
      positive: 45,
      negative: 25,
      neutral: 30
    }
  },
  {
    title: "Major Exchange Security Breach",
    date: "February 28, 2024",
    category: "Security",
    impact: "High",
    description: "A significant security breach affected one of the largest cryptocurrency exchanges, resulting in substantial losses and triggering market-wide concerns about security protocols. The incident led to immediate calls for improved security measures across the industry.",
    image: "https://images.pexels.com/photos/60504/security-protection-anti-virus-software-60504.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    keyPoints: [
      "Approximately $240M in assets compromised",
      "Exposed vulnerabilities in common security practices",
      "Triggered immediate regulatory attention",
      "Led to industry-wide security protocol reviews"
    ],
    sentiment: {
      positive: 12,
      negative: 68,
      neutral: 20
    }
  },
  {
    title: "Central Bank Digital Currency Announcement",
    date: "March 17, 2024",
    category: "Regulation",
    impact: "High",
    description: "The Federal Reserve announced plans to explore a central bank digital currency (CBDC), signaling a major shift in how traditional financial institutions are responding to cryptocurrency innovations. The announcement caused significant discussion about the future of private cryptocurrencies.",
    image: "https://images.pexels.com/photos/5849577/pexels-photo-5849577.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    keyPoints: [
      "First official CBDC exploration by the Federal Reserve",
      "Outlined potential regulatory framework",
      "Emphasized consumer protection and stability",
      "Suggested potential coexistence with private cryptocurrencies"
    ],
    sentiment: {
      positive: 38,
      negative: 42,
      neutral: 20
    }
  },
  {
    title: "Major Corporate Adoption Announcement",
    date: "April 5, 2024",
    category: "Adoption",
    impact: "High",
    description: "A Fortune 100 technology company announced plans to add cryptocurrencies to its balance sheet and accept crypto payments for its products and services. This move was seen as a significant milestone for mainstream cryptocurrency adoption and triggered positive market sentiment.",
    image: "https://images.pexels.com/photos/7567491/pexels-photo-7567491.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    keyPoints: [
      "Committed to converting 10% of cash reserves to cryptocurrency",
      "Announced plans to accept multiple cryptocurrencies as payment",
      "Revealed blockchain integration strategy for supply chain",
      "Introduced educational resources for corporate clients"
    ],
    sentiment: {
      positive: 72,
      negative: 15,
      neutral: 13
    }
  },
  {
    title: "Landmark Environmental Impact Study",
    date: "May 20, 2024",
    category: "Research",
    impact: "Medium",
    description: "A comprehensive study on the environmental impact of different cryptocurrency consensus mechanisms was published, challenging some common assumptions and providing a more nuanced view of energy consumption across different blockchain technologies.",
    image: "https://images.pexels.com/photos/1108572/pexels-photo-1108572.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    keyPoints: [
      "Compared energy usage across Proof of Work, Proof of Stake, and other mechanisms",
      "Highlighted energy-efficient blockchain alternatives",
      "Established methodology for measuring crypto carbon footprints",
      "Suggested industry standards for sustainability reporting"
    ],
    sentiment: {
      positive: 55,
      negative: 25,
      neutral: 20
    }
  },
  {
    title: "International Regulatory Framework Proposed",
    date: "June 12, 2024",
    category: "Regulation",
    impact: "High",
    description: "A coalition of countries proposed the first comprehensive international framework for cryptocurrency regulation, aiming to create consistent standards across borders while still allowing for innovation. The proposal sparked intense debate about sovereignty and global financial governance.",
    image: "https://images.pexels.com/photos/3183165/pexels-photo-3183165.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    keyPoints: [
      "First coordinated multi-national regulatory approach",
      "Balanced innovation protection with consumer safeguards",
      "Addressed cross-border transaction challenges",
      "Proposed standardized KYC and AML requirements"
    ],
    sentiment: {
      positive: 45,
      negative: 35,
      neutral: 20
    }
  },
  {
    title: "Decentralized Finance Market Cap Milestone",
    date: "July 3, 2024",
    category: "Market",
    impact: "Medium",
    description: "The total market capitalization of decentralized finance (DeFi) protocols surpassed $500 billion, marking a significant milestone for the sector. This growth highlighted the increasing importance of DeFi in the broader cryptocurrency ecosystem and financial markets.",
    image: "https://images.pexels.com/photos/7788009/pexels-photo-7788009.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    keyPoints: [
      "500% growth in DeFi market cap over 18 months",
      "Lending protocols became the largest DeFi category",
      "Cross-chain interoperability drove significant adoption",
      "Institutional participation reached new highs"
    ],
    sentiment: {
      positive: 65,
      negative: 15,
      neutral: 20
    }
  }
];

const relatedEvents = [
  {
    title: "NFT Market Transformation Following Art Basel Exhibition",
    date: "March 5, 2024",
    category: "Market"
  },
  {
    title: "Layer 2 Scaling Solutions Reach 1M Transactions Per Second",
    date: "April 22, 2024",
    category: "Technology"
  },
  {
    title: "Major University Launches Blockchain Development Program",
    date: "February 10, 2024",
    category: "Education"
  },
  {
    title: "Cryptocurrency Tax Reporting Framework Simplified",
    date: "May 1, 2024",
    category: "Regulation"
  }
];