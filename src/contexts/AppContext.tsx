import React, { createContext, useContext, useState, ReactNode } from 'react';

type ViewType = 'dashboard' | 'results';
type ContentType = 'sentiment' | 'news' | 'memes' | 'accounts' | 'timeline' | 'factCheck' | null;

interface AppContextType {
  activeView: ViewType;
  setActiveView: (view: ViewType) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  contentType: ContentType;
  setContentType: (type: ContentType) => void;
  isSearching: boolean;
  setIsSearching: (isSearching: boolean) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [activeView, setActiveView] = useState<ViewType>('dashboard');
  const [searchQuery, setSearchQuery] = useState('');
  const [contentType, setContentType] = useState<ContentType>(null);
  const [isSearching, setIsSearching] = useState(false);

  return (
    <AppContext.Provider
      value={{
        activeView,
        setActiveView,
        searchQuery,
        setSearchQuery,
        contentType,
        setContentType,
        isSearching,
        setIsSearching
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = (): AppContextType => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};