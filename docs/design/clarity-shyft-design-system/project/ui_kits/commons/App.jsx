/* ============================================================
   Commons UI kit — app root (state + routing + overlays)
   ============================================================ */

function AllKudosSheet({ kudos, onClose, onCheer }) {
  return (
    <Sheet onClose={onClose} title="Recent kudos">
      {kudos.map(k => <KudosCard key={k.id} k={k} onCheer={onCheer} />)}
    </Sheet>
  );
}

function RequestTimeOffSheet({ pto, onClose }) {
  return (
    <Sheet onClose={onClose} title="Request time off">
      <div className="c-card pad" style={{ display: 'flex', flexDirection: 'column', gap: 10, padding: 14 }}>
        {[['calendar', 'Dates', 'Pick a start and end date'], ['tag', 'Type', 'Vacation · Sick · Personal'], ['message-square', 'Note', 'Optional — who to loop in']].map(([ic, k, v], i) => (
          <div key={i} className="c-row" style={{ gap: 11 }}>
            <Icon name={ic} size={16} color="var(--accent)" />
            <span style={{ font: '500 13px/1.2 var(--font-ui)', width: 56, flex: 'none' }}>{k}</span>
            <span className="c-meta">{v}</span>
          </div>
        ))}
      </div>
      <div className="c-row" style={{ gap: 8, color: 'var(--text-subtle)' }}>
        <Icon name="info" size={14} color="var(--text-subtle)" />
        <span className="c-meta">You have {pto.remaining} {pto.unit} remaining. Requests route to your manager.</span>
      </div>
      <Button variant="primary" block icon="send" onClick={onClose}>Submit request</Button>
    </Sheet>
  );
}

function CommonsApp() {
  const [tab, setTab] = useState('today');
  const [events, setEvents] = useState(window.EVENTS);
  const [kudos, setKudos] = useState(window.KUDOS);
  const [checklist, setChecklist] = useState(window.ONBOARDING.checklist);
  const [sheet, setSheet] = useState(null);
  const [onboarding, setOnboarding] = useState(false);
  const [stipend, setStipend] = useState(null);
  const [profile, setProfile] = useState(null);

  const onRSVP = (id) => setEvents(es => es.map(e => e.id === id
    ? { ...e, rsvp: e.rsvp === 'going' ? null : 'going', going: e.rsvp === 'going' ? e.going - 1 : e.going + 1 } : e));
  const onCheer = (id) => setKudos(ks => ks.map(k => k.id === id
    ? { ...k, cheered: !k.cheered, cheers: k.cheered ? k.cheers - 1 : k.cheers + 1 } : k));
  const onToggle = (id) => setChecklist(cl => cl.map(c => c.id === id ? { ...c, done: !c.done } : c));
  const onDeepLink = (link) => { if (link && link.tab) setTab(link.tab); };

  const HEADERS = {
    today:  { title: 'Good morning, Alex', subtitle: 'Tuesday · March 25', mark: true, search: false },
    events: { title: 'Events', search: false },
    you:    { title: 'You', subtitle: 'Alex Rivera · Platform', search: false },
    people: { title: 'People', search: true },
    more:   { title: 'More', search: false },
  };
  const h = HEADERS[tab];

  let screen;
  if (tab === 'today') screen = <TodayScreen
    announcements={window.ANNOUNCEMENTS} events={events} kudos={kudos}
    status={window.OFFICE_STATUS} weather={window.WEATHER} out={window.OUT_TODAY}
    onOpenAnnouncement={a => setSheet({ type: 'ann', data: a })} onDeepLink={onDeepLink}
    onRSVP={onRSVP} onCheer={onCheer} onSeeAllKudos={() => setSheet({ type: 'allKudos' })} goTab={setTab} />;
  else if (tab === 'events') screen = <EventsScreen events={events} onRSVP={onRSVP} onOpen={e => setSheet({ type: 'event', id: e.id })} />;
  else if (tab === 'you') screen = <YouScreen
    stipends={window.STIPENDS} pto={window.PTO} perks={window.PERKS} events={events}
    onOpenStipend={s => setStipend(s)} onRequestPto={() => setSheet({ type: 'pto' })}
    onOpenPerk={() => {}} onOpenEvent={e => setSheet({ type: 'event', id: e.id })} goTab={setTab} />;
  else if (tab === 'people') screen = <PeopleScreen
    people={window.PEOPLE} out={window.OUT_TODAY} holidays={window.HOLIDAYS}
    onOpenProfile={p => setProfile(p)} />;
  else if (tab === 'more') screen = <MoreScreen
    onboarding={window.ONBOARDING} channels={window.CHANNELS} forsale={window.FORSALE}
    onOpenOnboarding={() => setOnboarding(true)} />;

  const sheetEvent = sheet && sheet.type === 'event' ? events.find(e => e.id === sheet.id) : null;

  return (
    <div className="commons">
      <AppHeader title={h.title} subtitle={h.subtitle} mark={h.mark}
        onBell={() => setSheet({ type: 'notif' })}
        onSearch={h.search ? () => {} : null} />
      {screen}
      <TabBar active={tab} onChange={setTab} />

      {onboarding && <OnboardingScreen onboarding={window.ONBOARDING} checklist={checklist} onToggle={onToggle} onClose={() => setOnboarding(false)} />}
      {stipend && <StipendDetailScreen s={stipend} onClose={() => setStipend(null)} />}
      {profile && <ProfileScreen p={profile} onClose={() => setProfile(null)} />}

      {sheet && sheet.type === 'ann' && <AnnouncementSheet a={sheet.data} onClose={() => setSheet(null)} />}
      {sheetEvent && <EventSheet e={sheetEvent} onRSVP={onRSVP} onClose={() => setSheet(null)} />}
      {sheet && sheet.type === 'notif' && <NotificationsSheet onClose={() => setSheet(null)} />}
      {sheet && sheet.type === 'allKudos' && <AllKudosSheet kudos={kudos} onCheer={onCheer} onClose={() => setSheet(null)} />}
      {sheet && sheet.type === 'pto' && <RequestTimeOffSheet pto={window.PTO} onClose={() => setSheet(null)} />}
    </div>
  );
}

Object.assign(window, { CommonsApp, AllKudosSheet, RequestTimeOffSheet });
