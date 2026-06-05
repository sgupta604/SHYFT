/**
 * Tab shell — built from lib/registry.ts (the plugin seam). The bottom bar
 * lists the 5 feature manifests in order with their Lucide icons. Active =
 * accent blue + heavier stroke, inactive = charcoal-600. Solid bar + hairline
 * (no blur, per Clarity — blur is reserved for overlays).
 *
 * Chrome header: each tab renders an AppHeader via its `header` option, driven
 * by HEADER_MAP (ported from App.jsx:51-57). The bell opens a single
 * NotificationsSheet mounted here and driven by the chrome-level UI store, so
 * the same sheet works from every tab. Routing + chrome wiring only.
 */
import { Tabs } from 'expo-router';
import { AppHeader } from '@/components/AppHeader';
import { Icon } from '@/components/Icon';
import { NotificationsSheet } from '@/components/NotificationsSheet';
import { REGISTRY, type FeatureManifest } from '@/lib/registry';
import { useUiStore } from '@/lib/stores/ui';
import { colors, scale } from '@/lib/theme/colors';
import { fonts } from '@/lib/theme/type';

/** Manifest id -> (tabs) route segment. `today` is the index route. */
const SEGMENT: Record<FeatureManifest['id'], string> = {
  today: 'index',
  events: 'events',
  you: 'you',
  people: 'people',
  more: 'more',
};

/** Per-tab chrome header (ported from App.jsx:51-57). Bell + unread dot show
 *  on every tab; the S2 mark is Today-only; search is People-only. */
const HEADER_MAP: Record<
  FeatureManifest['id'],
  { title: string; subtitle?: string; mark?: boolean; search?: boolean }
> = {
  today: { title: 'Good morning, Alex', subtitle: 'Tuesday · March 25', mark: true },
  events: { title: 'Events' },
  you: { title: 'You', subtitle: 'Alex Rivera · Platform' },
  people: { title: 'People', search: true },
  more: { title: 'More' },
};

export default function TabsLayout() {
  const openNotifications = useUiStore((s) => s.openNotifications);
  const notificationsOpen = useUiStore((s) => s.notificationsOpen);
  const closeNotifications = useUiStore((s) => s.closeNotifications);

  return (
    <>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: colors.accent,
          tabBarInactiveTintColor: scale.charcoal[600],
          tabBarStyle: {
            backgroundColor: 'rgba(255,255,255,0.96)',
            borderTopWidth: 1,
            borderTopColor: colors.border,
          },
          tabBarLabelStyle: {
            fontFamily: fonts.inter500,
            fontSize: 11,
          },
        }}
      >
        {REGISTRY.map((m) => {
          const h = HEADER_MAP[m.id];
          return (
            <Tabs.Screen
              key={m.id}
              name={SEGMENT[m.id]}
              options={{
                title: m.title,
                header: () => (
                  <AppHeader
                    title={h.title}
                    subtitle={h.subtitle}
                    mark={h.mark}
                    onBell={openNotifications}
                    onSearch={h.search ? () => {} : undefined}
                  />
                ),
                tabBarIcon: ({ color, focused }) => (
                  <Icon name={m.icon} size={22} strokeWidth={focused ? 2.4 : 2} color={color} />
                ),
              }}
            />
          );
        })}
      </Tabs>

      {notificationsOpen ? <NotificationsSheet onClose={closeNotifications} /> : null}
    </>
  );
}
