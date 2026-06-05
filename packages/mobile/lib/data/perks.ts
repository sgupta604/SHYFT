import type { Perk } from './types';

export const PERKS: Perk[] = [
  { id: 'pk1', icon: 'heart-pulse', label: 'Health & dental', tone: 'pink', sub: 'Blue Cross · Member portal' },
  { id: 'pk2', icon: 'piggy-bank', label: '401(k) match', tone: 'green', sub: 'Fidelity · 6% match' },
  { id: 'pk3', icon: 'graduation-cap', label: 'Learning budget', tone: 'purple', sub: '$1,500 / yr' },
  { id: 'pk4', icon: 'dumbbell', label: 'Wellness stipend', tone: 'blue', sub: '$600 / yr' },
  { id: 'pk5', icon: 'plane', label: 'PTO & holidays', tone: 'orange', sub: 'Unlimited + 11 days' },
  { id: 'pk6', icon: 'baby', label: 'Parental leave', tone: 'pink', sub: 'Up to 16 weeks' },
];
