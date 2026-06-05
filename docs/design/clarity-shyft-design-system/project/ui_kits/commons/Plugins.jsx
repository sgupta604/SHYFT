/* ============================================================
   Commons UI kit — Plugins
   The extensibility layer. Three surfaces, kept deliberately small:
     1. PluginSlot   — installed plugins render INTO Today / You.
     2. AppsScreen   — directory: browse + install (everyone).
     3. DeveloperScreen — publish console (role-gated).
   ============================================================ */

/* ---------- Stars (compact rating) ---------- */
function Stars({ value }) {
  if (value == null) return null;
  return (
    <span className="c-row" style={{ gap: 3 }}>
      <Icon name="star" size={12} color="var(--orange-700)" style={{ fill: 'var(--orange-700)' }} />
      <span className="c-num" style={{ font: '600 11.5px var(--font-mono)', color: 'var(--text-muted)' }}>{value.toFixed(1)}</span>
    </span>
  );
}

/* ============================================================
   1 · PLUGIN WIDGET — the inline card a plugin renders in a slot
   ============================================================ */
function PluginWidget({ p, onOpen }) {
  const w = p.widget || {};
  const accent = 'var(--' + p.tone + '-700)';
  return (
    <div className="c-card" style={{ padding: 14, overflow: 'hidden' }}>
      <div className="c-row" style={{ gap: 10, marginBottom: 11 }}>
        <IconTile icon={p.icon} bg={'var(--' + p.tone + '-300)'} fg={accent} size={32} iconSize={17} />
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ font: '600 13px/1.2 var(--font-ui)' }}>{p.name}</div>
          <div className="c-meta" style={{ marginTop: 1, fontSize: 11 }}>via {p.dev}</div>
        </div>
        <button onClick={onOpen} className="c-iconbtn" style={{ width: 28, height: 28 }} aria-label="Plugin options">
          <Icon name="ellipsis" size={15} />
        </button>
      </div>

      {/* body varies by widget kind */}
      {w.kind === 'next' && (
        <div className="c-row" style={{ alignItems: 'baseline', gap: 8 }}>
          <span className="c-num" style={{ font: '600 26px/1 var(--font-display)', letterSpacing: '-.02em', color: accent }}>{w.value}</span>
          <span className="c-meta" style={{ fontSize: 12 }}>{w.unit}</span>
          <div style={{ flex: 1 }} />
          <div style={{ textAlign: 'right' }}>
            <div style={{ font: '500 12px/1.3 var(--font-ui)', color: 'var(--text)' }}>{w.label}</div>
            <div className="c-row" style={{ gap: 4, justifyContent: 'flex-end', marginTop: 2 }}>
              <span className="pdot" style={{ width: 6, height: 6, borderRadius: 99, background: 'var(--success)' }} />
              <span className="c-meta" style={{ fontSize: 11 }}>{w.note}</span>
            </div>
          </div>
        </div>
      )}

      {w.kind === 'list' && (
        <div>
          <div className="c-meta" style={{ fontSize: 11, marginBottom: 7 }}>{w.label}</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
            {w.items.map((it, i) => (
              <div key={i} className="c-row" style={{ gap: 8 }}>
                <span style={{ width: 5, height: 5, borderRadius: 99, background: accent, flex: 'none' }} />
                <span style={{ font: '400 12.5px/1.3 var(--font-ui)', color: 'var(--text)' }}>{it}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {w.kind === 'stat' && (
        <div className="c-row" style={{ justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <div>
            <div className="c-num" style={{ font: '600 24px/1 var(--font-display)', letterSpacing: '-.02em' }}>{w.value}</div>
            <div className="c-meta" style={{ fontSize: 11, marginTop: 3 }}>{w.label}</div>
          </div>
          <Pill tone={w.deltaTone || 'green'} dot={false}>{w.delta}</Pill>
        </div>
      )}

      {w.kind === 'progress' && (
        <div>
          <div className="c-row" style={{ justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 7 }}>
            <span className="c-row" style={{ gap: 5, alignItems: 'baseline' }}>
              <span className="c-num" style={{ font: '600 20px/1 var(--font-display)' }}>{w.used}</span>
              <span className="c-meta" style={{ fontSize: 11 }}>of {w.total} {w.unit}</span>
            </span>
            <span className="c-meta" style={{ fontSize: 11 }}>{w.label}</span>
          </div>
          <div style={{ height: 6, background: 'var(--bg-sunken)', borderRadius: 99, overflow: 'hidden' }}>
            <div style={{ height: '100%', width: Math.round((w.used / w.total) * 100) + '%', background: accent, borderRadius: 99 }} />
          </div>
        </div>
      )}
    </div>
  );
}

/* ---------- PLUGIN SLOT — drops all installed plugins for a slot ----------
   Renders nothing when nothing's installed (keeps screens uncluttered). */
function PluginSlot({ slot, plugins, installed, onManage, onOpenPlugin }) {
  const mine = plugins.filter(p => p.installed && p.slot === slot && installed.includes(p.id));
  if (mine.length === 0) return null;
  return (
    <React.Fragment>
      <SectionHeader title="Your apps" action="Manage" onAction={onManage} />
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {mine.map(p => <PluginWidget key={p.id} p={p} onOpen={() => onOpenPlugin(p)} />)}
      </div>
    </React.Fragment>
  );
}

/* ============================================================
   2 · APPS DIRECTORY — full-screen overlay, opened from More
   ============================================================ */
function AppRow({ p, isInstalled, onOpen, onToggle, last }) {
  return (
    <div className="c-row" style={{ gap: 12, padding: '13px 0', borderBottom: last ? 'none' : '1px solid var(--border)' }}>
      <button onClick={onOpen} className="c-row" style={{ gap: 12, flex: 1, minWidth: 0, background: 'transparent', border: 'none', cursor: 'pointer', textAlign: 'left', padding: 0 }}>
        <IconTile icon={p.icon} bg={'var(--' + p.tone + '-300)'} fg={'var(--' + p.tone + '-700)'} size={42} />
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ font: '600 13.5px/1.2 var(--font-ui)' }}>{p.name}</div>
          <div className="c-meta" style={{ marginTop: 2, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{p.blurb}</div>
          <div className="c-row" style={{ gap: 9, marginTop: 5 }}>
            <Stars value={p.rating} />
            <span className="c-meta" style={{ fontSize: 11 }}>{(p.installs / 1000).toFixed(1)}k installs · {p.dev}</span>
          </div>
        </div>
      </button>
      <Button variant={isInstalled ? 'secondary' : 'primary'} size="sm"
        icon={isInstalled ? 'check' : 'plus'} onClick={() => onToggle(p.id)}>
        {isInstalled ? 'Added' : 'Add'}
      </Button>
    </div>
  );
}

function AppsScreen({ plugins, installed, categories, onClose, onToggle, onOpenPlugin, onOpenDeveloper, isDeveloper }) {
  const [cat, setCat] = useState('All');
  const list = plugins.filter(p => cat === 'All' || p.category === cat);
  const installedCount = installed.length;
  return (
    <div className="commons" style={{ position: 'absolute', inset: 0, zIndex: 70, background: 'var(--bg)' }}>
      <div className="c-header" style={{ paddingTop: 56 }}>
        <div className="c-row" style={{ gap: 10, flex: 1 }}>
          <button className="c-iconbtn" onClick={onClose} aria-label="Back"><Icon name="chevron-left" size={20} /></button>
          <div className="c-h-title">Apps</div>
          <div style={{ flex: 1 }} />
          <span className="c-meta c-num">{installedCount} installed</span>
        </div>
      </div>

      <div className="c-scroll">
        <div className="c-meta" style={{ marginTop: -2 }}>
          Extensions built by teams across Shyft. Add one and it shows up right inside the app.
        </div>

        {/* category filter */}
        <div style={{ display: 'flex', gap: 7, overflowX: 'auto', margin: '2px -16px 0', padding: '0 16px 2px' }}>
          {categories.map(c => (
            <button key={c} onClick={() => setCat(c)} style={{
              flex: 'none', font: '600 12.5px/1 var(--font-ui)', padding: '8px 13px', borderRadius: 'var(--r-full)', cursor: 'pointer',
              border: '1px solid ' + (cat === c ? 'transparent' : 'var(--border-strong)'),
              background: cat === c ? 'var(--charcoal-900)' : 'var(--bg-elev)',
              color: cat === c ? '#fff' : 'var(--text-muted)',
            }}>{c}</button>
          ))}
        </div>

        <div className="c-card pad" style={{ paddingTop: 2, paddingBottom: 2, marginTop: 2 }}>
          {list.map((p, i) => (
            <AppRow key={p.id} p={p} isInstalled={installed.includes(p.id)}
              onOpen={() => onOpenPlugin(p)} onToggle={onToggle} last={i === list.length - 1} />
          ))}
        </div>

        {/* build-your-own footer — the bridge to the dev side */}
        <button onClick={onOpenDeveloper} className="c-card tap" style={{ width: '100%', textAlign: 'left', border: '1px dashed var(--border-strong)', background: 'var(--bg-subtle)', padding: 15, display: 'flex', alignItems: 'center', gap: 13, cursor: 'pointer' }}>
          <IconTile icon="code-xml" bg="var(--bg-elev)" fg="var(--text-muted)" size={38} />
          <div style={{ flex: 1 }}>
            <div style={{ font: '600 13.5px/1.2 var(--font-ui)' }}>Build your own</div>
            <div className="c-meta" style={{ marginTop: 2 }}>{isDeveloper ? 'Open the developer console' : 'See the docs and request developer access'}</div>
          </div>
          <Icon name="arrow-up-right" size={18} color="var(--text-subtle)" />
        </button>
      </div>
    </div>
  );
}

/* ---------- Plugin detail sheet (install + permissions) ---------- */
function PluginSheet({ p, isInstalled, onToggle, onClose }) {
  return (
    <Sheet onClose={onClose} title="App details">
      <div className="c-row" style={{ gap: 13 }}>
        <IconTile icon={p.icon} bg={'var(--' + p.tone + '-300)'} fg={'var(--' + p.tone + '-700)'} size={54} />
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ font: '600 18px/1.2 var(--font-display)', letterSpacing: '-.01em' }}>{p.name}</div>
          <div className="c-meta" style={{ marginTop: 3 }}>by {p.dev}</div>
        </div>
      </div>

      <div className="c-row" style={{ gap: 0, justifyContent: 'space-between', padding: '12px 4px', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
        {[['Rating', p.rating ? p.rating.toFixed(1) : '—'], ['Installs', (p.installs / 1000).toFixed(1) + 'k'], ['Category', p.category]].map(([k, v], i) => (
          <div key={i} style={{ flex: 1, textAlign: 'center', borderLeft: i ? '1px solid var(--border)' : 'none' }}>
            <div className="c-num" style={{ font: '600 15px/1 var(--font-display)' }}>{v}</div>
            <div className="c-meta" style={{ fontSize: 11, marginTop: 3 }}>{k}</div>
          </div>
        ))}
      </div>

      <div className="c-body-14" style={{ color: 'var(--text-muted)' }}>{p.blurb}</div>

      <div>
        <div style={{ font: '600 12px/1 var(--font-ui)', textTransform: 'uppercase', letterSpacing: '.06em', color: 'var(--text-subtle)', marginBottom: 10 }}>Permissions</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
          {p.permissions.map((perm, i) => (
            <div key={i} className="c-row" style={{ gap: 9 }}>
              <Icon name="shield-check" size={15} color="var(--text-muted)" />
              <span style={{ font: '400 13px/1.3 var(--font-ui)', color: 'var(--text)' }}>{perm}</span>
            </div>
          ))}
        </div>
      </div>

      <Button variant={isInstalled ? 'secondary' : 'primary'} block icon={isInstalled ? 'trash-2' : 'download'}
        onClick={() => { onToggle(p.id); }}>
        {isInstalled ? 'Remove app' : 'Add to my Commons'}
      </Button>
    </Sheet>
  );
}

/* ============================================================
   3 · DEVELOPER CONSOLE — role-gated, opened from More
   ============================================================ */
function DeveloperScreen({ devPlugins, statusTone, onClose }) {
  const published = devPlugins.filter(d => d.status === 'Published');
  const totalInstalls = published.reduce((s, d) => s + d.installs, 0);
  return (
    <div className="commons" style={{ position: 'absolute', inset: 0, zIndex: 70, background: 'var(--bg)' }}>
      <div className="c-header" style={{ paddingTop: 56 }}>
        <div className="c-row" style={{ gap: 10 }}>
          <button className="c-iconbtn" onClick={onClose} aria-label="Back"><Icon name="chevron-left" size={20} /></button>
          <div className="c-h-title">Developer</div>
        </div>
      </div>

      <div className="c-scroll">
        {/* at-a-glance metrics */}
        <div className="c-card pad" style={{ background: 'var(--charcoal-900)', border: 'none', padding: '18px 20px' }}>
          <div className="c-row" style={{ gap: 8 }}>
            <Icon name="code-xml" size={16} color="var(--blue-300)" />
            <span style={{ font: '500 12px/1 var(--font-ui)', color: 'var(--charcoal-400)', textTransform: 'uppercase', letterSpacing: '.06em' }}>Your published apps</span>
          </div>
          <div className="c-row" style={{ gap: 24, marginTop: 14 }}>
            <div>
              <div className="c-num" style={{ font: '600 26px/1 var(--font-display)', color: '#fff', letterSpacing: '-.02em' }}>{totalInstalls.toLocaleString()}</div>
              <div className="c-meta" style={{ color: 'var(--charcoal-400)', marginTop: 4 }}>total installs</div>
            </div>
            <div>
              <div className="c-num" style={{ font: '600 26px/1 var(--font-display)', color: '#fff', letterSpacing: '-.02em' }}>{published.length}</div>
              <div className="c-meta" style={{ color: 'var(--charcoal-400)', marginTop: 4 }}>live</div>
            </div>
            <div>
              <div className="c-num" style={{ font: '600 26px/1 var(--font-display)', color: '#fff', letterSpacing: '-.02em' }}>4.8</div>
              <div className="c-meta" style={{ color: 'var(--charcoal-400)', marginTop: 4 }}>avg rating</div>
            </div>
          </div>
        </div>

        <Button variant="primary" block icon="plus" onClick={() => {}}>New plugin</Button>

        <SectionHeader title="Your plugins" />
        <div className="c-card pad" style={{ paddingTop: 2, paddingBottom: 2 }}>
          {devPlugins.map((d, i) => (
            <div key={d.id} className="c-row" style={{ gap: 12, padding: '13px 0', borderBottom: i === devPlugins.length - 1 ? 'none' : '1px solid var(--border)' }}>
              <IconTile icon={d.icon} bg={'var(--' + d.tone + '-300)'} fg={'var(--' + d.tone + '-700)'} size={40} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div className="c-row" style={{ gap: 8 }}>
                  <span style={{ font: '600 13.5px/1.2 var(--font-ui)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{d.name}</span>
                  <span className="c-meta c-num" style={{ fontSize: 11, flex: 'none' }}>{d.version}</span>
                </div>
                <div className="c-meta" style={{ marginTop: 3 }}>{d.note}</div>
                {d.status === 'Published' && (
                  <div className="c-row" style={{ gap: 10, marginTop: 5 }}>
                    <span className="c-meta" style={{ fontSize: 11 }}>{d.installs.toLocaleString()} installs</span>
                    <Stars value={d.rating} />
                  </div>
                )}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 8, flex: 'none' }}>
                <Pill tone={statusTone[d.status] || 'neutral'} dot={d.status === 'In review'}>{d.status}</Pill>
                <Icon name="chevron-right" size={17} color="var(--text-subtle)" />
              </div>
            </div>
          ))}
        </div>

        {/* dev resources */}
        <SectionHeader title="Resources" />
        <div className="c-card pad" style={{ paddingTop: 2, paddingBottom: 2 }}>
          <MoreLinkRow icon="book-open" tone="blue" title="Plugin SDK docs" sub="Slots, APIs, design guidelines"
            trailing={<Icon name="external-link" size={17} color="var(--text-subtle)" />} onClick={() => {}} />
          <MoreLinkRow icon="git-branch" tone="purple" title="Sample plugins" sub="Starter repos on GitHub"
            trailing={<Icon name="external-link" size={17} color="var(--text-subtle)" />} onClick={() => {}} />
          <MoreLinkRow icon="messages-square" tone="green" title="#plugin-developers" sub="Get help from the platform team" onClick={() => {}} last />
        </div>

        <div className="c-meta" style={{ textAlign: 'center', padding: '2px 24px 8px' }}>
          Submissions are reviewed by the platform team against the Clarity design and security guidelines.
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { PluginWidget, PluginSlot, AppsScreen, PluginSheet, DeveloperScreen, Stars });
