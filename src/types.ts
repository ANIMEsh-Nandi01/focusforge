export interface Goal {
  id: string;
  text: string;
  completed: boolean;
}

export interface Habit {
  id: string;
  name: string;
  emoji: string;
  completedDays: boolean[]; // 0 = Mon, 6 = Sun
}

export interface AppState {
  goals: Goal[];
  habits: Habit[];
  focusTimeTotal: number; // in seconds
}
