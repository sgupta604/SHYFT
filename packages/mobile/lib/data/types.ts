/**
 * Commons — typed shapes for the mock data ported 1:1 from data.jsx.
 * Prototype field names are kept verbatim (rsvp, going, cheered, done) so the
 * data layer matches the design source. Zero `any`.
 */
import type { Tone } from '@/lib/theme/colors';

export type Rsvp = 'going' | null;

export interface Announcement {
  id: string;
  pinned?: boolean;
  cat: string;
  catTone: Tone;
  title: string;
  body: string;
  author: string;
  role: string;
  time: string;
  reactions: number;
  comments: number;
  link?: { tab: string; label: string; icon: string };
}

export interface OfficeStatus {
  state: 'open' | 'advisory' | 'closed';
  tone: Tone;
  icon: string;
  title: string;
  text: string;
}

export interface WeatherHour {
  t: string;
  f: number;
  icon: string;
}

export interface Weather {
  city: string;
  tempF: number;
  hi: number;
  lo: number;
  cond: string;
  icon: string;
  hours: WeatherHour[];
}

export interface OutPerson {
  name: string;
  kind: string;
  tone: Tone;
  note: string;
}

export interface Holiday {
  date: string;
  day: string;
  name: string;
  closed: boolean;
}

export interface EventItem {
  id: string;
  cat: string;
  catTone: Tone;
  icon: string;
  title: string;
  date: string;
  time: string;
  where: string;
  host: string;
  going: number;
  capacity: number;
  rsvp: Rsvp;
  desc: string;
}

export interface Kudo {
  id: string;
  from: string;
  to: string;
  value: string;
  text: string;
  time: string;
  cheers: number;
  cheered: boolean;
}

export type TxStatus = 'Pending' | 'Approved' | 'Reimbursed';

export interface StipendTx {
  id: string;
  title: string;
  date: string;
  amount: number;
  status: TxStatus;
}

export interface Stipend {
  id: string;
  label: string;
  icon: string;
  tone: Tone;
  used: number;
  total: number;
  period: string;
  resetsInDays: number;
  blurb: string;
  tx: StipendTx[];
}

export interface Pto {
  remaining: number;
  accrued: number;
  unit: string;
  nextHoliday: { name: string; date: string };
  pendingRequests: number;
}

export interface PersonKudo {
  value: string;
  from: string;
  time: string;
  text: string;
}

export interface Person {
  id: string;
  name: string;
  role: string;
  team: string;
  loc: string;
  kudos: PersonKudo[];
}

export interface Channel {
  id: string;
  icon: string;
  name: string;
  tone: Tone;
  members: number;
  sub: string;
}

export interface ForSaleItem {
  id: string;
  icon: string;
  title: string;
  price: string;
  who: string;
  when: string;
}

export interface Perk {
  id: string;
  icon: string;
  label: string;
  tone: Tone;
  sub: string;
}

export interface ChecklistItem {
  id: string;
  label: string;
  done: boolean;
  meta: string;
}

export interface WhosWho {
  name: string;
  role: string;
  team: string;
}

export interface OnboardingFact {
  icon: string;
  k: string;
  v: string;
}

export interface Onboarding {
  daysToStart: number;
  startDate: string;
  checklist: ChecklistItem[];
  whoswho: WhosWho[];
  facts: OnboardingFact[];
}
