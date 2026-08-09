import { Habit } from '../types';
import { motion } from 'motion/react';

interface HabitTrackerProps {
  habits: Habit[];
  onToggleHabit: (habitId: string, dayIndex: number) => void;
}

export default function HabitTracker({ habits, onToggleHabit }: HabitTrackerProps) {
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  return (
    <div className="flex h-full flex-col rounded-3xl border border-white/5 bg-white/[0.02] p-6 backdrop-blur-md overflow-hidden">
      <h2 className="mb-6 text-lg font-semibold text-white">Habits 🚀</h2>
      
      <div className="w-full overflow-x-auto pb-4">
        <div className="min-w-[400px]">
          {/* Header */}
          <div className="mb-3 grid grid-cols-8 gap-2">
            <div className="col-span-1"></div> {/* Empty corner */}
            {days.map((day, idx) => (
              <div key={day} className="text-center text-xs font-medium text-slate-500">
                {day}
              </div>
            ))}
          </div>

          {/* Rows */}
          <div className="flex flex-col gap-3">
            {habits.map((habit) => (
              <div key={habit.id} className="grid grid-cols-8 gap-2 items-center">
                <div className="col-span-1 flex items-center justify-center">
                  <span title={habit.name} className="text-xl cursor-help hover:scale-110 transition-transform">
                    {habit.emoji}
                  </span>
                </div>
                {habit.completedDays.map((completed, dayIdx) => (
                  <button
                    key={`${habit.id}-${dayIdx}`}
                    onClick={() => onToggleHabit(habit.id, dayIdx)}
                    className="flex justify-center group outline-none"
                  >
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className={`h-8 w-8 rounded-lg border flex items-center justify-center transition-all ${
                        completed 
                        ? 'bg-emerald-500/20 border-emerald-500/50 shadow-[0_0_10px_rgba(16,185,129,0.2)] text-emerald-400' 
                        : 'bg-slate-900/50 border-white/10 hover:border-white/30 text-transparent'
                      }`}
                    >
                      {completed && <div className="h-2 w-2 rounded-full bg-emerald-400" />}
                    </motion.div>
                  </button>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
