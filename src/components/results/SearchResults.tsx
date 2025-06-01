import React from 'react';
import { useApp } from '../../contexts/AppContext';
import { SentimentAnalysis } from './SentimentAnalysis';
import { NewsResults } from './NewsResults';
import { MemeResults } from './MemeResults';
import { AccountResults } from './AccountResults';
import { TimelineResults } from './TimelineResults';
import { FactCheckResults } from './FactCheckResults';
import { SearchLoading } from './SearchLoading';

export const SearchResults: React.FC = () => {
  const { searchQuery, contentType, isSearching } = useApp();
  
  if (isSearching) {
    return <SearchLoading query={searchQuery} contentType={contentType} />;
  }
  
  return (
    <div className="py-8">
      <h1 className="text-2xl font-bold mb-8">
        Results for "<span className="text-electricCyan">{searchQuery}</span>"
      </h1>
      
      {contentType === 'sentiment' && <SentimentAnalysis query={searchQuery} />}
      {contentType === 'news' && <NewsResults query={searchQuery} />}
      {contentType === 'memes' && <MemeResults query={searchQuery} />}
      {contentType === 'accounts' && <AccountResults query={searchQuery} />}
      {contentType === 'timeline' && <TimelineResults query={searchQuery} />}
      {contentType === 'factCheck' && <FactCheckResults query={searchQuery} />}
    </div>
  );
};