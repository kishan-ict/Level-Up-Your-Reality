import { CheckCircle2, Trash2, Clock, Zap, Sword, Brain, Shield, Users } from 'lucide-react';
import { Quest } from '../types';
import { Badge, Button } from './UI';
import { cn } from '../utils';

interface QuestCardProps {
  quest: Quest;
  onComplete: (quest: Quest) => void;
  onDelete: (id: string) => void;
}

export const QuestCard = ({ quest, onComplete, onDelete }: QuestCardProps) => {
  const categoryIcons = {
    strength: Sword,
    intelligence: Brain,
    discipline: Shield,
    social: Users,
  };

  const Icon = categoryIcons[quest.statCategory as keyof typeof categoryIcons] || Sword;

  return (
    <div className={cn(
      'p-4 rounded border transition-all duration-300 group relative overflow-hidden',
      quest.completed 
        ? 'bg-zinc-900/20 border-zinc-800/50 opacity-50' 
        : 'bg-zinc-900/40 border-zinc-800 hover:border-system-purple/50 hover:shadow-[0_0_15px_rgba(139,92,246,0.1)]'
    )}>
      {!quest.completed && (
        <div className="absolute top-0 left-0 w-1 h-full bg-system-purple/30 group-hover:bg-system-purple transition-colors" />
      )}
      
      <div className="flex justify-between items-start gap-4">
        <div className="flex-1 space-y-3">
          <div className="flex items-center gap-2">
            <Badge variant="purple" className="text-[9px]">
              {quest.difficulty}
            </Badge>
            <div className="flex items-center gap-1 text-[9px] font-mono text-zinc-500 uppercase tracking-widest">
              <Icon className="w-3 h-3" />
              {quest.statCategory}
            </div>
          </div>
          
          <h3 className={cn(
            'text-sm font-bold uppercase tracking-tight leading-tight',
            quest.completed ? 'line-through text-zinc-600' : 'text-zinc-100'
          )}>
            {quest.title}
          </h3>
          
          <div className="flex items-center gap-4 text-[10px] text-zinc-500 font-mono">
            <span className="flex items-center gap-1.5">
              <Zap className="w-3 h-3 text-system-purple" />
              +{quest.xpReward} XP
            </span>
            {quest.deadline && (
              <span className="flex items-center gap-1.5">
                <Clock className="w-3 h-3" />
                {new Date(quest.deadline.toDate()).toLocaleDateString()}
              </span>
            )}
          </div>
        </div>
        
        <div className="flex flex-col gap-2">
          {!quest.completed && (
            <button 
              className="p-2 text-zinc-500 hover:text-system-purple transition-colors"
              onClick={() => onComplete(quest)}
              title="Complete Quest"
            >
              <CheckCircle2 className="w-5 h-5" />
            </button>
          )}
          <button 
            className="p-2 text-zinc-500 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
            onClick={() => quest.id && onDelete(quest.id)}
            title="Delete Quest"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
