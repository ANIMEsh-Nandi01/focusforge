import { useState } from 'react';
import Navbar from './components/Navbar';
import HeroSummary from './components/HeroSummary';
import DailyGoals from './components/DailyGoals';
import HabitTracker from './components/HabitTracker';
import FocusTimer from './components/FocusTimer';
import Analytics from './components/Analytics';
import { Goal, Habit } from './types';

// Initial dummy data
const INITIAL_GOALS: Goal[] = [
  { id: '1', text: 'Review Q3 strategy doc', completed: true },
  { id: '2', text: 'Design new landing page iteration', completed: false },
  { id: '3', text: 'Inbox zero', completed: false },
];

const INITIAL_HABITS: Habit[] = [
  { id: 'h1', name: 'Exercise', emoji: '💪', completedDays: [true, false, true, true, false, false, false] },
  { id: 'h2', name: 'Read 20 mins', emoji: '📚', completedDays: [true, true, true, false, true, false, false] },
  { id: 'h3', name: 'Meditate', emoji: '🧘', completedDays: [false, false, true, true, false, true, false] },
];

export default function App() {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [goals, setGoals] = useState<Goal[]>(INITIAL_GOALS);
  const [habits, setHabits] = useState<Habit[]>(INITIAL_HABITS);
  const [focusTimeTotal, setFocusTimeTotal] = useState(0); // in seconds

  const toggleTheme = () => {
    // Note: Since this is explicitly designed for a dark aesthetic, 
    // real toggle would modify the class on `html`, but we'll leave it visual for now.
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  const handleAddGoal = (text: string) => {
    setGoals([...goals, { id: Date.now().toString(), text, completed: false }]);
  };

  const handleToggleGoal = (id: string) => {
    setGoals(goals.map(g => g.id === id ? { ...g, completed: !g.completed } : g));
  };

  const handleDeleteGoal = (id: string) => {
    setGoals(goals.filter(g => g.id !== id));
  };

  const handleToggleHabit = (habitId: string, dayIndex: number) => {
    setHabits(habits.map(h => {
      if (h.id === habitId) {
        const newDays = [...h.completedDays];
        newDays[dayIndex] = !newDays[dayIndex];
        return { ...h, completedDays: newDays };
      }
      return h;
    }));
  };

  const handleSessionComplete = (durationSeconds: number) => {
    setFocusTimeTotal(prev => prev + durationSeconds);
  };

  return (
    <div className="min-h-screen bg-slate-950 font-sans text-slate-50 selection:bg-indigo-500/30">
      <Navbar theme={theme} toggleTheme={toggleTheme} />
      
      <main className="mx-auto max-w-7xl px-6 py-8">
        <div className="flex flex-col gap-6">
          
          {/* Top Hero Section */}
          <section>
            <HeroSummary goals={goals} habits={habits} />
          </section>

          {/* Main Grid Content */}
          <section className="grid grid-cols-1 gap-6 lg:grid-cols-12 auto-rows-fr">
            
            {/* Left Column (Goals) */}
            <div className="lg:col-span-4 min-h-[400px]">
              <DailyGoals 
                goals={goals}
                onAddGoal={handleAddGoal}
                onToggleGoal={handleToggleGoal}
                onDeleteGoal={handleDeleteGoal}
              />
            </div>

            {/* Middle Column (Habits & Timer) */}
            <div className="flex flex-col gap-6 lg:col-span-5 min-h-[400px]">
              <div className="flex-1">
                <HabitTracker habits={habits} onToggleHabit={handleToggleHabit} />
              </div>
              <div className="flex-1">
                <FocusTimer onSessionComplete={handleSessionComplete} />
              </div>
            </div>

            {/* Right Column (Analytics) */}
            <div className="lg:col-span-3 min-h-[400px]">
              <Analytics 
                goalsCompleted={goals.filter(g => g.completed).length}
                habitsCompleted={habits.reduce((acc, h) => acc + h.completedDays.filter(Boolean).length, 0)}
                focusTime={focusTimeTotal}
              />
            </div>
            
          </section>

        </div>
      </main>

      {/* Mobile Sticky Button - Visual Only */}
      <div className="fixed bottom-6 right-6 block lg:hidden">
        <button 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="flex h-14 w-14 items-center justify-center rounded-full bg-indigo-500 text-white shadow-lg shadow-indigo-500/30 active:scale-95 transition-transform"
        >
          <span className="text-2xl">+</span>
        </button>
      </div>
    </div>
  );
}
