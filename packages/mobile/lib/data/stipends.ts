import type { Stipend } from './types';

export const STIPENDS: Stipend[] = [
  {
    id: 'st1',
    label: 'Learning',
    icon: 'graduation-cap',
    tone: 'purple',
    used: 420,
    total: 1500,
    period: 'yr',
    resetsInDays: 28,
    blurb: 'Courses, books, conferences, certifications.',
    tx: [
      { id: 'l1', title: 'Frontend Masters — annual', date: 'Mar 12', amount: 348, status: 'Reimbursed' },
      { id: 'l2', title: 'Designing Data-Intensive Apps', date: 'Feb 24', amount: 72, status: 'Approved' },
    ],
  },
  {
    id: 'st2',
    label: 'Wellness',
    icon: 'dumbbell',
    tone: 'blue',
    used: 510,
    total: 600,
    period: 'yr',
    resetsInDays: 28,
    blurb: 'Gym, classes, equipment, mental-health apps.',
    tx: [
      { id: 'w1', title: 'ClassPass — March', date: 'Mar 1', amount: 99, status: 'Reimbursed' },
      { id: 'w2', title: 'Running shoes', date: 'Feb 18', amount: 140, status: 'Reimbursed' },
      { id: 'w3', title: 'Sports massage', date: 'Mar 20', amount: 120, status: 'Pending' },
    ],
  },
  {
    id: 'st3',
    label: 'Home office',
    icon: 'armchair',
    tone: 'green',
    used: 0,
    total: 500,
    period: 'yr',
    resetsInDays: 28,
    blurb: 'Desk, chair, monitor, lighting, peripherals.',
    tx: [],
  },
];
