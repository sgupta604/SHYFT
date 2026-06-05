import type { Person } from './types';

export const PEOPLE: Person[] = [
  {
    id: 'u1',
    name: 'Maya Patel',
    role: 'Staff Engineer',
    team: 'Platform',
    loc: 'Omaha HQ · Hybrid',
    kudos: [
      {
        value: 'Customer obsession',
        from: 'Priya Anand',
        time: '1h ago',
        text: 'Stayed late to walk the Northwind team through the migration — they emailed leadership to say it was the smoothest rollout they’ve had.',
      },
      {
        value: 'Craft',
        from: 'Marcus Bell',
        time: '2w ago',
        text: 'The flag-rollout runbook Maya wrote is now the template the whole org copies.',
      },
    ],
  },
  {
    id: 'u2',
    name: 'Sam Okafor',
    role: 'Senior Engineer',
    team: 'Payments',
    loc: 'Omaha HQ',
    kudos: [
      {
        value: 'Craft',
        from: 'Jordan Chen',
        time: 'Yesterday',
        text: 'Sam’s code review comments are basically a free design course. Thanks for raising the bar on the payments refactor.',
      },
    ],
  },
  {
    id: 'u3',
    name: 'Priya Anand',
    role: 'People Ops Lead',
    team: 'People Ops',
    loc: 'Omaha HQ',
    kudos: [
      {
        value: 'Team',
        from: 'Dana Whitfield',
        time: '3d ago',
        text: 'Priya turned a chaotic onboarding week into something that felt effortless for three new hires at once.',
      },
    ],
  },
  {
    id: 'u4',
    name: 'Jordan Chen',
    role: 'Product Designer',
    team: 'Design',
    loc: 'Remote · US',
    kudos: [
      {
        value: 'Ownership',
        from: 'Maya Patel',
        time: '1w ago',
        text: 'Jordan caught the accessibility regression before launch and fixed it without being asked.',
      },
    ],
  },
  {
    id: 'u5',
    name: 'Marcus Bell',
    role: 'Engineering Manager',
    team: 'Platform',
    loc: 'Omaha HQ',
    kudos: [
      {
        value: 'Ownership',
        from: 'Sam Okafor',
        time: '4d ago',
        text: 'Jumped on the 6am incident without being asked and shipped the fix before standup.',
      },
    ],
  },
  {
    id: 'u6',
    name: 'Riley Park',
    role: 'Support Engineer',
    team: 'Customer',
    loc: 'Remote · US',
    kudos: [],
  },
];
