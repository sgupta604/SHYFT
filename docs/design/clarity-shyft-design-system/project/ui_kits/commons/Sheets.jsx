/* ============================================================
   Commons UI kit — bottom sheets / overlays
   ============================================================ */

function Sheet({ children, onClose, title }) {
  return (
    <div className="c-sheet-scrim" onClick={onClose}>
      <div className="c-sheet" onClick={e => e.stopPropagation()}>
        <div className="c-sheet-grab" />
        {title && (
          <div className="c-row" style={{ justifyContent: 'space-between', padding: '6px 16px 12px', borderBottom: '1px solid var(--border)' }}>
            <span style={{ font: '600 16px/1 var(--font-display)' }}>{title}</span>
            <button className="c-iconbtn" style={{ width: 32, height: 32 }} onClick={onClose} aria-label="Close"><Icon name="x" size={17} /></button>
          </div>
        )}
        <div style={{ overflowY: 'auto', padding: 16, display: 'flex', flexDirection: 'column', gap: 14 }}>
          {children}
        </div>
      </div>
    </div>
  );
}

function AnnouncementSheet({ a, onClose }) {
  return (
    <Sheet onClose={onClose} title={a.cat}>
      <div style={{ font: '600 21px/1.25 var(--font-display)', letterSpacing: '-.01em' }}>{a.title}</div>
      <div className="c-row" style={{ gap: 9 }}>
        <Avatar name={a.author} size={32} />
        <div>
          <div style={{ font: '500 13px/1.2 var(--font-ui)' }}>{a.author}</div>
          <div className="c-meta">{a.role} · {a.time}</div>
        </div>
      </div>
      <div className="c-body-14" style={{ color: 'var(--text-muted)', lineHeight: 1.6 }}>{a.body}</div>
      <div className="c-row" style={{ gap: 10, paddingTop: 6, borderTop: '1px solid var(--border)' }}>
        <button className="c-row" style={{ gap: 7, border: '1px solid var(--border-strong)', background: 'var(--bg-elev)', borderRadius: 'var(--r-full)', padding: '8px 14px', cursor: 'pointer' }}>
          <Icon name="heart" size={16} color="var(--text-muted)" /><span className="c-meta c-num" style={{ color: 'var(--text)' }}>{a.reactions}</span>
        </button>
        <button className="c-row" style={{ gap: 7, border: '1px solid var(--border-strong)', background: 'var(--bg-elev)', borderRadius: 'var(--r-full)', padding: '8px 14px', cursor: 'pointer' }}>
          <Icon name="message-circle" size={16} color="var(--text-muted)" /><span className="c-meta c-num" style={{ color: 'var(--text)' }}>{a.comments}</span>
        </button>
        <div style={{ flex: 1 }} />
        <button className="c-iconbtn" aria-label="Share"><Icon name="share-2" size={17} /></button>
      </div>
    </Sheet>
  );
}

const ATTENDEES = ['Maya Patel', 'Jordan Chen', 'Sam Okafor', 'Dana Whitfield', 'Marcus Bell', 'Riley Park'];
function EventSheet({ e, onRSVP, onClose }) {
  const pct = Math.round((e.going / e.capacity) * 100);
  return (
    <Sheet onClose={onClose} title={e.cat}>
      <div className="c-row" style={{ gap: 13 }}>
        <IconTile icon={e.icon} bg={'var(--' + e.catTone + '-300)'} fg={'var(--' + e.catTone + '-700)'} size={50} />
        <div style={{ font: '600 19px/1.25 var(--font-display)', letterSpacing: '-.01em', flex: 1 }}>{e.title}</div>
      </div>
      <div className="c-card pad" style={{ display: 'flex', flexDirection: 'column', gap: 10, padding: 14 }}>
        {[['calendar', e.date], ['clock', e.time], ['map-pin', e.where], ['user', 'Hosted by ' + e.host]].map(([ic, tx], i) => (
          <div key={i} className="c-row" style={{ gap: 10 }}>
            <Icon name={ic} size={16} color="var(--accent)" />
            <span style={{ font: '400 13.5px/1.3 var(--font-ui)', color: 'var(--text)' }}>{tx}</span>
          </div>
        ))}
      </div>
      <div className="c-body-14" style={{ color: 'var(--text-muted)' }}>{e.desc}</div>
      <div>
        <div className="c-row" style={{ justifyContent: 'space-between', marginBottom: 8 }}>
          <span className="c-row" style={{ gap: 6 }}><span className="c-num" style={{ font: '600 13px var(--font-mono)' }}>{e.going}</span><span className="c-meta">going</span></span>
          <span className="c-meta">{e.capacity - e.going} of {e.capacity} spots left</span>
        </div>
        <div style={{ display: 'flex', marginBottom: 6 }}>
          {ATTENDEES.map((n, i) => (
            <div key={n} style={{ marginLeft: i === 0 ? 0 : -8 }}><Avatar name={n} size={30} ring="var(--bg)" /></div>
          ))}
          <div style={{ marginLeft: -8, width: 30, height: 30, borderRadius: '50%', background: 'var(--bg-subtle)', border: '2px solid var(--bg)', display: 'flex', alignItems: 'center', justifyContent: 'center', font: '600 10px var(--font-mono)', color: 'var(--text-muted)' }}>+{e.going - ATTENDEES.length}</div>
        </div>
      </div>
      <div className="c-row" style={{ gap: 10 }}>
        <Button variant={e.rsvp === 'going' ? 'secondary' : 'primary'} block icon={e.rsvp === 'going' ? 'check' : 'calendar-plus'} onClick={() => onRSVP(e.id)}>
          {e.rsvp === 'going' ? "You're going" : 'RSVP — count me in'}
        </Button>
        <button className="c-iconbtn" aria-label="Share"><Icon name="share-2" size={18} /></button>
      </div>
    </Sheet>
  );
}

function NotificationsSheet({ onClose }) {
  const items = [
    { icon: 'party-popper', tone: 'green', t: 'Priya gave you kudos', s: 'Customer obsession · 1h ago' },
    { icon: 'calendar-check', tone: 'blue', t: 'Rooftop happy hour is Friday', s: "You RSVP'd going · 2h ago" },
    { icon: 'megaphone', tone: 'orange', t: 'New announcement from IT', s: 'VPN maintenance Thu 8–10pm · 2h ago' },
    { icon: 'gift', tone: 'purple', t: 'Referral update: interview scheduled', s: 'Your referral for Payments · Yesterday' },
  ];
  return (
    <Sheet onClose={onClose} title="Notifications">
      {items.map((n, i) => (
        <div key={i} className="c-row" style={{ gap: 12, alignItems: 'flex-start' }}>
          <IconTile icon={n.icon} bg={'var(--' + n.tone + '-300)'} fg={'var(--' + n.tone + '-700)'} size={38} />
          <div style={{ flex: 1 }}>
            <div style={{ font: '500 13.5px/1.3 var(--font-ui)' }}>{n.t}</div>
            <div className="c-meta" style={{ marginTop: 2 }}>{n.s}</div>
          </div>
        </div>
      ))}
    </Sheet>
  );
}

Object.assign(window, { Sheet, AnnouncementSheet, EventSheet, NotificationsSheet });
