import type { Holiday, OfficeStatus, OutPerson, Pto, Weather } from './types';

export const OFFICE_STATUS: OfficeStatus = {
  state: 'open',
  tone: 'green',
  icon: 'building-2',
  title: 'Omaha HQ is open',
  text: 'Normal hours today, 7am–7pm. Garage level 2 is closed for striping.',
};

export const WEATHER: Weather = {
  city: 'Omaha, NE',
  tempF: 78,
  hi: 84,
  lo: 66,
  cond: 'Partly cloudy',
  icon: 'cloud-sun',
  hours: [
    { t: 'Now', f: 78, icon: 'cloud-sun' },
    { t: '1p', f: 81, icon: 'sun' },
    { t: '2p', f: 83, icon: 'sun' },
    { t: '3p', f: 84, icon: 'cloud-sun' },
    { t: '4p', f: 82, icon: 'cloud' },
    { t: '5p', f: 79, icon: 'cloud-drizzle' },
  ],
};

export const OUT_TODAY: OutPerson[] = [
  { name: 'Maya Patel', kind: 'PTO', tone: 'blue', note: 'Back Mon' },
  { name: 'Jordan Chen', kind: 'Sick', tone: 'orange', note: '' },
  { name: 'Riley Park', kind: 'Remote', tone: 'purple', note: 'On Slack' },
  { name: 'Sam Okafor', kind: 'PTO', tone: 'blue', note: 'Back Wed' },
];

export const HOLIDAYS: Holiday[] = [
  { date: 'May 26', day: 'Mon', name: 'Memorial Day', closed: true },
  { date: 'Jun 19', day: 'Thu', name: 'Juneteenth', closed: true },
  { date: 'Jul 4', day: 'Fri', name: 'Independence Day', closed: true },
];

export const PTO: Pto = {
  remaining: 14,
  accrued: 18,
  unit: 'days',
  nextHoliday: { name: 'Memorial Day', date: 'Mon, May 26' },
  pendingRequests: 0,
};
