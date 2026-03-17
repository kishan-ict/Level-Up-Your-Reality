export type Difficulty = 'easy' | 'medium' | 'hard';
export type StatCategory = 'strength' | 'intelligence' | 'discipline' | 'social';

export interface UserStats {
  strength: number;
  intelligence: number;
  discipline: number;
  social: number;
}

export interface UserProfile {
  uid: string;
  email: string;
  displayName: string | null;
  photoURL: string | null;
  xp: number;
  level: number;
  streak: number;
  lastActive: any; // Timestamp
  stats: UserStats;
}

export interface Quest {
  id?: string;
  userId: string;
  title: string;
  difficulty: Difficulty;
  xpReward: number;
  statCategory: StatCategory;
  deadline?: any; // Timestamp
  completed: boolean;
  createdAt: any; // Timestamp
}

export interface ProgressLog {
  id?: string;
  userId: string;
  date: string; // YYYY-MM-DD
  xpGained: number;
  levelReached: number;
}
