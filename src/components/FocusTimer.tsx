import { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw } from 'lucide-react';
import { motion } from 'motion/react';

interface FocusTimerProps {
  onSessionComplete: (durationSeconds: number) => void;
}

const DEFAULT_TIME = 25 * 60; // 25 minutes

export default function FocusTimer({ onSessionComplete }: FocusTimerProps) {
  const [timeLeft, setTimeLeft] = useState(DEFAULT_TIME);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let interval: number;
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000) as unknown as number;
    } else if (isRunning && timeLeft === 0) {
      setIsRunning(false);
      onSessionComplete(DEFAULT_TIME); // Add to stats
      // Play a sound or show notification here ideally
    }
    return () => clearInterval(interval);
  }, [isRunning, timeLeft, onSessionComplete]);

  const toggleTimer = () => setIsRunning(!isRunning);
  
  const resetTimer = () => {
    setIsRunning(false);
    setTimeLeft(DEFAULT_TIME);
  };

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  
  // Calculate progress for the circular ring
  const progress = ((DEFAULT_TIME - timeLeft) / DEFAULT_TIME) * 100;

  return (
    <div className="flex h-full flex-col items-center justify-center rounded-3xl border border-white/5 bg-white/[0.02] p-8 backdrop-blur-md relative overflow-hidden">
      
      {/* Background glow when running */}
      {isRunning && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute inset-0 bg-indigo-500/5 blur-3xl"
        />
      )}

      <h2 className="absolute top-6 left-6 text-lg font-semibold text-white">Focus Session ⏱️</h2>

      <div className="relative mt-4 flex h-48 w-48 items-center justify-center">
        {/* Subtle background circle */}
        <svg className="absolute inset-0 h-full w-full -rotate-90" viewBox="0 0 100 100">
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="rgba(255,255,255,0.05)"
            strokeWidth="4"
          />
          {/* Animated progress circle */}
          <motion.circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="url(#gradient)"
            strokeWidth="4"
            strokeLinecap="round"
            strokeDasharray="283"
            strokeDashoffset={283 - (283 * progress) / 100}
            className="transition-all duration-1000 ease-linear"
          />
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#818cf8" />
              <stop offset="100%" stopColor="#c084fc" />
            </linearGradient>
          </defs>
        </svg>

        <div className="text-center font-mono">
          <div className="text-5xl font-bold tracking-tighter text-white">
            {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
          </div>
          <div className="mt-1 text-xs font-medium uppercase tracking-widest text-slate-500">
            {isRunning ? 'Focusing' : 'Paused'}
          </div>
        </div>
      </div>

      <div className="mt-8 flex items-center gap-4 relative z-10">
        <button
          onClick={resetTimer}
          className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-slate-900/50 text-slate-400 transition-all hover:bg-white/10 hover:text-white"
        >
          <RotateCcw className="h-5 w-5" />
        </button>
        
        <button
          onClick={toggleTimer}
          className={`flex h-16 w-32 items-center justify-center rounded-full text-white shadow-lg transition-all hover:scale-105 active:scale-95 ${
            isRunning 
            ? 'bg-slate-800 hover:bg-slate-700 shadow-none border border-white/10' 
            : 'bg-gradient-to-r from-indigo-500 to-purple-600 shadow-indigo-500/25'
          }`}
        >
          {isRunning ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6 ml-1" />}
        </button>
      </div>
    </div>
  );
}
