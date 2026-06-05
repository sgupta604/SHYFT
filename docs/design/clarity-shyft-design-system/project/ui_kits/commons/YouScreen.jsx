/* ============================================================
   Commons UI kit — You (stipends · PTO · perks · my events)
   The new home for everything tied to the individual.
   ============================================================ */

/* ---------- Stipend budget card (flagship) ---------- */
function StipendCard({ s, onOpen }) {
  const remaining = s.total - s.used;
  const pct = Math.min(100, Math.round((s.used / s.total) * 100));
  const low = remaining <= s.total * 0.2;
  return (
    <div className="c-card tap pad" onClick={onOpen} style={{ padding: 16 }}>
      <div className="c-row" style={{ gap: 12, alignItems: 'center' }}>
        <IconTile icon={s.icon} bg={'var(--' + s.tone + '-300)'} fg={'var(--' + s.tone + '-700)'} size={42} />
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ font: '600 15px/1.2 var(--font-display)', letterSpacing: '-.01em' }}>{s.label}</div>
          <div className="c-meta" style={{ marginTop: 2 }}>
            <span className="c-num">${s.total.toLocaleString()}</span> / {s.period}
          </div>
        </div>
        <Icon name="chevron-right" size={19} color="var(--text-subtle)" />
      </div>

      <div className="c-row" style={{ justifyContent: 'space-between', alignItems: 'baseline', margin: '15px 0 7px' }}>
        <div className="c-row" style={{ gap: 5, alignItems: 'baseline' }}>
          <span className="c-num" style={{ font: '600 19px/1 var(--font-display)', color: 'var(--text)' }}>${remaining.toLocaleString()}</span>
          <span className="c-meta">left</span>
        </div>
        <span className="c-meta c-num">${s.used.toLocaleString()} used</span>
      </div>

      <div style={{ height: 7, background: 'var(--bg-sunken)', borderRadius: 99, overflow: 'hidden' }}>
        <div style={{ height: '100%', width: pct + '%', background: 'var(--' + s.tone + '-700)', borderRadius: 99 }} />
      </div>

      <div className="c-row" style={{ gap: 6, marginTop: 10 }}>
        <Icon name="rotate-ccw" size={13} color={low ? 'var(--orange-700)' : 'var(--text-subtle)'} />
        <span className="c-meta" style={{ color: low ? 'var(--orange-700)' : 'var(--text-subtle)' }}>
          Resets in {s.resetsInDays} days{low ? ' · use it or lose it' : ''}
        </span>
      </div>
    </div>
  );
}

/* ---------- PTO snapshot ---------- */
function PtoSnapshot({ pto, onRequest }) {
  return (
    <div className="c-card pad" style={{ padding: 16 }}>
      <div className="c-row" style={{ gap: 14, alignItems: 'center' }}>
        <div style={{ flex: 1 }}>
          <div className="c-row" style={{ gap: 6, alignItems: 'baseline' }}>
            <span className="c-num" style={{ font: '600 30px/1 var(--font-display)', letterSpacing: '-.02em' }}>{pto.remaining}</span>
            <span className="c-meta">{pto.unit} remaining</span>
          </div>
          <div className="c-meta" style={{ marginTop: 4 }}>{pto.accrued} accrued this year · {pto.pendingRequests} pending</div>
        </div>
        <Button variant="primary" size="sm" icon="plane" onClick={onRequest}>Request time off</Button>
      </div>
      <div className="c-row" style={{ gap: 10, marginTop: 14, paddingTop: 14, borderTop: '1px solid var(--border)' }}>
        <Icon name="calendar-heart" size={17} color="var(--accent)" />
        <span className="c-meta" style={{ color: 'var(--text-muted)' }}>Next company holiday</span>
        <div style={{ marginLeft: 'auto', textAlign: 'right' }}>
          <div style={{ font: '500 13px/1.2 var(--font-ui)' }}>{pto.nextHoliday.name}</div>
          <div className="c-meta" style={{ marginTop: 1 }}>{pto.nextHoliday.date}</div>
        </div>
      </div>
    </div>
  );
}

/* ---------- My events row (RSVP'd) ---------- */
function MyEventRow({ e, onOpen, last }) {
  const [mm, dd] = e.date.replace(',', '').split(' ').slice(1);
  return (
    <button onClick={onOpen} className="c-row" style={{
      gap: 12, padding: '12px 0', width: '100%', textAlign: 'left',
      background: 'transparent', border: 'none', cursor: 'pointer',
      borderBottom: last ? 'none' : '1px solid var(--border)',
    }}>
      <div style={{ textAlign: 'center', width: 40, flex: 'none' }}>
        <div style={{ font: '600 15px/1 var(--font-display)', color: 'var(--accent)' }}>{dd}</div>
        <div className="c-meta" style={{ fontSize: 10.5, textTransform: 'uppercase', letterSpacing: '.04em' }}>{mm}</div>
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ font: '500 13.5px/1.25 var(--font-ui)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{e.title}</div>
        <div className="c-meta" style={{ marginTop: 2 }}>{e.time} · {e.where}</div>
      </div>
      <Pill tone="green" dot={true}>Going</Pill>
    </button>
  );
}

function YouScreen({ stipends, pto, perks, events, onOpenStipend, onRequestPto, onOpenPerk, onOpenEvent, pluginSlot, goTab }) {
  const mine = events.filter(e => e.rsvp === 'going');
  return (
    <div className="c-scroll">
      <SectionHeader title="Stipend tracker" action="History" onAction={() => onOpenStipend(stipends[0])} />
      {stipends.map(s => <StipendCard key={s.id} s={s} onOpen={() => onOpenStipend(s)} />)}

      <SectionHeader title="Time off" action="Calendar" onAction={() => goTab('people')} />
      <PtoSnapshot pto={pto} onRequest={onRequestPto} />

      <SectionHeader title="Perks & benefits" />
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
        {perks.map(p => <PerkTile key={p.id} p={p} onOpen={() => onOpenPerk(p)} />)}
      </div>

      {pluginSlot}

      <SectionHeader title="My events" action="All events" onAction={() => goTab('events')} />
      {mine.length === 0 ? (
        <div className="c-card pad" style={{ display: 'flex', alignItems: 'center', gap: 11 }}>
          <Icon name="calendar-plus" size={18} color="var(--text-subtle)" />
          <span className="c-meta">No RSVPs yet — find something on the Events tab.</span>
        </div>
      ) : (
        <div className="c-card pad" style={{ paddingTop: 2, paddingBottom: 2 }}>
          {mine.map((e, i) => <MyEventRow key={e.id} e={e} onOpen={() => onOpenEvent(e)} last={i === mine.length - 1} />)}
        </div>
      )}
    </div>
  );
}

Object.assign(window, { YouScreen, StipendCard, PtoSnapshot, MyEventRow });
