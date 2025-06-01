import React from 'react';
import { Header } from './header/Header';
import { Dashboard } from './dashboard/Dashboard';
import { SearchResults } from './results/SearchResults';
import { useApp } from '../contexts/AppContext';

export const Layout: React.FC = () => {
  const { activeView, searchQuery } = useApp();
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-deepBlue to-deepBlue/90 text-white overflow-hidden">
      <div className="relative z-10">
        <Header />
        
        <main className="container mx-auto px-4 sm:px-6 pb-24">
          {!searchQuery && activeView === 'dashboard' && <Dashboard />}
          {(searchQuery || activeView === 'results') && <SearchResults />}
        </main>
      </div>
      
      {/* Ambient background elements */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-electricCyan/5 rounded-full blur-[100px]"></div>
        <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-nebulaPurple/10 rounded-full blur-[100px]"></div>
      </div>
    </div>
  );
};