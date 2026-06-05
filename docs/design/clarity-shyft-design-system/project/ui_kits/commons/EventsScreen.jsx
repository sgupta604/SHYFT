/* ============================================================
   Commons UI kit — Events (RSVP)
   ============================================================ */

function EventsScreen({ events, onRSVP, onOpen }) {
  const [filter, setFilter] = useState('Upcoming');
  const shown = filter === 'Going' ? events.filter(e => e.rsvp === 'going') : events;
  return (
    <div className="c-scroll">
      <Segmented options={['Upcoming', 'Going', 'Past']} value={filter} onChange={setFilter} />
      {shown.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '48px 24px', color: 'var(--text-subtle)' }}>
          <Icon name="calendar-x" size={30} color="var(--charcoal-300)" />
          <div style={{ font: '600 15px/1.3 var(--font-display)', color: 'var(--text)', marginTop: 12 }}>Nothing on your calendar</div>
          <div className="c-meta" style={{ marginTop: 4 }}>RSVP to an event and it'll show up here.</div>
        </div>
      ) : shown.map(e => (
        <EventCard key={e.id} e={e} onRSVP={onRSVP} onOpen={() => onOpen(e)} />
      ))}
    </div>
  );
}

Object.assign(window, { EventsScreen });
