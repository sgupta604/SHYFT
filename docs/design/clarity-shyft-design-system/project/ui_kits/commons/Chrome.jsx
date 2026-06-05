/* ============================================================
   Commons UI kit — app chrome (header + bottom tab bar)
   ============================================================ */

function AppHeader({ title, subtitle, mark, onBell, onSearch, unread = true }) {
  return (
    <div className="c-header">
      <div className="c-row" style={{ gap: 12, minWidth: 0 }}>
        {mark && <img src={window.S2_MARK_SRC} alt="Shyft" style={{ height: 30, width: 30, objectFit: 'contain' }} />}
        <div style={{ minWidth: 0 }}>
          <div className="c-h-title" style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{title}</div>
          {subtitle && <div className="c-h-sub">{subtitle}</div>}
        </div>
      </div>
      <div className="c-row" style={{ gap: 8 }}>
        {onSearch && (
          <button className="c-iconbtn" onClick={onSearch} aria-label="Search">
            <Icon name="search" size={18} />
          </button>
        )}
        <button className="c-iconbtn" onClick={onBell} aria-label="Notifications">
          <Icon name="bell" size={18} />
          {unread && <span className="c-dot" />}
        </button>
      </div>
    </div>
  );
}

const TABS = [
  { id: 'today', label: 'Today', icon: 'house' },
  { id: 'events', label: 'Events', icon: 'calendar-days' },
  { id: 'you', label: 'You', icon: 'circle-user' },
  { id: 'people', label: 'People', icon: 'users' },
  { id: 'more', label: 'More', icon: 'layout-grid' },
];

function TabBar({ active, onChange }) {
  return (
    <div className="c-tabbar">
      {TABS.map(t => (
        <button key={t.id} className={'c-tab' + (active === t.id ? ' on' : '')} onClick={() => onChange(t.id)}>
          <Icon name={t.icon} size={22} strokeWidth={active === t.id ? 2.4 : 2} />
          <span className="c-tab-l">{t.label}</span>
        </button>
      ))}
    </div>
  );
}

Object.assign(window, { AppHeader, TabBar, TABS });
