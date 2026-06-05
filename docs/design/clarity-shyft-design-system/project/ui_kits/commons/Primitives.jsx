/* ============================================================
   Commons UI kit — primitives
   Icon (Lucide), Avatar, Pill, Tag, IconTile, Button,
   SectionHeader, Segmented, StatusBanner.
   ============================================================ */
const { useState, useEffect, useRef } = React;

/* ---- Lucide icon. Renders an <i data-lucide> then converts. ---- */
function Icon({ name, size = 20, strokeWidth = 2, color, style = {} }) {
  const ref = useRef(null);
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const paint = () => {
      if (!window.lucide || !window.lucide.createIcons) return false;
      node.innerHTML = '';
      const i = document.createElement('i');
      i.setAttribute('data-lucide', name);
      node.appendChild(i);
      window.lucide.createIcons({ attrs: { 'stroke-width': strokeWidth }, nameAttr: 'data-lucide' });
      return true;
    };
    if (!paint()) {
      let tries = 0;
      const t = setInterval(() => { if (paint() || tries++ > 50) clearInterval(t); }, 40);
      return () => clearInterval(t);
    }
  }, [name, strokeWidth]);
  return <span ref={ref} className="cl-ico" style={{ width: size, height: size, color, ...style }} />;
}

/* ---- Avatar — initials in a deterministic charcoal/blue tone ---- */
const AV_TONES = ['#329af0', '#1c7ed6', '#495057', '#9c36b5', '#2f9e44', '#e8590c', '#1971c2', '#868e96'];
function avTone(name = '') {
  let h = 0; for (let i = 0; i < name.length; i++) h = (h * 31 + name.charCodeAt(i)) >>> 0;
  return AV_TONES[h % AV_TONES.length];
}
function initials(name = '') {
  return name.trim().split(/\s+/).slice(0, 2).map(w => w[0]).join('').toUpperCase();
}
function Avatar({ name = '', size = 38, src, style = {}, ring }) {
  return (
    <div className="c-avatar" style={{
      width: size, height: size, fontSize: size * 0.4, background: avTone(name),
      boxShadow: ring ? `0 0 0 2px var(--bg-elev), 0 0 0 4px ${ring}` : undefined, ...style,
    }}>
      {src ? <img src={src} alt={name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : initials(name)}
    </div>
  );
}

/* ---- Status pill — one piece of state ---- */
const PILL_TONES = {
  blue:   ['var(--blue-100)', 'var(--blue-800)', 'var(--blue-700)'],
  green:  ['var(--green-300)', 'var(--green-700)', 'var(--green-700)'],
  orange: ['var(--orange-300)', 'var(--orange-700)', 'var(--orange-700)'],
  pink:   ['var(--pink-300)', 'var(--pink-700)', 'var(--pink-700)'],
  purple: ['var(--purple-300)', 'var(--purple-700)', 'var(--purple-700)'],
  neutral:['var(--charcoal-100)', 'var(--charcoal-700)', 'var(--charcoal-500)'],
};
function Pill({ children, tone = 'neutral', dot = true, style = {} }) {
  const [bg, fg, d] = PILL_TONES[tone] || PILL_TONES.neutral;
  return (
    <span className="c-pill" style={{ background: bg, color: fg, ...style }}>
      {dot && <span className="pdot" style={{ background: d }} />}{children}
    </span>
  );
}

/* ---- Category / metadata tag (optional leading emoji glyph) ---- */
function Tag({ children, style = {} }) {
  return <span className="c-tag" style={style}>{children}</span>;
}

/* ---- Rounded icon tile (category color) ---- */
function IconTile({ icon, bg = 'var(--accent-soft)', fg = 'var(--accent)', size = 44, iconSize, style = {} }) {
  return (
    <div className="c-tile" style={{ width: size, height: size, background: bg, ...style }}>
      <Icon name={icon} size={iconSize || size * 0.46} color={fg} />
    </div>
  );
}

/* ---- Button ---- */
function Button({ children, variant = 'primary', size, block, icon, onClick, style = {} }) {
  const cls = ['c-btn', variant, block ? 'block' : '', size === 'sm' ? 'sm' : ''].join(' ');
  return (
    <button className={cls} onClick={onClick} style={style}>
      {icon && <Icon name={icon} size={size === 'sm' ? 15 : 17} />}{children}
    </button>
  );
}

/* ---- Section header ---- */
function SectionHeader({ title, action, onAction }) {
  return (
    <div className="c-section">
      <h3>{title}</h3>
      {action && <a onClick={onAction}>{action}</a>}
    </div>
  );
}

/* ---- Segmented control ---- */
function Segmented({ options, value, onChange }) {
  return (
    <div className="c-seg">
      {options.map(o => (
        <button key={o} className={value === o ? 'on' : ''} onClick={() => onChange(o)}>{o}</button>
      ))}
    </div>
  );
}

/* ---- Status banner (office-status / emergency) ---- */
const BANNER_TONES = {
  pink:   ['var(--pink-300)', 'var(--pink-700)', 'rgba(194,37,92,.07)'],
  orange: ['var(--orange-300)', 'var(--orange-700)', 'rgba(232,89,12,.07)'],
  green:  ['var(--green-300)', 'var(--green-700)', 'rgba(47,158,68,.07)'],
  blue:   ['var(--blue-200)', 'var(--blue-700)', 'var(--blue-50)'],
};
function StatusBanner({ tone = 'green', icon = 'check-circle-2', title, text, action, onAction }) {
  const [bd, fg, bg] = BANNER_TONES[tone] || BANNER_TONES.green;
  return (
    <div className="c-banner" style={{ borderColor: bd, background: bg }}>
      <Icon name={icon} size={19} color={fg} style={{ marginTop: 1 }} />
      <div className="b-body">
        <div className="b-title" style={{ color: fg }}>{title}</div>
        {text && <div className="b-text" style={{ color: 'var(--text-muted)' }}>{text}</div>}
      </div>
      {action && <a onClick={onAction} style={{ font: '600 12.5px/1 var(--font-ui)', color: fg, alignSelf: 'center', whiteSpace: 'nowrap' }}>{action}</a>}
    </div>
  );
}

Object.assign(window, {
  Icon, Avatar, avTone, initials, Pill, Tag, IconTile, Button, SectionHeader, Segmented, StatusBanner,
});
