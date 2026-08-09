import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

interface AnalyticsProps {
  goalsCompleted: number;
  habitsCompleted: number;
  focusTime: number; // in seconds
}

export default function Analytics({ goalsCompleted, habitsCompleted, focusTime }: AnalyticsProps) {
  const focusMinutes = Math.floor(focusTime / 60);

  const data = [
    { name: 'Mon', focus: 45 },
    { name: 'Tue', focus: 75 },
    { name: 'Wed', focus: 30 },
    { name: 'Thu', focus: 120 },
    { name: 'Fri', focus: 60 },
    { name: 'Sat', focus: focusMinutes > 0 ? focusMinutes : 10 }, // Dummy + real data for today
    { name: 'Sun', focus: 0 },
  ];

  return (
    <div className="flex h-full flex-col rounded-3xl border border-white/5 bg-white/[0.02] p-6 backdrop-blur-md">
      <h2 className="mb-6 text-lg font-semibold text-white">Analytics 📊</h2>
      
      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="rounded-2xl bg-slate-900/50 border border-white/5 p-4">
          <p className="text-xs font-medium text-slate-400 mb-1">Goals</p>
          <p className="text-2xl font-bold text-white">{goalsCompleted}</p>
        </div>
        <div className="rounded-2xl bg-slate-900/50 border border-white/5 p-4">
          <p className="text-xs font-medium text-slate-400 mb-1">Habits</p>
          <p className="text-2xl font-bold text-white">{habitsCompleted}</p>
        </div>
        <div className="rounded-2xl bg-slate-900/50 border border-white/5 p-4">
          <p className="text-xs font-medium text-slate-400 mb-1">Focus Time</p>
          <p className="text-2xl font-bold text-indigo-400">{focusMinutes}<span className="text-sm font-medium text-slate-500">m</span></p>
        </div>
      </div>

      <div className="flex-1 min-h-[150px] mt-auto">
        <p className="text-xs font-medium text-slate-500 mb-4">Focus History (This Week)</p>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 0, right: 0, left: -25, bottom: 0 }}>
            <XAxis 
              dataKey="name" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fontSize: 12, fill: '#64748b' }} 
              dy={10}
            />
            <YAxis 
              axisLine={false} 
              tickLine={false} 
              tick={{ fontSize: 12, fill: '#64748b' }}
            />
            <Tooltip 
              cursor={{ fill: 'rgba(255,255,255,0.02)' }}
              contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', borderRadius: '12px', padding: '8px 12px' }}
              itemStyle={{ color: '#818cf8', fontSize: '14px', fontWeight: 'bold' }}
              labelStyle={{ color: '#94a3b8', fontSize: '12px', marginBottom: '4px' }}
            />
            <Bar dataKey="focus" radius={[4, 4, 4, 4]}>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.name === 'Sat' ? '#818cf8' : '#334155'} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
