import React from 'react';
import { TrendingTopics } from './TrendingTopics';
import { InsightsCarousel } from './InsightsCarousel';
import { QuickActions } from './QuickActions';

export const Dashboard: React.FC = () => {
  return (
    <div className="pt-8 pb-16 space-y-12">
      <section className="text-center max-w-3xl mx-auto">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-6">
          Discover insights from the <span className="text-electricCyan">pulse</span> of social media
        </h1>
        <p className="text-lg text-white/70 max-w-2xl mx-auto">
          Pulse Agent transforms real-time X data into beautiful, actionable insights through 
          an intelligent interface that adapts to your needs.
        </p>
      </section>
      
      <QuickActions />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <InsightsCarousel />
        </div>
        <div>
          <TrendingTopics />
        </div>
      </div>
    </div>
  );
};