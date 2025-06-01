import React from 'react';
import { BadgeCheck, MessageCircle, RefreshCw, User, BarChart2, ExternalLink } from 'lucide-react';

interface AccountResultsProps {
  query: string;
}

export const AccountResults: React.FC<AccountResultsProps> = ({ query }) => {
  return (
    <div className="space-y-8">
      <div className="bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 overflow-hidden">
        <div className="p-6 flex flex-col md:flex-row gap-8">
          <div className="md:w-1/3">
            <div className="flex flex-col items-center">
              <div className="w-32 h-32 rounded-full overflow-hidden border-2 border-electricCyan/50 mb-4">
                <img 
                  src="https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                  alt="Profile" 
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="flex items-center gap-2 mb-2">
                <h2 className="text-xl font-bold">Alex Mitchell</h2>
                <BadgeCheck className="w-5 h-5 text-electricCyan" />
              </div>
              
              <div className="text-white/70 mb-4">@alexmitchell</div>
              
              <p className="text-center text-sm text-white/80 mb-6">
                Tech CEO • AI Researcher • Speaker
                Exploring the intersection of technology and humanity.
              </p>
              
              <div className="grid grid-cols-3 gap-4 w-full">
                <div className="text-center">
                  <div className="text-lg font-bold">1.2M</div>
                  <div className="text-xs text-white/50">Followers</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold">542</div>
                  <div className="text-xs text-white/50">Following</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold">3.4K</div>
                  <div className="text-xs text-white/50">Posts</div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="md:w-2/3">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold flex items-center gap-2">
                <MessageCircle className="w-5 h-5 text-electricCyan" />
                <span>Key Discussions</span>
              </h3>
              
              <button className="flex items-center gap-1 text-sm text-white/70 hover:text-white transition-colors duration-200">
                <RefreshCw className="w-4 h-4" />
                <span>Refresh</span>
              </button>
            </div>
            
            <div className="space-y-4">
              {tweetMessages.map((tweet, index) => (
                <Tweet 
                  key={index}
                  message={tweet.message}
                  time={tweet.time}
                  replies={tweet.replies}
                  retweets={tweet.retweets}
                  likes={tweet.likes}
                  highlighted={tweet.highlighted}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 overflow-hidden">
          <div className="p-5 border-b border-white/10">
            <h2 className="font-semibold flex items-center gap-2">
              <User className="w-5 h-5 text-electricCyan" />
              <span>Similar Accounts</span>
            </h2>
          </div>
          
          <div className="p-4 space-y-2">
            {similarAccounts.map((account, index) => (
              <div 
                key={index} 
                className="flex items-center gap-4 p-3 rounded-xl hover:bg-white/10 transition-colors duration-200 cursor-pointer"
              >
                <div className="w-12 h-12 rounded-full overflow-hidden">
                  <img 
                    src={account.image} 
                    alt={account.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center gap-1">
                    <h3 className="font-medium">{account.name}</h3>
                    {account.verified && <BadgeCheck className="w-4 h-4 text-electricCyan" />}
                  </div>
                  <div className="text-sm text-white/70">@{account.handle}</div>
                </div>
                
                <div className="text-white/50 text-sm">{account.followers}</div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 overflow-hidden">
          <div className="p-5 border-b border-white/10">
            <h2 className="font-semibold flex items-center gap-2">
              <BarChart2 className="w-5 h-5 text-electricCyan" />
              <span>Content Analysis</span>
            </h2>
          </div>
          
          <div className="p-5">
            <h3 className="text-sm font-medium mb-3">Most Discussed Topics</h3>
            
            <div className="space-y-3 mb-6">
              {topicAnalysis.map((topic, index) => (
                <div key={index} className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span>{topic.name}</span>
                    <span>{topic.percentage}%</span>
                  </div>
                  <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                    <div 
                      className="h-full rounded-full bg-electricCyan"
                      style={{ width: `${topic.percentage}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
            
            <h3 className="text-sm font-medium mb-3">Post Frequency</h3>
            <div className="flex items-end h-32 gap-1">
              {Array.from({ length: 14 }).map((_, i) => {
                const heights = [30, 45, 60, 75, 55, 40, 65, 80, 70, 50, 35, 60, 75, 55];
                
                return (
                  <div 
                    key={i} 
                    className="flex-1 bg-electricCyan/40 hover:bg-electricCyan transition-colors duration-200"
                    style={{ height: `${heights[i]}%` }}
                  ></div>
                );
              })}
            </div>
            <div className="flex justify-between text-xs text-white/50 mt-2">
              <span>14 Days Ago</span>
              <span>Today</span>
            </div>
            
            <button className="w-full mt-6 flex items-center justify-center gap-1 text-electricCyan border border-electricCyan/30 rounded-lg py-2 hover:bg-electricCyan/10 transition-all duration-200">
              <span>View full analytics</span>
              <ExternalLink className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

interface TweetProps {
  message: string;
  time: string;
  replies: number;
  retweets: number;
  likes: number;
  highlighted: boolean;
}

const Tweet: React.FC<TweetProps> = ({ 
  message, 
  time, 
  replies, 
  retweets, 
  likes, 
  highlighted 
}) => {
  return (
    <div className={`p-4 rounded-xl ${
      highlighted 
        ? 'bg-electricCyan/10 border border-electricCyan/30' 
        : 'bg-white/5 hover:bg-white/10'
    } transition-all duration-200 cursor-pointer`}>
      <p className="mb-3">{message}</p>
      
      <div className="flex items-center justify-between text-sm">
        <div className="text-white/50">{time}</div>
        
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1 text-white/70">
            <MessageCircle className="w-4 h-4" />
            <span>{replies}</span>
          </div>
          <div className="flex items-center gap-1 text-white/70">
            <RefreshCw className="w-4 h-4" />
            <span>{retweets}</span>
          </div>
          <div className="flex items-center gap-1 text-white/70">
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 21.35L10.55 20.03C5.4 15.36 2 12.27 2 8.5C2 5.41 4.42 3 7.5 3C9.24 3 10.91 3.81 12 5.08C13.09 3.81 14.76 3 16.5 3C19.58 3 22 5.41 22 8.5C22 12.27 18.6 15.36 13.45 20.03L12 21.35Z" fill="currentColor" fillOpacity="0.7" />
            </svg>
            <span>{likes}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const tweetMessages = [
  {
    message: "Excited to announce our new AI safety initiative! We're bringing together experts from around the world to ensure responsible development. #AIEthics #TechForGood",
    time: "2 hours ago",
    replies: 354,
    retweets: 1289,
    likes: 5823,
    highlighted: true
  },
  {
    message: "The most important question in AI isn't 'can we build it?' but 'should we build it?' Ethics must lead innovation, not follow it.",
    time: "5 hours ago",
    replies: 132,
    retweets: 743,
    likes: 3241,
    highlighted: false
  },
  {
    message: "Just finished reading 'AI 2041' - highly recommend for anyone interested in how artificial intelligence will shape our future over the next two decades.",
    time: "8 hours ago",
    replies: 78,
    retweets: 215,
    likes: 1432,
    highlighted: false
  },
  {
    message: "Open source AI models are democratizing access to technology, but also creating new challenges for governance. We need thoughtful approaches that balance innovation and safety.",
    time: "12 hours ago",
    replies: 98,
    retweets: 321,
    likes: 1876,
    highlighted: false
  }
];

const similarAccounts = [
  {
    name: "Sarah Chen",
    handle: "sarahchenAI",
    image: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    verified: true,
    followers: "892K"
  },
  {
    name: "Michael Torres",
    handle: "mtorres_tech",
    image: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    verified: true,
    followers: "1.1M"
  },
  {
    name: "Aisha Johnson",
    handle: "aishajtech",
    image: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    verified: false,
    followers: "456K"
  },
  {
    name: "David Park",
    handle: "davidparkAI",
    image: "https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    verified: true,
    followers: "725K"
  }
];

const topicAnalysis = [
  { name: "AI Ethics", percentage: 42 },
  { name: "Tech Policy", percentage: 28 },
  { name: "Innovation", percentage: 16 },
  { name: "Leadership", percentage: 8 },
  { name: "Climate Tech", percentage: 6 }
];