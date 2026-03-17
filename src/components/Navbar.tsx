import { LogOut, Sword, Trophy, LayoutDashboard, Zap, Target, Shield } from 'lucide-react';
import { Button } from './UI';
import { signOut, auth } from '../firebase';

export const Navbar = ({ user, activeTab, onTabChange }: { user: any; activeTab: string; onTabChange: (tab: string) => void }) => {
  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'quests', label: 'Quests', icon: Sword },
    { id: 'habits', label: 'Habits', icon: Zap },
    { id: 'gates', label: 'Gates', icon: Shield },
    { id: 'progress', label: 'Progress', icon: Trophy },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-system-black/90 backdrop-blur-md border-b border-zinc-800/50">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-14">
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-3 cursor-pointer group" onClick={() => onTabChange('dashboard')}>
              <div className="relative">
                <div className="absolute -inset-1 bg-system-purple/20 blur-sm rounded-lg group-hover:bg-system-purple/40 transition-all" />
                <div className="relative w-8 h-8 bg-zinc-900 border border-system-purple/30 rounded flex items-center justify-center">
                  <Sword className="w-5 h-5 text-system-purple" />
                </div>
              </div>
              <div className="flex flex-col -space-y-1">
                <span className="text-[10px] font-mono text-system-purple uppercase tracking-[0.3em] font-bold">Host</span>
                <span className="text-xl font-display text-zinc-100 uppercase tracking-tight ink-glow">Solo Leveling</span>
              </div>
            </div>
            
            <div className="hidden lg:flex items-center gap-1">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => onTabChange(tab.id)}
                  className={`px-4 py-1.5 rounded text-[11px] font-mono uppercase tracking-widest transition-all ${
                    activeTab === tab.id 
                      ? 'text-system-purple bg-system-purple/5 border border-system-purple/20' 
                      : 'text-zinc-500 hover:text-zinc-200 hover:bg-zinc-900/50'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <tab.icon className="w-3.5 h-3.5" />
                    {tab.label}
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3 px-3 py-1 rounded border border-zinc-800 bg-zinc-900/50">
              <div className="w-5 h-5 rounded-full overflow-hidden border border-system-purple/30">
                <img src={user.photoURL || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.uid}`} alt="" className="w-full h-full object-cover" />
              </div>
              <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider hidden sm:block">{user.displayName}</span>
            </div>
            <button 
              onClick={() => signOut(auth)} 
              className="p-2 text-zinc-500 hover:text-system-purple transition-colors"
              title="Sign Out"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};
