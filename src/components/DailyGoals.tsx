import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, Trash2, CheckCircle2, Circle } from 'lucide-react';
import { Goal } from '../types';

interface DailyGoalsProps {
  goals: Goal[];
  onAddGoal: (text: string) => void;
  onToggleGoal: (id: string) => void;
  onDeleteGoal: (id: string) => void;
}

export default function DailyGoals({ goals, onAddGoal, onToggleGoal, onDeleteGoal }: DailyGoalsProps) {
  const [newGoal, setNewGoal] = useState('');

  const handleAdd = () => {
    if (newGoal.trim()) {
      onAddGoal(newGoal.trim());
      setNewGoal('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleAdd();
  };

  return (
    <div className="flex h-full flex-col rounded-3xl border border-white/5 bg-white/[0.02] p-6 backdrop-blur-md">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-white">Today's Goals 🎯</h2>
        <span className="rounded-full bg-indigo-500/10 px-3 py-1 text-xs font-medium text-indigo-400">
          {goals.filter(g => g.completed).length}/{goals.length}
        </span>
      </div>

      {/* Input */}
      <div className="mb-6 flex items-center gap-2 rounded-xl border border-white/10 bg-slate-900/50 p-1 pl-4 focus-within:border-indigo-500/50 focus-within:ring-1 focus-within:ring-indigo-500/50 transition-all">
        <input
          type="text"
          value={newGoal}
          onChange={(e) => setNewGoal(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="What needs to be done?"
          className="flex-1 bg-transparent text-sm text-slate-200 outline-none placeholder:text-slate-500"
        />
        <button
          onClick={handleAdd}
          className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-500 text-white transition-transform hover:scale-105 active:scale-95"
        >
          <Plus className="h-4 w-4" />
        </button>
      </div>

      {/* List */}
      <div className="flex-1 overflow-y-auto pr-2">
        <ul className="flex flex-col gap-2">
          <AnimatePresence mode="popLayout">
            {goals.map((goal) => (
              <motion.li
                key={goal.id}
                layout
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
                className={`group flex items-center gap-3 rounded-xl border p-3 transition-colors ${
                  goal.completed
                    ? 'border-white/5 bg-white/5 text-slate-500'
                    : 'border-white/10 bg-slate-900/30 text-slate-200 hover:border-white/20 hover:bg-slate-900/50'
                }`}
              >
                <button
                  onClick={() => onToggleGoal(goal.id)}
                  className="flex-shrink-0 text-slate-400 transition-colors hover:text-indigo-400"
                >
                  {goal.completed ? (
                    <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                  ) : (
                    <Circle className="h-5 w-5" />
                  )}
                </button>
                <span className={`flex-1 text-sm ${goal.completed ? 'line-through opacity-50' : ''}`}>
                  {goal.text}
                </span>
                <button
                  onClick={() => onDeleteGoal(goal.id)}
                  className="flex-shrink-0 text-slate-500 opacity-0 transition-all hover:text-red-400 group-hover:opacity-100"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </motion.li>
            ))}
          </AnimatePresence>
          {goals.length === 0 && (
            <p className="mt-8 text-center text-sm text-slate-500">No goals for today. Set your focus!</p>
          )}
        </ul>
      </div>
    </div>
  );
}
