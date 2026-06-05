/* ============================================================
   Commons UI kit — shared content cards
   WeatherCard, AnnouncementCard, EventCard, KudosCard,
   PhotoTile, RoleCard, ChannelRow, OutRow, PerkTile.
   ============================================================ */

/* ---------- Weather ---------- */
function WeatherCard({ w }) {
  return (
    <div className="c-card pad" style={{ padding: 16 }}>
      <div className="c-row" style={{ justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <div className="c-meta" style={{ color: 'var(--text-muted)', fontWeight: 500 }}>{w.city}</div>
          <div className="c-row" style={{ gap: 8, marginTop: 6 }}>
            <Icon name={w.icon} size={30} color="var(--accent)" />
            <span style={{ font: '600 34px/1 var(--font-display)', letterSpacing: '-.02em' }}>{w.tempF}°</span>
          </div>
          <div className="c-meta" style={{ marginTop: 6 }}>{w.cond} · H {w.hi}° L {w.lo}°</div>
        </div>
        <div style={{ display: 'flex', gap: 14 }}>
          {w.hours.slice(0, 4).map((h, i) => (
            <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
              <span className="c-meta" style={{ fontSize: 11 }}>{h.t}</span>
              <Icon name={h.icon} size={18} color="var(--text-muted)" />
              <span className="c-num" style={{ fontSize: 12, color: 'var(--text)' }}>{h.f}°</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ---------- Announcement ---------- */
function AnnouncementCard({ a, onOpen, onDeepLink, full = false }) {
  return (
    <div className={'c-card pad' + (onOpen ? ' tap' : '')} onClick={onOpen}>
      <div className="c-row" style={{ gap: 8, marginBottom: 10 }}>
        {a.pinned && <Icon name="pin" size={13} color="var(--text-subtle)" />}
        <Pill tone={a.catTone} dot={false} style={{ background: 'var(--bg-subtle)', color: 'var(--text-muted)' }}>{a.cat}</Pill>
        <span className="c-meta" style={{ marginLeft: 'auto' }}>{a.time}</span>
      </div>
      <div style={{ font: '600 16px/1.3 var(--font-display)', letterSpacing: '-.01em', marginBottom: 6 }}>{a.title}</div>
      <div className="c-body-14" style={{
        color: 'var(--text-muted)',
        display: full ? 'block' : '-webkit-box', WebkitLineClamp: full ? 'none' : 2,
        WebkitBoxOrient: 'vertical', overflow: 'hidden',
      }}>{a.body}</div>
      <div className="c-row" style={{ marginTop: 14, gap: 9 }}>
        <Avatar name={a.author} size={26} />
        <span style={{ font: '500 12.5px/1 var(--font-ui)' }}>{a.author}</span>
        <span className="c-meta">· {a.role}</span>
        <div className="c-row" style={{ gap: 14, marginLeft: 'auto' }}>
          <span className="c-row" style={{ gap: 5 }}><Icon name="heart" size={15} color="var(--text-subtle)" /><span className="c-meta c-num">{a.reactions}</span></span>
          <span className="c-row" style={{ gap: 5 }}><Icon name="message-circle" size={15} color="var(--text-subtle)" /><span className="c-meta c-num">{a.comments}</span></span>
        </div>
      </div>
      {a.link && (
        <div className="c-row" style={{ gap: 8, marginTop: 13, padding: '11px 13px', borderRadius: 'var(--r-md)', background: 'var(--accent-soft)' }}
          onClick={(e) => { e.stopPropagation(); onDeepLink && onDeepLink(a.link); }}>
          <Icon name={a.link.icon || 'arrow-right'} size={16} color="var(--accent)" />
          <span style={{ font: '600 12.5px/1 var(--font-ui)', color: 'var(--accent)' }}>{a.link.label}</span>
          <Icon name="chevron-right" size={16} color="var(--accent)" style={{ marginLeft: 'auto' }} />
        </div>
      )}
    </div>
  );
}

/* ---------- Event ---------- */
function EventCard({ e, onRSVP, onOpen }) {
  const pct = Math.round((e.going / e.capacity) * 100);
  const meta = [['calendar', e.date], ['clock', e.time], ['map-pin', e.where]];
  return (
    <div className="c-card pad">
      <div className="c-row" style={{ gap: 12, alignItems: 'flex-start' }} onClick={onOpen}>
        <IconTile icon={e.icon} bg={'var(--' + e.catTone + '-300)'} fg={'var(--' + e.catTone + '-700)'} size={46} />
        <div style={{ flex: 1, minWidth: 0 }}>
          <Pill tone={e.catTone} dot={false} style={{ background: 'var(--bg-subtle)', color: 'var(--text-muted)', marginBottom: 7 }}>{e.cat}</Pill>
          <div style={{ font: '600 15.5px/1.3 var(--font-display)', letterSpacing: '-.01em' }}>{e.title}</div>
        </div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6, margin: '12px 0 12px' }}>
        {meta.map(([ic, tx], i) => (
          <div key={i} className="c-row" style={{ gap: 8 }}>
            <Icon name={ic} size={15} color="var(--text-subtle)" />
            <span className="c-meta" style={{ color: 'var(--text-muted)' }}>{tx}</span>
          </div>
        ))}
      </div>
      <div className="c-row" style={{ gap: 12 }}>
        <div style={{ flex: 1 }}>
          <div className="c-row" style={{ gap: 6, marginBottom: 6 }}>
            <span className="c-num" style={{ font: '500 12.5px var(--font-mono)', color: 'var(--text)' }}>{e.going}</span>
            <span className="c-meta">going · {e.capacity - e.going} spots left</span>
          </div>
          <div style={{ height: 5, background: 'var(--bg-sunken)', borderRadius: 99, overflow: 'hidden' }}>
            <div style={{ height: '100%', width: pct + '%', background: 'var(--accent)', borderRadius: 99 }} />
          </div>
        </div>
        <Button variant={e.rsvp === 'going' ? 'secondary' : 'primary'} size="sm"
          icon={e.rsvp === 'going' ? 'check' : undefined}
          onClick={() => onRSVP(e.id)}>
          {e.rsvp === 'going' ? 'Going' : 'RSVP'}
        </Button>
      </div>
    </div>
  );
}

/* ---------- Kudos ---------- */
const VALUE_TONE = { 'Customer obsession': 'blue', 'Ownership': 'green', 'Craft': 'purple', 'Team': 'orange' };
function KudosCard({ k, onCheer }) {
  return (
    <div className="c-card pad">
      <div className="c-row" style={{ gap: 9 }}>
        <Avatar name={k.from} size={34} />
        <div style={{ lineHeight: 1.3 }}>
          <span style={{ font: '600 13.5px/1.2 var(--font-ui)' }}>{k.from}</span>
          <span className="c-meta"> gave kudos to </span>
          <span style={{ font: '600 13.5px/1.2 var(--font-ui)' }}>{k.to}</span>
        </div>
      </div>
      <div style={{ margin: '10px 0 0' }}>
        <Pill tone={VALUE_TONE[k.value] || 'blue'} dot={true}>{k.value}</Pill>
      </div>
      <div className="c-body-14" style={{ color: 'var(--text)', marginTop: 10 }}>{k.text}</div>
      <div className="c-row" style={{ marginTop: 12, justifyContent: 'space-between' }}>
        <span className="c-meta">{k.time}</span>
        <button onClick={() => onCheer(k.id)} className="c-row" style={{
          gap: 6, border: '1px solid ' + (k.cheered ? 'var(--accent)' : 'var(--border-strong)'),
          background: k.cheered ? 'var(--accent-soft)' : 'var(--bg-elev)', borderRadius: 'var(--r-full)',
          padding: '6px 12px', cursor: 'pointer', color: k.cheered ? 'var(--accent)' : 'var(--text-muted)',
        }}>
          <Icon name="party-popper" size={15} />
          <span className="c-num" style={{ font: '600 12.5px var(--font-mono)' }}>{k.cheers}</span>
        </button>
      </div>
    </div>
  );
}

/* ---------- Out / who's-out row ---------- */
function OutRow({ o, last }) {
  return (
    <div className="c-row" style={{ gap: 11, padding: '11px 0', borderBottom: last ? 'none' : '1px solid var(--border)' }}>
      <Avatar name={o.name} size={36} />
      <div style={{ flex: 1 }}>
        <div style={{ font: '500 13.5px/1.2 var(--font-ui)' }}>{o.name}</div>
        {o.note && <div className="c-meta" style={{ marginTop: 2 }}>{o.note}</div>}
      </div>
      <Pill tone={o.tone} dot={true}>{o.kind}</Pill>
    </div>
  );
}

/* ---------- Channel row (Slack directory deep-link) ---------- */
function ChannelRow({ c }) {
  return (
    <div className="c-row" style={{ gap: 12, padding: '12px 0', borderBottom: '1px solid var(--border)' }}>
      <IconTile icon={c.icon} bg={'var(--' + c.tone + '-300)'} fg={'var(--' + c.tone + '-700)'} size={40} />
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ font: '600 13.5px/1.2 var(--font-ui)' }}>#{c.name}</div>
        <div className="c-meta" style={{ marginTop: 2, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{c.sub} · {c.members} members</div>
      </div>
      <Button variant="secondary" size="sm" icon="external-link" onClick={() => {}}>Open in Slack</Button>
    </div>
  );
}

/* ---------- Perk tile (tappable → provider portal) ---------- */
function PerkTile({ p, onOpen }) {
  return (
    <div className="c-card tap" onClick={onOpen} style={{ padding: 14, display: 'flex', flexDirection: 'column', gap: 10 }}>
      <div className="c-row" style={{ justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <IconTile icon={p.icon} bg={'var(--' + p.tone + '-300)'} fg={'var(--' + p.tone + '-700)'} size={38} />
        <Icon name="chevron-right" size={17} color="var(--text-subtle)" />
      </div>
      <div>
        <div style={{ font: '600 13px/1.25 var(--font-ui)' }}>{p.label}</div>
        <div className="c-meta" style={{ marginTop: 3 }}>{p.sub}</div>
      </div>
    </div>
  );
}

Object.assign(window, {
  WeatherCard, AnnouncementCard, EventCard, KudosCard, OutRow, ChannelRow, PerkTile, VALUE_TONE,
});
