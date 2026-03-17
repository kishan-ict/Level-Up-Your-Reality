import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { ProgressLog } from '../types';

export const ProgressChart = ({ data }: { data: ProgressLog[] }) => {
  const chartData = data.slice(-7).map(d => ({
    name: d.date.split('-').slice(1).join('/'),
    xp: d.xpGained,
    level: d.levelReached
  }));

  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={chartData}>
          <defs>
            <linearGradient id="colorXp" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#27272a" vertical={false} />
          <XAxis 
            dataKey="name" 
            stroke="#71717a" 
            fontSize={10} 
            tickLine={false} 
            axisLine={false} 
            tick={{ fill: '#71717a', fontSize: 10, fontFamily: 'Space Grotesk' }}
          />
          <YAxis 
            stroke="#71717a" 
            fontSize={10} 
            tickLine={false} 
            axisLine={false} 
            tick={{ fill: '#71717a', fontSize: 10, fontFamily: 'Space Grotesk' }}
            tickFormatter={(value) => `${value} XP`}
          />
          <Tooltip 
            contentStyle={{ backgroundColor: '#0A0A0A', border: '1px solid #27272a', borderRadius: '4px', fontSize: '10px', fontFamily: 'Space Grotesk' }}
            itemStyle={{ color: '#8B5CF6' }}
          />
          <Area 
            type="monotone" 
            dataKey="xp" 
            stroke="#8B5CF6" 
            strokeWidth={2}
            fillOpacity={1} 
            fill="url(#colorXp)" 
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};
