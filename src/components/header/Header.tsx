import React from 'react';
import { Search } from '../search/Search';
import { useApp } from '../../contexts/AppContext';
import { Activity, BarChart2, Globe, MessageSquare } from 'lucide-react';

export const Header: React.FC = () => {
  const { activeView, setActiveView } = useApp();
  
  return (
    <header className="py-6 px-4 sm:px-6">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-3">
            <div className="bg-electricCyan/20 p-2 rounded-full backdrop-blur-sm">
              <Activity className="w-6 h-6 text-electricCyan" />
            </div>
            <h1 className="text-2xl font-bold tracking-tight">
              <span className="text-electricCyan">Pulse</span> Agent
            </h1>
          </div>
          
          <Search />
          
          <nav className="hidden lg:flex items-center gap-6">
            <NavButton 
              icon={<Globe className="w-5 h-5" />} 
              label="Trending"
              active={activeView === 'dashboard'} 
              onClick={() => setActiveView('dashboard')}
            />
            <NavButton 
              icon={<BarChart2 className="w-5 h-5" />} 
              label="Analytics"
              active={false} 
              onClick={() => {}}
            />
            <NavButton 
              icon={<MessageSquare className="w-5 h-5" />} 
              label="Insights"
              active={false} 
              onClick={() => {}}
            />
          </nav>
        </div>
      </div>
    </header>
  );
};

interface NavButtonProps {
  icon: React.ReactNode;
  label: string;
  active: boolean;
  onClick: () => void;
}

const NavButton: React.FC<NavButtonProps> = ({ icon, label, active, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300 ${
        active 
          ? 'bg-electricCyan/20 text-electricCyan' 
          : 'text-white/70 hover:text-white hover:bg-white/10'
      }`}
    >
      {icon}
      <span className="text-sm font-medium">{label}</span>
    </button>
  );
};