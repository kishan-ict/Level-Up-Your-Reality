import { db, auth, doc, getDoc, setDoc, updateDoc, collection, query, where, onSnapshot, addDoc, deleteDoc, serverTimestamp, Timestamp } from '../firebase';
import { UserProfile, Quest, Difficulty, StatCategory, ProgressLog } from '../types';

export const XP_VALUES: Record<Difficulty, number> = {
  easy: 10,
  medium: 25,
  hard: 50
};

export const getLevel = (xp: number) => Math.floor(xp / 100) + 1;

export const createUserProfile = async (user: any): Promise<UserProfile> => {
  const userRef = doc(db, 'users', user.uid);
  const userSnap = await getDoc(userRef);

  if (userSnap.exists()) {
    return userSnap.data() as UserProfile;
  }

  const newProfile: UserProfile = {
    uid: user.uid,
    email: user.email || '',
    displayName: user.displayName || 'Player',
    photoURL: user.photoURL || null,
    xp: 0,
    level: 1,
    streak: 0,
    lastActive: serverTimestamp(),
    stats: {
      strength: 1,
      intelligence: 1,
      discipline: 1,
      social: 1
    }
  };

  await setDoc(userRef, newProfile);
  return newProfile;
};

export const createQuest = async (userId: string, title: string, difficulty: Difficulty, category: StatCategory, deadline?: Date) => {
  const questData: Omit<Quest, 'id'> = {
    userId,
    title,
    difficulty,
    xpReward: XP_VALUES[difficulty],
    statCategory: category,
    deadline: deadline ? Timestamp.fromDate(deadline) : null,
    completed: false,
    createdAt: serverTimestamp()
  };

  return await addDoc(collection(db, 'quests'), questData);
};

export const completeQuest = async (user: UserProfile, quest: Quest) => {
  if (quest.completed || !quest.id) return;

  const userRef = doc(db, 'users', user.uid);
  const questRef = doc(db, 'quests', quest.id);

  const newXp = user.xp + quest.xpReward;
  const newLevel = getLevel(newXp);
  const newStats = { ...user.stats };
  newStats[quest.statCategory] += 1;

  // Update user
  await updateDoc(userRef, {
    xp: newXp,
    level: newLevel,
    stats: newStats,
    lastActive: serverTimestamp()
  });

  // Update quest
  await updateDoc(questRef, {
    completed: true
  });

  // Log progress
  const today = new Date().toISOString().split('T')[0];
  const progressRef = collection(db, 'progress');
  const q = query(progressRef, where('userId', '==', user.uid), where('date', '==', today));
  
  // This is a simplified progress logging
  await addDoc(progressRef, {
    userId: user.uid,
    date: today,
    xpGained: quest.xpReward,
    levelReached: newLevel
  });
};

export const deleteQuest = async (questId: string) => {
  await deleteDoc(doc(db, 'quests', questId));
};
