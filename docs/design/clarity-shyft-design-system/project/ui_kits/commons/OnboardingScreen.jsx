/* ============================================================
   Commons UI kit — Onboarding / Preboarding (full sheet)
   Installable between offer and day one.
   ============================================================ */

function OnboardingScreen({ onboarding, checklist, onToggle, onClose }) {
  const done = checklist.filter(c => c.done).length;
  return (
    <div className="commons" style={{ position: 'absolute', inset: 0, zIndex: 70, background: 'var(--bg)' }}>
      {/* header */}
      <div className="c-header" style={{ paddingTop: 56 }}>
        <div className="c-row" style={{ gap: 10 }}>
          <button className="c-iconbtn" onClick={onClose} aria-label="Back"><Icon name="chevron-left" size={20} /></button>
          <div className="c-h-title">Welcome to Shyft</div>
        </div>
      </div>

      <div className="c-scroll">
        {/* countdown hero */}
        <div className="c-card pad" style={{ background: 'var(--charcoal-900)', border: 'none', textAlign: 'center', padding: '24px 20px' }}>
          <div style={{ font: '500 12.5px/1 var(--font-ui)', color: 'var(--charcoal-400)', textTransform: 'uppercase', letterSpacing: '.06em' }}>Your first day</div>
          <div style={{ font: '600 44px/1 var(--font-display)', color: '#fff', letterSpacing: '-.02em', margin: '12px 0 6px' }}>
            {onboarding.daysToStart} <span style={{ fontSize: 20, color: 'var(--blue-300)' }}>days</span>
          </div>
          <div style={{ font: '400 13px/1 var(--font-ui)', color: 'var(--charcoal-300)' }}>{onboarding.startDate}</div>
        </div>

        {/* checklist */}
        <div className="c-row" style={{ justifyContent: 'space-between' }}>
          <SectionHeader title="Before you start" />
          <span className="c-meta c-num">{done}/{checklist.length} done</span>
        </div>
        <div className="c-card" style={{ overflow: 'hidden' }}>
          {checklist.map((c, i) => (
            <button key={c.id} onClick={() => onToggle(c.id)} style={{
              display: 'flex', alignItems: 'center', gap: 12, width: '100%', textAlign: 'left',
              padding: '13px 16px', background: 'transparent', border: 'none', cursor: 'pointer',
              borderBottom: i === checklist.length - 1 ? 'none' : '1px solid var(--border)',
            }}>
              <div style={{
                width: 22, height: 22, borderRadius: 'var(--r-full)', flex: 'none',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                background: c.done ? 'var(--success)' : 'transparent',
                border: c.done ? 'none' : '1.5px solid var(--border-strong)',
              }}>
                {c.done && <Icon name="check" size={14} color="#fff" strokeWidth={3} />}
              </div>
              <span style={{ flex: 1, font: '500 14px/1.3 var(--font-ui)', color: c.done ? 'var(--text-subtle)' : 'var(--text)', textDecoration: c.done ? 'line-through' : 'none' }}>{c.label}</span>
              <span className="c-meta">{c.meta}</span>
            </button>
          ))}
        </div>

        {/* handbook CTA */}
        <div className="c-card tap" style={{ padding: 16, display: 'flex', alignItems: 'center', gap: 14 }}>
          <IconTile icon="book-open" bg="var(--purple-300)" fg="var(--purple-700)" size={44} />
          <div style={{ flex: 1 }}>
            <div style={{ font: '600 14px/1.2 var(--font-ui)' }}>Culture handbook</div>
            <div className="c-meta" style={{ marginTop: 2 }}>How we work, what we value · 8 min read</div>
          </div>
          <Icon name="chevron-right" size={19} color="var(--text-subtle)" />
        </div>

        {/* who you'll meet */}
        <SectionHeader title="Who you'll meet" />
        <div className="c-card pad" style={{ paddingTop: 4, paddingBottom: 4 }}>
          {onboarding.whoswho.map((p, i) => (
            <div key={p.name} className="c-row" style={{ gap: 12, padding: '12px 0', borderBottom: i === onboarding.whoswho.length - 1 ? 'none' : '1px solid var(--border)' }}>
              <Avatar name={p.name} size={40} />
              <div style={{ flex: 1 }}>
                <div style={{ font: '600 13.5px/1.2 var(--font-ui)' }}>{p.name}</div>
                <div className="c-meta" style={{ marginTop: 2 }}>{p.role} · {p.team}</div>
              </div>
              <button className="c-iconbtn" style={{ width: 34, height: 34 }} aria-label="Message"><Icon name="message-circle" size={16} /></button>
            </div>
          ))}
        </div>

        {/* first-day facts */}
        <SectionHeader title="Day-one details" />
        <div className="c-card pad" style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
          {onboarding.facts.map((f, i) => (
            <div key={f.k} className="c-row" style={{ gap: 13, padding: '12px 0', borderBottom: i === onboarding.facts.length - 1 ? 'none' : '1px solid var(--border)' }}>
              <Icon name={f.icon} size={18} color="var(--accent)" />
              <span className="c-meta" style={{ width: 70, flex: 'none' }}>{f.k}</span>
              <span style={{ font: '500 13.5px/1.3 var(--font-ui)', flex: 1 }}>{f.v}</span>
            </div>
          ))}
        </div>

        <div className="c-meta" style={{ textAlign: 'center', padding: '4px 20px 8px' }}>
          Questions before you start? Message Priya, your onboarding buddy.
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { OnboardingScreen });
