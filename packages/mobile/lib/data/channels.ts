import type { Channel } from './types';

export const CHANNELS: Channel[] = [
  { id: 'c1', icon: 'sandwich', name: 'lunch-crew', tone: 'green', members: 42, sub: "Who's grabbing food at noon?" },
  { id: 'c2', icon: 'car-front', name: 'carpool-north', tone: 'blue', members: 14, sub: 'Rides from the north suburbs' },
  { id: 'c3', icon: 'dog', name: 'dogs-of-shyft', tone: 'orange', members: 88, sub: 'Mandatory photo tax' },
  { id: 'c4', icon: 'mountain', name: 'trail-runners', tone: 'purple', members: 23, sub: 'Weekend trail meetups' },
];
