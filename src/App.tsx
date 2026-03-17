import React, { useState, useEffect } from 'react';
import { onAuthStateChanged, auth, db, collection, query, where, onSnapshot, doc } from './firebase';
import { UserProfile, Quest, ProgressLog } from './types';
import { createUserProfile, createQuest, completeQuest, deleteQuest } from './services/firebaseService';
import { Navbar } from './components/Navbar';
import { LandingPage } from './components/LandingPage';
import { ProgressBar, StatCard, StatsRadar } from './components/Stats';
import { QuestCard } from './components/QuestCard';
import { AIPanel } from './components/AIPanel';
import { ProgressChart } from './components/ProgressChart';
import { Button, Card, Badge, BrutalistHeader } from './components/UI';
import { Sword, Brain, Shield, Users, Plus, Loader2, Trophy, Flame, Zap, Target, Scroll, Info, AlertTriangle, Gift, LayoutDashboard } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from './utils';

export default function App() {
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [quests, setQuests] = useState<Quest[]>([]);
  const [progress, setProgress] = useState<ProgressLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [showAddQuest, setShowAddQuest] = useState(false);

  // Auth Listener
  useEffect(() => {
    return onAuthStateChanged(auth, async (u) => {
      setUser(u);
      if (u) {
        const p = await createUserProfile(u);
        setProfile(p);
      } else {
        setProfile(null);
      }
      setLoading(false);
    });
  }, []);

  // Data Listeners
  useEffect(() => {
    if (!user) return;

    // Quests Listener
    const qQuests = query(collection(db, 'quests'), where('userId', '==', user.uid));
    const unsubQuests = onSnapshot(qQuests, (snap) => {
      const data = snap.docs.map(d => ({ id: d.id, ...d.data() } as Quest));
      setQuests(data.sort((a, b) => b.createdAt?.toMillis() - a.createdAt?.toMillis()));
    });

    // Progress Listener
    const qProgress = query(collection(db, 'progress'), where('userId', '==', user.uid));
    const unsubProgress = onSnapshot(qProgress, (snap) => {
      const data = snap.docs.map(d => ({ id: d.id, ...d.data() } as ProgressLog));
      setProgress(data.sort((a, b) => a.date.localeCompare(b.date)));
    });

    // Profile Listener
    const unsubProfile = onSnapshot(doc(db, 'users', user.uid), (snap) => {
      if (snap.exists()) setProfile(snap.data() as UserProfile);
    });

    return () => {
      unsubQuests();
      unsubProgress();
      unsubProfile();
    };
  }, [user]);

  if (loading) {
    return (
      <div className="min-h-screen bg-system-black flex items-center justify-center">
        <Loader2 className="w-12 h-12 text-system-purple animate-spin" />
      </div>
    );
  }

  if (!user || !profile) {
    return <LandingPage />;
  }

  const handleAddQuest = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const title = formData.get('title') as string;
    const difficulty = formData.get('difficulty') as any;
    const category = formData.get('category') as any;
    
    await createQuest(user.uid, title, difficulty, category);
    setShowAddQuest(false);
  };

  const activeQuests = quests.filter(q => !q.completed);
  const completedQuests = quests.filter(q => q.completed);

  const navLinks = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'quests', label: 'Quests', icon: Sword },
    { id: 'habits', label: 'Habits', icon: Zap },
    { id: 'gates', label: 'Gates', icon: Shield },
    { id: 'progress', label: 'Progress', icon: Trophy },
  ];

  return (
    <div className="min-h-screen bg-system-black text-zinc-100 font-sans selection:bg-system-purple/30">
      <Navbar user={user} activeTab={activeTab} onTabChange={setActiveTab} />

      <main className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <AnimatePresence mode="wait">
          {activeTab === 'dashboard' && (
            <motion.div
              key="dashboard"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8"
            >
              {/* Column 1: PLAYER */}
              <div className="lg:col-span-3 space-y-8">
                <div className="space-y-4">
                  <BrutalistHeader>Player</BrutalistHeader>
                  <Card className="p-0 overflow-hidden border-system-purple/20">
                    <div className="aspect-[3/4] relative bg-zinc-900">
                      <img 
                        src="https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=800" 
                        alt="Character" 
                        className="w-full h-full object-cover opacity-80 grayscale hover:grayscale-0 transition-all duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-system-black via-transparent to-transparent" />
                      <div className="absolute bottom-4 left-4 right-4 space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="text-4xl font-display text-white italic">LV. {profile.level}</span>
                          <Badge variant="purple">S-Rank</Badge>
                        </div>
                        <p className="text-[10px] font-mono text-zinc-400 uppercase tracking-[0.3em]">Shadow Monarch</p>
                      </div>
                    </div>
                    <div className="p-4 bg-zinc-900/80">
                      <ProgressBar 
                        value={profile.xp % 100} 
                        max={100} 
                        subLabel={`${profile.xp % 100} / 100 XP`}
                        color="bg-system-purple shadow-[0_0_10px_rgba(139,92,246,0.5)]"
                      />
                    </div>
                  </Card>
                </div>

                <div className="space-y-4">
                  <BrutalistHeader className="text-4xl">Navigation</BrutalistHeader>
                  <div className="space-y-1">
                    {navLinks.map((link) => (
                      <button
                        key={link.id}
                        onClick={() => setActiveTab(link.id)}
                        className={cn(
                          "w-full flex items-center justify-between p-3 rounded transition-all group",
                          activeTab === link.id 
                            ? "bg-system-purple/10 border-l-2 border-system-purple text-system-purple" 
                            : "text-zinc-500 hover:text-zinc-200 hover:bg-zinc-900/50"
                        )}
                      >
                        <div className="flex items-center gap-3">
                          <link.icon className="w-4 h-4" />
                          <span className="text-xs font-mono uppercase tracking-widest">{link.label}</span>
                        </div>
                        <span className="text-[10px] font-mono opacity-0 group-hover:opacity-100 transition-opacity">0{navLinks.indexOf(link) + 1}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Column 2: STATISTICS */}
              <div className="lg:col-span-5 space-y-8">
                <div className="space-y-4">
                  <BrutalistHeader>Statistics</BrutalistHeader>
                  <Card className="bg-zinc-900/20 border-zinc-800/50">
                    <StatsRadar stats={profile.stats} />
                    <div className="grid grid-cols-2 gap-4 mt-4">
                      <StatCard label="Strength" value={profile.stats.strength} icon={Sword} color="bg-red-500" />
                      <StatCard label="Intelligence" value={profile.stats.intelligence} icon={Brain} color="bg-blue-500" />
                      <StatCard label="Discipline" value={profile.stats.discipline} icon={Shield} color="bg-emerald-500" />
                      <StatCard label="Social" value={profile.stats.social} icon={Users} color="bg-purple-500" />
                    </div>
                  </Card>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <BrutalistHeader className="text-4xl">Active Quests</BrutalistHeader>
                    <Button variant="outline" size="sm" onClick={() => setShowAddQuest(true)}>
                      <Plus className="w-3 h-3 mr-2" />
                      New Quest
                    </Button>
                  </div>
                  <div className="grid grid-cols-1 gap-3">
                    {activeQuests.length > 0 ? (
                      activeQuests.slice(0, 3).map(q => (
                        <QuestCard 
                          key={q.id} 
                          quest={q} 
                          onComplete={(quest) => completeQuest(profile, quest)} 
                          onDelete={deleteQuest} 
                        />
                      ))
                    ) : (
                      <div className="py-8 text-center border border-dashed border-zinc-800 rounded">
                        <p className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">No Active Quests</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Column 3: SYSTEM */}
              <div className="lg:col-span-4 space-y-8">
                <div className="space-y-4">
                  <BrutalistHeader>System</BrutalistHeader>
                  <div className="space-y-4">
                    <Card title="The System" className="bg-system-purple/5 border-system-purple/20">
                      <div className="space-y-4">
                        <div className="flex items-center justify-between p-3 bg-zinc-900/50 border border-zinc-800 rounded">
                          <div className="flex items-center gap-3">
                            <Info className="w-4 h-4 text-blue-400" />
                            <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-300">Status</span>
                          </div>
                          <Badge variant="success">Online</Badge>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-zinc-900/50 border border-zinc-800 rounded">
                          <div className="flex items-center gap-3">
                            <Gift className="w-4 h-4 text-amber-400" />
                            <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-300">Gifts</span>
                          </div>
                          <span className="text-[10px] font-mono text-amber-400">02 Unclaimed</span>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-zinc-900/50 border border-zinc-800 rounded">
                          <div className="flex items-center gap-3">
                            <AlertTriangle className="w-4 h-4 text-red-400" />
                            <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-300">Warnings</span>
                          </div>
                          <span className="text-[10px] font-mono text-red-400">None</span>
                        </div>
                      </div>
                    </Card>

                    <AIPanel stats={profile.stats} onAddQuest={(q) => createQuest(user.uid, q.title, q.difficulty, q.category)} />
                  </div>
                </div>

                <Card title="Recent Activity">
                  <div className="space-y-4">
                    {progress.slice(-3).reverse().map((log, i) => (
                      <div key={i} className="flex items-center gap-3 text-[10px] font-mono">
                        <div className="w-1.5 h-1.5 rounded-full bg-system-purple" />
                        <span className="text-zinc-500">{log.date}</span>
                        <span className="text-zinc-300 uppercase">Gained {log.xpGained} XP</span>
                      </div>
                    ))}
                  </div>
                </Card>
              </div>
            </motion.div>
          )}

          {activeTab === 'quests' && (
            <motion.div
              key="quests"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-8"
            >
              <div className="flex items-center justify-between">
                <BrutalistHeader>Quest Log</BrutalistHeader>
                <Button onClick={() => setShowAddQuest(true)}>
                  <Plus className="w-4 h-4 mr-2" />
                  Create Quest
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <h2 className="text-[10px] font-mono text-zinc-500 uppercase tracking-[0.3em] flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-system-purple shadow-[0_0_8px_rgba(139,92,246,0.5)]" />
                    In Progress ({activeQuests.length})
                  </h2>
                  <div className="grid grid-cols-1 gap-4">
                    {activeQuests.map(q => (
                      <QuestCard key={q.id} quest={q} onComplete={(quest) => completeQuest(profile, quest)} onDelete={deleteQuest} />
                    ))}
                  </div>
                </div>
                <div className="space-y-4">
                  <h2 className="text-[10px] font-mono text-zinc-500 uppercase tracking-[0.3em] flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    Completed ({completedQuests.length})
                  </h2>
                  <div className="grid grid-cols-1 gap-4">
                    {completedQuests.map(q => (
                      <QuestCard key={q.id} quest={q} onComplete={() => {}} onDelete={deleteQuest} />
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'progress' && (
            <motion.div
              key="progress"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-8"
            >
              <BrutalistHeader>Growth History</BrutalistHeader>
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <Card className="lg:col-span-2" title="Weekly XP Gain">
                  <ProgressChart data={progress} />
                </Card>

                <div className="space-y-4">
                  <Card title="Total Progression">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="p-3 bg-system-purple/10 border border-system-purple/20 rounded">
                        <Trophy className="w-6 h-6 text-system-purple" />
                      </div>
                      <div>
                        <p className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">Total XP</p>
                        <p className="text-3xl font-display italic text-white">{profile.xp}</p>
                      </div>
                    </div>
                    <p className="text-[10px] font-mono text-zinc-500 leading-relaxed uppercase tracking-wider">
                      You've gained {progress.reduce((acc, curr) => acc + curr.xpGained, 0)} XP since you started your journey.
                    </p>
                  </Card>
                  
                  <Card title="Recent Achievements">
                    <div className="space-y-3">
                      {completedQuests.slice(0, 5).map(q => (
                        <div key={q.id} className="flex items-center gap-3 text-[10px] font-mono">
                          <div className="w-1 h-1 bg-emerald-500" />
                          <span className="text-zinc-300 uppercase">{q.title}</span>
                        </div>
                      ))}
                    </div>
                  </Card>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Add Quest Modal */}
      <AnimatePresence>
        {showAddQuest && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/90 backdrop-blur-md"
              onClick={() => setShowAddQuest(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-md bg-zinc-900 border border-zinc-800 rounded p-8 shadow-2xl"
            >
              <div className="flex items-center gap-2 mb-6">
                <div className="w-1 h-6 bg-system-purple shadow-[0_0_8px_rgba(139,92,246,0.5)]" />
                <h2 className="text-2xl font-display uppercase italic tracking-tight">Initialize Quest</h2>
              </div>
              
              <form onSubmit={handleAddQuest} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-mono text-zinc-500 uppercase tracking-[0.2em]">Quest Title</label>
                  <input 
                    name="title" 
                    required 
                    placeholder="E.g., Morning Workout" 
                    className="w-full bg-zinc-950 border border-zinc-800 rounded px-4 py-3 text-sm text-zinc-100 focus:outline-none focus:border-system-purple transition-colors font-mono"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[10px] font-mono text-zinc-500 uppercase tracking-[0.2em]">Difficulty</label>
                    <select name="difficulty" className="w-full bg-zinc-950 border border-zinc-800 rounded px-4 py-3 text-sm text-zinc-100 focus:outline-none focus:border-system-purple transition-colors font-mono">
                      <option value="easy">Easy</option>
                      <option value="medium">Medium</option>
                      <option value="hard">Hard</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-mono text-zinc-500 uppercase tracking-[0.2em]">Category</label>
                    <select name="category" className="w-full bg-zinc-950 border border-zinc-800 rounded px-4 py-3 text-sm text-zinc-100 focus:outline-none focus:border-system-purple transition-colors font-mono">
                      <option value="strength">Strength</option>
                      <option value="intelligence">Intelligence</option>
                      <option value="discipline">Discipline</option>
                      <option value="social">Social</option>
                    </select>
                  </div>
                </div>
                <div className="flex gap-4 pt-4">
                  <Button type="button" variant="ghost" className="flex-1" onClick={() => setShowAddQuest(false)}>Cancel</Button>
                  <Button type="submit" className="flex-1">Start Quest</Button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
