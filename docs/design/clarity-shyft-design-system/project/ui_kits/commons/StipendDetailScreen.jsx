/* ============================================================
   Commons UI kit — Stipend detail (full-screen overlay)
   Transaction history · submit receipt · statuses · eligibility FAQ.
   ============================================================ */

const RECEIPT_TONE = { Pending: 'orange', Approved: 'blue', Reimbursed: 'green' };

function StipendDetailScreen({ s, onClose }) {
  const remaining = s.total - s.used;
  const pct = Math.min(100, Math.round((s.used / s.total) * 100));
  return (
    <div className="commons" style={{ position: 'absolute', inset: 0, zIndex: 70, background: 'var(--bg)' }}>
      <div className="c-header" style={{ paddingTop: 56 }}>
        <div className="c-row" style={{ gap: 10 }}>
          <button className="c-iconbtn" onClick={onClose} aria-label="Back"><Icon name="chevron-left" size={20} /></button>
          <div className="c-h-title">{s.label} stipend</div>
        </div>
      </div>

      <div className="c-scroll">
        {/* balance hero */}
        <div className="c-card pad" style={{ background: 'var(--charcoal-900)', border: 'none', padding: '22px 20px' }}>
          <div className="c-row" style={{ gap: 11 }}>
            <IconTile icon={s.icon} bg={'rgba(255,255,255,.12)'} fg={'#fff'} size={40} />
            <div>
              <div style={{ font: '500 12px/1 var(--font-ui)', color: 'var(--charcoal-400)', textTransform: 'uppercase', letterSpacing: '.06em' }}>Remaining</div>
              <div className="c-row" style={{ gap: 7, alignItems: 'baseline', marginTop: 5 }}>
                <span className="c-num" style={{ font: '600 30px/1 var(--font-display)', color: '#fff', letterSpacing: '-.02em' }}>${remaining.toLocaleString()}</span>
                <span className="c-num" style={{ font: '400 13px var(--font-mono)', color: 'var(--charcoal-400)' }}>of ${s.total.toLocaleString()}</span>
              </div>
            </div>
          </div>
          <div style={{ height: 7, background: 'rgba(255,255,255,.14)', borderRadius: 99, overflow: 'hidden', margin: '16px 0 9px' }}>
            <div style={{ height: '100%', width: pct + '%', background: 'var(--' + s.tone + '-300)', borderRadius: 99 }} />
          </div>
          <div className="c-row" style={{ justifyContent: 'space-between' }}>
            <span className="c-num" style={{ font: '400 12px var(--font-mono)', color: 'var(--charcoal-300)' }}>${s.used.toLocaleString()} used</span>
            <span className="c-meta" style={{ color: 'var(--charcoal-300)' }}>Resets in {s.resetsInDays} days</span>
          </div>
        </div>

        <Button variant="primary" block icon="receipt" onClick={() => {}}>Submit receipt</Button>

        {/* transaction history */}
        <SectionHeader title="Transaction history" />
        {s.tx.length === 0 ? (
          <div className="c-card pad" style={{ textAlign: 'center', padding: '30px 24px' }}>
            <Icon name="receipt-text" size={26} color="var(--charcoal-300)" />
            <div style={{ font: '600 14px/1.3 var(--font-display)', marginTop: 10 }}>No claims yet</div>
            <div className="c-meta" style={{ marginTop: 4 }}>Submit a receipt and it'll show up here with its status.</div>
          </div>
        ) : (
          <div className="c-card pad" style={{ paddingTop: 2, paddingBottom: 2 }}>
            {s.tx.map((t, i) => (
              <div key={t.id} className="c-row" style={{ gap: 12, padding: '13px 0', borderBottom: i === s.tx.length - 1 ? 'none' : '1px solid var(--border)' }}>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ font: '500 13.5px/1.25 var(--font-ui)' }}>{t.title}</div>
                  <div className="c-row" style={{ gap: 8, marginTop: 4 }}>
                    <Pill tone={RECEIPT_TONE[t.status]} dot={true}>{t.status}</Pill>
                    <span className="c-meta">{t.date}</span>
                  </div>
                </div>
                <span className="c-num" style={{ font: '600 14px var(--font-mono)', color: 'var(--text)' }}>${t.amount}</span>
              </div>
            ))}
          </div>
        )}

        {/* eligibility FAQ */}
        <div className="c-card tap" style={{ padding: 15, display: 'flex', alignItems: 'center', gap: 13 }}>
          <IconTile icon="circle-help" bg="var(--bg-subtle)" fg="var(--text-muted)" size={38} />
          <div style={{ flex: 1 }}>
            <div style={{ font: '600 13.5px/1.2 var(--font-ui)' }}>What's eligible?</div>
            <div className="c-meta" style={{ marginTop: 2 }}>{s.blurb}</div>
          </div>
          <Icon name="chevron-right" size={18} color="var(--text-subtle)" />
        </div>

        <div className="c-meta" style={{ textAlign: 'center', padding: '2px 20px 8px' }}>
          Reimbursements land in your next paycheck. Questions? Ask in #people-ops.
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { StipendDetailScreen, RECEIPT_TONE });
