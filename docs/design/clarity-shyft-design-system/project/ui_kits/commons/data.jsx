/* ============================================================
   Commons UI kit — mock data
   Fictional Shyft Solutions employees & content.
   ============================================================ */

const ANNOUNCEMENTS = [
  {
    id: 'a1', pinned: true, cat: 'IT', catTone: 'blue',
    title: 'VPN maintenance window — Thu 8–10pm',
    body: 'Networking is rotating certificates on the primary VPN concentrator Thursday night. Remote access will drop intermittently between 8 and 10pm ET. Office connectivity is unaffected. Save your work before you head out.',
    author: 'Dana Whitfield', role: 'IT Operations', time: '2h ago', reactions: 12, comments: 4,
  },
  {
    id: 'a2', cat: 'People', catTone: 'purple',
    title: 'Q3 stipend reset is April 1',
    body: 'Your wellness, learning, and home-office budgets reset at the start of next quarter. Anything unspent does not roll over — get those requests into Stipend Tracker before Mar 31.',
    author: 'Priya Anand', role: 'People Ops', time: 'Yesterday', reactions: 28, comments: 9,
    link: { tab: 'you', label: 'Open Stipend Tracker', icon: 'wallet' },
  },
  {
    id: 'a3', cat: 'Facilities', catTone: 'orange',
    title: 'New badge readers at the east entrance',
    body: 'The east entrance now uses the upgraded badge readers. Tap and hold for a full second. If your badge does not work, Security at the front desk can re-encode it on the spot.',
    author: 'Marcus Bell', role: 'Facilities', time: 'Mon', reactions: 7, comments: 2,
  },
];

const OFFICE_STATUS = {
  state: 'open', // open | advisory | closed
  tone: 'green', icon: 'building-2',
  title: 'Omaha HQ is open',
  text: 'Normal hours today, 7am–7pm. Garage level 2 is closed for striping.',
};

const WEATHER = {
  city: 'Omaha, NE', tempF: 78, hi: 84, lo: 66, cond: 'Partly cloudy', icon: 'cloud-sun',
  hours: [
    { t: 'Now', f: 78, icon: 'cloud-sun' },
    { t: '1p', f: 81, icon: 'sun' },
    { t: '2p', f: 83, icon: 'sun' },
    { t: '3p', f: 84, icon: 'cloud-sun' },
    { t: '4p', f: 82, icon: 'cloud' },
    { t: '5p', f: 79, icon: 'cloud-drizzle' },
  ],
};

const OUT_TODAY = [
  { name: 'Maya Patel', kind: 'PTO', tone: 'blue', note: 'Back Mon' },
  { name: 'Jordan Chen', kind: 'Sick', tone: 'orange', note: '' },
  { name: 'Riley Park', kind: 'Remote', tone: 'purple', note: 'On Slack' },
  { name: 'Sam Okafor', kind: 'PTO', tone: 'blue', note: 'Back Wed' },
];

const HOLIDAYS = [
  { date: 'May 26', day: 'Mon', name: 'Memorial Day', closed: true },
  { date: 'Jun 19', day: 'Thu', name: 'Juneteenth', closed: true },
  { date: 'Jul 4', day: 'Fri', name: 'Independence Day', closed: true },
];

const EVENTS = [
  {
    id: 'e1', cat: 'Lunch & Learn', catTone: 'purple', icon: 'utensils',
    title: 'Lunch & Learn: Shipping with feature flags',
    date: 'Thu, Mar 27', time: '12:00–1:00pm', where: 'HQ · Sequoia room + Zoom',
    host: 'Platform team', going: 18, capacity: 30, rsvp: null,
    desc: 'Bring your lunch. We will walk through how the platform team rolls out risky changes behind flags, with a live demo and Q&A.',
  },
  {
    id: 'e2', cat: 'Social', catTone: 'green', icon: 'glass-water',
    title: 'Spring rooftop happy hour',
    date: 'Fri, Mar 28', time: '5:30–8:00pm', where: 'The Ironwood, 7th floor',
    host: 'Social committee', going: 64, capacity: 90, rsvp: 'going',
    desc: 'First round on the house. Partners and plus-ones welcome. We have the rooftop until 8.',
  },
  {
    id: 'e3', cat: 'Intramural', catTone: 'orange', icon: 'volleyball',
    title: 'Coed kickball vs. Riverside Labs',
    date: 'Sat, Mar 29', time: '10:00am', where: 'Zilker Field 4',
    host: 'Shyft Strikers', going: 11, capacity: 16, rsvp: null,
    desc: 'We need a few more players to field a full roster. No experience required — cleats optional, snacks provided.',
  },
];

const KUDOS = [
  {
    id: 'k1', from: 'Priya Anand', to: 'Maya Patel', value: 'Customer obsession',
    text: 'Maya stayed late to walk the Northwind team through the migration. They emailed leadership to say it was the smoothest rollout they have had.',
    time: '1h ago', cheers: 16, cheered: false,
  },
  {
    id: 'k2', from: 'Marcus Bell', to: 'Platform team', value: 'Ownership',
    text: 'Whole platform team jumped on the incident at 6am without being asked. Root-caused and shipped a fix before standup.',
    time: '3h ago', cheers: 31, cheered: true,
  },
  {
    id: 'k3', from: 'Jordan Chen', to: 'Sam Okafor', value: 'Craft',
    text: 'Sam\'s code review comments are basically a free design course. Thanks for raising the bar on the payments refactor.',
    time: 'Yesterday', cheers: 9, cheered: false,
  },
];

const STIPENDS = [
  {
    id: 'st1', label: 'Learning', icon: 'graduation-cap', tone: 'purple',
    used: 420, total: 1500, period: 'yr', resetsInDays: 28,
    blurb: 'Courses, books, conferences, certifications.',
    tx: [
      { id: 'l1', title: 'Frontend Masters — annual', date: 'Mar 12', amount: 348, status: 'Reimbursed' },
      { id: 'l2', title: 'Designing Data-Intensive Apps', date: 'Feb 24', amount: 72, status: 'Approved' },
    ],
  },
  {
    id: 'st2', label: 'Wellness', icon: 'dumbbell', tone: 'blue',
    used: 510, total: 600, period: 'yr', resetsInDays: 28,
    blurb: 'Gym, classes, equipment, mental-health apps.',
    tx: [
      { id: 'w1', title: 'ClassPass — March', date: 'Mar 1', amount: 99, status: 'Reimbursed' },
      { id: 'w2', title: 'Running shoes', date: 'Feb 18', amount: 140, status: 'Reimbursed' },
      { id: 'w3', title: 'Sports massage', date: 'Mar 20', amount: 120, status: 'Pending' },
    ],
  },
  {
    id: 'st3', label: 'Home office', icon: 'armchair', tone: 'green',
    used: 0, total: 500, period: 'yr', resetsInDays: 28,
    blurb: 'Desk, chair, monitor, lighting, peripherals.',
    tx: [],
  },
];

const PTO = {
  remaining: 14, accrued: 18, unit: 'days',
  nextHoliday: { name: 'Memorial Day', date: 'Mon, May 26' },
  pendingRequests: 0,
};

const PEOPLE = [
  {
    id: 'u1', name: 'Maya Patel', role: 'Staff Engineer', team: 'Platform', loc: 'Omaha HQ · Hybrid',
    kudos: [
      { value: 'Customer obsession', from: 'Priya Anand', time: '1h ago', text: 'Stayed late to walk the Northwind team through the migration — they emailed leadership to say it was the smoothest rollout they’ve had.' },
      { value: 'Craft', from: 'Marcus Bell', time: '2w ago', text: 'The flag-rollout runbook Maya wrote is now the template the whole org copies.' },
    ],
  },
  {
    id: 'u2', name: 'Sam Okafor', role: 'Senior Engineer', team: 'Payments', loc: 'Omaha HQ',
    kudos: [
      { value: 'Craft', from: 'Jordan Chen', time: 'Yesterday', text: 'Sam’s code review comments are basically a free design course. Thanks for raising the bar on the payments refactor.' },
    ],
  },
  {
    id: 'u3', name: 'Priya Anand', role: 'People Ops Lead', team: 'People Ops', loc: 'Omaha HQ',
    kudos: [
      { value: 'Team', from: 'Dana Whitfield', time: '3d ago', text: 'Priya turned a chaotic onboarding week into something that felt effortless for three new hires at once.' },
    ],
  },
  {
    id: 'u4', name: 'Jordan Chen', role: 'Product Designer', team: 'Design', loc: 'Remote · US',
    kudos: [
      { value: 'Ownership', from: 'Maya Patel', time: '1w ago', text: 'Jordan caught the accessibility regression before launch and fixed it without being asked.' },
    ],
  },
  {
    id: 'u5', name: 'Marcus Bell', role: 'Engineering Manager', team: 'Platform', loc: 'Omaha HQ',
    kudos: [
      { value: 'Ownership', from: 'Sam Okafor', time: '4d ago', text: 'Jumped on the 6am incident without being asked and shipped the fix before standup.' },
    ],
  },
  {
    id: 'u6', name: 'Riley Park', role: 'Support Engineer', team: 'Customer', loc: 'Remote · US',
    kudos: [],
  },
];

const CHANNELS = [
  { id: 'c1', icon: 'sandwich', name: 'lunch-crew', tone: 'green', members: 42, sub: 'Who\'s grabbing food at noon?' },
  { id: 'c2', icon: 'car-front', name: 'carpool-north', tone: 'blue', members: 14, sub: 'Rides from the north suburbs' },
  { id: 'c3', icon: 'dog', name: 'dogs-of-shyft', tone: 'orange', members: 88, sub: 'Mandatory photo tax' },
  { id: 'c4', icon: 'mountain', name: 'trail-runners', tone: 'purple', members: 23, sub: 'Weekend trail meetups' },
];

const FORSALE = [
  { id: 'f1', icon: 'monitor', title: 'LG 27" 4K monitor', price: '$180', who: 'Riley P.', when: '2d' },
  { id: 'f2', icon: 'bike', title: 'Commuter bike, M frame', price: '$240', who: 'Dana W.', when: '4d' },
  { id: 'f3', icon: 'armchair', title: 'Herman Miller Sayl', price: '$310', who: 'Sam O.', when: '6d' },
];

const PERKS = [
  { id: 'pk1', icon: 'heart-pulse', label: 'Health & dental', tone: 'pink', sub: 'Blue Cross · Member portal' },
  { id: 'pk2', icon: 'piggy-bank', label: '401(k) match', tone: 'green', sub: 'Fidelity · 6% match' },
  { id: 'pk3', icon: 'graduation-cap', label: 'Learning budget', tone: 'purple', sub: '$1,500 / yr' },
  { id: 'pk4', icon: 'dumbbell', label: 'Wellness stipend', tone: 'blue', sub: '$600 / yr' },
  { id: 'pk5', icon: 'plane', label: 'PTO & holidays', tone: 'orange', sub: 'Unlimited + 11 days' },
  { id: 'pk6', icon: 'baby', label: 'Parental leave', tone: 'pink', sub: 'Up to 16 weeks' },
];

const ONBOARDING = {
  daysToStart: 6, startDate: 'Mon, Mar 31',
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

/* ============================================================
   Plugins — extensions devs build & publish.
   Installed ones render into named SLOTS on Today / You.
   The rest live in the Apps directory (More → Apps).
   ============================================================ */
const PLUGINS = [
  // ---- installed by default; render into slots ----
  {
    id: 'pl-shuttle', name: 'Shuttle Tracker', dev: 'Platform Tools', icon: 'bus', tone: 'blue',
    category: 'Workplace', slot: 'today', installed: true, installs: 1240, rating: 4.8,
    blurb: 'Live arrival times for the HQ shuttle, right on your home screen.',
    permissions: ['Location (approximate)', 'Notifications'],
    widget: { kind: 'next', value: '12', unit: 'min', label: 'Route B → Downtown', note: 'On time' },
  },
  {
    id: 'pl-lunch', name: 'Lunch Today', dev: 'Workplace', icon: 'utensils', tone: 'orange',
    category: 'Workplace', slot: 'today', installed: true, installs: 2980, rating: 4.6,
    blurb: 'Today’s café menu and dietary tags, updated every morning.',
    permissions: ['Notifications'],
    widget: { kind: 'list', label: 'Omaha HQ café · 11:30–2:00', items: ['Korean BBQ rice bowls', 'Roasted veg + farro', 'Build-your-own ramen'] },
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
  { id: 'pl-gym', name: 'Gym Class Booking', dev: 'Wellness Team', icon: 'dumbbell', tone: 'green', category: 'Wellness', slot: 'you', installed: false, installs: 1320, rating: 4.5, blurb: 'Book on-site fitness classes and see what’s next.', permissions: ['Calendar', 'Notifications'] },
  { id: 'pl-expense', name: 'Expense Quick-Snap', dev: 'Finance Guild', icon: 'receipt', tone: 'orange', category: 'Finance', slot: 'you', installed: false, installs: 2040, rating: 4.3, blurb: 'Photograph a receipt and auto-file the expense.', permissions: ['Camera', 'Read payroll summary'] },
  { id: 'pl-standup', name: 'Async Standup', dev: 'Eng Productivity', icon: 'list-checks', tone: 'purple', category: 'Productivity', slot: 'today', installed: false, installs: 760, rating: 4.6, blurb: 'Post and read team standups without a meeting.', permissions: ['Notifications'] },
  { id: 'pl-room', name: 'Book a Room', dev: 'Workplace', icon: 'door-open', tone: 'blue', category: 'Workplace', slot: 'today', installed: false, installs: 1990, rating: 4.5, blurb: 'Find and reserve meeting rooms on any floor.', permissions: ['Calendar'] },
  { id: 'pl-carbon', name: 'Commute Carbon', dev: 'Shyft Gives', icon: 'leaf', tone: 'green', category: 'Community', slot: 'you', installed: false, installs: 410, rating: 4.2, blurb: 'Track and offset the carbon from your commute.', permissions: ['Location (approximate)'] },
];

const PLUGIN_CATEGORIES = ['All', 'Workplace', 'Wellness', 'Finance', 'Productivity', 'Community'];

/* Plugins YOU authored — shown in the role-gated Developer console. */
const DEV_PLUGINS = [
  { id: 'dp1', name: 'Shuttle Tracker', icon: 'bus', tone: 'blue', status: 'Published', version: 'v2.3.1', installs: 1240, rating: 4.8, note: 'Live · last updated 6 days ago' },
  { id: 'dp2', name: 'Lunch Today', icon: 'utensils', tone: 'orange', status: 'In review', version: 'v1.0.0', installs: 0, rating: null, note: 'Submitted 2 days ago · est. 3–5 day review' },
  { id: 'dp3', name: 'Expense Quick-Snap', icon: 'receipt', tone: 'orange', status: 'Draft', version: 'v0.4.0', installs: 0, rating: null, note: 'Last edited yesterday' },
];

const DEV_STATUS_TONE = { Published: 'green', 'In review': 'orange', Draft: 'neutral', Rejected: 'pink' };

Object.assign(window, {
  ANNOUNCEMENTS, OFFICE_STATUS, WEATHER, OUT_TODAY, HOLIDAYS, EVENTS,
  KUDOS, CHANNELS, FORSALE, PERKS, ONBOARDING, STIPENDS, PTO, PEOPLE,
  PLUGINS, DEV_PLUGINS, PLUGIN_CATEGORIES, DEV_STATUS_TONE,
});
