import React, { useState, useRef, useEffect } from 'react';
import { Search as SearchIcon, X, Mic, Zap } from 'lucide-react';
import { useApp } from '../../contexts/AppContext';
import { SearchSuggestions } from './SearchSuggestions';

export const Search: React.FC = () => {
  const { 
    searchQuery, 
    setSearchQuery, 
    setActiveView, 
    setContentType,
    isSearching,
    setIsSearching
  } = useApp();
  
  const [isFocused, setIsFocused] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  
  // Handle outside click to close suggestions
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (inputRef.current && !inputRef.current.contains(e.target as Node)) {
        setShowSuggestions(false);
      }
    };
    
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);
  
  const handleSearch = () => {
    if (searchQuery.trim()) {
      setActiveView('results');
      
      // Determine content type based on query keywords
      if (searchQuery.toLowerCase().includes('sentiment') || 
          searchQuery.toLowerCase().includes('feel') ||
          searchQuery.toLowerCase().includes('opinion')) {
        setContentType('sentiment');
      } else if (searchQuery.toLowerCase().includes('news') || 
                searchQuery.toLowerCase().includes('breaking')) {
        setContentType('news');
      } else if (searchQuery.toLowerCase().includes('meme') || 
                searchQuery.toLowerCase().includes('viral')) {
        setContentType('memes');
      } else if (searchQuery.toLowerCase().includes('account') || 
                searchQuery.toLowerCase().includes('@')) {
        setContentType('accounts');
      } else if (searchQuery.toLowerCase().includes('timeline') || 
                searchQuery.toLowerCase().includes('history')) {
        setContentType('timeline');
      } else if (searchQuery.toLowerCase().includes('fact') || 
                searchQuery.toLowerCase().includes('check') ||
                searchQuery.toLowerCase().includes('verify')) {
        setContentType('factCheck');
      } else {
        // Default to news if no specific type is detected
        setContentType('news');
      }
      
      setIsSearching(true);
      
      // Simulate search completion after 1.5 seconds
      setTimeout(() => {
        setIsSearching(false);
      }, 1500);
    }
  };
  
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
      setShowSuggestions(false);
    }
  };
  
  const handleFocus = () => {
    setIsFocused(true);
    if (searchQuery) {
      setShowSuggestions(true);
    }
  };
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setShowSuggestions(e.target.value.length > 0);
  };
  
  const clearSearch = () => {
    setSearchQuery('');
    setShowSuggestions(false);
    inputRef.current?.focus();
  };
  
  return (
    <div className="relative w-full max-w-2xl" ref={inputRef}>
      <div 
        className={`flex items-center gap-2 w-full bg-white/10 backdrop-blur-lg rounded-full
                   transition-all duration-300 border border-white/20
                   ${isFocused ? 'shadow-[0_0_15px_rgba(0,217,255,0.3)] border-electricCyan/50' : 'shadow-none'}
                   ${showSuggestions ? 'rounded-t-2xl rounded-b-none' : 'rounded-full'}`}
      >
        <div className="pl-4">
          <SearchIcon className={`w-5 h-5 transition-all duration-300 ${isFocused ? 'text-electricCyan' : 'text-white/70'}`} />
        </div>
        <input
          type="text"
          value={searchQuery}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={() => setIsFocused(false)}
          onKeyDown={handleKeyDown}
          ref={inputRef}
          placeholder="Search for insights, trends, or sentiment analysis..."
          className="flex-1 py-3 bg-transparent outline-none text-white placeholder:text-white/50"
        />
        {searchQuery && (
          <button 
            onClick={clearSearch}
            className="text-white/70 hover:text-white transition-colors duration-200"
          >
            <X className="w-5 h-5" />
          </button>
        )}
        <button className="text-white/70 hover:text-white transition-colors duration-200 px-2">
          <Mic className="w-5 h-5" />
        </button>
        <button 
          onClick={handleSearch}
          className={`flex items-center gap-2 bg-electricCyan text-deepBlue font-medium px-4 py-2 rounded-full 
                     transition-all duration-300 hover:bg-white mr-1
                     ${searchQuery ? 'opacity-100' : 'opacity-70'}`}
        >
          <Zap className="w-4 h-4" />
          <span>Search</span>
        </button>
      </div>
      
      {showSuggestions && <SearchSuggestions setSearchQuery={setSearchQuery} />}
    </div>
  );
};