/* ============================================================
   Commons UI kit — People (directory · who's out · holidays)
   Tap a teammate → profile with "Kudos received".
   ============================================================ */

function PeopleScreen({ people, out, holidays, onOpenProfile }) {
  const [tab, setTab] = useState('Directory');
  return (
    <div className="c-scroll">
      <div style={{
        display: 'flex', alignItems: 'center', gap: 9, height: 40, padding: '0 12px',
        border: '1px solid var(--border-strong)', borderRadius: 'var(--r-md)', background: 'var(--bg-elev)',
      }}>
        <Icon name="search" size={17} color="var(--text-subtle)" />
        <span className="c-meta">Search people, teams…</span>
      </div>

      <Segmented options={['Directory', 'Out', 'Holidays']} value={tab} onChange={setTab} />

      {tab === 'Directory' && (
        <React.Fragment>
          <SectionHeader title={people.length + ' teammates'} />
          <div className="c-card pad" style={{ paddingTop: 2, paddingBottom: 2 }}>
            {people.map((p, i) => (
              <button key={p.id} onClick={() => onOpenProfile(p)} className="c-row" style={{
                gap: 12, padding: '11px 0', width: '100%', textAlign: 'left',
                background: 'transparent', border: 'none', cursor: 'pointer',
                borderBottom: i === people.length - 1 ? 'none' : '1px solid var(--border)',
              }}>
                <Avatar name={p.name} size={40} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ font: '600 13.5px/1.2 var(--font-ui)' }}>{p.name}</div>
                  <div className="c-meta" style={{ marginTop: 2 }}>{p.role} · {p.team}</div>
                </div>
                {p.kudos.length > 0 && (
                  <span className="c-row" style={{ gap: 5, color: 'var(--text-subtle)' }}>
                    <Icon name="party-popper" size={14} color="var(--text-subtle)" />
                    <span className="c-num" style={{ font: '600 12px var(--font-mono)' }}>{p.kudos.length}</span>
                  </span>
                )}
                <Icon name="chevron-right" size={17} color="var(--text-subtle)" />
              </button>
            ))}
          </div>
        </React.Fragment>
      )}

      {tab === 'Out' && (
        <React.Fragment>
          <SectionHeader title="Out today" />
          <div className="c-card pad" style={{ paddingTop: 4, paddingBottom: 4 }}>
            {out.map((o, i) => <OutRow key={o.name} o={o} last={i === out.length - 1} />)}
          </div>
          <div className="c-row" style={{ gap: 8, marginTop: 4, color: 'var(--text-subtle)' }}>
            <Icon name="info" size={14} color="var(--text-subtle)" />
            <span className="c-meta">Request time off in Workday — it syncs here automatically.</span>
          </div>
        </React.Fragment>
      )}

      {tab === 'Holidays' && (
        <React.Fragment>
          <SectionHeader title="Company holidays" />
          <div className="c-card" style={{ overflow: 'hidden' }}>
            {holidays.map((h, i) => (
              <div key={h.name} className="c-row" style={{ gap: 14, padding: '14px 16px', borderBottom: i === holidays.length - 1 ? 'none' : '1px solid var(--border)' }}>
                <div style={{ textAlign: 'center', width: 42, flex: 'none' }}>
                  <div style={{ font: '600 15px/1 var(--font-display)', color: 'var(--accent)' }}>{h.date.split(' ')[1]}</div>
                  <div className="c-meta" style={{ fontSize: 10.5, textTransform: 'uppercase', letterSpacing: '.04em' }}>{h.date.split(' ')[0]}</div>
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ font: '500 14px/1.2 var(--font-ui)' }}>{h.name}</div>
                  <div className="c-meta" style={{ marginTop: 2 }}>{h.day}</div>
                </div>
                {h.closed && <Pill tone="neutral" dot={false}>Office closed</Pill>}
              </div>
            ))}
          </div>
        </React.Fragment>
      )}
    </div>
  );
}

/* ---------- Profile (full-screen overlay) with Kudos received ---------- */
function ProfileScreen({ p, onClose }) {
  return (
    <div className="commons" style={{ position: 'absolute', inset: 0, zIndex: 70, background: 'var(--bg)' }}>
      <div className="c-header" style={{ paddingTop: 56 }}>
        <div className="c-row" style={{ gap: 10 }}>
          <button className="c-iconbtn" onClick={onClose} aria-label="Back"><Icon name="chevron-left" size={20} /></button>
          <div className="c-h-title">Profile</div>
        </div>
      </div>

      <div className="c-scroll">
        {/* identity card */}
        <div className="c-card pad" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', padding: '24px 20px' }}>
          <Avatar name={p.name} size={72} />
          <div style={{ font: '600 19px/1.2 var(--font-display)', letterSpacing: '-.01em', marginTop: 12 }}>{p.name}</div>
          <div className="c-meta" style={{ marginTop: 4 }}>{p.role} · {p.team}</div>
          <div className="c-row" style={{ gap: 6, marginTop: 6 }}>
            <Icon name="map-pin" size={13} color="var(--text-subtle)" />
            <span className="c-meta">{p.loc}</span>
          </div>
          <div className="c-row" style={{ gap: 10, marginTop: 16 }}>
            <Button variant="primary" size="sm" icon="message-circle" onClick={() => {}}>Message</Button>
            <Button variant="secondary" size="sm" icon="party-popper" onClick={() => {}}>Give kudos</Button>
          </div>
        </div>

        {/* kudos received */}
        <div className="c-row" style={{ justifyContent: 'space-between' }}>
          <SectionHeader title="Kudos received" />
          <span className="c-meta c-num">{p.kudos.length}</span>
        </div>
        {p.kudos.length === 0 ? (
          <div className="c-card pad" style={{ textAlign: 'center', padding: '28px 24px' }}>
            <Icon name="party-popper" size={24} color="var(--charcoal-300)" />
            <div className="c-meta" style={{ marginTop: 8 }}>No kudos yet — be the first to recognize {p.name.split(' ')[0]}.</div>
          </div>
        ) : (
          p.kudos.map((k, i) => (
            <div key={i} className="c-card pad">
              <div className="c-row" style={{ gap: 9, justifyContent: 'space-between' }}>
                <Pill tone={VALUE_TONE[k.value] || 'blue'} dot={true}>{k.value}</Pill>
                <span className="c-meta">{k.time}</span>
              </div>
              <div className="c-body-14" style={{ color: 'var(--text)', marginTop: 10 }}>{k.text}</div>
              <div className="c-row" style={{ gap: 8, marginTop: 11 }}>
                <Avatar name={k.from} size={24} />
                <span className="c-meta">from <span style={{ color: 'var(--text-muted)', fontWeight: 500 }}>{k.from}</span></span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

Object.assign(window, { PeopleScreen, ProfileScreen });
