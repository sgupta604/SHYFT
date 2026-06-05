/**
 * Plugins — extensions devs build & publish (ported 1:1 from data.jsx:223-272).
 * Installed ones render into named SLOTS on Today / You.
 * The rest live in the Apps directory (More -> Apps).
 * Curly apostrophes converted to ASCII. All icon names verified in lucide-react-native.
 */
import type { DevPlugin, DevStatus, Plugin, PluginCategory } from './types';
import type { Tone } from '@/lib/theme/colors';

export const PLUGINS: Plugin[] = [
  // ---- installed by default; render into slots ----
  {
    id: 'pl-shuttle', name: 'Shuttle Tracker', dev: 'Platform Tools', icon: 'bus', tone: 'blue',
    category: 'Workplace', slot: 'today', installed: true, installs: 1240, rating: 4.8,
    blurb: 'Live arrival times for the HQ shuttle, right on your home screen.',
    permissions: ['Location (approximate)', 'Notifications'],
    widget: { kind: 'next', value: '12', unit: 'min', label: 'Route B -> Downtown', note: 'On time' },
  },
  {
    id: 'pl-lunch', name: 'Lunch Today', dev: 'Workplace', icon: 'utensils', tone: 'orange',
    category: 'Workplace', slot: 'today', installed: true, installs: 2980, rating: 4.6,
    blurb: "Today's cafe menu and dietary tags, updated every morning.",
    permissions: ['Notifications'],
    widget: { kind: 'list', label: 'Omaha HQ cafe · 11:30-2:00', items: ['Korean BBQ rice bowls', 'Roasted veg + farro', 'Build-your-own ramen'] },
  },
  {
    id: 'pl-401k', name: '401(k) Snapshot', dev: 'Finance Guild', icon: 'piggy-bank', tone: 'green',
    category: 'Finance', slot: 'you', installed: true, installs: 1710, rating: 4.9,
    blurb: 'Your retirement balance and contribution rate at a glance.',
    permissions: ['Read payroll summary'],
    widget: { kind: 'stat', value: '$48,210', label: 'Vested balance', delta: '+2.4% this quarter', deltaTone: 'green' },
  },
  {
    id: 'pl-volunteer', name: 'Volunteer Hours', dev: 'Shyft Gives', icon: 'hand-heart', tone: 'purple',
    category: 'Community', slot: 'you', installed: true, installs: 640, rating: 4.7,
    blurb: 'Track volunteer hours toward your annual giving goal.',
    permissions: ['Notifications'],
    widget: { kind: 'progress', label: 'Toward 20-hour goal', used: 14, total: 20, unit: 'hrs' },
  },

  // ---- available in the directory (not installed) ----
  { id: 'pl-parking', name: 'Parking Reservations', dev: 'Workplace', icon: 'circle-parking', tone: 'blue', category: 'Workplace', slot: 'today', installed: false, installs: 880, rating: 4.4, blurb: 'Reserve a garage spot before you drive in.', permissions: ['Location (approximate)'] },
  { id: 'pl-gym', name: 'Gym Class Booking', dev: 'Wellness Team', icon: 'dumbbell', tone: 'green', category: 'Wellness', slot: 'you', installed: false, installs: 1320, rating: 4.5, blurb: "Book on-site fitness classes and see what's next.", permissions: ['Calendar', 'Notifications'] },
  { id: 'pl-expense', name: 'Expense Quick-Snap', dev: 'Finance Guild', icon: 'receipt', tone: 'orange', category: 'Finance', slot: 'you', installed: false, installs: 2040, rating: 4.3, blurb: 'Photograph a receipt and auto-file the expense.', permissions: ['Camera', 'Read payroll summary'] },
  { id: 'pl-standup', name: 'Async Standup', dev: 'Eng Productivity', icon: 'list-checks', tone: 'purple', category: 'Productivity', slot: 'today', installed: false, installs: 760, rating: 4.6, blurb: 'Post and read team standups without a meeting.', permissions: ['Notifications'] },
  { id: 'pl-room', name: 'Book a Room', dev: 'Workplace', icon: 'door-open', tone: 'blue', category: 'Workplace', slot: 'today', installed: false, installs: 1990, rating: 4.5, blurb: 'Find and reserve meeting rooms on any floor.', permissions: ['Calendar'] },
  { id: 'pl-carbon', name: 'Commute Carbon', dev: 'Shyft Gives', icon: 'leaf', tone: 'green', category: 'Community', slot: 'you', installed: false, installs: 410, rating: 4.2, blurb: 'Track and offset the carbon from your commute.', permissions: ['Location (approximate)'] },
];

export const PLUGIN_CATEGORIES: PluginCategory[] = ['All', 'Workplace', 'Wellness', 'Finance', 'Productivity', 'Community'];

/* Plugins YOU authored — shown in the role-gated Developer console. */
export const DEV_PLUGINS: DevPlugin[] = [
  { id: 'dp1', name: 'Shuttle Tracker', icon: 'bus', tone: 'blue', status: 'Published', version: 'v2.3.1', installs: 1240, rating: 4.8, note: 'Live · last updated 6 days ago' },
  { id: 'dp2', name: 'Lunch Today', icon: 'utensils', tone: 'orange', status: 'In review', version: 'v1.0.0', installs: 0, rating: null, note: 'Submitted 2 days ago · est. 3-5 day review' },
  { id: 'dp3', name: 'Expense Quick-Snap', icon: 'receipt', tone: 'orange', status: 'Draft', version: 'v0.4.0', installs: 0, rating: null, note: 'Last edited yesterday' },
];

export const DEV_STATUS_TONE: Record<DevStatus, Tone> = {
  Published: 'green',
  'In review': 'orange',
  Draft: 'neutral',
  Rejected: 'pink',
};
