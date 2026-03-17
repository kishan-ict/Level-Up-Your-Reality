import { motion } from 'motion/react';
import { cn } from '../utils';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer } from 'recharts';
import { UserStats } from '../types';

interface ProgressBarProps {
  value: number;
  max: number;
  label?: string;
  subLabel?: string;
  className?: string;
  color?: string;
}

export const ProgressBar = ({ value, max, label, subLabel, className, color = 'bg-blue-500' }: ProgressBarProps) => {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

  return (
    <div className={cn('space-y-2', className)}>
      {(label || subLabel) && (
        <div className="flex justify-between items-end">
          {label && <span className="text-sm font-medium text-zinc-300 uppercase tracking-widest">{label}</span>}
          {subLabel && <span className="text-xs text-zinc-500 font-mono">{subLabel}</span>}
        </div>
      )}
      <div className="h-2 w-full bg-zinc-900 rounded-full overflow-hidden border border-zinc-800">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className={cn('h-full rounded-full', color)}
        />
      </div>
    </div>
  );
};

export const StatCard = ({ label, value, icon: Icon, color }: { label: string; value: number; icon: any; color: string }) => (
  <div className="bg-zinc-900/80 border border-zinc-800 p-4 rounded-xl flex items-center gap-4 hover:border-zinc-700 transition-colors group">
    <div className={cn('p-3 rounded-lg bg-opacity-10', color)}>
      <Icon className={cn('w-5 h-5', color.replace('bg-', 'text-'))} />
    </div>
    <div>
      <p className="text-[9px] font-display text-zinc-500 uppercase tracking-widest">{label}</p>
      <p className="text-xl font-bold text-zinc-100 group-hover:scale-110 transition-transform origin-left">{value}</p>
    </div>
  </div>
);

export const StatsRadar = ({ stats }: { stats: UserStats }) => {
  const data = [
    { subject: 'STR', A: stats.strength, fullMark: 100 },
    { subject: 'INT', A: stats.intelligence, fullMark: 100 },
    { subject: 'DIS', A: stats.discipline, fullMark: 100 },
    { subject: 'SOC', A: stats.social, fullMark: 100 },
    { subject: 'FOC', A: (stats.strength + stats.intelligence) / 2, fullMark: 100 },
    { subject: 'FIN', A: (stats.discipline + stats.social) / 2, fullMark: 100 },
  ];

  return (
    <div className="h-[300px] w-full flex items-center justify-center">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
          <PolarGrid stroke="#27272a" />
          <PolarAngleAxis dataKey="subject" tick={{ fill: '#71717a', fontSize: 10, fontFamily: 'Silkscreen' }} />
          <Radar
            name="Stats"
            dataKey="A"
            stroke="#8B5CF6"
            fill="#8B5CF6"
            fillOpacity={0.5}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
};
