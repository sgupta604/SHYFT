import type { Onboarding } from './types';

export const ONBOARDING: Onboarding = {
  daysToStart: 6,
  startDate: 'Mon, Mar 31',
  checklist: [
    { id: 'o1', label: 'Sign your offer letter', done: true, meta: 'DocuSign' },
    { id: 'o2', label: 'Complete I-9 & tax forms', done: true, meta: 'Rippling' },
    { id: 'o3', label: 'Pick your laptop & gear', done: false, meta: 'Due Wed' },
    { id: 'o4', label: 'Read the culture handbook', done: false, meta: '8 min' },
    { id: 'o5', label: 'Add your first-day headshot', done: false, meta: 'Optional' },
  ],
  whoswho: [
    { name: 'Priya Anand', role: 'Your onboarding buddy', team: 'People Ops' },
    { name: 'Marcus Bell', role: 'Your manager', team: 'Platform' },
    { name: 'Dana Whitfield', role: 'IT — laptop & accounts', team: 'IT Ops' },
  ],
  facts: [
    { icon: 'clock', k: 'First day', v: 'Mon, Mar 31 · 9:30am' },
    { icon: 'map-pin', k: 'Where', v: 'Omaha HQ, 5th-floor lobby' },
    { icon: 'square-parking', k: 'Parking', v: 'Garage L3 · badge opens the gate' },
    { icon: 'shirt', k: 'Dress', v: 'Casual — jeans are fine' },
  ],
};
