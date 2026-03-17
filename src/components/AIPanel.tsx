import { useState } from 'react';
import { Sparkles, Brain, Target, TrendingUp, Loader2, Terminal } from 'lucide-react';
import { UserStats } from '../types';
import { suggestQuests, analyzeStats } from '../services/geminiService';
import { Button, Card, BrutalistHeader } from './UI';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../utils';

export const AIPanel = ({ stats, onAddQuest }: { stats: UserStats; onAddQuest: (q: any) => void }) => {
  const [loading, setLoading] = useState(false);
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [analysis, setAnalysis] = useState<string>('');

  const handleSuggest = async () => {
    setLoading(true);
    try {
      const [suggs, anal] = await Promise.all([
        suggestQuests(stats),
        analyzeStats(stats)
      ]);
      setSuggestions(suggs);
      setAnalysis(anal);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded bg-system-purple/10 border border-system-purple/20">
            <Terminal className="w-5 h-5 text-system-purple" />
          </div>
          <h2 className="text-[10px] font-display uppercase tracking-[0.3em] text-system-purple ink-glow">System Analysis</h2>
        </div>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={handleSuggest} 
          isLoading={loading}
        >
          <Sparkles className="w-3 h-3 mr-2" />
          Analyze
        </Button>
      </div>

      <AnimatePresence mode="wait">
        {loading ? (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
            className="flex flex-col items-center justify-center py-12 space-y-4 bg-zinc-900/20 border border-zinc-800 rounded"
          >
            <Loader2 className="w-8 h-8 text-system-purple animate-spin" />
            <p className="text-zinc-500 font-mono text-[10px] uppercase tracking-widest animate-pulse">Recalibrating System Parameters...</p>
          </motion.div>
        ) : analysis ? (
          <motion.div 
            initial={{ opacity: 0, y: 10 }} 
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <Card className="bg-system-purple/5 border-system-purple/20 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-1">
                <div className="w-1 h-1 bg-system-purple animate-ping" />
              </div>
              <div className="flex gap-3">
                <Target className="w-4 h-4 text-system-purple shrink-0 mt-1" />
                <div className="space-y-2">
                  <p className="text-[10px] font-display text-system-purple uppercase tracking-widest ink-glow">System Message</p>
                  <p className="text-zinc-300 text-xs leading-relaxed italic font-mono">
                    "{analysis}"
                  </p>
                </div>
              </div>
            </Card>

            <div className="grid grid-cols-1 gap-3">
              <p className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">Recommended Quests</p>
              {suggestions.map((s, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="p-3 rounded bg-zinc-900/50 border border-zinc-800 hover:border-system-purple/30 transition-all group flex items-center justify-between gap-4"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[9px] font-mono uppercase tracking-widest text-system-purple">{s.category}</span>
                      <span className="text-[9px] font-mono uppercase text-zinc-600">{s.difficulty}</span>
                    </div>
                    <p className="text-xs font-bold text-zinc-200 truncate uppercase tracking-tight">{s.title}</p>
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="shrink-0"
                    onClick={() => onAddQuest(s)}
                  >
                    Accept
                  </Button>
                </motion.div>
              ))}
            </div>
          </motion.div>
        ) : (
          <div className="flex flex-col items-center justify-center py-12 text-center space-y-4 border border-dashed border-zinc-800 rounded bg-zinc-900/10">
            <TrendingUp className="w-8 h-8 text-zinc-800" />
            <p className="text-[10px] font-mono text-zinc-500 max-w-[200px] uppercase tracking-widest">
              Initialize system analysis to receive personalized quest suggestions.
            </p>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
