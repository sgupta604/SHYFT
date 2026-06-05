/**
 * Tab shell — built from lib/registry.ts (the plugin seam). The bottom bar
 * lists the 5 feature manifests in order with their Lucide icons. Active =
 * accent blue + heavier stroke, inactive = charcoal-600. Solid bar + hairline
 * (no blur, per Clarity — blur is reserved for overlays). Routing only.
 */
import { Tabs } from 'expo-router';
import { Icon } from '@/components/Icon';
import { REGISTRY, type FeatureManifest } from '@/lib/registry';
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

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
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
      {REGISTRY.map((m) => (
        <Tabs.Screen
          key={m.id}
          name={SEGMENT[m.id]}
          options={{
            title: m.title,
            tabBarIcon: ({ color, focused }) => (
              <Icon name={m.icon} size={22} strokeWidth={focused ? 2.4 : 2} color={color} />
            ),
          }}
        />
      ))}
    </Tabs>
  );
}
