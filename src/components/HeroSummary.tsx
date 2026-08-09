import { motion } from 'motion/react';
import { Sparkles } from 'lucide-react';
import { Goal, Habit } from '../types';

interface HeroSummaryProps {
  goals: Goal[];
  habits: Habit[];
}

export default function HeroSummary({ goals, habits }: HeroSummaryProps) {
  const currentDayIndex = new Date().getDay() === 0 ? 6 : new Date().getDay() - 1; // Mon=0, Sun=6
  
  const goalsCompleted = goals.filter(g => g.completed).length;
  const totalGoals = goals.length || 1; // Prevent div by zero
  
  const habitsCompletedToday = habits.filter(h => h.completedDays[currentDayIndex]).length;
  const totalHabits = habits.length || 1;

  const goalScore = (goalsCompleted / totalGoals) * 100;
  const habitScore = (habitsCompletedToday / totalHabits) * 100;
  
  // Weighted score (e.g., goals 60%, habits 40%)
  const disciplineScore = Math.round((goalScore * 0.6) + (habitScore * 0.4)) || 0;

  let statusText = "Needs Focus";
  let statusColor = "text-red-400";
  let aiMessage = "Start knocking out those tasks to build momentum.";

  if (disciplineScore >= 80) {
    statusText = "Highly Disciplined";
    statusColor = "text-emerald-400";
    aiMessage = "Outstanding performance today. Keep up this elite execution.";
  } else if (disciplineScore >= 50) {
    statusText = "Average Day";
    statusColor = "text-indigo-400";
    aiMessage = "You're making progress. Push a little harder to reach greatness.";
  }

  return (
    <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl shadow-2xl">
      {/* Subtle Glow */}
      <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-indigo-500/20 blur-[100px]" />
      <div className="pointer-events-none absolute -left-20 -bottom-20 h-64 w-64 rounded-full bg-purple-500/10 blur-[100px]" />

      <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
        
        {/* Score & Status */}
        <div className="flex flex-col gap-2">
          <p className="text-sm font-medium uppercase tracking-wider text-slate-400">Discipline Score</p>
          <div className="flex items-baseline gap-4">
            <h1 className="bg-gradient-to-br from-white to-slate-400 bg-clip-text text-6xl font-bold tracking-tight text-transparent">
              {disciplineScore}
            </h1>
            <span className={`text-xl font-medium ${statusColor}`}>
              {statusText}
            </span>
          </div>
        </div>

        {/* AI Insight */}
        <div className="flex-1 max-w-md rounded-2xl border border-white/5 bg-slate-900/50 p-5 shadow-inner">
          <div className="mb-2 flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-indigo-400" />
            <span className="text-xs font-semibold uppercase tracking-wider text-indigo-400">Forge AI Insight</span>
          </div>
          <p className="text-sm text-slate-300 leading-relaxed">
            "{aiMessage}"
          </p>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="relative z-10 mt-8 h-2 w-full overflow-hidden rounded-full bg-slate-800">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${disciplineScore}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
          className={`h-full rounded-full ${
            disciplineScore >= 80 ? 'bg-gradient-to-r from-emerald-500 to-emerald-400' 
            : disciplineScore >= 50 ? 'bg-gradient-to-r from-indigo-600 to-purple-500'
            : 'bg-gradient-to-r from-red-600 to-orange-500'
          }`}
        />
      </div>
    </div>
  );
}
