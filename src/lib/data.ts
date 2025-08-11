import type { WisdomEntry, LogEntry } from '@/lib/types';

export const GLOBAL_WISDOM_ENTRIES: WisdomEntry[] = [
  {
    id: 'gw-1',
    title: 'Memento Mori',
    description: 'Remember you will die. Use this to create priority and meaning.',
    category: 'Stoicism',
  },
  {
    id: 'gw-2',
    title: 'Amor Fati',
    description: 'Love your fate. Accept and embrace everything that has happened.',
    category: 'Stoicism',
  },
  {
    id: 'gw-3',
    title: 'The Obstacle Is The Way',
    description: 'Frame obstacles as opportunities for growth and learning.',
    category: 'Stoicism',
  },
  {
    id: 'gw-4',
    title: 'Ego is the Enemy',
    description: 'Practice humility and confidence over ego and arrogance.',
    category: 'Stoicism',
  },
  {
    id: 'gw-5',
    title: 'Beginner\'s Mind (Shoshin)',
    description: 'Approach situations with an attitude of openness, eagerness, and a lack of preconceptions.',
    category: 'Zen Buddhism',
  },
  {
    id: 'gw-6',
    title: 'Wabi-Sabi',
    description: 'Find beauty in imperfection and impermanence.',
    category: 'Japanese Aesthetics',
  },
];

const today = new Date();
const logs: LogEntry[] = [];
for (let i = 0; i < 90; i++) {
  const date = new Date(today);
  date.setDate(today.getDate() - i);
  const dateString = date.toISOString().split('T')[0];

  // Add 1-3 logs per day
  const logsPerDay = Math.floor(Math.random() * 3) + 1;
  for (let j = 0; j < logsPerDay; j++) {
    const wisdomIndex = Math.floor(Math.random() * GLOBAL_WISDOM_ENTRIES.length);
    logs.push({
      id: `log-${i}-${j}`,
      wisdomId: GLOBAL_WISDOM_ENTRIES[wisdomIndex].id,
      date: dateString,
      status: Math.random() > 0.4 ? 'applied' : 'missed',
    });
  }
}

export const USER_LOGS: LogEntry[] = logs;
