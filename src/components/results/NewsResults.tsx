import React from 'react';
import { Clock, ExternalLink, TrendingUp, User, ChevronRight } from 'lucide-react';

interface NewsResultsProps {
  query: string;
}

export const NewsResults: React.FC<NewsResultsProps> = ({ query }) => {
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <FeaturedStory 
            title="Tech Giants Announce New AI Safety Coalition"
            description="Leading technology companies have formed a new alliance focused on ensuring the safe development of artificial intelligence technologies."
            image="https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
            source="Tech Chronicle"
            time="2 hours ago"
            readTime={4}
            trending={true}
          />
        </div>
        <div className="flex flex-col gap-6">
          <StoryCard 
            title="AI Regulation Bill Gains Bipartisan Support"
            image="https://images.pexels.com/photos/8386486/pexels-photo-8386486.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
            source="Policy Insider"
            time="4 hours ago"
            trending={false}
          />
          <StoryCard 
            title="New Research Shows AI's Impact on Job Market"
            image="https://images.pexels.com/photos/5473955/pexels-photo-5473955.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
            source="Economic Times"
            time="6 hours ago"
            trending={true}
          />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {Array.from({ length: 4 }).map((_, i) => (
          <StoryCard 
            key={i}
            title={newsItems[i].title}
            image={newsItems[i].image}
            source={newsItems[i].source}
            time={newsItems[i].time}
            trending={newsItems[i].trending}
          />
        ))}
      </div>
      
      <div className="bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 overflow-hidden p-5">
        <h2 className="font-semibold mb-4 flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-electricCyan" />
          <span>Related Discussions</span>
        </h2>
        
        <div className="space-y-3">
          {relatedDiscussions.map((discussion, index) => (
            <div 
              key={index} 
              className="bg-white/5 rounded-xl p-4 hover:bg-white/10 transition-colors duration-200 cursor-pointer flex justify-between items-center"
            >
              <div>
                <h3 className="font-medium mb-1">{discussion.title}</h3>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1 text-white/60 text-sm">
                    <User className="w-4 h-4" />
                    <span>{discussion.participants} participants</span>
                  </div>
                  <div className="flex items-center gap-1 text-white/60 text-sm">
                    <Clock className="w-4 h-4" />
                    <span>{discussion.activity}</span>
                  </div>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-white/50" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

interface FeaturedStoryProps {
  title: string;
  description: string;
  image: string;
  source: string;
  time: string;
  readTime: number;
  trending: boolean;
}

const FeaturedStory: React.FC<FeaturedStoryProps> = ({ 
  title, 
  description, 
  image, 
  source, 
  time,
  readTime,
  trending
}) => {
  return (
    <div className="group cursor-pointer">
      <div 
        className="aspect-[16/9] bg-cover bg-center rounded-2xl overflow-hidden relative mb-4 transition-transform duration-500 group-hover:scale-[1.02]"
        style={{ backgroundImage: `url(${image})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-deepBlue via-deepBlue/50 to-transparent"></div>
        <div className="absolute inset-0 p-6 flex flex-col justify-end">
          <h2 className="text-2xl sm:text-3xl font-bold mb-2">{title}</h2>
          <p className="text-white/80 mb-4 max-w-2xl">{description}</p>
          <div className="flex items-center gap-4 text-sm">
            <div className="bg-white/20 backdrop-blur-sm rounded-full px-3 py-1">{source}</div>
            <div className="flex items-center gap-1 text-white/70">
              <Clock className="w-4 h-4" />
              <span>{time}</span>
            </div>
            <div className="flex items-center gap-1 text-white/70">
              <Clock className="w-4 h-4" />
              <span>{readTime} min read</span>
            </div>
            {trending && (
              <div className="flex items-center gap-1 text-electricCyan">
                <TrendingUp className="w-4 h-4" />
                <span>Trending</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

interface StoryCardProps {
  title: string;
  image: string;
  source: string;
  time: string;
  trending: boolean;
}

const StoryCard: React.FC<StoryCardProps> = ({ title, image, source, time, trending }) => {
  return (
    <div className="group cursor-pointer h-full bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 overflow-hidden transition-all duration-300 hover:border-electricCyan/30">
      <div 
        className="aspect-video bg-cover bg-center relative transition-transform duration-500 group-hover:scale-[1.05]"
        style={{ backgroundImage: `url(${image})` }}
      >
        {trending && (
          <div className="absolute top-3 right-3 bg-electricCyan text-deepBlue text-xs font-medium px-2 py-1 rounded-full flex items-center gap-1">
            <TrendingUp className="w-3 h-3" />
            <span>Trending</span>
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="font-medium mb-3 line-clamp-2 group-hover:text-electricCyan transition-colors duration-200">
          {title}
        </h3>
        <div className="flex items-center justify-between text-sm">
          <div className="text-white/70">{source}</div>
          <div className="flex items-center gap-1 text-white/50">
            <Clock className="w-4 h-4" />
            <span>{time}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const newsItems = [
  {
    title: "Open Source AI Models Challenge Proprietary Leaders",
    image: "https://images.pexels.com/photos/2599244/pexels-photo-2599244.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    source: "Tech Insider",
    time: "8 hours ago",
    trending: false
  },
  {
    title: "AI Ethics Conference Draws Record Attendance",
    image: "https://images.pexels.com/photos/8386367/pexels-photo-8386367.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    source: "Future Ethics",
    time: "12 hours ago",
    trending: true
  },
  {
    title: "Developers Adopt New AI Safety Standards",
    image: "https://images.pexels.com/photos/7988079/pexels-photo-7988079.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    source: "Dev Journal",
    time: "1 day ago",
    trending: false
  },
  {
    title: "AI-Generated Content Guidelines Updated",
    image: "https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    source: "Media Watch",
    time: "1 day ago",
    trending: false
  }
];

const relatedDiscussions = [
  {
    title: "Will the new AI Safety Coalition actually improve industry standards?",
    participants: 325,
    activity: "Active now"
  },
  {
    title: "Open vs. Closed AI models: Which approach will dominate?",
    participants: 189,
    activity: "Last active 2h ago"
  },
  {
    title: "How will new AI regulations affect startups vs. big tech?",
    participants: 246,
    activity: "Last active 4h ago"
  }
];