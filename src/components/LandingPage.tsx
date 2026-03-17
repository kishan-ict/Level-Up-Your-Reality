import { motion } from 'motion/react';
import { Sword, Shield, Zap, Target, ArrowRight, Sparkles, Terminal } from 'lucide-react';
import { Button, Card, BrutalistHeader } from './UI';
import { signInWithPopup, auth, googleProvider } from '../firebase';

export const LandingPage = () => {
  const handleLogin = () => signInWithPopup(auth, googleProvider);

  const features = [
    { icon: Target, title: 'Quest System', desc: 'Turn your daily tasks into high-stakes RPG quests.' },
    { icon: Zap, title: 'Level Up', desc: 'Earn XP and watch your character level grow with your productivity.' },
    { icon: Shield, title: 'Stat Tracking', desc: 'Improve Strength, Intelligence, and more through real actions.' },
    { icon: Sparkles, title: 'AI Assistant', desc: 'Gemini-powered analysis of your life stats and quest suggestions.' },
  ];

  return (
    <div className="min-h-screen bg-system-black text-zinc-100 selection:bg-system-purple/30 overflow-hidden">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4">
        {/* Background Gradients */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-system-purple/10 blur-[120px] rounded-full animate-pulse" />
          <div className="absolute bottom-[10%] right-[-10%] w-[40%] h-[40%] bg-system-blue/5 blur-[100px] rounded-full" />
        </div>

        <div className="max-w-7xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center gap-3 px-4 py-1 rounded border border-system-purple/30 bg-system-purple/5 mb-8"
          >
            <Terminal className="w-3 h-3 text-system-purple" />
            <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-system-purple font-bold">System Initialization v1.0</span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className="mb-8 flex flex-col items-center"
          >
            <BrutalistHeader as="h1" className="text-7xl md:text-[12rem] leading-[0.8] mb-0">
              Level Up
            </BrutalistHeader>
            <BrutalistHeader as="h1" className="text-5xl md:text-[9rem] leading-[0.8] -mt-2 md:-mt-4">
              Your Reality
            </BrutalistHeader>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-sm md:text-base text-zinc-500 max-w-xl mx-auto mb-12 leading-relaxed font-mono uppercase tracking-widest"
          >
            The ultimate life-gamification system. Transform your tasks into quests, 
            track your growth, and become the protagonist of your own story.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6"
          >
            <Button size="lg" onClick={handleLogin} className="w-full sm:w-auto px-12 group">
              Begin Your Awakening
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button variant="outline" size="lg" className="w-full sm:w-auto px-12">
              View Leaderboard
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 px-4 relative">
        <div className="absolute inset-0 bg-zinc-900/20 border-y border-zinc-800/50" />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((f, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Card className="h-full hover:border-system-purple/50 transition-all group bg-zinc-900/40 border-zinc-800">
                  <div className="p-3 rounded bg-system-purple/10 w-fit mb-6 group-hover:scale-110 transition-transform border border-system-purple/20">
                    <f.icon className="w-5 h-5 text-system-purple" />
                  </div>
                  <h3 className="text-sm font-bold mb-3 text-zinc-100 uppercase tracking-widest font-mono">{f.title}</h3>
                  <p className="text-zinc-500 text-xs leading-relaxed font-mono uppercase tracking-tight">{f.desc}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 text-center relative">
        <div className="flex items-center justify-center gap-3 mb-6">
          <Sword className="w-5 h-5 text-system-purple" />
          <span className="font-display text-2xl uppercase italic tracking-tighter text-zinc-400">Solo Leveling</span>
        </div>
        <p className="text-zinc-700 text-[10px] uppercase tracking-[0.5em] font-mono">© 2026 Life System. Protocol Initialized.</p>
      </footer>
    </div>
  );
};
