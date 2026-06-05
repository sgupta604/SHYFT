import type { Kudo } from './types';

export const KUDOS: Kudo[] = [
  {
    id: 'k1',
    from: 'Priya Anand',
    to: 'Maya Patel',
    value: 'Customer obsession',
    text: 'Maya stayed late to walk the Northwind team through the migration. They emailed leadership to say it was the smoothest rollout they have had.',
    time: '1h ago',
    cheers: 16,
    cheered: false,
  },
  {
    id: 'k2',
    from: 'Marcus Bell',
    to: 'Platform team',
    value: 'Ownership',
    text: 'Whole platform team jumped on the incident at 6am without being asked. Root-caused and shipped a fix before standup.',
    time: '3h ago',
    cheers: 31,
    cheered: true,
  },
  {
    id: 'k3',
    from: 'Jordan Chen',
    to: 'Sam Okafor',
    value: 'Craft',
    text: "Sam's code review comments are basically a free design course. Thanks for raising the bar on the payments refactor.",
    time: 'Yesterday',
    cheers: 9,
    cheered: false,
  },
];
