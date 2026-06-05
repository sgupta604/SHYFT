/* @ds-bundle: {"format":3,"namespace":"ClarityShyftDesignSystem_d2a90b","components":[],"sourceHashes":{"assets/Logo.jsx":"796d7ccdeb31","ui_kits/commons/App.jsx":"710a60b22cc6","ui_kits/commons/Cards.jsx":"bd2a943a5dc4","ui_kits/commons/Chrome.jsx":"fb3c12b1bcad","ui_kits/commons/EventsScreen.jsx":"0520e07da6fb","ui_kits/commons/MoreScreen.jsx":"0224cdc6d2a4","ui_kits/commons/OnboardingScreen.jsx":"a83bd2947014","ui_kits/commons/PeopleScreen.jsx":"ccf14b6b30de","ui_kits/commons/Plugins.jsx":"b0661a9606df","ui_kits/commons/Primitives.jsx":"858471a32bf9","ui_kits/commons/Sheets.jsx":"696fdf54df95","ui_kits/commons/StipendDetailScreen.jsx":"a9c298dd9559","ui_kits/commons/TodayScreen.jsx":"0e392a1a9e1e","ui_kits/commons/YouScreen.jsx":"c886398e6bae","ui_kits/commons/data.jsx":"3f675871aaf6","ui_kits/commons/ios-frame.jsx":"be3343be4b51","ui_kits/commons/tweaks-panel.jsx":"6591467622ed"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.ClarityShyftDesignSystem_d2a90b = window.ClarityShyftDesignSystem_d2a90b || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// assets/Logo.jsx
try { (() => {
/* ============================================================
   Clarity brand marks — real artwork (referenced live)
   The official bitmaps are hosted on the Clarity portal and
   load fine in the browser, but the host sends no CORS headers
   so they can't be downloaded into the repo. We reference them
   live. To make this self-contained, drop the real files into
   assets/ and point S2_MARK_SRC / LOCKUP_SRC at them.
   ============================================================ */

const S2_MARK_SRC = 'https://portal.internal.shyftsolutions.io/s2-mark.png'; // 1250×1250, square
const LOCKUP_SRC = 'https://portal.internal.shyftsolutions.io/shyft-solutions-lockup.png'; // 1940×536

// Two-tone S2 monogram. `size` = pixel height (square). App chrome
// at 22–44px, login 40, hero 64.
function S2Mark({
  size = 32,
  style = {},
  title = 'Shyft'
}) {
  return /*#__PURE__*/React.createElement("img", {
    src: S2_MARK_SRC,
    alt: title,
    width: size,
    height: size,
    style: {
      display: 'block',
      width: size,
      height: size,
      objectFit: 'contain',
      userSelect: 'none',
      ...style
    }
  });
}

// The two-tone mark is documented to survive on dark unchanged,
// so the dark variant is the same asset.
const S2MarkOnDark = S2Mark;

// Full corporate lockup — login & marketing only; never in chrome.
function ShyftLockup({
  height = 44,
  style = {}
}) {
  return /*#__PURE__*/React.createElement("img", {
    src: LOCKUP_SRC,
    alt: "Shyft Solutions \u2014 The Science of Software",
    height: height,
    style: {
      display: 'block',
      height,
      width: 'auto',
      objectFit: 'contain',
      userSelect: 'none',
      ...style
    }
  });
}
Object.assign(window, {
  S2Mark,
  S2MarkOnDark,
  ShyftLockup,
  S2_MARK_SRC,
  LOCKUP_SRC
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "assets/Logo.jsx", error: String((e && e.message) || e) }); }

// ui_kits/commons/App.jsx
try { (() => {
/* ============================================================
   Commons UI kit — app root (state + routing + overlays)
   ============================================================ */

function AllKudosSheet({
  kudos,
  onClose,
  onCheer
}) {
  return /*#__PURE__*/React.createElement(Sheet, {
    onClose: onClose,
    title: "Recent kudos"
  }, kudos.map(k => /*#__PURE__*/React.createElement(KudosCard, {
    key: k.id,
    k: k,
    onCheer: onCheer
  })));
}
function RequestTimeOffSheet({
  pto,
  onClose
}) {
  return /*#__PURE__*/React.createElement(Sheet, {
    onClose: onClose,
    title: "Request time off"
  }, /*#__PURE__*/React.createElement("div", {
    className: "c-card pad",
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 10,
      padding: 14
    }
  }, [['calendar', 'Dates', 'Pick a start and end date'], ['tag', 'Type', 'Vacation · Sick · Personal'], ['message-square', 'Note', 'Optional — who to loop in']].map(([ic, k, v], i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    className: "c-row",
    style: {
      gap: 11
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: ic,
    size: 16,
    color: "var(--accent)"
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      font: '500 13px/1.2 var(--font-ui)',
      width: 56,
      flex: 'none'
    }
  }, k), /*#__PURE__*/React.createElement("span", {
    className: "c-meta"
  }, v)))), /*#__PURE__*/React.createElement("div", {
    className: "c-row",
    style: {
      gap: 8,
      color: 'var(--text-subtle)'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "info",
    size: 14,
    color: "var(--text-subtle)"
  }), /*#__PURE__*/React.createElement("span", {
    className: "c-meta"
  }, "You have ", pto.remaining, " ", pto.unit, " remaining. Requests route to your manager.")), /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    block: true,
    icon: "send",
    onClick: onClose
  }, "Submit request"));
}
function CommonsApp({
  tweaks = {}
}) {
  const developer = tweaks.developer !== false; // role-gated dev surfaces
  const showWidgets = tweaks.showWidgets !== false; // plugin slots on Today/You

  const [tab, setTab] = useState('today');
  const [events, setEvents] = useState(window.EVENTS);
  const [kudos, setKudos] = useState(window.KUDOS);
  const [checklist, setChecklist] = useState(window.ONBOARDING.checklist);
  const [installed, setInstalled] = useState(window.PLUGINS.filter(p => p.installed).map(p => p.id));
  const [sheet, setSheet] = useState(null);
  const [onboarding, setOnboarding] = useState(false);
  const [stipend, setStipend] = useState(null);
  const [profile, setProfile] = useState(null);
  const [apps, setApps] = useState(false);
  const [devOpen, setDevOpen] = useState(false);
  const onRSVP = id => setEvents(es => es.map(e => e.id === id ? {
    ...e,
    rsvp: e.rsvp === 'going' ? null : 'going',
    going: e.rsvp === 'going' ? e.going - 1 : e.going + 1
  } : e));
  const onCheer = id => setKudos(ks => ks.map(k => k.id === id ? {
    ...k,
    cheered: !k.cheered,
    cheers: k.cheered ? k.cheers - 1 : k.cheers + 1
  } : k));
  const onToggle = id => setChecklist(cl => cl.map(c => c.id === id ? {
    ...c,
    done: !c.done
  } : c));
  const onDeepLink = link => {
    if (link && link.tab) setTab(link.tab);
  };
  const onTogglePlugin = id => setInstalled(xs => xs.includes(id) ? xs.filter(x => x !== id) : [...xs, id]);
  const slotFor = slot => showWidgets ? /*#__PURE__*/React.createElement(PluginSlot, {
    slot: slot,
    plugins: window.PLUGINS,
    installed: installed,
    onManage: () => setApps(true),
    onOpenPlugin: p => setSheet({
      type: 'plugin',
      data: p
    })
  }) : null;
  const HEADERS = {
    today: {
      title: 'Good morning, Alex',
      subtitle: 'Tuesday · March 25',
      mark: true,
      search: false
    },
    events: {
      title: 'Events',
      search: false
    },
    you: {
      title: 'You',
      subtitle: 'Alex Rivera · Platform',
      search: false
    },
    people: {
      title: 'People',
      search: true
    },
    more: {
      title: 'More',
      search: false
    }
  };
  const h = HEADERS[tab];
  let screen;
  if (tab === 'today') screen = /*#__PURE__*/React.createElement(TodayScreen, {
    announcements: window.ANNOUNCEMENTS,
    events: events,
    kudos: kudos,
    status: window.OFFICE_STATUS,
    weather: window.WEATHER,
    out: window.OUT_TODAY,
    onOpenAnnouncement: a => setSheet({
      type: 'ann',
      data: a
    }),
    onDeepLink: onDeepLink,
    onRSVP: onRSVP,
    onCheer: onCheer,
    onSeeAllKudos: () => setSheet({
      type: 'allKudos'
    }),
    pluginSlot: slotFor('today'),
    goTab: setTab
  });else if (tab === 'events') screen = /*#__PURE__*/React.createElement(EventsScreen, {
    events: events,
    onRSVP: onRSVP,
    onOpen: e => setSheet({
      type: 'event',
      id: e.id
    })
  });else if (tab === 'you') screen = /*#__PURE__*/React.createElement(YouScreen, {
    stipends: window.STIPENDS,
    pto: window.PTO,
    perks: window.PERKS,
    events: events,
    onOpenStipend: s => setStipend(s),
    onRequestPto: () => setSheet({
      type: 'pto'
    }),
    onOpenPerk: () => {},
    onOpenEvent: e => setSheet({
      type: 'event',
      id: e.id
    }),
    pluginSlot: slotFor('you'),
    goTab: setTab
  });else if (tab === 'people') screen = /*#__PURE__*/React.createElement(PeopleScreen, {
    people: window.PEOPLE,
    out: window.OUT_TODAY,
    holidays: window.HOLIDAYS,
    onOpenProfile: p => setProfile(p)
  });else if (tab === 'more') screen = /*#__PURE__*/React.createElement(MoreScreen, {
    onboarding: window.ONBOARDING,
    channels: window.CHANNELS,
    forsale: window.FORSALE,
    isDeveloper: developer,
    onOpenOnboarding: () => setOnboarding(true),
    onOpenApps: () => setApps(true),
    onOpenDeveloper: () => setDevOpen(true)
  });
  const sheetEvent = sheet && sheet.type === 'event' ? events.find(e => e.id === sheet.id) : null;
  return /*#__PURE__*/React.createElement("div", {
    className: "commons"
  }, /*#__PURE__*/React.createElement(AppHeader, {
    title: h.title,
    subtitle: h.subtitle,
    mark: h.mark,
    onBell: () => setSheet({
      type: 'notif'
    }),
    onSearch: h.search ? () => {} : null
  }), screen, /*#__PURE__*/React.createElement(TabBar, {
    active: tab,
    onChange: setTab
  }), onboarding && /*#__PURE__*/React.createElement(OnboardingScreen, {
    onboarding: window.ONBOARDING,
    checklist: checklist,
    onToggle: onToggle,
    onClose: () => setOnboarding(false)
  }), stipend && /*#__PURE__*/React.createElement(StipendDetailScreen, {
    s: stipend,
    onClose: () => setStipend(null)
  }), profile && /*#__PURE__*/React.createElement(ProfileScreen, {
    p: profile,
    onClose: () => setProfile(null)
  }), apps && /*#__PURE__*/React.createElement(AppsScreen, {
    plugins: window.PLUGINS,
    installed: installed,
    categories: window.PLUGIN_CATEGORIES,
    isDeveloper: developer,
    onClose: () => setApps(false),
    onToggle: onTogglePlugin,
    onOpenPlugin: p => setSheet({
      type: 'plugin',
      data: p
    }),
    onOpenDeveloper: () => {
      if (developer) {
        setApps(false);
        setDevOpen(true);
      }
    }
  }), developer && devOpen && /*#__PURE__*/React.createElement(DeveloperScreen, {
    devPlugins: window.DEV_PLUGINS,
    statusTone: window.DEV_STATUS_TONE,
    onClose: () => setDevOpen(false)
  }), sheet && sheet.type === 'ann' && /*#__PURE__*/React.createElement(AnnouncementSheet, {
    a: sheet.data,
    onClose: () => setSheet(null)
  }), sheetEvent && /*#__PURE__*/React.createElement(EventSheet, {
    e: sheetEvent,
    onRSVP: onRSVP,
    onClose: () => setSheet(null)
  }), sheet && sheet.type === 'notif' && /*#__PURE__*/React.createElement(NotificationsSheet, {
    onClose: () => setSheet(null)
  }), sheet && sheet.type === 'allKudos' && /*#__PURE__*/React.createElement(AllKudosSheet, {
    kudos: kudos,
    onCheer: onCheer,
    onClose: () => setSheet(null)
  }), sheet && sheet.type === 'pto' && /*#__PURE__*/React.createElement(RequestTimeOffSheet, {
    pto: window.PTO,
    onClose: () => setSheet(null)
  }), sheet && sheet.type === 'plugin' && /*#__PURE__*/React.createElement(PluginSheet, {
    p: sheet.data,
    isInstalled: installed.includes(sheet.data.id),
    onToggle: onTogglePlugin,
    onClose: () => setSheet(null)
  }));
}
Object.assign(window, {
  CommonsApp,
  AllKudosSheet,
  RequestTimeOffSheet
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/commons/App.jsx", error: String((e && e.message) || e) }); }

// ui_kits/commons/Cards.jsx
try { (() => {
/* ============================================================
   Commons UI kit — shared content cards
   WeatherCard, AnnouncementCard, EventCard, KudosCard,
   PhotoTile, RoleCard, ChannelRow, OutRow, PerkTile.
   ============================================================ */

/* ---------- Weather ---------- */
function WeatherCard({
  w
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "c-card pad",
    style: {
      padding: 16
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "c-row",
    style: {
      justifyContent: 'space-between',
      alignItems: 'flex-start'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "c-meta",
    style: {
      color: 'var(--text-muted)',
      fontWeight: 500
    }
  }, w.city), /*#__PURE__*/React.createElement("div", {
    className: "c-row",
    style: {
      gap: 8,
      marginTop: 6
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: w.icon,
    size: 30,
    color: "var(--accent)"
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      font: '600 34px/1 var(--font-display)',
      letterSpacing: '-.02em'
    }
  }, w.tempF, "\xB0")), /*#__PURE__*/React.createElement("div", {
    className: "c-meta",
    style: {
      marginTop: 6
    }
  }, w.cond, " \xB7 H ", w.hi, "\xB0 L ", w.lo, "\xB0")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 14
    }
  }, w.hours.slice(0, 4).map((h, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 6
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "c-meta",
    style: {
      fontSize: 11
    }
  }, h.t), /*#__PURE__*/React.createElement(Icon, {
    name: h.icon,
    size: 18,
    color: "var(--text-muted)"
  }), /*#__PURE__*/React.createElement("span", {
    className: "c-num",
    style: {
      fontSize: 12,
      color: 'var(--text)'
    }
  }, h.f, "\xB0"))))));
}

/* ---------- Announcement ---------- */
function AnnouncementCard({
  a,
  onOpen,
  onDeepLink,
  full = false
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: 'c-card pad' + (onOpen ? ' tap' : ''),
    onClick: onOpen
  }, /*#__PURE__*/React.createElement("div", {
    className: "c-row",
    style: {
      gap: 8,
      marginBottom: 10
    }
  }, a.pinned && /*#__PURE__*/React.createElement(Icon, {
    name: "pin",
    size: 13,
    color: "var(--text-subtle)"
  }), /*#__PURE__*/React.createElement(Pill, {
    tone: a.catTone,
    dot: false,
    style: {
      background: 'var(--bg-subtle)',
      color: 'var(--text-muted)'
    }
  }, a.cat), /*#__PURE__*/React.createElement("span", {
    className: "c-meta",
    style: {
      marginLeft: 'auto'
    }
  }, a.time)), /*#__PURE__*/React.createElement("div", {
    style: {
      font: '600 16px/1.3 var(--font-display)',
      letterSpacing: '-.01em',
      marginBottom: 6
    }
  }, a.title), /*#__PURE__*/React.createElement("div", {
    className: "c-body-14",
    style: {
      color: 'var(--text-muted)',
      display: full ? 'block' : '-webkit-box',
      WebkitLineClamp: full ? 'none' : 2,
      WebkitBoxOrient: 'vertical',
      overflow: 'hidden'
    }
  }, a.body), /*#__PURE__*/React.createElement("div", {
    className: "c-row",
    style: {
      marginTop: 14,
      gap: 9
    }
  }, /*#__PURE__*/React.createElement(Avatar, {
    name: a.author,
    size: 26
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      font: '500 12.5px/1 var(--font-ui)'
    }
  }, a.author), /*#__PURE__*/React.createElement("span", {
    className: "c-meta"
  }, "\xB7 ", a.role), /*#__PURE__*/React.createElement("div", {
    className: "c-row",
    style: {
      gap: 14,
      marginLeft: 'auto'
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "c-row",
    style: {
      gap: 5
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "heart",
    size: 15,
    color: "var(--text-subtle)"
  }), /*#__PURE__*/React.createElement("span", {
    className: "c-meta c-num"
  }, a.reactions)), /*#__PURE__*/React.createElement("span", {
    className: "c-row",
    style: {
      gap: 5
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "message-circle",
    size: 15,
    color: "var(--text-subtle)"
  }), /*#__PURE__*/React.createElement("span", {
    className: "c-meta c-num"
  }, a.comments)))), a.link && /*#__PURE__*/React.createElement("div", {
    className: "c-row",
    style: {
      gap: 8,
      marginTop: 13,
      padding: '11px 13px',
      borderRadius: 'var(--r-md)',
      background: 'var(--accent-soft)'
    },
    onClick: e => {
      e.stopPropagation();
      onDeepLink && onDeepLink(a.link);
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: a.link.icon || 'arrow-right',
    size: 16,
    color: "var(--accent)"
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      font: '600 12.5px/1 var(--font-ui)',
      color: 'var(--accent)'
    }
  }, a.link.label), /*#__PURE__*/React.createElement(Icon, {
    name: "chevron-right",
    size: 16,
    color: "var(--accent)",
    style: {
      marginLeft: 'auto'
    }
  })));
}

/* ---------- Event ---------- */
function EventCard({
  e,
  onRSVP,
  onOpen
}) {
  const pct = Math.round(e.going / e.capacity * 100);
  const meta = [['calendar', e.date], ['clock', e.time], ['map-pin', e.where]];
  return /*#__PURE__*/React.createElement("div", {
    className: "c-card pad"
  }, /*#__PURE__*/React.createElement("div", {
    className: "c-row",
    style: {
      gap: 12,
      alignItems: 'flex-start'
    },
    onClick: onOpen
  }, /*#__PURE__*/React.createElement(IconTile, {
    icon: e.icon,
    bg: 'var(--' + e.catTone + '-300)',
    fg: 'var(--' + e.catTone + '-700)',
    size: 46
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement(Pill, {
    tone: e.catTone,
    dot: false,
    style: {
      background: 'var(--bg-subtle)',
      color: 'var(--text-muted)',
      marginBottom: 7
    }
  }, e.cat), /*#__PURE__*/React.createElement("div", {
    style: {
      font: '600 15.5px/1.3 var(--font-display)',
      letterSpacing: '-.01em'
    }
  }, e.title))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 6,
      margin: '12px 0 12px'
    }
  }, meta.map(([ic, tx], i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    className: "c-row",
    style: {
      gap: 8
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: ic,
    size: 15,
    color: "var(--text-subtle)"
  }), /*#__PURE__*/React.createElement("span", {
    className: "c-meta",
    style: {
      color: 'var(--text-muted)'
    }
  }, tx)))), /*#__PURE__*/React.createElement("div", {
    className: "c-row",
    style: {
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "c-row",
    style: {
      gap: 6,
      marginBottom: 6
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "c-num",
    style: {
      font: '500 12.5px var(--font-mono)',
      color: 'var(--text)'
    }
  }, e.going), /*#__PURE__*/React.createElement("span", {
    className: "c-meta"
  }, "going \xB7 ", e.capacity - e.going, " spots left")), /*#__PURE__*/React.createElement("div", {
    style: {
      height: 5,
      background: 'var(--bg-sunken)',
      borderRadius: 99,
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      height: '100%',
      width: pct + '%',
      background: 'var(--accent)',
      borderRadius: 99
    }
  }))), /*#__PURE__*/React.createElement(Button, {
    variant: e.rsvp === 'going' ? 'secondary' : 'primary',
    size: "sm",
    icon: e.rsvp === 'going' ? 'check' : undefined,
    onClick: () => onRSVP(e.id)
  }, e.rsvp === 'going' ? 'Going' : 'RSVP')));
}

/* ---------- Kudos ---------- */
const VALUE_TONE = {
  'Customer obsession': 'blue',
  'Ownership': 'green',
  'Craft': 'purple',
  'Team': 'orange'
};
function KudosCard({
  k,
  onCheer
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "c-card pad"
  }, /*#__PURE__*/React.createElement("div", {
    className: "c-row",
    style: {
      gap: 9
    }
  }, /*#__PURE__*/React.createElement(Avatar, {
    name: k.from,
    size: 34
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      lineHeight: 1.3
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      font: '600 13.5px/1.2 var(--font-ui)'
    }
  }, k.from), /*#__PURE__*/React.createElement("span", {
    className: "c-meta"
  }, " gave kudos to "), /*#__PURE__*/React.createElement("span", {
    style: {
      font: '600 13.5px/1.2 var(--font-ui)'
    }
  }, k.to))), /*#__PURE__*/React.createElement("div", {
    style: {
      margin: '10px 0 0'
    }
  }, /*#__PURE__*/React.createElement(Pill, {
    tone: VALUE_TONE[k.value] || 'blue',
    dot: true
  }, k.value)), /*#__PURE__*/React.createElement("div", {
    className: "c-body-14",
    style: {
      color: 'var(--text)',
      marginTop: 10
    }
  }, k.text), /*#__PURE__*/React.createElement("div", {
    className: "c-row",
    style: {
      marginTop: 12,
      justifyContent: 'space-between'
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "c-meta"
  }, k.time), /*#__PURE__*/React.createElement("button", {
    onClick: () => onCheer(k.id),
    className: "c-row",
    style: {
      gap: 6,
      border: '1px solid ' + (k.cheered ? 'var(--accent)' : 'var(--border-strong)'),
      background: k.cheered ? 'var(--accent-soft)' : 'var(--bg-elev)',
      borderRadius: 'var(--r-full)',
      padding: '6px 12px',
      cursor: 'pointer',
      color: k.cheered ? 'var(--accent)' : 'var(--text-muted)'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "party-popper",
    size: 15
  }), /*#__PURE__*/React.createElement("span", {
    className: "c-num",
    style: {
      font: '600 12.5px var(--font-mono)'
    }
  }, k.cheers))));
}

/* ---------- Out / who's-out row ---------- */
function OutRow({
  o,
  last
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "c-row",
    style: {
      gap: 11,
      padding: '11px 0',
      borderBottom: last ? 'none' : '1px solid var(--border)'
    }
  }, /*#__PURE__*/React.createElement(Avatar, {
    name: o.name,
    size: 36
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      font: '500 13.5px/1.2 var(--font-ui)'
    }
  }, o.name), o.note && /*#__PURE__*/React.createElement("div", {
    className: "c-meta",
    style: {
      marginTop: 2
    }
  }, o.note)), /*#__PURE__*/React.createElement(Pill, {
    tone: o.tone,
    dot: true
  }, o.kind));
}

/* ---------- Channel row (Slack directory deep-link) ---------- */
function ChannelRow({
  c
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "c-row",
    style: {
      gap: 12,
      padding: '12px 0',
      borderBottom: '1px solid var(--border)'
    }
  }, /*#__PURE__*/React.createElement(IconTile, {
    icon: c.icon,
    bg: 'var(--' + c.tone + '-300)',
    fg: 'var(--' + c.tone + '-700)',
    size: 40
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      font: '600 13.5px/1.2 var(--font-ui)'
    }
  }, "#", c.name), /*#__PURE__*/React.createElement("div", {
    className: "c-meta",
    style: {
      marginTop: 2,
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis'
    }
  }, c.sub, " \xB7 ", c.members, " members")), /*#__PURE__*/React.createElement(Button, {
    variant: "secondary",
    size: "sm",
    icon: "external-link",
    onClick: () => {}
  }, "Open in Slack"));
}

/* ---------- Perk tile (tappable → provider portal) ---------- */
function PerkTile({
  p,
  onOpen
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "c-card tap",
    onClick: onOpen,
    style: {
      padding: 14,
      display: 'flex',
      flexDirection: 'column',
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "c-row",
    style: {
      justifyContent: 'space-between',
      alignItems: 'flex-start'
    }
  }, /*#__PURE__*/React.createElement(IconTile, {
    icon: p.icon,
    bg: 'var(--' + p.tone + '-300)',
    fg: 'var(--' + p.tone + '-700)',
    size: 38
  }), /*#__PURE__*/React.createElement(Icon, {
    name: "chevron-right",
    size: 17,
    color: "var(--text-subtle)"
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      font: '600 13px/1.25 var(--font-ui)'
    }
  }, p.label), /*#__PURE__*/React.createElement("div", {
    className: "c-meta",
    style: {
      marginTop: 3
    }
  }, p.sub)));
}
Object.assign(window, {
  WeatherCard,
  AnnouncementCard,
  EventCard,
  KudosCard,
  OutRow,
  ChannelRow,
  PerkTile,
  VALUE_TONE
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/commons/Cards.jsx", error: String((e && e.message) || e) }); }

// ui_kits/commons/Chrome.jsx
try { (() => {
/* ============================================================
   Commons UI kit — app chrome (header + bottom tab bar)
   ============================================================ */

function AppHeader({
  title,
  subtitle,
  mark,
  onBell,
  onSearch,
  unread = true
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "c-header"
  }, /*#__PURE__*/React.createElement("div", {
    className: "c-row",
    style: {
      gap: 12,
      minWidth: 0
    }
  }, mark && /*#__PURE__*/React.createElement("img", {
    src: window.S2_MARK_SRC,
    alt: "Shyft",
    style: {
      height: 30,
      width: 30,
      objectFit: 'contain'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "c-h-title",
    style: {
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis'
    }
  }, title), subtitle && /*#__PURE__*/React.createElement("div", {
    className: "c-h-sub"
  }, subtitle))), /*#__PURE__*/React.createElement("div", {
    className: "c-row",
    style: {
      gap: 8
    }
  }, onSearch && /*#__PURE__*/React.createElement("button", {
    className: "c-iconbtn",
    onClick: onSearch,
    "aria-label": "Search"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "search",
    size: 18
  })), /*#__PURE__*/React.createElement("button", {
    className: "c-iconbtn",
    onClick: onBell,
    "aria-label": "Notifications"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "bell",
    size: 18
  }), unread && /*#__PURE__*/React.createElement("span", {
    className: "c-dot"
  }))));
}
const TABS = [{
  id: 'today',
  label: 'Today',
  icon: 'house'
}, {
  id: 'events',
  label: 'Events',
  icon: 'calendar-days'
}, {
  id: 'you',
  label: 'You',
  icon: 'circle-user'
}, {
  id: 'people',
  label: 'People',
  icon: 'users'
}, {
  id: 'more',
  label: 'More',
  icon: 'layout-grid'
}];
function TabBar({
  active,
  onChange
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "c-tabbar"
  }, TABS.map(t => /*#__PURE__*/React.createElement("button", {
    key: t.id,
    className: 'c-tab' + (active === t.id ? ' on' : ''),
    onClick: () => onChange(t.id)
  }, /*#__PURE__*/React.createElement(Icon, {
    name: t.icon,
    size: 22,
    strokeWidth: active === t.id ? 2.4 : 2
  }), /*#__PURE__*/React.createElement("span", {
    className: "c-tab-l"
  }, t.label))));
}
Object.assign(window, {
  AppHeader,
  TabBar,
  TABS
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/commons/Chrome.jsx", error: String((e && e.message) || e) }); }

// ui_kits/commons/EventsScreen.jsx
try { (() => {
/* ============================================================
   Commons UI kit — Events (RSVP)
   ============================================================ */

function EventsScreen({
  events,
  onRSVP,
  onOpen
}) {
  const [filter, setFilter] = useState('Upcoming');
  const shown = filter === 'Going' ? events.filter(e => e.rsvp === 'going') : events;
  return /*#__PURE__*/React.createElement("div", {
    className: "c-scroll"
  }, /*#__PURE__*/React.createElement(Segmented, {
    options: ['Upcoming', 'Going', 'Past'],
    value: filter,
    onChange: setFilter
  }), shown.length === 0 ? /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: 'center',
      padding: '48px 24px',
      color: 'var(--text-subtle)'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "calendar-x",
    size: 30,
    color: "var(--charcoal-300)"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      font: '600 15px/1.3 var(--font-display)',
      color: 'var(--text)',
      marginTop: 12
    }
  }, "Nothing on your calendar"), /*#__PURE__*/React.createElement("div", {
    className: "c-meta",
    style: {
      marginTop: 4
    }
  }, "RSVP to an event and it'll show up here.")) : shown.map(e => /*#__PURE__*/React.createElement(EventCard, {
    key: e.id,
    e: e,
    onRSVP: onRSVP,
    onOpen: () => onOpen(e)
  })));
}
Object.assign(window, {
  EventsScreen
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/commons/EventsScreen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/commons/MoreScreen.jsx
try { (() => {
/* ============================================================
   Commons UI kit — More
   Your first day · Slack channels · For Sale · swag · settings · help
   ============================================================ */

/* ---------- Simple deep-link / settings row ---------- */
function MoreLinkRow({
  icon,
  tone,
  title,
  sub,
  trailing,
  onClick,
  last
}) {
  return /*#__PURE__*/React.createElement("button", {
    onClick: onClick,
    className: "c-row",
    style: {
      gap: 13,
      padding: '13px 0',
      width: '100%',
      textAlign: 'left',
      background: 'transparent',
      border: 'none',
      cursor: 'pointer',
      borderBottom: last ? 'none' : '1px solid var(--border)'
    }
  }, /*#__PURE__*/React.createElement(IconTile, {
    icon: icon,
    bg: 'var(--' + tone + '-300)',
    fg: 'var(--' + tone + '-700)',
    size: 38
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      font: '600 13.5px/1.2 var(--font-ui)'
    }
  }, title), sub && /*#__PURE__*/React.createElement("div", {
    className: "c-meta",
    style: {
      marginTop: 2
    }
  }, sub)), trailing || /*#__PURE__*/React.createElement(Icon, {
    name: "chevron-right",
    size: 18,
    color: "var(--text-subtle)"
  }));
}
function MoreScreen({
  onboarding,
  channels,
  forsale,
  isDeveloper,
  onOpenOnboarding,
  onOpenApps,
  onOpenDeveloper
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "c-scroll"
  }, /*#__PURE__*/React.createElement("div", {
    className: "c-card tap",
    onClick: onOpenOnboarding,
    style: {
      padding: 0,
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--charcoal-900)',
      padding: '16px 18px',
      display: 'flex',
      alignItems: 'center',
      gap: 14
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "c-tile",
    style: {
      width: 44,
      height: 44,
      background: 'rgba(50,154,240,.18)'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "rocket",
    size: 22,
    color: "var(--blue-300)"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      font: '600 15px/1.2 var(--font-display)',
      color: '#fff'
    }
  }, "Your first day"), /*#__PURE__*/React.createElement("div", {
    style: {
      font: '400 12.5px/1.3 var(--font-ui)',
      color: 'var(--charcoal-400)',
      marginTop: 2
    }
  }, onboarding.startDate, " \xB7 ", onboarding.daysToStart, " days to go")), /*#__PURE__*/React.createElement(Icon, {
    name: "chevron-right",
    size: 20,
    color: "var(--charcoal-500)"
  })), /*#__PURE__*/React.createElement("div", {
    className: "c-row",
    style: {
      padding: '11px 18px',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "circle-check",
    size: 15,
    color: "var(--success)"
  }), /*#__PURE__*/React.createElement("span", {
    className: "c-meta"
  }, "2 of ", onboarding.checklist.length, " onboarding steps done"))), /*#__PURE__*/React.createElement(SectionHeader, {
    title: "Apps & extensions"
  }), /*#__PURE__*/React.createElement("div", {
    className: "c-card pad",
    style: {
      paddingTop: 2,
      paddingBottom: 2
    }
  }, /*#__PURE__*/React.createElement(MoreLinkRow, {
    icon: "layout-grid",
    tone: "blue",
    title: "Apps",
    sub: "Browse plugins built by teams across Shyft",
    onClick: onOpenApps,
    last: !isDeveloper
  }), isDeveloper && /*#__PURE__*/React.createElement(MoreLinkRow, {
    icon: "code-xml",
    tone: "purple",
    title: "Developer",
    sub: "Build, publish & manage your plugins",
    trailing: /*#__PURE__*/React.createElement("span", {
      className: "c-row",
      style: {
        gap: 7
      }
    }, /*#__PURE__*/React.createElement(Pill, {
      tone: "neutral",
      dot: false
    }, "Dev"), /*#__PURE__*/React.createElement(Icon, {
      name: "chevron-right",
      size: 18,
      color: "var(--text-subtle)"
    })),
    onClick: onOpenDeveloper,
    last: true
  })), /*#__PURE__*/React.createElement(SectionHeader, {
    title: "Slack channels",
    action: "Browse all"
  }), /*#__PURE__*/React.createElement("div", {
    className: "c-card pad",
    style: {
      paddingTop: 2,
      paddingBottom: 14
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "c-meta",
    style: {
      padding: '12px 0 10px',
      borderBottom: '1px solid var(--border)'
    }
  }, "Find your people \u2014 chats happen in Slack."), channels.map(c => /*#__PURE__*/React.createElement(ChannelRow, {
    key: c.id,
    c: c
  }))), /*#__PURE__*/React.createElement(SectionHeader, {
    title: "For sale",
    action: "Post item"
  }), /*#__PURE__*/React.createElement("div", {
    className: "c-card pad",
    style: {
      paddingTop: 2,
      paddingBottom: 2
    }
  }, forsale.map((f, i) => /*#__PURE__*/React.createElement("div", {
    key: f.id,
    className: "c-row",
    style: {
      gap: 12,
      padding: '12px 0',
      borderBottom: i === forsale.length - 1 ? 'none' : '1px solid var(--border)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "c-tile",
    style: {
      width: 40,
      height: 40,
      background: 'var(--bg-subtle)'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: f.icon,
    size: 19,
    color: "var(--text-muted)"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      font: '500 13.5px/1.2 var(--font-ui)'
    }
  }, f.title), /*#__PURE__*/React.createElement("div", {
    className: "c-meta",
    style: {
      marginTop: 2
    }
  }, f.who, " \xB7 ", f.when, " ago")), /*#__PURE__*/React.createElement("span", {
    className: "c-num",
    style: {
      font: '600 14px var(--font-mono)',
      color: 'var(--text)'
    }
  }, f.price)))), /*#__PURE__*/React.createElement(SectionHeader, {
    title: "More"
  }), /*#__PURE__*/React.createElement("div", {
    className: "c-card pad",
    style: {
      paddingTop: 2,
      paddingBottom: 2
    }
  }, /*#__PURE__*/React.createElement(MoreLinkRow, {
    icon: "shirt",
    tone: "purple",
    title: "Swag store",
    sub: "Hoodies, stickers, the good water bottle",
    trailing: /*#__PURE__*/React.createElement(Icon, {
      name: "external-link",
      size: 17,
      color: "var(--text-subtle)"
    }),
    onClick: () => {}
  }), /*#__PURE__*/React.createElement(MoreLinkRow, {
    icon: "bell",
    tone: "blue",
    title: "Notification settings",
    sub: "Push, email, what pings you",
    onClick: () => {}
  }), /*#__PURE__*/React.createElement(MoreLinkRow, {
    icon: "life-buoy",
    tone: "green",
    title: "Help & FAQ",
    sub: "Get answers, contact People Ops",
    onClick: () => {},
    last: true
  })));
}
Object.assign(window, {
  MoreScreen,
  MoreLinkRow
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/commons/MoreScreen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/commons/OnboardingScreen.jsx
try { (() => {
/* ============================================================
   Commons UI kit — Onboarding / Preboarding (full sheet)
   Installable between offer and day one.
   ============================================================ */

function OnboardingScreen({
  onboarding,
  checklist,
  onToggle,
  onClose
}) {
  const done = checklist.filter(c => c.done).length;
  return /*#__PURE__*/React.createElement("div", {
    className: "commons",
    style: {
      position: 'absolute',
      inset: 0,
      zIndex: 70,
      background: 'var(--bg)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "c-header",
    style: {
      paddingTop: 56
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "c-row",
    style: {
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("button", {
    className: "c-iconbtn",
    onClick: onClose,
    "aria-label": "Back"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "chevron-left",
    size: 20
  })), /*#__PURE__*/React.createElement("div", {
    className: "c-h-title"
  }, "Welcome to Shyft"))), /*#__PURE__*/React.createElement("div", {
    className: "c-scroll"
  }, /*#__PURE__*/React.createElement("div", {
    className: "c-card pad",
    style: {
      background: 'var(--charcoal-900)',
      border: 'none',
      textAlign: 'center',
      padding: '24px 20px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      font: '500 12.5px/1 var(--font-ui)',
      color: 'var(--charcoal-400)',
      textTransform: 'uppercase',
      letterSpacing: '.06em'
    }
  }, "Your first day"), /*#__PURE__*/React.createElement("div", {
    style: {
      font: '600 44px/1 var(--font-display)',
      color: '#fff',
      letterSpacing: '-.02em',
      margin: '12px 0 6px'
    }
  }, onboarding.daysToStart, " ", /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 20,
      color: 'var(--blue-300)'
    }
  }, "days")), /*#__PURE__*/React.createElement("div", {
    style: {
      font: '400 13px/1 var(--font-ui)',
      color: 'var(--charcoal-300)'
    }
  }, onboarding.startDate)), /*#__PURE__*/React.createElement("div", {
    className: "c-row",
    style: {
      justifyContent: 'space-between'
    }
  }, /*#__PURE__*/React.createElement(SectionHeader, {
    title: "Before you start"
  }), /*#__PURE__*/React.createElement("span", {
    className: "c-meta c-num"
  }, done, "/", checklist.length, " done")), /*#__PURE__*/React.createElement("div", {
    className: "c-card",
    style: {
      overflow: 'hidden'
    }
  }, checklist.map((c, i) => /*#__PURE__*/React.createElement("button", {
    key: c.id,
    onClick: () => onToggle(c.id),
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 12,
      width: '100%',
      textAlign: 'left',
      padding: '13px 16px',
      background: 'transparent',
      border: 'none',
      cursor: 'pointer',
      borderBottom: i === checklist.length - 1 ? 'none' : '1px solid var(--border)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 22,
      height: 22,
      borderRadius: 'var(--r-full)',
      flex: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: c.done ? 'var(--success)' : 'transparent',
      border: c.done ? 'none' : '1.5px solid var(--border-strong)'
    }
  }, c.done && /*#__PURE__*/React.createElement(Icon, {
    name: "check",
    size: 14,
    color: "#fff",
    strokeWidth: 3
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1,
      font: '500 14px/1.3 var(--font-ui)',
      color: c.done ? 'var(--text-subtle)' : 'var(--text)',
      textDecoration: c.done ? 'line-through' : 'none'
    }
  }, c.label), /*#__PURE__*/React.createElement("span", {
    className: "c-meta"
  }, c.meta)))), /*#__PURE__*/React.createElement("div", {
    className: "c-card tap",
    style: {
      padding: 16,
      display: 'flex',
      alignItems: 'center',
      gap: 14
    }
  }, /*#__PURE__*/React.createElement(IconTile, {
    icon: "book-open",
    bg: "var(--purple-300)",
    fg: "var(--purple-700)",
    size: 44
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      font: '600 14px/1.2 var(--font-ui)'
    }
  }, "Culture handbook"), /*#__PURE__*/React.createElement("div", {
    className: "c-meta",
    style: {
      marginTop: 2
    }
  }, "How we work, what we value \xB7 8 min read")), /*#__PURE__*/React.createElement(Icon, {
    name: "chevron-right",
    size: 19,
    color: "var(--text-subtle)"
  })), /*#__PURE__*/React.createElement(SectionHeader, {
    title: "Who you'll meet"
  }), /*#__PURE__*/React.createElement("div", {
    className: "c-card pad",
    style: {
      paddingTop: 4,
      paddingBottom: 4
    }
  }, onboarding.whoswho.map((p, i) => /*#__PURE__*/React.createElement("div", {
    key: p.name,
    className: "c-row",
    style: {
      gap: 12,
      padding: '12px 0',
      borderBottom: i === onboarding.whoswho.length - 1 ? 'none' : '1px solid var(--border)'
    }
  }, /*#__PURE__*/React.createElement(Avatar, {
    name: p.name,
    size: 40
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      font: '600 13.5px/1.2 var(--font-ui)'
    }
  }, p.name), /*#__PURE__*/React.createElement("div", {
    className: "c-meta",
    style: {
      marginTop: 2
    }
  }, p.role, " \xB7 ", p.team)), /*#__PURE__*/React.createElement("button", {
    className: "c-iconbtn",
    style: {
      width: 34,
      height: 34
    },
    "aria-label": "Message"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "message-circle",
    size: 16
  }))))), /*#__PURE__*/React.createElement(SectionHeader, {
    title: "Day-one details"
  }), /*#__PURE__*/React.createElement("div", {
    className: "c-card pad",
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 0
    }
  }, onboarding.facts.map((f, i) => /*#__PURE__*/React.createElement("div", {
    key: f.k,
    className: "c-row",
    style: {
      gap: 13,
      padding: '12px 0',
      borderBottom: i === onboarding.facts.length - 1 ? 'none' : '1px solid var(--border)'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: f.icon,
    size: 18,
    color: "var(--accent)"
  }), /*#__PURE__*/React.createElement("span", {
    className: "c-meta",
    style: {
      width: 70,
      flex: 'none'
    }
  }, f.k), /*#__PURE__*/React.createElement("span", {
    style: {
      font: '500 13.5px/1.3 var(--font-ui)',
      flex: 1
    }
  }, f.v)))), /*#__PURE__*/React.createElement("div", {
    className: "c-meta",
    style: {
      textAlign: 'center',
      padding: '4px 20px 8px'
    }
  }, "Questions before you start? Message Priya, your onboarding buddy.")));
}
Object.assign(window, {
  OnboardingScreen
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/commons/OnboardingScreen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/commons/PeopleScreen.jsx
try { (() => {
/* ============================================================
   Commons UI kit — People (directory · who's out · holidays)
   Tap a teammate → profile with "Kudos received".
   ============================================================ */

function PeopleScreen({
  people,
  out,
  holidays,
  onOpenProfile
}) {
  const [tab, setTab] = useState('Directory');
  return /*#__PURE__*/React.createElement("div", {
    className: "c-scroll"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 9,
      height: 40,
      padding: '0 12px',
      border: '1px solid var(--border-strong)',
      borderRadius: 'var(--r-md)',
      background: 'var(--bg-elev)'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "search",
    size: 17,
    color: "var(--text-subtle)"
  }), /*#__PURE__*/React.createElement("span", {
    className: "c-meta"
  }, "Search people, teams\u2026")), /*#__PURE__*/React.createElement(Segmented, {
    options: ['Directory', 'Out', 'Holidays'],
    value: tab,
    onChange: setTab
  }), tab === 'Directory' && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(SectionHeader, {
    title: people.length + ' teammates'
  }), /*#__PURE__*/React.createElement("div", {
    className: "c-card pad",
    style: {
      paddingTop: 2,
      paddingBottom: 2
    }
  }, people.map((p, i) => /*#__PURE__*/React.createElement("button", {
    key: p.id,
    onClick: () => onOpenProfile(p),
    className: "c-row",
    style: {
      gap: 12,
      padding: '11px 0',
      width: '100%',
      textAlign: 'left',
      background: 'transparent',
      border: 'none',
      cursor: 'pointer',
      borderBottom: i === people.length - 1 ? 'none' : '1px solid var(--border)'
    }
  }, /*#__PURE__*/React.createElement(Avatar, {
    name: p.name,
    size: 40
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      font: '600 13.5px/1.2 var(--font-ui)'
    }
  }, p.name), /*#__PURE__*/React.createElement("div", {
    className: "c-meta",
    style: {
      marginTop: 2
    }
  }, p.role, " \xB7 ", p.team)), p.kudos.length > 0 && /*#__PURE__*/React.createElement("span", {
    className: "c-row",
    style: {
      gap: 5,
      color: 'var(--text-subtle)'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "party-popper",
    size: 14,
    color: "var(--text-subtle)"
  }), /*#__PURE__*/React.createElement("span", {
    className: "c-num",
    style: {
      font: '600 12px var(--font-mono)'
    }
  }, p.kudos.length)), /*#__PURE__*/React.createElement(Icon, {
    name: "chevron-right",
    size: 17,
    color: "var(--text-subtle)"
  }))))), tab === 'Out' && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(SectionHeader, {
    title: "Out today"
  }), /*#__PURE__*/React.createElement("div", {
    className: "c-card pad",
    style: {
      paddingTop: 4,
      paddingBottom: 4
    }
  }, out.map((o, i) => /*#__PURE__*/React.createElement(OutRow, {
    key: o.name,
    o: o,
    last: i === out.length - 1
  }))), /*#__PURE__*/React.createElement("div", {
    className: "c-row",
    style: {
      gap: 8,
      marginTop: 4,
      color: 'var(--text-subtle)'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "info",
    size: 14,
    color: "var(--text-subtle)"
  }), /*#__PURE__*/React.createElement("span", {
    className: "c-meta"
  }, "Request time off in Workday \u2014 it syncs here automatically."))), tab === 'Holidays' && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(SectionHeader, {
    title: "Company holidays"
  }), /*#__PURE__*/React.createElement("div", {
    className: "c-card",
    style: {
      overflow: 'hidden'
    }
  }, holidays.map((h, i) => /*#__PURE__*/React.createElement("div", {
    key: h.name,
    className: "c-row",
    style: {
      gap: 14,
      padding: '14px 16px',
      borderBottom: i === holidays.length - 1 ? 'none' : '1px solid var(--border)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: 'center',
      width: 42,
      flex: 'none'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      font: '600 15px/1 var(--font-display)',
      color: 'var(--accent)'
    }
  }, h.date.split(' ')[1]), /*#__PURE__*/React.createElement("div", {
    className: "c-meta",
    style: {
      fontSize: 10.5,
      textTransform: 'uppercase',
      letterSpacing: '.04em'
    }
  }, h.date.split(' ')[0])), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      font: '500 14px/1.2 var(--font-ui)'
    }
  }, h.name), /*#__PURE__*/React.createElement("div", {
    className: "c-meta",
    style: {
      marginTop: 2
    }
  }, h.day)), h.closed && /*#__PURE__*/React.createElement(Pill, {
    tone: "neutral",
    dot: false
  }, "Office closed"))))));
}

/* ---------- Profile (full-screen overlay) with Kudos received ---------- */
function ProfileScreen({
  p,
  onClose
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "commons",
    style: {
      position: 'absolute',
      inset: 0,
      zIndex: 70,
      background: 'var(--bg)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "c-header",
    style: {
      paddingTop: 56
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "c-row",
    style: {
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("button", {
    className: "c-iconbtn",
    onClick: onClose,
    "aria-label": "Back"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "chevron-left",
    size: 20
  })), /*#__PURE__*/React.createElement("div", {
    className: "c-h-title"
  }, "Profile"))), /*#__PURE__*/React.createElement("div", {
    className: "c-scroll"
  }, /*#__PURE__*/React.createElement("div", {
    className: "c-card pad",
    style: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      textAlign: 'center',
      padding: '24px 20px'
    }
  }, /*#__PURE__*/React.createElement(Avatar, {
    name: p.name,
    size: 72
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      font: '600 19px/1.2 var(--font-display)',
      letterSpacing: '-.01em',
      marginTop: 12
    }
  }, p.name), /*#__PURE__*/React.createElement("div", {
    className: "c-meta",
    style: {
      marginTop: 4
    }
  }, p.role, " \xB7 ", p.team), /*#__PURE__*/React.createElement("div", {
    className: "c-row",
    style: {
      gap: 6,
      marginTop: 6
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "map-pin",
    size: 13,
    color: "var(--text-subtle)"
  }), /*#__PURE__*/React.createElement("span", {
    className: "c-meta"
  }, p.loc)), /*#__PURE__*/React.createElement("div", {
    className: "c-row",
    style: {
      gap: 10,
      marginTop: 16
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    size: "sm",
    icon: "message-circle",
    onClick: () => {}
  }, "Message"), /*#__PURE__*/React.createElement(Button, {
    variant: "secondary",
    size: "sm",
    icon: "party-popper",
    onClick: () => {}
  }, "Give kudos"))), /*#__PURE__*/React.createElement("div", {
    className: "c-row",
    style: {
      justifyContent: 'space-between'
    }
  }, /*#__PURE__*/React.createElement(SectionHeader, {
    title: "Kudos received"
  }), /*#__PURE__*/React.createElement("span", {
    className: "c-meta c-num"
  }, p.kudos.length)), p.kudos.length === 0 ? /*#__PURE__*/React.createElement("div", {
    className: "c-card pad",
    style: {
      textAlign: 'center',
      padding: '28px 24px'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "party-popper",
    size: 24,
    color: "var(--charcoal-300)"
  }), /*#__PURE__*/React.createElement("div", {
    className: "c-meta",
    style: {
      marginTop: 8
    }
  }, "No kudos yet \u2014 be the first to recognize ", p.name.split(' ')[0], ".")) : p.kudos.map((k, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    className: "c-card pad"
  }, /*#__PURE__*/React.createElement("div", {
    className: "c-row",
    style: {
      gap: 9,
      justifyContent: 'space-between'
    }
  }, /*#__PURE__*/React.createElement(Pill, {
    tone: VALUE_TONE[k.value] || 'blue',
    dot: true
  }, k.value), /*#__PURE__*/React.createElement("span", {
    className: "c-meta"
  }, k.time)), /*#__PURE__*/React.createElement("div", {
    className: "c-body-14",
    style: {
      color: 'var(--text)',
      marginTop: 10
    }
  }, k.text), /*#__PURE__*/React.createElement("div", {
    className: "c-row",
    style: {
      gap: 8,
      marginTop: 11
    }
  }, /*#__PURE__*/React.createElement(Avatar, {
    name: k.from,
    size: 24
  }), /*#__PURE__*/React.createElement("span", {
    className: "c-meta"
  }, "from ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--text-muted)',
      fontWeight: 500
    }
  }, k.from)))))));
}
Object.assign(window, {
  PeopleScreen,
  ProfileScreen
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/commons/PeopleScreen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/commons/Plugins.jsx
try { (() => {
/* ============================================================
   Commons UI kit — Plugins
   The extensibility layer. Three surfaces, kept deliberately small:
     1. PluginSlot   — installed plugins render INTO Today / You.
     2. AppsScreen   — directory: browse + install (everyone).
     3. DeveloperScreen — publish console (role-gated).
   ============================================================ */

/* ---------- Stars (compact rating) ---------- */
function Stars({
  value
}) {
  if (value == null) return null;
  return /*#__PURE__*/React.createElement("span", {
    className: "c-row",
    style: {
      gap: 3
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "star",
    size: 12,
    color: "var(--orange-700)",
    style: {
      fill: 'var(--orange-700)'
    }
  }), /*#__PURE__*/React.createElement("span", {
    className: "c-num",
    style: {
      font: '600 11.5px var(--font-mono)',
      color: 'var(--text-muted)'
    }
  }, value.toFixed(1)));
}

/* ============================================================
   1 · PLUGIN WIDGET — the inline card a plugin renders in a slot
   ============================================================ */
function PluginWidget({
  p,
  onOpen
}) {
  const w = p.widget || {};
  const accent = 'var(--' + p.tone + '-700)';
  return /*#__PURE__*/React.createElement("div", {
    className: "c-card",
    style: {
      padding: 14,
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "c-row",
    style: {
      gap: 10,
      marginBottom: 11
    }
  }, /*#__PURE__*/React.createElement(IconTile, {
    icon: p.icon,
    bg: 'var(--' + p.tone + '-300)',
    fg: accent,
    size: 32,
    iconSize: 17
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      font: '600 13px/1.2 var(--font-ui)'
    }
  }, p.name), /*#__PURE__*/React.createElement("div", {
    className: "c-meta",
    style: {
      marginTop: 1,
      fontSize: 11
    }
  }, "via ", p.dev)), /*#__PURE__*/React.createElement("button", {
    onClick: onOpen,
    className: "c-iconbtn",
    style: {
      width: 28,
      height: 28
    },
    "aria-label": "Plugin options"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "ellipsis",
    size: 15
  }))), w.kind === 'next' && /*#__PURE__*/React.createElement("div", {
    className: "c-row",
    style: {
      alignItems: 'baseline',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "c-num",
    style: {
      font: '600 26px/1 var(--font-display)',
      letterSpacing: '-.02em',
      color: accent
    }
  }, w.value), /*#__PURE__*/React.createElement("span", {
    className: "c-meta",
    style: {
      fontSize: 12
    }
  }, w.unit), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: 'right'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      font: '500 12px/1.3 var(--font-ui)',
      color: 'var(--text)'
    }
  }, w.label), /*#__PURE__*/React.createElement("div", {
    className: "c-row",
    style: {
      gap: 4,
      justifyContent: 'flex-end',
      marginTop: 2
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "pdot",
    style: {
      width: 6,
      height: 6,
      borderRadius: 99,
      background: 'var(--success)'
    }
  }), /*#__PURE__*/React.createElement("span", {
    className: "c-meta",
    style: {
      fontSize: 11
    }
  }, w.note)))), w.kind === 'list' && /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "c-meta",
    style: {
      fontSize: 11,
      marginBottom: 7
    }
  }, w.label), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 5
    }
  }, w.items.map((it, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    className: "c-row",
    style: {
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 5,
      height: 5,
      borderRadius: 99,
      background: accent,
      flex: 'none'
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      font: '400 12.5px/1.3 var(--font-ui)',
      color: 'var(--text)'
    }
  }, it))))), w.kind === 'stat' && /*#__PURE__*/React.createElement("div", {
    className: "c-row",
    style: {
      justifyContent: 'space-between',
      alignItems: 'flex-end'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "c-num",
    style: {
      font: '600 24px/1 var(--font-display)',
      letterSpacing: '-.02em'
    }
  }, w.value), /*#__PURE__*/React.createElement("div", {
    className: "c-meta",
    style: {
      fontSize: 11,
      marginTop: 3
    }
  }, w.label)), /*#__PURE__*/React.createElement(Pill, {
    tone: w.deltaTone || 'green',
    dot: false
  }, w.delta)), w.kind === 'progress' && /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "c-row",
    style: {
      justifyContent: 'space-between',
      alignItems: 'baseline',
      marginBottom: 7
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "c-row",
    style: {
      gap: 5,
      alignItems: 'baseline'
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "c-num",
    style: {
      font: '600 20px/1 var(--font-display)'
    }
  }, w.used), /*#__PURE__*/React.createElement("span", {
    className: "c-meta",
    style: {
      fontSize: 11
    }
  }, "of ", w.total, " ", w.unit)), /*#__PURE__*/React.createElement("span", {
    className: "c-meta",
    style: {
      fontSize: 11
    }
  }, w.label)), /*#__PURE__*/React.createElement("div", {
    style: {
      height: 6,
      background: 'var(--bg-sunken)',
      borderRadius: 99,
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      height: '100%',
      width: Math.round(w.used / w.total * 100) + '%',
      background: accent,
      borderRadius: 99
    }
  }))));
}

/* ---------- PLUGIN SLOT — drops all installed plugins for a slot ----------
   Renders nothing when nothing's installed (keeps screens uncluttered). */
function PluginSlot({
  slot,
  plugins,
  installed,
  onManage,
  onOpenPlugin
}) {
  const mine = plugins.filter(p => p.installed && p.slot === slot && installed.includes(p.id));
  if (mine.length === 0) return null;
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(SectionHeader, {
    title: "Your apps",
    action: "Manage",
    onAction: onManage
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 10
    }
  }, mine.map(p => /*#__PURE__*/React.createElement(PluginWidget, {
    key: p.id,
    p: p,
    onOpen: () => onOpenPlugin(p)
  }))));
}

/* ============================================================
   2 · APPS DIRECTORY — full-screen overlay, opened from More
   ============================================================ */
function AppRow({
  p,
  isInstalled,
  onOpen,
  onToggle,
  last
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "c-row",
    style: {
      gap: 12,
      padding: '13px 0',
      borderBottom: last ? 'none' : '1px solid var(--border)'
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: onOpen,
    className: "c-row",
    style: {
      gap: 12,
      flex: 1,
      minWidth: 0,
      background: 'transparent',
      border: 'none',
      cursor: 'pointer',
      textAlign: 'left',
      padding: 0
    }
  }, /*#__PURE__*/React.createElement(IconTile, {
    icon: p.icon,
    bg: 'var(--' + p.tone + '-300)',
    fg: 'var(--' + p.tone + '-700)',
    size: 42
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      font: '600 13.5px/1.2 var(--font-ui)'
    }
  }, p.name), /*#__PURE__*/React.createElement("div", {
    className: "c-meta",
    style: {
      marginTop: 2,
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis'
    }
  }, p.blurb), /*#__PURE__*/React.createElement("div", {
    className: "c-row",
    style: {
      gap: 9,
      marginTop: 5
    }
  }, /*#__PURE__*/React.createElement(Stars, {
    value: p.rating
  }), /*#__PURE__*/React.createElement("span", {
    className: "c-meta",
    style: {
      fontSize: 11
    }
  }, (p.installs / 1000).toFixed(1), "k installs \xB7 ", p.dev)))), /*#__PURE__*/React.createElement(Button, {
    variant: isInstalled ? 'secondary' : 'primary',
    size: "sm",
    icon: isInstalled ? 'check' : 'plus',
    onClick: () => onToggle(p.id)
  }, isInstalled ? 'Added' : 'Add'));
}
function AppsScreen({
  plugins,
  installed,
  categories,
  onClose,
  onToggle,
  onOpenPlugin,
  onOpenDeveloper,
  isDeveloper
}) {
  const [cat, setCat] = useState('All');
  const list = plugins.filter(p => cat === 'All' || p.category === cat);
  const installedCount = installed.length;
  return /*#__PURE__*/React.createElement("div", {
    className: "commons",
    style: {
      position: 'absolute',
      inset: 0,
      zIndex: 70,
      background: 'var(--bg)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "c-header",
    style: {
      paddingTop: 56
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "c-row",
    style: {
      gap: 10,
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("button", {
    className: "c-iconbtn",
    onClick: onClose,
    "aria-label": "Back"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "chevron-left",
    size: 20
  })), /*#__PURE__*/React.createElement("div", {
    className: "c-h-title"
  }, "Apps"), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }), /*#__PURE__*/React.createElement("span", {
    className: "c-meta c-num"
  }, installedCount, " installed"))), /*#__PURE__*/React.createElement("div", {
    className: "c-scroll"
  }, /*#__PURE__*/React.createElement("div", {
    className: "c-meta",
    style: {
      marginTop: -2
    }
  }, "Extensions built by teams across Shyft. Add one and it shows up right inside the app."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 7,
      overflowX: 'auto',
      margin: '2px -16px 0',
      padding: '0 16px 2px'
    }
  }, categories.map(c => /*#__PURE__*/React.createElement("button", {
    key: c,
    onClick: () => setCat(c),
    style: {
      flex: 'none',
      font: '600 12.5px/1 var(--font-ui)',
      padding: '8px 13px',
      borderRadius: 'var(--r-full)',
      cursor: 'pointer',
      border: '1px solid ' + (cat === c ? 'transparent' : 'var(--border-strong)'),
      background: cat === c ? 'var(--charcoal-900)' : 'var(--bg-elev)',
      color: cat === c ? '#fff' : 'var(--text-muted)'
    }
  }, c))), /*#__PURE__*/React.createElement("div", {
    className: "c-card pad",
    style: {
      paddingTop: 2,
      paddingBottom: 2,
      marginTop: 2
    }
  }, list.map((p, i) => /*#__PURE__*/React.createElement(AppRow, {
    key: p.id,
    p: p,
    isInstalled: installed.includes(p.id),
    onOpen: () => onOpenPlugin(p),
    onToggle: onToggle,
    last: i === list.length - 1
  }))), /*#__PURE__*/React.createElement("button", {
    onClick: onOpenDeveloper,
    className: "c-card tap",
    style: {
      width: '100%',
      textAlign: 'left',
      border: '1px dashed var(--border-strong)',
      background: 'var(--bg-subtle)',
      padding: 15,
      display: 'flex',
      alignItems: 'center',
      gap: 13,
      cursor: 'pointer'
    }
  }, /*#__PURE__*/React.createElement(IconTile, {
    icon: "code-xml",
    bg: "var(--bg-elev)",
    fg: "var(--text-muted)",
    size: 38
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      font: '600 13.5px/1.2 var(--font-ui)'
    }
  }, "Build your own"), /*#__PURE__*/React.createElement("div", {
    className: "c-meta",
    style: {
      marginTop: 2
    }
  }, isDeveloper ? 'Open the developer console' : 'See the docs and request developer access')), /*#__PURE__*/React.createElement(Icon, {
    name: "arrow-up-right",
    size: 18,
    color: "var(--text-subtle)"
  }))));
}

/* ---------- Plugin detail sheet (install + permissions) ---------- */
function PluginSheet({
  p,
  isInstalled,
  onToggle,
  onClose
}) {
  return /*#__PURE__*/React.createElement(Sheet, {
    onClose: onClose,
    title: "App details"
  }, /*#__PURE__*/React.createElement("div", {
    className: "c-row",
    style: {
      gap: 13
    }
  }, /*#__PURE__*/React.createElement(IconTile, {
    icon: p.icon,
    bg: 'var(--' + p.tone + '-300)',
    fg: 'var(--' + p.tone + '-700)',
    size: 54
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      font: '600 18px/1.2 var(--font-display)',
      letterSpacing: '-.01em'
    }
  }, p.name), /*#__PURE__*/React.createElement("div", {
    className: "c-meta",
    style: {
      marginTop: 3
    }
  }, "by ", p.dev))), /*#__PURE__*/React.createElement("div", {
    className: "c-row",
    style: {
      gap: 0,
      justifyContent: 'space-between',
      padding: '12px 4px',
      borderTop: '1px solid var(--border)',
      borderBottom: '1px solid var(--border)'
    }
  }, [['Rating', p.rating ? p.rating.toFixed(1) : '—'], ['Installs', (p.installs / 1000).toFixed(1) + 'k'], ['Category', p.category]].map(([k, v], i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      flex: 1,
      textAlign: 'center',
      borderLeft: i ? '1px solid var(--border)' : 'none'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "c-num",
    style: {
      font: '600 15px/1 var(--font-display)'
    }
  }, v), /*#__PURE__*/React.createElement("div", {
    className: "c-meta",
    style: {
      fontSize: 11,
      marginTop: 3
    }
  }, k)))), /*#__PURE__*/React.createElement("div", {
    className: "c-body-14",
    style: {
      color: 'var(--text-muted)'
    }
  }, p.blurb), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      font: '600 12px/1 var(--font-ui)',
      textTransform: 'uppercase',
      letterSpacing: '.06em',
      color: 'var(--text-subtle)',
      marginBottom: 10
    }
  }, "Permissions"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 9
    }
  }, p.permissions.map((perm, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    className: "c-row",
    style: {
      gap: 9
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "shield-check",
    size: 15,
    color: "var(--text-muted)"
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      font: '400 13px/1.3 var(--font-ui)',
      color: 'var(--text)'
    }
  }, perm))))), /*#__PURE__*/React.createElement(Button, {
    variant: isInstalled ? 'secondary' : 'primary',
    block: true,
    icon: isInstalled ? 'trash-2' : 'download',
    onClick: () => {
      onToggle(p.id);
    }
  }, isInstalled ? 'Remove app' : 'Add to my Commons'));
}

/* ============================================================
   3 · DEVELOPER CONSOLE — role-gated, opened from More
   ============================================================ */
function DeveloperScreen({
  devPlugins,
  statusTone,
  onClose
}) {
  const published = devPlugins.filter(d => d.status === 'Published');
  const totalInstalls = published.reduce((s, d) => s + d.installs, 0);
  return /*#__PURE__*/React.createElement("div", {
    className: "commons",
    style: {
      position: 'absolute',
      inset: 0,
      zIndex: 70,
      background: 'var(--bg)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "c-header",
    style: {
      paddingTop: 56
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "c-row",
    style: {
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("button", {
    className: "c-iconbtn",
    onClick: onClose,
    "aria-label": "Back"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "chevron-left",
    size: 20
  })), /*#__PURE__*/React.createElement("div", {
    className: "c-h-title"
  }, "Developer"))), /*#__PURE__*/React.createElement("div", {
    className: "c-scroll"
  }, /*#__PURE__*/React.createElement("div", {
    className: "c-card pad",
    style: {
      background: 'var(--charcoal-900)',
      border: 'none',
      padding: '18px 20px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "c-row",
    style: {
      gap: 8
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "code-xml",
    size: 16,
    color: "var(--blue-300)"
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      font: '500 12px/1 var(--font-ui)',
      color: 'var(--charcoal-400)',
      textTransform: 'uppercase',
      letterSpacing: '.06em'
    }
  }, "Your published apps")), /*#__PURE__*/React.createElement("div", {
    className: "c-row",
    style: {
      gap: 24,
      marginTop: 14
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "c-num",
    style: {
      font: '600 26px/1 var(--font-display)',
      color: '#fff',
      letterSpacing: '-.02em'
    }
  }, totalInstalls.toLocaleString()), /*#__PURE__*/React.createElement("div", {
    className: "c-meta",
    style: {
      color: 'var(--charcoal-400)',
      marginTop: 4
    }
  }, "total installs")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "c-num",
    style: {
      font: '600 26px/1 var(--font-display)',
      color: '#fff',
      letterSpacing: '-.02em'
    }
  }, published.length), /*#__PURE__*/React.createElement("div", {
    className: "c-meta",
    style: {
      color: 'var(--charcoal-400)',
      marginTop: 4
    }
  }, "live")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "c-num",
    style: {
      font: '600 26px/1 var(--font-display)',
      color: '#fff',
      letterSpacing: '-.02em'
    }
  }, "4.8"), /*#__PURE__*/React.createElement("div", {
    className: "c-meta",
    style: {
      color: 'var(--charcoal-400)',
      marginTop: 4
    }
  }, "avg rating")))), /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    block: true,
    icon: "plus",
    onClick: () => {}
  }, "New plugin"), /*#__PURE__*/React.createElement(SectionHeader, {
    title: "Your plugins"
  }), /*#__PURE__*/React.createElement("div", {
    className: "c-card pad",
    style: {
      paddingTop: 2,
      paddingBottom: 2
    }
  }, devPlugins.map((d, i) => /*#__PURE__*/React.createElement("div", {
    key: d.id,
    className: "c-row",
    style: {
      gap: 12,
      padding: '13px 0',
      borderBottom: i === devPlugins.length - 1 ? 'none' : '1px solid var(--border)'
    }
  }, /*#__PURE__*/React.createElement(IconTile, {
    icon: d.icon,
    bg: 'var(--' + d.tone + '-300)',
    fg: 'var(--' + d.tone + '-700)',
    size: 40
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "c-row",
    style: {
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      font: '600 13.5px/1.2 var(--font-ui)',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis'
    }
  }, d.name), /*#__PURE__*/React.createElement("span", {
    className: "c-meta c-num",
    style: {
      fontSize: 11,
      flex: 'none'
    }
  }, d.version)), /*#__PURE__*/React.createElement("div", {
    className: "c-meta",
    style: {
      marginTop: 3
    }
  }, d.note), d.status === 'Published' && /*#__PURE__*/React.createElement("div", {
    className: "c-row",
    style: {
      gap: 10,
      marginTop: 5
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "c-meta",
    style: {
      fontSize: 11
    }
  }, d.installs.toLocaleString(), " installs"), /*#__PURE__*/React.createElement(Stars, {
    value: d.rating
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-end',
      gap: 8,
      flex: 'none'
    }
  }, /*#__PURE__*/React.createElement(Pill, {
    tone: statusTone[d.status] || 'neutral',
    dot: d.status === 'In review'
  }, d.status), /*#__PURE__*/React.createElement(Icon, {
    name: "chevron-right",
    size: 17,
    color: "var(--text-subtle)"
  }))))), /*#__PURE__*/React.createElement(SectionHeader, {
    title: "Resources"
  }), /*#__PURE__*/React.createElement("div", {
    className: "c-card pad",
    style: {
      paddingTop: 2,
      paddingBottom: 2
    }
  }, /*#__PURE__*/React.createElement(MoreLinkRow, {
    icon: "book-open",
    tone: "blue",
    title: "Plugin SDK docs",
    sub: "Slots, APIs, design guidelines",
    trailing: /*#__PURE__*/React.createElement(Icon, {
      name: "external-link",
      size: 17,
      color: "var(--text-subtle)"
    }),
    onClick: () => {}
  }), /*#__PURE__*/React.createElement(MoreLinkRow, {
    icon: "git-branch",
    tone: "purple",
    title: "Sample plugins",
    sub: "Starter repos on GitHub",
    trailing: /*#__PURE__*/React.createElement(Icon, {
      name: "external-link",
      size: 17,
      color: "var(--text-subtle)"
    }),
    onClick: () => {}
  }), /*#__PURE__*/React.createElement(MoreLinkRow, {
    icon: "messages-square",
    tone: "green",
    title: "#plugin-developers",
    sub: "Get help from the platform team",
    onClick: () => {},
    last: true
  })), /*#__PURE__*/React.createElement("div", {
    className: "c-meta",
    style: {
      textAlign: 'center',
      padding: '2px 24px 8px'
    }
  }, "Submissions are reviewed by the platform team against the Clarity design and security guidelines.")));
}
Object.assign(window, {
  PluginWidget,
  PluginSlot,
  AppsScreen,
  PluginSheet,
  DeveloperScreen,
  Stars
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/commons/Plugins.jsx", error: String((e && e.message) || e) }); }

// ui_kits/commons/Primitives.jsx
try { (() => {
/* ============================================================
   Commons UI kit — primitives
   Icon (Lucide), Avatar, Pill, Tag, IconTile, Button,
   SectionHeader, Segmented, StatusBanner.
   ============================================================ */
const {
  useState,
  useEffect,
  useRef
} = React;

/* ---- Lucide icon. Renders an <i data-lucide> then converts. ---- */
function Icon({
  name,
  size = 20,
  strokeWidth = 2,
  color,
  style = {}
}) {
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
      window.lucide.createIcons({
        attrs: {
          'stroke-width': strokeWidth
        },
        nameAttr: 'data-lucide'
      });
      return true;
    };
    if (!paint()) {
      let tries = 0;
      const t = setInterval(() => {
        if (paint() || tries++ > 50) clearInterval(t);
      }, 40);
      return () => clearInterval(t);
    }
  }, [name, strokeWidth]);
  return /*#__PURE__*/React.createElement("span", {
    ref: ref,
    className: "cl-ico",
    style: {
      width: size,
      height: size,
      color,
      ...style
    }
  });
}

/* ---- Avatar — initials in a deterministic charcoal/blue tone ---- */
const AV_TONES = ['#329af0', '#1c7ed6', '#495057', '#9c36b5', '#2f9e44', '#e8590c', '#1971c2', '#868e96'];
function avTone(name = '') {
  let h = 0;
  for (let i = 0; i < name.length; i++) h = h * 31 + name.charCodeAt(i) >>> 0;
  return AV_TONES[h % AV_TONES.length];
}
function initials(name = '') {
  return name.trim().split(/\s+/).slice(0, 2).map(w => w[0]).join('').toUpperCase();
}
function Avatar({
  name = '',
  size = 38,
  src,
  style = {},
  ring
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "c-avatar",
    style: {
      width: size,
      height: size,
      fontSize: size * 0.4,
      background: avTone(name),
      boxShadow: ring ? `0 0 0 2px var(--bg-elev), 0 0 0 4px ${ring}` : undefined,
      ...style
    }
  }, src ? /*#__PURE__*/React.createElement("img", {
    src: src,
    alt: name,
    style: {
      width: '100%',
      height: '100%',
      objectFit: 'cover'
    }
  }) : initials(name));
}

/* ---- Status pill — one piece of state ---- */
const PILL_TONES = {
  blue: ['var(--blue-100)', 'var(--blue-800)', 'var(--blue-700)'],
  green: ['var(--green-300)', 'var(--green-700)', 'var(--green-700)'],
  orange: ['var(--orange-300)', 'var(--orange-700)', 'var(--orange-700)'],
  pink: ['var(--pink-300)', 'var(--pink-700)', 'var(--pink-700)'],
  purple: ['var(--purple-300)', 'var(--purple-700)', 'var(--purple-700)'],
  neutral: ['var(--charcoal-100)', 'var(--charcoal-700)', 'var(--charcoal-500)']
};
function Pill({
  children,
  tone = 'neutral',
  dot = true,
  style = {}
}) {
  const [bg, fg, d] = PILL_TONES[tone] || PILL_TONES.neutral;
  return /*#__PURE__*/React.createElement("span", {
    className: "c-pill",
    style: {
      background: bg,
      color: fg,
      ...style
    }
  }, dot && /*#__PURE__*/React.createElement("span", {
    className: "pdot",
    style: {
      background: d
    }
  }), children);
}

/* ---- Category / metadata tag (optional leading emoji glyph) ---- */
function Tag({
  children,
  style = {}
}) {
  return /*#__PURE__*/React.createElement("span", {
    className: "c-tag",
    style: style
  }, children);
}

/* ---- Rounded icon tile (category color) ---- */
function IconTile({
  icon,
  bg = 'var(--accent-soft)',
  fg = 'var(--accent)',
  size = 44,
  iconSize,
  style = {}
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "c-tile",
    style: {
      width: size,
      height: size,
      background: bg,
      ...style
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: icon,
    size: iconSize || size * 0.46,
    color: fg
  }));
}

/* ---- Button ---- */
function Button({
  children,
  variant = 'primary',
  size,
  block,
  icon,
  onClick,
  style = {}
}) {
  const cls = ['c-btn', variant, block ? 'block' : '', size === 'sm' ? 'sm' : ''].join(' ');
  return /*#__PURE__*/React.createElement("button", {
    className: cls,
    onClick: onClick,
    style: style
  }, icon && /*#__PURE__*/React.createElement(Icon, {
    name: icon,
    size: size === 'sm' ? 15 : 17
  }), children);
}

/* ---- Section header ---- */
function SectionHeader({
  title,
  action,
  onAction
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "c-section"
  }, /*#__PURE__*/React.createElement("h3", null, title), action && /*#__PURE__*/React.createElement("a", {
    onClick: onAction
  }, action));
}

/* ---- Segmented control ---- */
function Segmented({
  options,
  value,
  onChange
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "c-seg"
  }, options.map(o => /*#__PURE__*/React.createElement("button", {
    key: o,
    className: value === o ? 'on' : '',
    onClick: () => onChange(o)
  }, o)));
}

/* ---- Status banner (office-status / emergency) ---- */
const BANNER_TONES = {
  pink: ['var(--pink-300)', 'var(--pink-700)', 'rgba(194,37,92,.07)'],
  orange: ['var(--orange-300)', 'var(--orange-700)', 'rgba(232,89,12,.07)'],
  green: ['var(--green-300)', 'var(--green-700)', 'rgba(47,158,68,.07)'],
  blue: ['var(--blue-200)', 'var(--blue-700)', 'var(--blue-50)']
};
function StatusBanner({
  tone = 'green',
  icon = 'check-circle-2',
  title,
  text,
  action,
  onAction
}) {
  const [bd, fg, bg] = BANNER_TONES[tone] || BANNER_TONES.green;
  return /*#__PURE__*/React.createElement("div", {
    className: "c-banner",
    style: {
      borderColor: bd,
      background: bg
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: icon,
    size: 19,
    color: fg,
    style: {
      marginTop: 1
    }
  }), /*#__PURE__*/React.createElement("div", {
    className: "b-body"
  }, /*#__PURE__*/React.createElement("div", {
    className: "b-title",
    style: {
      color: fg
    }
  }, title), text && /*#__PURE__*/React.createElement("div", {
    className: "b-text",
    style: {
      color: 'var(--text-muted)'
    }
  }, text)), action && /*#__PURE__*/React.createElement("a", {
    onClick: onAction,
    style: {
      font: '600 12.5px/1 var(--font-ui)',
      color: fg,
      alignSelf: 'center',
      whiteSpace: 'nowrap'
    }
  }, action));
}
Object.assign(window, {
  Icon,
  Avatar,
  avTone,
  initials,
  Pill,
  Tag,
  IconTile,
  Button,
  SectionHeader,
  Segmented,
  StatusBanner
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/commons/Primitives.jsx", error: String((e && e.message) || e) }); }

// ui_kits/commons/Sheets.jsx
try { (() => {
/* ============================================================
   Commons UI kit — bottom sheets / overlays
   ============================================================ */

function Sheet({
  children,
  onClose,
  title
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "c-sheet-scrim",
    onClick: onClose
  }, /*#__PURE__*/React.createElement("div", {
    className: "c-sheet",
    onClick: e => e.stopPropagation()
  }, /*#__PURE__*/React.createElement("div", {
    className: "c-sheet-grab"
  }), title && /*#__PURE__*/React.createElement("div", {
    className: "c-row",
    style: {
      justifyContent: 'space-between',
      padding: '6px 16px 12px',
      borderBottom: '1px solid var(--border)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      font: '600 16px/1 var(--font-display)'
    }
  }, title), /*#__PURE__*/React.createElement("button", {
    className: "c-iconbtn",
    style: {
      width: 32,
      height: 32
    },
    onClick: onClose,
    "aria-label": "Close"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "x",
    size: 17
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      overflowY: 'auto',
      padding: 16,
      display: 'flex',
      flexDirection: 'column',
      gap: 14
    }
  }, children)));
}
function AnnouncementSheet({
  a,
  onClose
}) {
  return /*#__PURE__*/React.createElement(Sheet, {
    onClose: onClose,
    title: a.cat
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      font: '600 21px/1.25 var(--font-display)',
      letterSpacing: '-.01em'
    }
  }, a.title), /*#__PURE__*/React.createElement("div", {
    className: "c-row",
    style: {
      gap: 9
    }
  }, /*#__PURE__*/React.createElement(Avatar, {
    name: a.author,
    size: 32
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      font: '500 13px/1.2 var(--font-ui)'
    }
  }, a.author), /*#__PURE__*/React.createElement("div", {
    className: "c-meta"
  }, a.role, " \xB7 ", a.time))), /*#__PURE__*/React.createElement("div", {
    className: "c-body-14",
    style: {
      color: 'var(--text-muted)',
      lineHeight: 1.6
    }
  }, a.body), /*#__PURE__*/React.createElement("div", {
    className: "c-row",
    style: {
      gap: 10,
      paddingTop: 6,
      borderTop: '1px solid var(--border)'
    }
  }, /*#__PURE__*/React.createElement("button", {
    className: "c-row",
    style: {
      gap: 7,
      border: '1px solid var(--border-strong)',
      background: 'var(--bg-elev)',
      borderRadius: 'var(--r-full)',
      padding: '8px 14px',
      cursor: 'pointer'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "heart",
    size: 16,
    color: "var(--text-muted)"
  }), /*#__PURE__*/React.createElement("span", {
    className: "c-meta c-num",
    style: {
      color: 'var(--text)'
    }
  }, a.reactions)), /*#__PURE__*/React.createElement("button", {
    className: "c-row",
    style: {
      gap: 7,
      border: '1px solid var(--border-strong)',
      background: 'var(--bg-elev)',
      borderRadius: 'var(--r-full)',
      padding: '8px 14px',
      cursor: 'pointer'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "message-circle",
    size: 16,
    color: "var(--text-muted)"
  }), /*#__PURE__*/React.createElement("span", {
    className: "c-meta c-num",
    style: {
      color: 'var(--text)'
    }
  }, a.comments)), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }), /*#__PURE__*/React.createElement("button", {
    className: "c-iconbtn",
    "aria-label": "Share"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "share-2",
    size: 17
  }))));
}
const ATTENDEES = ['Maya Patel', 'Jordan Chen', 'Sam Okafor', 'Dana Whitfield', 'Marcus Bell', 'Riley Park'];
function EventSheet({
  e,
  onRSVP,
  onClose
}) {
  const pct = Math.round(e.going / e.capacity * 100);
  return /*#__PURE__*/React.createElement(Sheet, {
    onClose: onClose,
    title: e.cat
  }, /*#__PURE__*/React.createElement("div", {
    className: "c-row",
    style: {
      gap: 13
    }
  }, /*#__PURE__*/React.createElement(IconTile, {
    icon: e.icon,
    bg: 'var(--' + e.catTone + '-300)',
    fg: 'var(--' + e.catTone + '-700)',
    size: 50
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      font: '600 19px/1.25 var(--font-display)',
      letterSpacing: '-.01em',
      flex: 1
    }
  }, e.title)), /*#__PURE__*/React.createElement("div", {
    className: "c-card pad",
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 10,
      padding: 14
    }
  }, [['calendar', e.date], ['clock', e.time], ['map-pin', e.where], ['user', 'Hosted by ' + e.host]].map(([ic, tx], i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    className: "c-row",
    style: {
      gap: 10
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: ic,
    size: 16,
    color: "var(--accent)"
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      font: '400 13.5px/1.3 var(--font-ui)',
      color: 'var(--text)'
    }
  }, tx)))), /*#__PURE__*/React.createElement("div", {
    className: "c-body-14",
    style: {
      color: 'var(--text-muted)'
    }
  }, e.desc), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "c-row",
    style: {
      justifyContent: 'space-between',
      marginBottom: 8
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "c-row",
    style: {
      gap: 6
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "c-num",
    style: {
      font: '600 13px var(--font-mono)'
    }
  }, e.going), /*#__PURE__*/React.createElement("span", {
    className: "c-meta"
  }, "going")), /*#__PURE__*/React.createElement("span", {
    className: "c-meta"
  }, e.capacity - e.going, " of ", e.capacity, " spots left")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      marginBottom: 6
    }
  }, ATTENDEES.map((n, i) => /*#__PURE__*/React.createElement("div", {
    key: n,
    style: {
      marginLeft: i === 0 ? 0 : -8
    }
  }, /*#__PURE__*/React.createElement(Avatar, {
    name: n,
    size: 30,
    ring: "var(--bg)"
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginLeft: -8,
      width: 30,
      height: 30,
      borderRadius: '50%',
      background: 'var(--bg-subtle)',
      border: '2px solid var(--bg)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      font: '600 10px var(--font-mono)',
      color: 'var(--text-muted)'
    }
  }, "+", e.going - ATTENDEES.length))), /*#__PURE__*/React.createElement("div", {
    className: "c-row",
    style: {
      gap: 10
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: e.rsvp === 'going' ? 'secondary' : 'primary',
    block: true,
    icon: e.rsvp === 'going' ? 'check' : 'calendar-plus',
    onClick: () => onRSVP(e.id)
  }, e.rsvp === 'going' ? "You're going" : 'RSVP — count me in'), /*#__PURE__*/React.createElement("button", {
    className: "c-iconbtn",
    "aria-label": "Share"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "share-2",
    size: 18
  }))));
}
function NotificationsSheet({
  onClose
}) {
  const items = [{
    icon: 'party-popper',
    tone: 'green',
    t: 'Priya gave you kudos',
    s: 'Customer obsession · 1h ago'
  }, {
    icon: 'calendar-check',
    tone: 'blue',
    t: 'Rooftop happy hour is Friday',
    s: "You RSVP'd going · 2h ago"
  }, {
    icon: 'megaphone',
    tone: 'orange',
    t: 'New announcement from IT',
    s: 'VPN maintenance Thu 8–10pm · 2h ago'
  }, {
    icon: 'gift',
    tone: 'purple',
    t: 'Referral update: interview scheduled',
    s: 'Your referral for Payments · Yesterday'
  }];
  return /*#__PURE__*/React.createElement(Sheet, {
    onClose: onClose,
    title: "Notifications"
  }, items.map((n, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    className: "c-row",
    style: {
      gap: 12,
      alignItems: 'flex-start'
    }
  }, /*#__PURE__*/React.createElement(IconTile, {
    icon: n.icon,
    bg: 'var(--' + n.tone + '-300)',
    fg: 'var(--' + n.tone + '-700)',
    size: 38
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      font: '500 13.5px/1.3 var(--font-ui)'
    }
  }, n.t), /*#__PURE__*/React.createElement("div", {
    className: "c-meta",
    style: {
      marginTop: 2
    }
  }, n.s)))));
}
Object.assign(window, {
  Sheet,
  AnnouncementSheet,
  EventSheet,
  NotificationsSheet
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/commons/Sheets.jsx", error: String((e && e.message) || e) }); }

// ui_kits/commons/StipendDetailScreen.jsx
try { (() => {
/* ============================================================
   Commons UI kit — Stipend detail (full-screen overlay)
   Transaction history · submit receipt · statuses · eligibility FAQ.
   ============================================================ */

const RECEIPT_TONE = {
  Pending: 'orange',
  Approved: 'blue',
  Reimbursed: 'green'
};
function StipendDetailScreen({
  s,
  onClose
}) {
  const remaining = s.total - s.used;
  const pct = Math.min(100, Math.round(s.used / s.total * 100));
  return /*#__PURE__*/React.createElement("div", {
    className: "commons",
    style: {
      position: 'absolute',
      inset: 0,
      zIndex: 70,
      background: 'var(--bg)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "c-header",
    style: {
      paddingTop: 56
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "c-row",
    style: {
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("button", {
    className: "c-iconbtn",
    onClick: onClose,
    "aria-label": "Back"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "chevron-left",
    size: 20
  })), /*#__PURE__*/React.createElement("div", {
    className: "c-h-title"
  }, s.label, " stipend"))), /*#__PURE__*/React.createElement("div", {
    className: "c-scroll"
  }, /*#__PURE__*/React.createElement("div", {
    className: "c-card pad",
    style: {
      background: 'var(--charcoal-900)',
      border: 'none',
      padding: '22px 20px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "c-row",
    style: {
      gap: 11
    }
  }, /*#__PURE__*/React.createElement(IconTile, {
    icon: s.icon,
    bg: 'rgba(255,255,255,.12)',
    fg: '#fff',
    size: 40
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      font: '500 12px/1 var(--font-ui)',
      color: 'var(--charcoal-400)',
      textTransform: 'uppercase',
      letterSpacing: '.06em'
    }
  }, "Remaining"), /*#__PURE__*/React.createElement("div", {
    className: "c-row",
    style: {
      gap: 7,
      alignItems: 'baseline',
      marginTop: 5
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "c-num",
    style: {
      font: '600 30px/1 var(--font-display)',
      color: '#fff',
      letterSpacing: '-.02em'
    }
  }, "$", remaining.toLocaleString()), /*#__PURE__*/React.createElement("span", {
    className: "c-num",
    style: {
      font: '400 13px var(--font-mono)',
      color: 'var(--charcoal-400)'
    }
  }, "of $", s.total.toLocaleString())))), /*#__PURE__*/React.createElement("div", {
    style: {
      height: 7,
      background: 'rgba(255,255,255,.14)',
      borderRadius: 99,
      overflow: 'hidden',
      margin: '16px 0 9px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      height: '100%',
      width: pct + '%',
      background: 'var(--' + s.tone + '-300)',
      borderRadius: 99
    }
  })), /*#__PURE__*/React.createElement("div", {
    className: "c-row",
    style: {
      justifyContent: 'space-between'
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "c-num",
    style: {
      font: '400 12px var(--font-mono)',
      color: 'var(--charcoal-300)'
    }
  }, "$", s.used.toLocaleString(), " used"), /*#__PURE__*/React.createElement("span", {
    className: "c-meta",
    style: {
      color: 'var(--charcoal-300)'
    }
  }, "Resets in ", s.resetsInDays, " days"))), /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    block: true,
    icon: "receipt",
    onClick: () => {}
  }, "Submit receipt"), /*#__PURE__*/React.createElement(SectionHeader, {
    title: "Transaction history"
  }), s.tx.length === 0 ? /*#__PURE__*/React.createElement("div", {
    className: "c-card pad",
    style: {
      textAlign: 'center',
      padding: '30px 24px'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "receipt-text",
    size: 26,
    color: "var(--charcoal-300)"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      font: '600 14px/1.3 var(--font-display)',
      marginTop: 10
    }
  }, "No claims yet"), /*#__PURE__*/React.createElement("div", {
    className: "c-meta",
    style: {
      marginTop: 4
    }
  }, "Submit a receipt and it'll show up here with its status.")) : /*#__PURE__*/React.createElement("div", {
    className: "c-card pad",
    style: {
      paddingTop: 2,
      paddingBottom: 2
    }
  }, s.tx.map((t, i) => /*#__PURE__*/React.createElement("div", {
    key: t.id,
    className: "c-row",
    style: {
      gap: 12,
      padding: '13px 0',
      borderBottom: i === s.tx.length - 1 ? 'none' : '1px solid var(--border)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      font: '500 13.5px/1.25 var(--font-ui)'
    }
  }, t.title), /*#__PURE__*/React.createElement("div", {
    className: "c-row",
    style: {
      gap: 8,
      marginTop: 4
    }
  }, /*#__PURE__*/React.createElement(Pill, {
    tone: RECEIPT_TONE[t.status],
    dot: true
  }, t.status), /*#__PURE__*/React.createElement("span", {
    className: "c-meta"
  }, t.date))), /*#__PURE__*/React.createElement("span", {
    className: "c-num",
    style: {
      font: '600 14px var(--font-mono)',
      color: 'var(--text)'
    }
  }, "$", t.amount)))), /*#__PURE__*/React.createElement("div", {
    className: "c-card tap",
    style: {
      padding: 15,
      display: 'flex',
      alignItems: 'center',
      gap: 13
    }
  }, /*#__PURE__*/React.createElement(IconTile, {
    icon: "circle-help",
    bg: "var(--bg-subtle)",
    fg: "var(--text-muted)",
    size: 38
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      font: '600 13.5px/1.2 var(--font-ui)'
    }
  }, "What's eligible?"), /*#__PURE__*/React.createElement("div", {
    className: "c-meta",
    style: {
      marginTop: 2
    }
  }, s.blurb)), /*#__PURE__*/React.createElement(Icon, {
    name: "chevron-right",
    size: 18,
    color: "var(--text-subtle)"
  })), /*#__PURE__*/React.createElement("div", {
    className: "c-meta",
    style: {
      textAlign: 'center',
      padding: '2px 20px 8px'
    }
  }, "Reimbursements land in your next paycheck. Questions? Ask in #people-ops.")));
}
Object.assign(window, {
  StipendDetailScreen,
  RECEIPT_TONE
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/commons/StipendDetailScreen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/commons/TodayScreen.jsx
try { (() => {
/* ============================================================
   Commons UI kit — Today (home / backbone)
   ============================================================ */

function TodayScreen({
  announcements,
  events,
  kudos,
  status,
  weather,
  out,
  onOpenAnnouncement,
  onDeepLink,
  onRSVP,
  onCheer,
  onSeeAllKudos,
  pluginSlot,
  goTab
}) {
  const nextEvent = events[0];
  return /*#__PURE__*/React.createElement("div", {
    className: "c-scroll"
  }, /*#__PURE__*/React.createElement(StatusBanner, {
    tone: status.tone,
    icon: status.icon,
    title: status.title,
    text: status.text
  }), /*#__PURE__*/React.createElement(WeatherCard, {
    w: weather
  }), /*#__PURE__*/React.createElement(SectionHeader, {
    title: "Announcements",
    action: "See all",
    onAction: () => goTab('today')
  }), announcements.map(a => /*#__PURE__*/React.createElement(AnnouncementCard, {
    key: a.id,
    a: a,
    onOpen: () => onOpenAnnouncement(a),
    onDeepLink: onDeepLink
  })), /*#__PURE__*/React.createElement(SectionHeader, {
    title: "Out today",
    action: "Calendar",
    onAction: () => goTab('people')
  }), /*#__PURE__*/React.createElement("div", {
    className: "c-card pad",
    style: {
      paddingTop: 4,
      paddingBottom: 4
    }
  }, out.map((o, i) => /*#__PURE__*/React.createElement(OutRow, {
    key: o.name,
    o: o,
    last: i === out.length - 1
  }))), /*#__PURE__*/React.createElement(SectionHeader, {
    title: "Coming up",
    action: "All events",
    onAction: () => goTab('events')
  }), /*#__PURE__*/React.createElement(EventCard, {
    e: nextEvent,
    onRSVP: onRSVP,
    onOpen: () => goTab('events')
  }), pluginSlot, /*#__PURE__*/React.createElement(SectionHeader, {
    title: "Recent kudos",
    action: "See all",
    onAction: onSeeAllKudos
  }), /*#__PURE__*/React.createElement(KudosCard, {
    k: kudos[0],
    onCheer: onCheer
  }));
}
Object.assign(window, {
  TodayScreen
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/commons/TodayScreen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/commons/YouScreen.jsx
try { (() => {
/* ============================================================
   Commons UI kit — You (stipends · PTO · perks · my events)
   The new home for everything tied to the individual.
   ============================================================ */

/* ---------- Stipend budget card (flagship) ---------- */
function StipendCard({
  s,
  onOpen
}) {
  const remaining = s.total - s.used;
  const pct = Math.min(100, Math.round(s.used / s.total * 100));
  const low = remaining <= s.total * 0.2;
  return /*#__PURE__*/React.createElement("div", {
    className: "c-card tap pad",
    onClick: onOpen,
    style: {
      padding: 16
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "c-row",
    style: {
      gap: 12,
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement(IconTile, {
    icon: s.icon,
    bg: 'var(--' + s.tone + '-300)',
    fg: 'var(--' + s.tone + '-700)',
    size: 42
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      font: '600 15px/1.2 var(--font-display)',
      letterSpacing: '-.01em'
    }
  }, s.label), /*#__PURE__*/React.createElement("div", {
    className: "c-meta",
    style: {
      marginTop: 2
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "c-num"
  }, "$", s.total.toLocaleString()), " / ", s.period)), /*#__PURE__*/React.createElement(Icon, {
    name: "chevron-right",
    size: 19,
    color: "var(--text-subtle)"
  })), /*#__PURE__*/React.createElement("div", {
    className: "c-row",
    style: {
      justifyContent: 'space-between',
      alignItems: 'baseline',
      margin: '15px 0 7px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "c-row",
    style: {
      gap: 5,
      alignItems: 'baseline'
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "c-num",
    style: {
      font: '600 19px/1 var(--font-display)',
      color: 'var(--text)'
    }
  }, "$", remaining.toLocaleString()), /*#__PURE__*/React.createElement("span", {
    className: "c-meta"
  }, "left")), /*#__PURE__*/React.createElement("span", {
    className: "c-meta c-num"
  }, "$", s.used.toLocaleString(), " used")), /*#__PURE__*/React.createElement("div", {
    style: {
      height: 7,
      background: 'var(--bg-sunken)',
      borderRadius: 99,
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      height: '100%',
      width: pct + '%',
      background: 'var(--' + s.tone + '-700)',
      borderRadius: 99
    }
  })), /*#__PURE__*/React.createElement("div", {
    className: "c-row",
    style: {
      gap: 6,
      marginTop: 10
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "rotate-ccw",
    size: 13,
    color: low ? 'var(--orange-700)' : 'var(--text-subtle)'
  }), /*#__PURE__*/React.createElement("span", {
    className: "c-meta",
    style: {
      color: low ? 'var(--orange-700)' : 'var(--text-subtle)'
    }
  }, "Resets in ", s.resetsInDays, " days", low ? ' · use it or lose it' : '')));
}

/* ---------- PTO snapshot ---------- */
function PtoSnapshot({
  pto,
  onRequest
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "c-card pad",
    style: {
      padding: 16
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "c-row",
    style: {
      gap: 14,
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "c-row",
    style: {
      gap: 6,
      alignItems: 'baseline'
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "c-num",
    style: {
      font: '600 30px/1 var(--font-display)',
      letterSpacing: '-.02em'
    }
  }, pto.remaining), /*#__PURE__*/React.createElement("span", {
    className: "c-meta"
  }, pto.unit, " remaining")), /*#__PURE__*/React.createElement("div", {
    className: "c-meta",
    style: {
      marginTop: 4
    }
  }, pto.accrued, " accrued this year \xB7 ", pto.pendingRequests, " pending")), /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    size: "sm",
    icon: "plane",
    onClick: onRequest
  }, "Request time off")), /*#__PURE__*/React.createElement("div", {
    className: "c-row",
    style: {
      gap: 10,
      marginTop: 14,
      paddingTop: 14,
      borderTop: '1px solid var(--border)'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "calendar-heart",
    size: 17,
    color: "var(--accent)"
  }), /*#__PURE__*/React.createElement("span", {
    className: "c-meta",
    style: {
      color: 'var(--text-muted)'
    }
  }, "Next company holiday"), /*#__PURE__*/React.createElement("div", {
    style: {
      marginLeft: 'auto',
      textAlign: 'right'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      font: '500 13px/1.2 var(--font-ui)'
    }
  }, pto.nextHoliday.name), /*#__PURE__*/React.createElement("div", {
    className: "c-meta",
    style: {
      marginTop: 1
    }
  }, pto.nextHoliday.date))));
}

/* ---------- My events row (RSVP'd) ---------- */
function MyEventRow({
  e,
  onOpen,
  last
}) {
  const [mm, dd] = e.date.replace(',', '').split(' ').slice(1);
  return /*#__PURE__*/React.createElement("button", {
    onClick: onOpen,
    className: "c-row",
    style: {
      gap: 12,
      padding: '12px 0',
      width: '100%',
      textAlign: 'left',
      background: 'transparent',
      border: 'none',
      cursor: 'pointer',
      borderBottom: last ? 'none' : '1px solid var(--border)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: 'center',
      width: 40,
      flex: 'none'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      font: '600 15px/1 var(--font-display)',
      color: 'var(--accent)'
    }
  }, dd), /*#__PURE__*/React.createElement("div", {
    className: "c-meta",
    style: {
      fontSize: 10.5,
      textTransform: 'uppercase',
      letterSpacing: '.04em'
    }
  }, mm)), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      font: '500 13.5px/1.25 var(--font-ui)',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis'
    }
  }, e.title), /*#__PURE__*/React.createElement("div", {
    className: "c-meta",
    style: {
      marginTop: 2
    }
  }, e.time, " \xB7 ", e.where)), /*#__PURE__*/React.createElement(Pill, {
    tone: "green",
    dot: true
  }, "Going"));
}
function YouScreen({
  stipends,
  pto,
  perks,
  events,
  onOpenStipend,
  onRequestPto,
  onOpenPerk,
  onOpenEvent,
  pluginSlot,
  goTab
}) {
  const mine = events.filter(e => e.rsvp === 'going');
  return /*#__PURE__*/React.createElement("div", {
    className: "c-scroll"
  }, /*#__PURE__*/React.createElement(SectionHeader, {
    title: "Stipend tracker",
    action: "History",
    onAction: () => onOpenStipend(stipends[0])
  }), stipends.map(s => /*#__PURE__*/React.createElement(StipendCard, {
    key: s.id,
    s: s,
    onOpen: () => onOpenStipend(s)
  })), /*#__PURE__*/React.createElement(SectionHeader, {
    title: "Time off",
    action: "Calendar",
    onAction: () => goTab('people')
  }), /*#__PURE__*/React.createElement(PtoSnapshot, {
    pto: pto,
    onRequest: onRequestPto
  }), /*#__PURE__*/React.createElement(SectionHeader, {
    title: "Perks & benefits"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 10
    }
  }, perks.map(p => /*#__PURE__*/React.createElement(PerkTile, {
    key: p.id,
    p: p,
    onOpen: () => onOpenPerk(p)
  }))), pluginSlot, /*#__PURE__*/React.createElement(SectionHeader, {
    title: "My events",
    action: "All events",
    onAction: () => goTab('events')
  }), mine.length === 0 ? /*#__PURE__*/React.createElement("div", {
    className: "c-card pad",
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 11
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "calendar-plus",
    size: 18,
    color: "var(--text-subtle)"
  }), /*#__PURE__*/React.createElement("span", {
    className: "c-meta"
  }, "No RSVPs yet \u2014 find something on the Events tab.")) : /*#__PURE__*/React.createElement("div", {
    className: "c-card pad",
    style: {
      paddingTop: 2,
      paddingBottom: 2
    }
  }, mine.map((e, i) => /*#__PURE__*/React.createElement(MyEventRow, {
    key: e.id,
    e: e,
    onOpen: () => onOpenEvent(e),
    last: i === mine.length - 1
  }))));
}
Object.assign(window, {
  YouScreen,
  StipendCard,
  PtoSnapshot,
  MyEventRow
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/commons/YouScreen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/commons/data.jsx
try { (() => {
/* ============================================================
   Commons UI kit — mock data
   Fictional Shyft Solutions employees & content.
   ============================================================ */

const ANNOUNCEMENTS = [{
  id: 'a1',
  pinned: true,
  cat: 'IT',
  catTone: 'blue',
  title: 'VPN maintenance window — Thu 8–10pm',
  body: 'Networking is rotating certificates on the primary VPN concentrator Thursday night. Remote access will drop intermittently between 8 and 10pm ET. Office connectivity is unaffected. Save your work before you head out.',
  author: 'Dana Whitfield',
  role: 'IT Operations',
  time: '2h ago',
  reactions: 12,
  comments: 4
}, {
  id: 'a2',
  cat: 'People',
  catTone: 'purple',
  title: 'Q3 stipend reset is April 1',
  body: 'Your wellness, learning, and home-office budgets reset at the start of next quarter. Anything unspent does not roll over — get those requests into Stipend Tracker before Mar 31.',
  author: 'Priya Anand',
  role: 'People Ops',
  time: 'Yesterday',
  reactions: 28,
  comments: 9,
  link: {
    tab: 'you',
    label: 'Open Stipend Tracker',
    icon: 'wallet'
  }
}, {
  id: 'a3',
  cat: 'Facilities',
  catTone: 'orange',
  title: 'New badge readers at the east entrance',
  body: 'The east entrance now uses the upgraded badge readers. Tap and hold for a full second. If your badge does not work, Security at the front desk can re-encode it on the spot.',
  author: 'Marcus Bell',
  role: 'Facilities',
  time: 'Mon',
  reactions: 7,
  comments: 2
}];
const OFFICE_STATUS = {
  state: 'open',
  // open | advisory | closed
  tone: 'green',
  icon: 'building-2',
  title: 'Omaha HQ is open',
  text: 'Normal hours today, 7am–7pm. Garage level 2 is closed for striping.'
};
const WEATHER = {
  city: 'Omaha, NE',
  tempF: 78,
  hi: 84,
  lo: 66,
  cond: 'Partly cloudy',
  icon: 'cloud-sun',
  hours: [{
    t: 'Now',
    f: 78,
    icon: 'cloud-sun'
  }, {
    t: '1p',
    f: 81,
    icon: 'sun'
  }, {
    t: '2p',
    f: 83,
    icon: 'sun'
  }, {
    t: '3p',
    f: 84,
    icon: 'cloud-sun'
  }, {
    t: '4p',
    f: 82,
    icon: 'cloud'
  }, {
    t: '5p',
    f: 79,
    icon: 'cloud-drizzle'
  }]
};
const OUT_TODAY = [{
  name: 'Maya Patel',
  kind: 'PTO',
  tone: 'blue',
  note: 'Back Mon'
}, {
  name: 'Jordan Chen',
  kind: 'Sick',
  tone: 'orange',
  note: ''
}, {
  name: 'Riley Park',
  kind: 'Remote',
  tone: 'purple',
  note: 'On Slack'
}, {
  name: 'Sam Okafor',
  kind: 'PTO',
  tone: 'blue',
  note: 'Back Wed'
}];
const HOLIDAYS = [{
  date: 'May 26',
  day: 'Mon',
  name: 'Memorial Day',
  closed: true
}, {
  date: 'Jun 19',
  day: 'Thu',
  name: 'Juneteenth',
  closed: true
}, {
  date: 'Jul 4',
  day: 'Fri',
  name: 'Independence Day',
  closed: true
}];
const EVENTS = [{
  id: 'e1',
  cat: 'Lunch & Learn',
  catTone: 'purple',
  icon: 'utensils',
  title: 'Lunch & Learn: Shipping with feature flags',
  date: 'Thu, Mar 27',
  time: '12:00–1:00pm',
  where: 'HQ · Sequoia room + Zoom',
  host: 'Platform team',
  going: 18,
  capacity: 30,
  rsvp: null,
  desc: 'Bring your lunch. We will walk through how the platform team rolls out risky changes behind flags, with a live demo and Q&A.'
}, {
  id: 'e2',
  cat: 'Social',
  catTone: 'green',
  icon: 'glass-water',
  title: 'Spring rooftop happy hour',
  date: 'Fri, Mar 28',
  time: '5:30–8:00pm',
  where: 'The Ironwood, 7th floor',
  host: 'Social committee',
  going: 64,
  capacity: 90,
  rsvp: 'going',
  desc: 'First round on the house. Partners and plus-ones welcome. We have the rooftop until 8.'
}, {
  id: 'e3',
  cat: 'Intramural',
  catTone: 'orange',
  icon: 'volleyball',
  title: 'Coed kickball vs. Riverside Labs',
  date: 'Sat, Mar 29',
  time: '10:00am',
  where: 'Zilker Field 4',
  host: 'Shyft Strikers',
  going: 11,
  capacity: 16,
  rsvp: null,
  desc: 'We need a few more players to field a full roster. No experience required — cleats optional, snacks provided.'
}];
const KUDOS = [{
  id: 'k1',
  from: 'Priya Anand',
  to: 'Maya Patel',
  value: 'Customer obsession',
  text: 'Maya stayed late to walk the Northwind team through the migration. They emailed leadership to say it was the smoothest rollout they have had.',
  time: '1h ago',
  cheers: 16,
  cheered: false
}, {
  id: 'k2',
  from: 'Marcus Bell',
  to: 'Platform team',
  value: 'Ownership',
  text: 'Whole platform team jumped on the incident at 6am without being asked. Root-caused and shipped a fix before standup.',
  time: '3h ago',
  cheers: 31,
  cheered: true
}, {
  id: 'k3',
  from: 'Jordan Chen',
  to: 'Sam Okafor',
  value: 'Craft',
  text: 'Sam\'s code review comments are basically a free design course. Thanks for raising the bar on the payments refactor.',
  time: 'Yesterday',
  cheers: 9,
  cheered: false
}];
const STIPENDS = [{
  id: 'st1',
  label: 'Learning',
  icon: 'graduation-cap',
  tone: 'purple',
  used: 420,
  total: 1500,
  period: 'yr',
  resetsInDays: 28,
  blurb: 'Courses, books, conferences, certifications.',
  tx: [{
    id: 'l1',
    title: 'Frontend Masters — annual',
    date: 'Mar 12',
    amount: 348,
    status: 'Reimbursed'
  }, {
    id: 'l2',
    title: 'Designing Data-Intensive Apps',
    date: 'Feb 24',
    amount: 72,
    status: 'Approved'
  }]
}, {
  id: 'st2',
  label: 'Wellness',
  icon: 'dumbbell',
  tone: 'blue',
  used: 510,
  total: 600,
  period: 'yr',
  resetsInDays: 28,
  blurb: 'Gym, classes, equipment, mental-health apps.',
  tx: [{
    id: 'w1',
    title: 'ClassPass — March',
    date: 'Mar 1',
    amount: 99,
    status: 'Reimbursed'
  }, {
    id: 'w2',
    title: 'Running shoes',
    date: 'Feb 18',
    amount: 140,
    status: 'Reimbursed'
  }, {
    id: 'w3',
    title: 'Sports massage',
    date: 'Mar 20',
    amount: 120,
    status: 'Pending'
  }]
}, {
  id: 'st3',
  label: 'Home office',
  icon: 'armchair',
  tone: 'green',
  used: 0,
  total: 500,
  period: 'yr',
  resetsInDays: 28,
  blurb: 'Desk, chair, monitor, lighting, peripherals.',
  tx: []
}];
const PTO = {
  remaining: 14,
  accrued: 18,
  unit: 'days',
  nextHoliday: {
    name: 'Memorial Day',
    date: 'Mon, May 26'
  },
  pendingRequests: 0
};
const PEOPLE = [{
  id: 'u1',
  name: 'Maya Patel',
  role: 'Staff Engineer',
  team: 'Platform',
  loc: 'Omaha HQ · Hybrid',
  kudos: [{
    value: 'Customer obsession',
    from: 'Priya Anand',
    time: '1h ago',
    text: 'Stayed late to walk the Northwind team through the migration — they emailed leadership to say it was the smoothest rollout they’ve had.'
  }, {
    value: 'Craft',
    from: 'Marcus Bell',
    time: '2w ago',
    text: 'The flag-rollout runbook Maya wrote is now the template the whole org copies.'
  }]
}, {
  id: 'u2',
  name: 'Sam Okafor',
  role: 'Senior Engineer',
  team: 'Payments',
  loc: 'Omaha HQ',
  kudos: [{
    value: 'Craft',
    from: 'Jordan Chen',
    time: 'Yesterday',
    text: 'Sam’s code review comments are basically a free design course. Thanks for raising the bar on the payments refactor.'
  }]
}, {
  id: 'u3',
  name: 'Priya Anand',
  role: 'People Ops Lead',
  team: 'People Ops',
  loc: 'Omaha HQ',
  kudos: [{
    value: 'Team',
    from: 'Dana Whitfield',
    time: '3d ago',
    text: 'Priya turned a chaotic onboarding week into something that felt effortless for three new hires at once.'
  }]
}, {
  id: 'u4',
  name: 'Jordan Chen',
  role: 'Product Designer',
  team: 'Design',
  loc: 'Remote · US',
  kudos: [{
    value: 'Ownership',
    from: 'Maya Patel',
    time: '1w ago',
    text: 'Jordan caught the accessibility regression before launch and fixed it without being asked.'
  }]
}, {
  id: 'u5',
  name: 'Marcus Bell',
  role: 'Engineering Manager',
  team: 'Platform',
  loc: 'Omaha HQ',
  kudos: [{
    value: 'Ownership',
    from: 'Sam Okafor',
    time: '4d ago',
    text: 'Jumped on the 6am incident without being asked and shipped the fix before standup.'
  }]
}, {
  id: 'u6',
  name: 'Riley Park',
  role: 'Support Engineer',
  team: 'Customer',
  loc: 'Remote · US',
  kudos: []
}];
const CHANNELS = [{
  id: 'c1',
  icon: 'sandwich',
  name: 'lunch-crew',
  tone: 'green',
  members: 42,
  sub: 'Who\'s grabbing food at noon?'
}, {
  id: 'c2',
  icon: 'car-front',
  name: 'carpool-north',
  tone: 'blue',
  members: 14,
  sub: 'Rides from the north suburbs'
}, {
  id: 'c3',
  icon: 'dog',
  name: 'dogs-of-shyft',
  tone: 'orange',
  members: 88,
  sub: 'Mandatory photo tax'
}, {
  id: 'c4',
  icon: 'mountain',
  name: 'trail-runners',
  tone: 'purple',
  members: 23,
  sub: 'Weekend trail meetups'
}];
const FORSALE = [{
  id: 'f1',
  icon: 'monitor',
  title: 'LG 27" 4K monitor',
  price: '$180',
  who: 'Riley P.',
  when: '2d'
}, {
  id: 'f2',
  icon: 'bike',
  title: 'Commuter bike, M frame',
  price: '$240',
  who: 'Dana W.',
  when: '4d'
}, {
  id: 'f3',
  icon: 'armchair',
  title: 'Herman Miller Sayl',
  price: '$310',
  who: 'Sam O.',
  when: '6d'
}];
const PERKS = [{
  id: 'pk1',
  icon: 'heart-pulse',
  label: 'Health & dental',
  tone: 'pink',
  sub: 'Blue Cross · Member portal'
}, {
  id: 'pk2',
  icon: 'piggy-bank',
  label: '401(k) match',
  tone: 'green',
  sub: 'Fidelity · 6% match'
}, {
  id: 'pk3',
  icon: 'graduation-cap',
  label: 'Learning budget',
  tone: 'purple',
  sub: '$1,500 / yr'
}, {
  id: 'pk4',
  icon: 'dumbbell',
  label: 'Wellness stipend',
  tone: 'blue',
  sub: '$600 / yr'
}, {
  id: 'pk5',
  icon: 'plane',
  label: 'PTO & holidays',
  tone: 'orange',
  sub: 'Unlimited + 11 days'
}, {
  id: 'pk6',
  icon: 'baby',
  label: 'Parental leave',
  tone: 'pink',
  sub: 'Up to 16 weeks'
}];
const ONBOARDING = {
  daysToStart: 6,
  startDate: 'Mon, Mar 31',
  checklist: [{
    id: 'o1',
    label: 'Sign your offer letter',
    done: true,
    meta: 'DocuSign'
  }, {
    id: 'o2',
    label: 'Complete I-9 & tax forms',
    done: true,
    meta: 'Rippling'
  }, {
    id: 'o3',
    label: 'Pick your laptop & gear',
    done: false,
    meta: 'Due Wed'
  }, {
    id: 'o4',
    label: 'Read the culture handbook',
    done: false,
    meta: '8 min'
  }, {
    id: 'o5',
    label: 'Add your first-day headshot',
    done: false,
    meta: 'Optional'
  }],
  whoswho: [{
    name: 'Priya Anand',
    role: 'Your onboarding buddy',
    team: 'People Ops'
  }, {
    name: 'Marcus Bell',
    role: 'Your manager',
    team: 'Platform'
  }, {
    name: 'Dana Whitfield',
    role: 'IT — laptop & accounts',
    team: 'IT Ops'
  }],
  facts: [{
    icon: 'clock',
    k: 'First day',
    v: 'Mon, Mar 31 · 9:30am'
  }, {
    icon: 'map-pin',
    k: 'Where',
    v: 'Omaha HQ, 5th-floor lobby'
  }, {
    icon: 'square-parking',
    k: 'Parking',
    v: 'Garage L3 · badge opens the gate'
  }, {
    icon: 'shirt',
    k: 'Dress',
    v: 'Casual — jeans are fine'
  }]
};

/* ============================================================
   Plugins — extensions devs build & publish.
   Installed ones render into named SLOTS on Today / You.
   The rest live in the Apps directory (More → Apps).
   ============================================================ */
const PLUGINS = [
// ---- installed by default; render into slots ----
{
  id: 'pl-shuttle',
  name: 'Shuttle Tracker',
  dev: 'Platform Tools',
  icon: 'bus',
  tone: 'blue',
  category: 'Workplace',
  slot: 'today',
  installed: true,
  installs: 1240,
  rating: 4.8,
  blurb: 'Live arrival times for the HQ shuttle, right on your home screen.',
  permissions: ['Location (approximate)', 'Notifications'],
  widget: {
    kind: 'next',
    value: '12',
    unit: 'min',
    label: 'Route B → Downtown',
    note: 'On time'
  }
}, {
  id: 'pl-lunch',
  name: 'Lunch Today',
  dev: 'Workplace',
  icon: 'utensils',
  tone: 'orange',
  category: 'Workplace',
  slot: 'today',
  installed: true,
  installs: 2980,
  rating: 4.6,
  blurb: 'Today’s café menu and dietary tags, updated every morning.',
  permissions: ['Notifications'],
  widget: {
    kind: 'list',
    label: 'Omaha HQ café · 11:30–2:00',
    items: ['Korean BBQ rice bowls', 'Roasted veg + farro', 'Build-your-own ramen']
  }
}, {
  id: 'pl-401k',
  name: '401(k) Snapshot',
  dev: 'Finance Guild',
  icon: 'piggy-bank',
  tone: 'green',
  category: 'Finance',
  slot: 'you',
  installed: true,
  installs: 1710,
  rating: 4.9,
  blurb: 'Your retirement balance and contribution rate at a glance.',
  permissions: ['Read payroll summary'],
  widget: {
    kind: 'stat',
    value: '$48,210',
    label: 'Vested balance',
    delta: '+2.4% this quarter',
    deltaTone: 'green'
  }
}, {
  id: 'pl-volunteer',
  name: 'Volunteer Hours',
  dev: 'Shyft Gives',
  icon: 'hand-heart',
  tone: 'purple',
  category: 'Community',
  slot: 'you',
  installed: true,
  installs: 640,
  rating: 4.7,
  blurb: 'Track volunteer hours toward your annual giving goal.',
  permissions: ['Notifications'],
  widget: {
    kind: 'progress',
    label: 'Toward 20-hour goal',
    used: 14,
    total: 20,
    unit: 'hrs'
  }
},
// ---- available in the directory (not installed) ----
{
  id: 'pl-parking',
  name: 'Parking Reservations',
  dev: 'Workplace',
  icon: 'circle-parking',
  tone: 'blue',
  category: 'Workplace',
  slot: 'today',
  installed: false,
  installs: 880,
  rating: 4.4,
  blurb: 'Reserve a garage spot before you drive in.',
  permissions: ['Location (approximate)']
}, {
  id: 'pl-gym',
  name: 'Gym Class Booking',
  dev: 'Wellness Team',
  icon: 'dumbbell',
  tone: 'green',
  category: 'Wellness',
  slot: 'you',
  installed: false,
  installs: 1320,
  rating: 4.5,
  blurb: 'Book on-site fitness classes and see what’s next.',
  permissions: ['Calendar', 'Notifications']
}, {
  id: 'pl-expense',
  name: 'Expense Quick-Snap',
  dev: 'Finance Guild',
  icon: 'receipt',
  tone: 'orange',
  category: 'Finance',
  slot: 'you',
  installed: false,
  installs: 2040,
  rating: 4.3,
  blurb: 'Photograph a receipt and auto-file the expense.',
  permissions: ['Camera', 'Read payroll summary']
}, {
  id: 'pl-standup',
  name: 'Async Standup',
  dev: 'Eng Productivity',
  icon: 'list-checks',
  tone: 'purple',
  category: 'Productivity',
  slot: 'today',
  installed: false,
  installs: 760,
  rating: 4.6,
  blurb: 'Post and read team standups without a meeting.',
  permissions: ['Notifications']
}, {
  id: 'pl-room',
  name: 'Book a Room',
  dev: 'Workplace',
  icon: 'door-open',
  tone: 'blue',
  category: 'Workplace',
  slot: 'today',
  installed: false,
  installs: 1990,
  rating: 4.5,
  blurb: 'Find and reserve meeting rooms on any floor.',
  permissions: ['Calendar']
}, {
  id: 'pl-carbon',
  name: 'Commute Carbon',
  dev: 'Shyft Gives',
  icon: 'leaf',
  tone: 'green',
  category: 'Community',
  slot: 'you',
  installed: false,
  installs: 410,
  rating: 4.2,
  blurb: 'Track and offset the carbon from your commute.',
  permissions: ['Location (approximate)']
}];
const PLUGIN_CATEGORIES = ['All', 'Workplace', 'Wellness', 'Finance', 'Productivity', 'Community'];

/* Plugins YOU authored — shown in the role-gated Developer console. */
const DEV_PLUGINS = [{
  id: 'dp1',
  name: 'Shuttle Tracker',
  icon: 'bus',
  tone: 'blue',
  status: 'Published',
  version: 'v2.3.1',
  installs: 1240,
  rating: 4.8,
  note: 'Live · last updated 6 days ago'
}, {
  id: 'dp2',
  name: 'Lunch Today',
  icon: 'utensils',
  tone: 'orange',
  status: 'In review',
  version: 'v1.0.0',
  installs: 0,
  rating: null,
  note: 'Submitted 2 days ago · est. 3–5 day review'
}, {
  id: 'dp3',
  name: 'Expense Quick-Snap',
  icon: 'receipt',
  tone: 'orange',
  status: 'Draft',
  version: 'v0.4.0',
  installs: 0,
  rating: null,
  note: 'Last edited yesterday'
}];
const DEV_STATUS_TONE = {
  Published: 'green',
  'In review': 'orange',
  Draft: 'neutral',
  Rejected: 'pink'
};
Object.assign(window, {
  ANNOUNCEMENTS,
  OFFICE_STATUS,
  WEATHER,
  OUT_TODAY,
  HOLIDAYS,
  EVENTS,
  KUDOS,
  CHANNELS,
  FORSALE,
  PERKS,
  ONBOARDING,
  STIPENDS,
  PTO,
  PEOPLE,
  PLUGINS,
  DEV_PLUGINS,
  PLUGIN_CATEGORIES,
  DEV_STATUS_TONE
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/commons/data.jsx", error: String((e && e.message) || e) }); }

// ui_kits/commons/ios-frame.jsx
try { (() => {
// @ds-adherence-ignore -- omelette starter scaffold (raw elements/hex/px by design)

/* BEGIN USAGE */
// iOS.jsx — Simplified iOS 26 (Liquid Glass) device frame
// Based on the iOS 26 UI Kit + Figma status bar spec. No assets, no deps.
// Exports (to window): IOSDevice, IOSStatusBar, IOSNavBar, IOSGlassPill, IOSList, IOSListRow, IOSKeyboard
//
// Usage — wrap your screen content in <IOSDevice> to get the bezel, status bar
// and home indicator (props: title, dark, keyboard):
//
//   <IOSDevice title="Settings">
//     ...your screen content...
//   </IOSDevice>
//   <IOSDevice dark title="Search" keyboard>…</IOSDevice>
/* END USAGE */

// ─────────────────────────────────────────────────────────────
// Status bar
// ─────────────────────────────────────────────────────────────
function IOSStatusBar({
  dark = false,
  time = '9:41'
}) {
  const c = dark ? '#fff' : '#000';
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 154,
      alignItems: 'center',
      justifyContent: 'center',
      padding: '21px 24px 19px',
      boxSizing: 'border-box',
      position: 'relative',
      zIndex: 20,
      width: '100%'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      height: 22,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      paddingTop: 1.5
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: '-apple-system, "SF Pro", system-ui',
      fontWeight: 590,
      fontSize: 17,
      lineHeight: '22px',
      color: c
    }
  }, time)), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      height: 22,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 7,
      paddingTop: 1,
      paddingRight: 1
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "19",
    height: "12",
    viewBox: "0 0 19 12"
  }, /*#__PURE__*/React.createElement("rect", {
    x: "0",
    y: "7.5",
    width: "3.2",
    height: "4.5",
    rx: "0.7",
    fill: c
  }), /*#__PURE__*/React.createElement("rect", {
    x: "4.8",
    y: "5",
    width: "3.2",
    height: "7",
    rx: "0.7",
    fill: c
  }), /*#__PURE__*/React.createElement("rect", {
    x: "9.6",
    y: "2.5",
    width: "3.2",
    height: "9.5",
    rx: "0.7",
    fill: c
  }), /*#__PURE__*/React.createElement("rect", {
    x: "14.4",
    y: "0",
    width: "3.2",
    height: "12",
    rx: "0.7",
    fill: c
  })), /*#__PURE__*/React.createElement("svg", {
    width: "17",
    height: "12",
    viewBox: "0 0 17 12"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M8.5 3.2C10.8 3.2 12.9 4.1 14.4 5.6L15.5 4.5C13.7 2.7 11.2 1.5 8.5 1.5C5.8 1.5 3.3 2.7 1.5 4.5L2.6 5.6C4.1 4.1 6.2 3.2 8.5 3.2Z",
    fill: c
  }), /*#__PURE__*/React.createElement("path", {
    d: "M8.5 6.8C9.9 6.8 11.1 7.3 12 8.2L13.1 7.1C11.8 5.9 10.2 5.1 8.5 5.1C6.8 5.1 5.2 5.9 3.9 7.1L5 8.2C5.9 7.3 7.1 6.8 8.5 6.8Z",
    fill: c
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "8.5",
    cy: "10.5",
    r: "1.5",
    fill: c
  })), /*#__PURE__*/React.createElement("svg", {
    width: "27",
    height: "13",
    viewBox: "0 0 27 13"
  }, /*#__PURE__*/React.createElement("rect", {
    x: "0.5",
    y: "0.5",
    width: "23",
    height: "12",
    rx: "3.5",
    stroke: c,
    strokeOpacity: "0.35",
    fill: "none"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "2",
    y: "2",
    width: "20",
    height: "9",
    rx: "2",
    fill: c
  }), /*#__PURE__*/React.createElement("path", {
    d: "M25 4.5V8.5C25.8 8.2 26.5 7.2 26.5 6.5C26.5 5.8 25.8 4.8 25 4.5Z",
    fill: c,
    fillOpacity: "0.4"
  }))));
}

// ─────────────────────────────────────────────────────────────
// Liquid glass pill — blur + tint + shine
// ─────────────────────────────────────────────────────────────
function IOSGlassPill({
  children,
  dark = false,
  style = {}
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      height: 44,
      minWidth: 44,
      borderRadius: 9999,
      position: 'relative',
      overflow: 'hidden',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      boxShadow: dark ? '0 2px 6px rgba(0,0,0,0.35), 0 6px 16px rgba(0,0,0,0.2)' : '0 1px 3px rgba(0,0,0,0.07), 0 3px 10px rgba(0,0,0,0.06)',
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      borderRadius: 9999,
      backdropFilter: 'blur(12px) saturate(180%)',
      WebkitBackdropFilter: 'blur(12px) saturate(180%)',
      background: dark ? 'rgba(120,120,128,0.28)' : 'rgba(255,255,255,0.5)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      borderRadius: 9999,
      boxShadow: dark ? 'inset 1.5px 1.5px 1px rgba(255,255,255,0.15), inset -1px -1px 1px rgba(255,255,255,0.08)' : 'inset 1.5px 1.5px 1px rgba(255,255,255,0.7), inset -1px -1px 1px rgba(255,255,255,0.4)',
      border: dark ? '0.5px solid rgba(255,255,255,0.15)' : '0.5px solid rgba(0,0,0,0.06)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      zIndex: 1,
      display: 'flex',
      alignItems: 'center',
      padding: '0 4px'
    }
  }, children));
}

// ─────────────────────────────────────────────────────────────
// Navigation bar — glass pills + large title
// ─────────────────────────────────────────────────────────────
function IOSNavBar({
  title = 'Title',
  dark = false,
  trailingIcon = true
}) {
  const muted = dark ? 'rgba(255,255,255,0.6)' : '#404040';
  const text = dark ? '#fff' : '#000';
  const pillIcon = content => /*#__PURE__*/React.createElement(IOSGlassPill, {
    dark: dark
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 36,
      height: 36,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, content));
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 10,
      paddingTop: 62,
      paddingBottom: 10,
      position: 'relative',
      zIndex: 5
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 16px'
    }
  }, pillIcon(/*#__PURE__*/React.createElement("svg", {
    width: "12",
    height: "20",
    viewBox: "0 0 12 20",
    fill: "none",
    style: {
      marginLeft: -1
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M10 2L2 10l8 8",
    stroke: muted,
    strokeWidth: "2.5",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }))), trailingIcon && pillIcon(/*#__PURE__*/React.createElement("svg", {
    width: "22",
    height: "6",
    viewBox: "0 0 22 6"
  }, /*#__PURE__*/React.createElement("circle", {
    cx: "3",
    cy: "3",
    r: "2.5",
    fill: muted
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "11",
    cy: "3",
    r: "2.5",
    fill: muted
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "19",
    cy: "3",
    r: "2.5",
    fill: muted
  })))), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '0 16px',
      fontFamily: '-apple-system, system-ui',
      fontSize: 34,
      fontWeight: 700,
      lineHeight: '41px',
      color: text,
      letterSpacing: 0.4
    }
  }, title));
}

// ─────────────────────────────────────────────────────────────
// Grouped list (inset card, r:26) + row (52px)
// ─────────────────────────────────────────────────────────────
function IOSListRow({
  title,
  detail,
  icon,
  chevron = true,
  isLast = false,
  dark = false
}) {
  const text = dark ? '#fff' : '#000';
  const sec = dark ? 'rgba(235,235,245,0.6)' : 'rgba(60,60,67,0.6)';
  const ter = dark ? 'rgba(235,235,245,0.3)' : 'rgba(60,60,67,0.3)';
  const sep = dark ? 'rgba(84,84,88,0.65)' : 'rgba(60,60,67,0.12)';
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      minHeight: 52,
      padding: '0 16px',
      position: 'relative',
      fontFamily: '-apple-system, system-ui',
      fontSize: 17,
      letterSpacing: -0.43
    }
  }, icon && /*#__PURE__*/React.createElement("div", {
    style: {
      width: 30,
      height: 30,
      borderRadius: 7,
      background: icon,
      marginRight: 12,
      flexShrink: 0
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      color: text
    }
  }, title), detail && /*#__PURE__*/React.createElement("span", {
    style: {
      color: sec,
      marginRight: 6
    }
  }, detail), chevron && /*#__PURE__*/React.createElement("svg", {
    width: "8",
    height: "14",
    viewBox: "0 0 8 14",
    style: {
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M1 1l6 6-6 6",
    stroke: ter,
    strokeWidth: "2",
    fill: "none",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  })), !isLast && /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      bottom: 0,
      right: 0,
      left: icon ? 58 : 16,
      height: 0.5,
      background: sep
    }
  }));
}
function IOSList({
  header,
  children,
  dark = false
}) {
  const hc = dark ? 'rgba(235,235,245,0.6)' : 'rgba(60,60,67,0.6)';
  const bg = dark ? '#1C1C1E' : '#fff';
  return /*#__PURE__*/React.createElement("div", null, header && /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: '-apple-system, system-ui',
      fontSize: 13,
      color: hc,
      textTransform: 'uppercase',
      padding: '8px 36px 6px',
      letterSpacing: -0.08
    }
  }, header), /*#__PURE__*/React.createElement("div", {
    style: {
      background: bg,
      borderRadius: 26,
      margin: '0 16px',
      overflow: 'hidden'
    }
  }, children));
}

// ─────────────────────────────────────────────────────────────
// Device frame
// ─────────────────────────────────────────────────────────────
function IOSDevice({
  children,
  width = 402,
  height = 874,
  dark = false,
  title,
  keyboard = false
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      width,
      height,
      borderRadius: 48,
      overflow: 'hidden',
      position: 'relative',
      background: dark ? '#000' : '#F2F2F7',
      boxShadow: '0 40px 80px rgba(0,0,0,0.18), 0 0 0 1px rgba(0,0,0,0.12)',
      fontFamily: '-apple-system, system-ui, sans-serif',
      WebkitFontSmoothing: 'antialiased'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top: 11,
      left: '50%',
      transform: 'translateX(-50%)',
      width: 126,
      height: 37,
      borderRadius: 24,
      background: '#000',
      zIndex: 50
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 10
    }
  }, /*#__PURE__*/React.createElement(IOSStatusBar, {
    dark: dark
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      height: '100%',
      display: 'flex',
      flexDirection: 'column'
    }
  }, title !== undefined && /*#__PURE__*/React.createElement(IOSNavBar, {
    title: title,
    dark: dark
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      overflow: 'auto'
    }
  }, children), keyboard && /*#__PURE__*/React.createElement(IOSKeyboard, {
    dark: dark
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      zIndex: 60,
      height: 34,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'flex-end',
      paddingBottom: 8,
      pointerEvents: 'none'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 139,
      height: 5,
      borderRadius: 100,
      background: dark ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.25)'
    }
  })));
}

// ─────────────────────────────────────────────────────────────
// Keyboard — iOS 26 liquid glass
// ─────────────────────────────────────────────────────────────
function IOSKeyboard({
  dark = false
}) {
  const glyph = dark ? 'rgba(255,255,255,0.7)' : '#595959';
  const sugg = dark ? 'rgba(255,255,255,0.6)' : '#333';
  const keyBg = dark ? 'rgba(255,255,255,0.22)' : 'rgba(255,255,255,0.85)';

  // special-key icons
  const icons = {
    shift: /*#__PURE__*/React.createElement("svg", {
      width: "19",
      height: "17",
      viewBox: "0 0 19 17"
    }, /*#__PURE__*/React.createElement("path", {
      d: "M9.5 1L1 9.5h4.5V16h8V9.5H18L9.5 1z",
      fill: glyph
    })),
    del: /*#__PURE__*/React.createElement("svg", {
      width: "23",
      height: "17",
      viewBox: "0 0 23 17"
    }, /*#__PURE__*/React.createElement("path", {
      d: "M7 1h13a2 2 0 012 2v11a2 2 0 01-2 2H7l-6-7.5L7 1z",
      fill: "none",
      stroke: glyph,
      strokeWidth: "1.6",
      strokeLinejoin: "round"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M10 5l7 7M17 5l-7 7",
      stroke: glyph,
      strokeWidth: "1.6",
      strokeLinecap: "round"
    })),
    ret: /*#__PURE__*/React.createElement("svg", {
      width: "20",
      height: "14",
      viewBox: "0 0 20 14"
    }, /*#__PURE__*/React.createElement("path", {
      d: "M18 1v6H4m0 0l4-4M4 7l4 4",
      fill: "none",
      stroke: "#fff",
      strokeWidth: "1.8",
      strokeLinecap: "round",
      strokeLinejoin: "round"
    }))
  };
  const key = (content, {
    w,
    flex,
    ret,
    fs = 25,
    k
  } = {}) => /*#__PURE__*/React.createElement("div", {
    key: k,
    style: {
      height: 42,
      borderRadius: 8.5,
      flex: flex ? 1 : undefined,
      width: w,
      minWidth: 0,
      background: ret ? '#08f' : keyBg,
      boxShadow: '0 1px 0 rgba(0,0,0,0.075)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: '-apple-system, "SF Compact", system-ui',
      fontSize: fs,
      fontWeight: 458,
      color: ret ? '#fff' : glyph
    }
  }, content);
  const row = (keys, pad = 0) => /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 6.5,
      justifyContent: 'center',
      padding: `0 ${pad}px`
    }
  }, keys.map(l => key(l, {
    flex: true,
    k: l
  })));
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      zIndex: 15,
      borderRadius: 27,
      overflow: 'hidden',
      padding: '11px 0 2px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      boxShadow: dark ? '0 -2px 20px rgba(0,0,0,0.09)' : '0 -1px 6px rgba(0,0,0,0.018), 0 -3px 20px rgba(0,0,0,0.012)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      borderRadius: 27,
      backdropFilter: 'blur(12px) saturate(180%)',
      WebkitBackdropFilter: 'blur(12px) saturate(180%)',
      background: dark ? 'rgba(120,120,128,0.14)' : 'rgba(255,255,255,0.25)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      borderRadius: 27,
      boxShadow: dark ? 'inset 1.5px 1.5px 1px rgba(255,255,255,0.15)' : 'inset 1.5px 1.5px 1px rgba(255,255,255,0.7), inset -1px -1px 1px rgba(255,255,255,0.4)',
      border: dark ? '0.5px solid rgba(255,255,255,0.15)' : '0.5px solid rgba(0,0,0,0.06)',
      pointerEvents: 'none'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 20,
      alignItems: 'center',
      padding: '8px 22px 13px',
      width: '100%',
      boxSizing: 'border-box',
      position: 'relative'
    }
  }, ['"The"', 'the', 'to'].map((w, i) => /*#__PURE__*/React.createElement(React.Fragment, {
    key: i
  }, i > 0 && /*#__PURE__*/React.createElement("div", {
    style: {
      width: 1,
      height: 25,
      background: '#ccc',
      opacity: 0.3
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      textAlign: 'center',
      fontFamily: '-apple-system, system-ui',
      fontSize: 17,
      color: sugg,
      letterSpacing: -0.43,
      lineHeight: '22px'
    }
  }, w)))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 13,
      padding: '0 6.5px',
      width: '100%',
      boxSizing: 'border-box',
      position: 'relative'
    }
  }, row(['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p']), row(['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'], 20), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 14.25,
      alignItems: 'center'
    }
  }, key(icons.shift, {
    w: 45,
    k: 'shift'
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 6.5,
      flex: 1
    }
  }, ['z', 'x', 'c', 'v', 'b', 'n', 'm'].map(l => key(l, {
    flex: true,
    k: l
  }))), key(icons.del, {
    w: 45,
    k: 'del'
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 6,
      alignItems: 'center'
    }
  }, key('ABC', {
    w: 92.25,
    fs: 18,
    k: 'abc'
  }), key('', {
    flex: true,
    k: 'space'
  }), key(icons.ret, {
    w: 92.25,
    ret: true,
    k: 'ret'
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      height: 56,
      width: '100%',
      position: 'relative'
    }
  }));
}
Object.assign(window, {
  IOSDevice,
  IOSStatusBar,
  IOSNavBar,
  IOSGlassPill,
  IOSList,
  IOSListRow,
  IOSKeyboard
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/commons/ios-frame.jsx", error: String((e && e.message) || e) }); }

// ui_kits/commons/tweaks-panel.jsx
try { (() => {
// @ds-adherence-ignore -- omelette starter scaffold (raw elements/hex/px by design)

/* BEGIN USAGE */
// tweaks-panel.jsx
// Reusable Tweaks shell + form-control helpers.
// Exports (to window): useTweaks, TweaksPanel, TweakSection, TweakRow, TweakSlider,
//   TweakToggle, TweakRadio, TweakSelect, TweakText, TweakNumber, TweakColor, TweakButton.
//
// Owns the host protocol (listens for __activate_edit_mode / __deactivate_edit_mode,
// posts __edit_mode_available / __edit_mode_set_keys / __edit_mode_dismissed) so
// individual prototypes don't re-roll it. Ships a consistent set of controls so you
// don't hand-draw <input type="range">, segmented radios, steppers, etc.
//
// Usage (in an HTML file that loads React + Babel):
//
//   const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
//     "primaryColor": "#D97757",
//     "palette": ["#D97757", "#29261b", "#f6f4ef"],
//     "fontSize": 16,
//     "density": "regular",
//     "dark": false
//   }/*EDITMODE-END*/;
//
//   function App() {
//     const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
//     return (
//       <div style={{ fontSize: t.fontSize, color: t.primaryColor }}>
//         Hello
//         <TweaksPanel>
//           <TweakSection label="Typography" />
//           <TweakSlider label="Font size" value={t.fontSize} min={10} max={32} unit="px"
//                        onChange={(v) => setTweak('fontSize', v)} />
//           <TweakRadio  label="Density" value={t.density}
//                        options={['compact', 'regular', 'comfy']}
//                        onChange={(v) => setTweak('density', v)} />
//           <TweakSection label="Theme" />
//           <TweakColor  label="Primary" value={t.primaryColor}
//                        options={['#D97757', '#2A6FDB', '#1F8A5B', '#7A5AE0']}
//                        onChange={(v) => setTweak('primaryColor', v)} />
//           <TweakColor  label="Palette" value={t.palette}
//                        options={[['#D97757', '#29261b', '#f6f4ef'],
//                                  ['#475569', '#0f172a', '#f1f5f9']]}
//                        onChange={(v) => setTweak('palette', v)} />
//           <TweakToggle label="Dark mode" value={t.dark}
//                        onChange={(v) => setTweak('dark', v)} />
//         </TweaksPanel>
//       </div>
//     );
//   }
//
// TweakRadio is the segmented control for 2–3 short options (auto-falls-back to
// TweakSelect past ~16/~10 chars per label); reach for TweakSelect directly when
// options are many or long. For color tweaks always curate 3-4 options rather than
// a free picker; an option can also be a whole 2–5 color palette (the stored value
// is the array). The Tweak* controls are a floor, not a ceiling — build custom
// controls inside the panel if a tweak calls for UI they don't cover.
/* END USAGE */
// ─────────────────────────────────────────────────────────────────────────────

const __TWEAKS_STYLE = `
  .twk-panel{position:fixed;right:16px;bottom:16px;z-index:2147483646;width:280px;
    max-height:calc(100vh - 32px);display:flex;flex-direction:column;
    transform:scale(var(--dc-inv-zoom,1));transform-origin:bottom right;
    background:rgba(250,249,247,.78);color:#29261b;
    -webkit-backdrop-filter:blur(24px) saturate(160%);backdrop-filter:blur(24px) saturate(160%);
    border:.5px solid rgba(255,255,255,.6);border-radius:14px;
    box-shadow:0 1px 0 rgba(255,255,255,.5) inset,0 12px 40px rgba(0,0,0,.18);
    font:11.5px/1.4 ui-sans-serif,system-ui,-apple-system,sans-serif;overflow:hidden}
  .twk-hd{display:flex;align-items:center;justify-content:space-between;
    padding:10px 8px 10px 14px;cursor:move;user-select:none}
  .twk-hd b{font-size:12px;font-weight:600;letter-spacing:.01em}
  .twk-x{appearance:none;border:0;background:transparent;color:rgba(41,38,27,.55);
    width:22px;height:22px;border-radius:6px;cursor:default;font-size:13px;line-height:1}
  .twk-x:hover{background:rgba(0,0,0,.06);color:#29261b}
  .twk-body{padding:2px 14px 14px;display:flex;flex-direction:column;gap:10px;
    overflow-y:auto;overflow-x:hidden;min-height:0;
    scrollbar-width:thin;scrollbar-color:rgba(0,0,0,.15) transparent}
  .twk-body::-webkit-scrollbar{width:8px}
  .twk-body::-webkit-scrollbar-track{background:transparent;margin:2px}
  .twk-body::-webkit-scrollbar-thumb{background:rgba(0,0,0,.15);border-radius:4px;
    border:2px solid transparent;background-clip:content-box}
  .twk-body::-webkit-scrollbar-thumb:hover{background:rgba(0,0,0,.25);
    border:2px solid transparent;background-clip:content-box}
  .twk-row{display:flex;flex-direction:column;gap:5px}
  .twk-row-h{flex-direction:row;align-items:center;justify-content:space-between;gap:10px}
  .twk-lbl{display:flex;justify-content:space-between;align-items:baseline;
    color:rgba(41,38,27,.72)}
  .twk-lbl>span:first-child{font-weight:500}
  .twk-val{color:rgba(41,38,27,.5);font-variant-numeric:tabular-nums}

  .twk-sect{font-size:10px;font-weight:600;letter-spacing:.06em;text-transform:uppercase;
    color:rgba(41,38,27,.45);padding:10px 0 0}
  .twk-sect:first-child{padding-top:0}

  .twk-field{appearance:none;box-sizing:border-box;width:100%;min-width:0;height:26px;padding:0 8px;
    border:.5px solid rgba(0,0,0,.1);border-radius:7px;
    background:rgba(255,255,255,.6);color:inherit;font:inherit;outline:none}
  .twk-field:focus{border-color:rgba(0,0,0,.25);background:rgba(255,255,255,.85)}
  select.twk-field{padding-right:22px;
    background-image:url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='10' height='6' viewBox='0 0 10 6'><path fill='rgba(0,0,0,.5)' d='M0 0h10L5 6z'/></svg>");
    background-repeat:no-repeat;background-position:right 8px center}

  .twk-slider{appearance:none;-webkit-appearance:none;width:100%;height:4px;margin:6px 0;
    border-radius:999px;background:rgba(0,0,0,.12);outline:none}
  .twk-slider::-webkit-slider-thumb{-webkit-appearance:none;appearance:none;
    width:14px;height:14px;border-radius:50%;background:#fff;
    border:.5px solid rgba(0,0,0,.12);box-shadow:0 1px 3px rgba(0,0,0,.2);cursor:default}
  .twk-slider::-moz-range-thumb{width:14px;height:14px;border-radius:50%;
    background:#fff;border:.5px solid rgba(0,0,0,.12);box-shadow:0 1px 3px rgba(0,0,0,.2);cursor:default}

  .twk-seg{position:relative;display:flex;padding:2px;border-radius:8px;
    background:rgba(0,0,0,.06);user-select:none}
  .twk-seg-thumb{position:absolute;top:2px;bottom:2px;border-radius:6px;
    background:rgba(255,255,255,.9);box-shadow:0 1px 2px rgba(0,0,0,.12);
    transition:left .15s cubic-bezier(.3,.7,.4,1),width .15s}
  .twk-seg.dragging .twk-seg-thumb{transition:none}
  .twk-seg button{appearance:none;position:relative;z-index:1;flex:1;border:0;
    background:transparent;color:inherit;font:inherit;font-weight:500;min-height:22px;
    border-radius:6px;cursor:default;padding:4px 6px;line-height:1.2;
    overflow-wrap:anywhere}

  .twk-toggle{position:relative;width:32px;height:18px;border:0;border-radius:999px;
    background:rgba(0,0,0,.15);transition:background .15s;cursor:default;padding:0}
  .twk-toggle[data-on="1"]{background:#34c759}
  .twk-toggle i{position:absolute;top:2px;left:2px;width:14px;height:14px;border-radius:50%;
    background:#fff;box-shadow:0 1px 2px rgba(0,0,0,.25);transition:transform .15s}
  .twk-toggle[data-on="1"] i{transform:translateX(14px)}

  .twk-num{display:flex;align-items:center;box-sizing:border-box;min-width:0;height:26px;padding:0 0 0 8px;
    border:.5px solid rgba(0,0,0,.1);border-radius:7px;background:rgba(255,255,255,.6)}
  .twk-num-lbl{font-weight:500;color:rgba(41,38,27,.6);cursor:ew-resize;
    user-select:none;padding-right:8px}
  .twk-num input{flex:1;min-width:0;height:100%;border:0;background:transparent;
    font:inherit;font-variant-numeric:tabular-nums;text-align:right;padding:0 8px 0 0;
    outline:none;color:inherit;-moz-appearance:textfield}
  .twk-num input::-webkit-inner-spin-button,.twk-num input::-webkit-outer-spin-button{
    -webkit-appearance:none;margin:0}
  .twk-num-unit{padding-right:8px;color:rgba(41,38,27,.45)}

  .twk-btn{appearance:none;height:26px;padding:0 12px;border:0;border-radius:7px;
    background:rgba(0,0,0,.78);color:#fff;font:inherit;font-weight:500;cursor:default}
  .twk-btn:hover{background:rgba(0,0,0,.88)}
  .twk-btn.secondary{background:rgba(0,0,0,.06);color:inherit}
  .twk-btn.secondary:hover{background:rgba(0,0,0,.1)}

  .twk-swatch{appearance:none;-webkit-appearance:none;width:56px;height:22px;
    border:.5px solid rgba(0,0,0,.1);border-radius:6px;padding:0;cursor:default;
    background:transparent;flex-shrink:0}
  .twk-swatch::-webkit-color-swatch-wrapper{padding:0}
  .twk-swatch::-webkit-color-swatch{border:0;border-radius:5.5px}
  .twk-swatch::-moz-color-swatch{border:0;border-radius:5.5px}

  .twk-chips{display:flex;gap:6px}
  .twk-chip{position:relative;appearance:none;flex:1;min-width:0;height:46px;
    padding:0;border:0;border-radius:6px;overflow:hidden;cursor:default;
    box-shadow:0 0 0 .5px rgba(0,0,0,.12),0 1px 2px rgba(0,0,0,.06);
    transition:transform .12s cubic-bezier(.3,.7,.4,1),box-shadow .12s}
  .twk-chip:hover{transform:translateY(-1px);
    box-shadow:0 0 0 .5px rgba(0,0,0,.18),0 4px 10px rgba(0,0,0,.12)}
  .twk-chip[data-on="1"]{box-shadow:0 0 0 1.5px rgba(0,0,0,.85),
    0 2px 6px rgba(0,0,0,.15)}
  .twk-chip>span{position:absolute;top:0;bottom:0;right:0;width:34%;
    display:flex;flex-direction:column;box-shadow:-1px 0 0 rgba(0,0,0,.1)}
  .twk-chip>span>i{flex:1;box-shadow:0 -1px 0 rgba(0,0,0,.1)}
  .twk-chip>span>i:first-child{box-shadow:none}
  .twk-chip svg{position:absolute;top:6px;left:6px;width:13px;height:13px;
    filter:drop-shadow(0 1px 1px rgba(0,0,0,.3))}
`;

// ── useTweaks ───────────────────────────────────────────────────────────────
// Single source of truth for tweak values. setTweak persists via the host
// (__edit_mode_set_keys → host rewrites the EDITMODE block on disk).
function useTweaks(defaults) {
  const [values, setValues] = React.useState(defaults);
  // Accepts either setTweak('key', value) or setTweak({ key: value, ... }) so a
  // useState-style call doesn't write a "[object Object]" key into the persisted
  // JSON block.
  const setTweak = React.useCallback((keyOrEdits, val) => {
    const edits = typeof keyOrEdits === 'object' && keyOrEdits !== null ? keyOrEdits : {
      [keyOrEdits]: val
    };
    setValues(prev => ({
      ...prev,
      ...edits
    }));
    window.parent.postMessage({
      type: '__edit_mode_set_keys',
      edits
    }, '*');
    // Same-window signal so in-page listeners (deck-stage rail thumbnails)
    // can react — the parent message only reaches the host, not peers.
    window.dispatchEvent(new CustomEvent('tweakchange', {
      detail: edits
    }));
  }, []);
  return [values, setTweak];
}

// ── TweaksPanel ─────────────────────────────────────────────────────────────
// Floating shell. Registers the protocol listener BEFORE announcing
// availability — if the announce ran first, the host's activate could land
// before our handler exists and the toolbar toggle would silently no-op.
// The close button posts __edit_mode_dismissed so the host's toolbar toggle
// flips off in lockstep; the host echoes __deactivate_edit_mode back which
// is what actually hides the panel.
function TweaksPanel({
  title = 'Tweaks',
  children
}) {
  const [open, setOpen] = React.useState(false);
  const dragRef = React.useRef(null);
  const offsetRef = React.useRef({
    x: 16,
    y: 16
  });
  const PAD = 16;
  const clampToViewport = React.useCallback(() => {
    const panel = dragRef.current;
    if (!panel) return;
    const w = panel.offsetWidth,
      h = panel.offsetHeight;
    const maxRight = Math.max(PAD, window.innerWidth - w - PAD);
    const maxBottom = Math.max(PAD, window.innerHeight - h - PAD);
    offsetRef.current = {
      x: Math.min(maxRight, Math.max(PAD, offsetRef.current.x)),
      y: Math.min(maxBottom, Math.max(PAD, offsetRef.current.y))
    };
    panel.style.right = offsetRef.current.x + 'px';
    panel.style.bottom = offsetRef.current.y + 'px';
  }, []);
  React.useEffect(() => {
    if (!open) return;
    clampToViewport();
    if (typeof ResizeObserver === 'undefined') {
      window.addEventListener('resize', clampToViewport);
      return () => window.removeEventListener('resize', clampToViewport);
    }
    const ro = new ResizeObserver(clampToViewport);
    ro.observe(document.documentElement);
    return () => ro.disconnect();
  }, [open, clampToViewport]);
  React.useEffect(() => {
    const onMsg = e => {
      const t = e?.data?.type;
      if (t === '__activate_edit_mode') setOpen(true);else if (t === '__deactivate_edit_mode') setOpen(false);
    };
    window.addEventListener('message', onMsg);
    window.parent.postMessage({
      type: '__edit_mode_available'
    }, '*');
    return () => window.removeEventListener('message', onMsg);
  }, []);
  const dismiss = () => {
    setOpen(false);
    window.parent.postMessage({
      type: '__edit_mode_dismissed'
    }, '*');
  };
  const onDragStart = e => {
    const panel = dragRef.current;
    if (!panel) return;
    const r = panel.getBoundingClientRect();
    const sx = e.clientX,
      sy = e.clientY;
    const startRight = window.innerWidth - r.right;
    const startBottom = window.innerHeight - r.bottom;
    const move = ev => {
      offsetRef.current = {
        x: startRight - (ev.clientX - sx),
        y: startBottom - (ev.clientY - sy)
      };
      clampToViewport();
    };
    const up = () => {
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mouseup', up);
    };
    window.addEventListener('mousemove', move);
    window.addEventListener('mouseup', up);
  };
  if (!open) return null;
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("style", null, __TWEAKS_STYLE), /*#__PURE__*/React.createElement("div", {
    ref: dragRef,
    className: "twk-panel",
    "data-omelette-chrome": "",
    style: {
      right: offsetRef.current.x,
      bottom: offsetRef.current.y
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "twk-hd",
    onMouseDown: onDragStart
  }, /*#__PURE__*/React.createElement("b", null, title), /*#__PURE__*/React.createElement("button", {
    className: "twk-x",
    "aria-label": "Close tweaks",
    onMouseDown: e => e.stopPropagation(),
    onClick: dismiss
  }, "\u2715")), /*#__PURE__*/React.createElement("div", {
    className: "twk-body"
  }, children)));
}

// ── Layout helpers ──────────────────────────────────────────────────────────

function TweakSection({
  label,
  children
}) {
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "twk-sect"
  }, label), children);
}
function TweakRow({
  label,
  value,
  children,
  inline = false
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: inline ? 'twk-row twk-row-h' : 'twk-row'
  }, /*#__PURE__*/React.createElement("div", {
    className: "twk-lbl"
  }, /*#__PURE__*/React.createElement("span", null, label), value != null && /*#__PURE__*/React.createElement("span", {
    className: "twk-val"
  }, value)), children);
}

// ── Controls ────────────────────────────────────────────────────────────────

function TweakSlider({
  label,
  value,
  min = 0,
  max = 100,
  step = 1,
  unit = '',
  onChange
}) {
  return /*#__PURE__*/React.createElement(TweakRow, {
    label: label,
    value: `${value}${unit}`
  }, /*#__PURE__*/React.createElement("input", {
    type: "range",
    className: "twk-slider",
    min: min,
    max: max,
    step: step,
    value: value,
    onChange: e => onChange(Number(e.target.value))
  }));
}
function TweakToggle({
  label,
  value,
  onChange
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "twk-row twk-row-h"
  }, /*#__PURE__*/React.createElement("div", {
    className: "twk-lbl"
  }, /*#__PURE__*/React.createElement("span", null, label)), /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "twk-toggle",
    "data-on": value ? '1' : '0',
    role: "switch",
    "aria-checked": !!value,
    onClick: () => onChange(!value)
  }, /*#__PURE__*/React.createElement("i", null)));
}
function TweakRadio({
  label,
  value,
  options,
  onChange
}) {
  const trackRef = React.useRef(null);
  const [dragging, setDragging] = React.useState(false);
  // The active value is read by pointer-move handlers attached for the lifetime
  // of a drag — ref it so a stale closure doesn't fire onChange for every move.
  const valueRef = React.useRef(value);
  valueRef.current = value;

  // Segments wrap mid-word once per-segment width runs out. The track is
  // ~248px (280 panel − 28 body pad − 4 seg pad), each button loses 12px
  // to its own padding, and 11.5px system-ui averages ~6.3px/char — so 2
  // options fit ~16 chars each, 3 fit ~10. Past that (or >3 options), fall
  // back to a dropdown rather than wrap.
  const labelLen = o => String(typeof o === 'object' ? o.label : o).length;
  const maxLen = options.reduce((m, o) => Math.max(m, labelLen(o)), 0);
  const fitsAsSegments = maxLen <= ({
    2: 16,
    3: 10
  }[options.length] ?? 0);
  if (!fitsAsSegments) {
    // <select> emits strings — map back to the original option value so the
    // fallback stays type-preserving (numbers, booleans) like the segment path.
    const resolve = s => {
      const m = options.find(o => String(typeof o === 'object' ? o.value : o) === s);
      return m === undefined ? s : typeof m === 'object' ? m.value : m;
    };
    return /*#__PURE__*/React.createElement(TweakSelect, {
      label: label,
      value: value,
      options: options,
      onChange: s => onChange(resolve(s))
    });
  }
  const opts = options.map(o => typeof o === 'object' ? o : {
    value: o,
    label: o
  });
  const idx = Math.max(0, opts.findIndex(o => o.value === value));
  const n = opts.length;
  const segAt = clientX => {
    const r = trackRef.current.getBoundingClientRect();
    const inner = r.width - 4;
    const i = Math.floor((clientX - r.left - 2) / inner * n);
    return opts[Math.max(0, Math.min(n - 1, i))].value;
  };
  const onPointerDown = e => {
    setDragging(true);
    const v0 = segAt(e.clientX);
    if (v0 !== valueRef.current) onChange(v0);
    const move = ev => {
      if (!trackRef.current) return;
      const v = segAt(ev.clientX);
      if (v !== valueRef.current) onChange(v);
    };
    const up = () => {
      setDragging(false);
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerup', up);
    };
    window.addEventListener('pointermove', move);
    window.addEventListener('pointerup', up);
  };
  return /*#__PURE__*/React.createElement(TweakRow, {
    label: label
  }, /*#__PURE__*/React.createElement("div", {
    ref: trackRef,
    role: "radiogroup",
    onPointerDown: onPointerDown,
    className: dragging ? 'twk-seg dragging' : 'twk-seg'
  }, /*#__PURE__*/React.createElement("div", {
    className: "twk-seg-thumb",
    style: {
      left: `calc(2px + ${idx} * (100% - 4px) / ${n})`,
      width: `calc((100% - 4px) / ${n})`
    }
  }), opts.map(o => /*#__PURE__*/React.createElement("button", {
    key: o.value,
    type: "button",
    role: "radio",
    "aria-checked": o.value === value
  }, o.label))));
}
function TweakSelect({
  label,
  value,
  options,
  onChange
}) {
  return /*#__PURE__*/React.createElement(TweakRow, {
    label: label
  }, /*#__PURE__*/React.createElement("select", {
    className: "twk-field",
    value: value,
    onChange: e => onChange(e.target.value)
  }, options.map(o => {
    const v = typeof o === 'object' ? o.value : o;
    const l = typeof o === 'object' ? o.label : o;
    return /*#__PURE__*/React.createElement("option", {
      key: v,
      value: v
    }, l);
  })));
}
function TweakText({
  label,
  value,
  placeholder,
  onChange
}) {
  return /*#__PURE__*/React.createElement(TweakRow, {
    label: label
  }, /*#__PURE__*/React.createElement("input", {
    className: "twk-field",
    type: "text",
    value: value,
    placeholder: placeholder,
    onChange: e => onChange(e.target.value)
  }));
}
function TweakNumber({
  label,
  value,
  min,
  max,
  step = 1,
  unit = '',
  onChange
}) {
  const clamp = n => {
    if (min != null && n < min) return min;
    if (max != null && n > max) return max;
    return n;
  };
  const startRef = React.useRef({
    x: 0,
    val: 0
  });
  const onScrubStart = e => {
    e.preventDefault();
    startRef.current = {
      x: e.clientX,
      val: value
    };
    const decimals = (String(step).split('.')[1] || '').length;
    const move = ev => {
      const dx = ev.clientX - startRef.current.x;
      const raw = startRef.current.val + dx * step;
      const snapped = Math.round(raw / step) * step;
      onChange(clamp(Number(snapped.toFixed(decimals))));
    };
    const up = () => {
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerup', up);
    };
    window.addEventListener('pointermove', move);
    window.addEventListener('pointerup', up);
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "twk-num"
  }, /*#__PURE__*/React.createElement("span", {
    className: "twk-num-lbl",
    onPointerDown: onScrubStart
  }, label), /*#__PURE__*/React.createElement("input", {
    type: "number",
    value: value,
    min: min,
    max: max,
    step: step,
    onChange: e => onChange(clamp(Number(e.target.value)))
  }), unit && /*#__PURE__*/React.createElement("span", {
    className: "twk-num-unit"
  }, unit));
}

// Relative-luminance contrast pick — checkmarks drawn over a swatch need to
// read on both #111 and #fafafa without per-option configuration. Hex input
// only (#rgb / #rrggbb); named or rgb()/hsl() colors fall through to "light".
function __twkIsLight(hex) {
  const h = String(hex).replace('#', '');
  const x = h.length === 3 ? h.replace(/./g, c => c + c) : h.padEnd(6, '0');
  const n = parseInt(x.slice(0, 6), 16);
  if (Number.isNaN(n)) return true;
  const r = n >> 16 & 255,
    g = n >> 8 & 255,
    b = n & 255;
  return r * 299 + g * 587 + b * 114 > 148000;
}
const __TwkCheck = ({
  light
}) => /*#__PURE__*/React.createElement("svg", {
  viewBox: "0 0 14 14",
  "aria-hidden": "true"
}, /*#__PURE__*/React.createElement("path", {
  d: "M3 7.2 5.8 10 11 4.2",
  fill: "none",
  strokeWidth: "2.2",
  strokeLinecap: "round",
  strokeLinejoin: "round",
  stroke: light ? 'rgba(0,0,0,.78)' : '#fff'
}));

// TweakColor — curated color/palette picker. Each option is either a single
// hex string or an array of 1-5 hex strings; the card adapts — a lone color
// renders solid, a palette renders colors[0] as the hero (left ~2/3) with the
// rest stacked in a sharp column on the right. onChange emits the
// option in the shape it was passed (string stays string, array stays array).
// Without options it falls back to the native color input for back-compat.
function TweakColor({
  label,
  value,
  options,
  onChange
}) {
  if (!options || !options.length) {
    return /*#__PURE__*/React.createElement("div", {
      className: "twk-row twk-row-h"
    }, /*#__PURE__*/React.createElement("div", {
      className: "twk-lbl"
    }, /*#__PURE__*/React.createElement("span", null, label)), /*#__PURE__*/React.createElement("input", {
      type: "color",
      className: "twk-swatch",
      value: value,
      onChange: e => onChange(e.target.value)
    }));
  }
  // Native <input type=color> emits lowercase hex per the HTML spec, so
  // compare case-insensitively. String() guards JSON.stringify(undefined),
  // which returns the primitive undefined (no .toLowerCase).
  const key = o => String(JSON.stringify(o)).toLowerCase();
  const cur = key(value);
  return /*#__PURE__*/React.createElement(TweakRow, {
    label: label
  }, /*#__PURE__*/React.createElement("div", {
    className: "twk-chips",
    role: "radiogroup"
  }, options.map((o, i) => {
    const colors = Array.isArray(o) ? o : [o];
    const [hero, ...rest] = colors;
    const sup = rest.slice(0, 4);
    const on = key(o) === cur;
    return /*#__PURE__*/React.createElement("button", {
      key: i,
      type: "button",
      className: "twk-chip",
      role: "radio",
      "aria-checked": on,
      "data-on": on ? '1' : '0',
      "aria-label": colors.join(', '),
      title: colors.join(' · '),
      style: {
        background: hero
      },
      onClick: () => onChange(o)
    }, sup.length > 0 && /*#__PURE__*/React.createElement("span", null, sup.map((c, j) => /*#__PURE__*/React.createElement("i", {
      key: j,
      style: {
        background: c
      }
    }))), on && /*#__PURE__*/React.createElement(__TwkCheck, {
      light: __twkIsLight(hero)
    }));
  })));
}
function TweakButton({
  label,
  onClick,
  secondary = false
}) {
  return /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: secondary ? 'twk-btn secondary' : 'twk-btn',
    onClick: onClick
  }, label);
}
Object.assign(window, {
  useTweaks,
  TweaksPanel,
  TweakSection,
  TweakRow,
  TweakSlider,
  TweakToggle,
  TweakRadio,
  TweakSelect,
  TweakText,
  TweakNumber,
  TweakColor,
  TweakButton
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/commons/tweaks-panel.jsx", error: String((e && e.message) || e) }); }

})();
