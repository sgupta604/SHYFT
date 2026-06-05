/* ============================================================
   Commons UI kit — More
   Your first day · Slack channels · For Sale · swag · settings · help
   ============================================================ */

/* ---------- Simple deep-link / settings row ---------- */
function MoreLinkRow({ icon, tone, title, sub, trailing, onClick, last }) {
  return (
    <button onClick={onClick} className="c-row" style={{
      gap: 13, padding: '13px 0', width: '100%', textAlign: 'left',
      background: 'transparent', border: 'none', cursor: 'pointer',
      borderBottom: last ? 'none' : '1px solid var(--border)',
    }}>
      <IconTile icon={icon} bg={'var(--' + tone + '-300)'} fg={'var(--' + tone + '-700)'} size={38} />
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ font: '600 13.5px/1.2 var(--font-ui)' }}>{title}</div>
        {sub && <div className="c-meta" style={{ marginTop: 2 }}>{sub}</div>}
      </div>
      {trailing || <Icon name="chevron-right" size={18} color="var(--text-subtle)" />}
    </button>
  );
}

function MoreScreen({ onboarding, channels, forsale, onOpenOnboarding }) {
  return (
    <div className="c-scroll">
      {/* Preboarding entry — kept here by request */}
      <div className="c-card tap" onClick={onOpenOnboarding} style={{ padding: 0, overflow: 'hidden' }}>
        <div style={{ background: 'var(--charcoal-900)', padding: '16px 18px', display: 'flex', alignItems: 'center', gap: 14 }}>
          <div className="c-tile" style={{ width: 44, height: 44, background: 'rgba(50,154,240,.18)' }}>
            <Icon name="rocket" size={22} color="var(--blue-300)" />
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ font: '600 15px/1.2 var(--font-display)', color: '#fff' }}>Your first day</div>
            <div style={{ font: '400 12.5px/1.3 var(--font-ui)', color: 'var(--charcoal-400)', marginTop: 2 }}>{onboarding.startDate} · {onboarding.daysToStart} days to go</div>
          </div>
          <Icon name="chevron-right" size={20} color="var(--charcoal-500)" />
        </div>
        <div className="c-row" style={{ padding: '11px 18px', gap: 8 }}>
          <Icon name="circle-check" size={15} color="var(--success)" />
          <span className="c-meta">2 of {onboarding.checklist.length} onboarding steps done</span>
        </div>
      </div>

      {/* Slack channels — discovery directory */}
      <SectionHeader title="Slack channels" action="Browse all" />
      <div className="c-card pad" style={{ paddingTop: 2, paddingBottom: 14 }}>
        <div className="c-meta" style={{ padding: '12px 0 10px', borderBottom: '1px solid var(--border)' }}>
          Find your people — chats happen in Slack.
        </div>
        {channels.map(c => <ChannelRow key={c.id} c={c} />)}
      </div>

      {/* For sale */}
      <SectionHeader title="For sale" action="Post item" />
      <div className="c-card pad" style={{ paddingTop: 2, paddingBottom: 2 }}>
        {forsale.map((f, i) => (
          <div key={f.id} className="c-row" style={{ gap: 12, padding: '12px 0', borderBottom: i === forsale.length - 1 ? 'none' : '1px solid var(--border)' }}>
            <div className="c-tile" style={{ width: 40, height: 40, background: 'var(--bg-subtle)' }}>
              <Icon name={f.icon} size={19} color="var(--text-muted)" />
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ font: '500 13.5px/1.2 var(--font-ui)' }}>{f.title}</div>
              <div className="c-meta" style={{ marginTop: 2 }}>{f.who} · {f.when} ago</div>
            </div>
            <span className="c-num" style={{ font: '600 14px var(--font-mono)', color: 'var(--text)' }}>{f.price}</span>
          </div>
        ))}
      </div>

      {/* Shortcuts: swag · settings · help */}
      <SectionHeader title="More" />
      <div className="c-card pad" style={{ paddingTop: 2, paddingBottom: 2 }}>
        <MoreLinkRow icon="shirt" tone="purple" title="Swag store" sub="Hoodies, stickers, the good water bottle"
          trailing={<Icon name="external-link" size={17} color="var(--text-subtle)" />} onClick={() => {}} />
        <MoreLinkRow icon="bell" tone="blue" title="Notification settings" sub="Push, email, what pings you" onClick={() => {}} />
        <MoreLinkRow icon="life-buoy" tone="green" title="Help & FAQ" sub="Get answers, contact People Ops" onClick={() => {}} last />
      </div>
    </div>
  );
}

Object.assign(window, { MoreScreen, MoreLinkRow });
