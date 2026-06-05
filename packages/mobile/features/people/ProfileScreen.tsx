/**
 * ProfileScreen — teammate profile (full-screen push). Ports the Profile overlay
 * from PeopleScreen.jsx: back header, centered identity card with Message /
 * Give kudos (no-ops), and a "Kudos received" section. Each kudo renders a value
 * tag tinted via VALUE_TONE (Customer obsession=blue, Ownership=green,
 * Craft=purple, Team=orange), with an empty state when there are none.
 */
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Avatar } from '@/components/Avatar';
import { Button } from '@/components/Button';
import { Card } from '@/components/Card';
import { Icon } from '@/components/Icon';
import { Pill } from '@/components/Pill';
import { SectionHeader } from '@/components/SectionHeader';
import { PEOPLE } from '@/lib/data/people';
import type { Tone } from '@/lib/theme/colors';
import { colors, scale } from '@/lib/theme/colors';
import { space } from '@/lib/theme/spacing';
import { fonts, type } from '@/lib/theme/type';

const VALUE_TONE: Record<string, Tone> = {
  'Customer obsession': 'blue',
  Ownership: 'green',
  Craft: 'purple',
  Team: 'orange',
};

export type ProfileScreenProps = { id: string };

export function ProfileScreen({ id }: ProfileScreenProps) {
  const insets = useSafeAreaInsets();
  const person = PEOPLE.find((p) => p.id === id);

  return (
    <View style={styles.root}>
      <View style={[styles.header, { paddingTop: insets.top + space[2] }]}>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Back"
          onPress={() => router.back()}
          style={({ pressed }) => [styles.backBtn, pressed && styles.pressed]}
        >
          <Icon name="chevron-left" size={20} color={colors.text} />
        </Pressable>
        <Text style={type.heading17}>Profile</Text>
      </View>

      <ScrollView
        contentContainerStyle={[styles.content, { paddingBottom: space[8] + insets.bottom }]}
        showsVerticalScrollIndicator={false}
      >
        {!person ? (
          <Card pad style={styles.emptyCard}>
            <Icon name="user-x" size={24} color={scale.charcoal[300]} />
            <Text style={[type.body14, styles.emptySub]}>
              We couldn’t find that teammate.
            </Text>
          </Card>
        ) : (
          <>
            <Card pad style={styles.identity}>
              <Avatar name={person.name} size={72} />
              <Text style={styles.identityName}>{person.name}</Text>
              <Text style={[type.caption11, styles.identityMeta]}>
                {person.role} · {person.team}
              </Text>
              <View style={styles.locRow}>
                <Icon name="map-pin" size={13} color={colors.textSubtle} />
                <Text style={type.caption11}>{person.loc}</Text>
              </View>
              <View style={styles.actions}>
                <Button variant="primary" size="sm" icon="message-circle" onPress={() => {}}>
                  Message
                </Button>
                <Button variant="secondary" size="sm" icon="party-popper" onPress={() => {}}>
                  Give kudos
                </Button>
              </View>
            </Card>

            <View style={styles.kudosHead}>
              <SectionHeader title="Kudos received" />
              <Text style={styles.kudosCount}>{person.kudos.length}</Text>
            </View>

            {person.kudos.length === 0 ? (
              <Card pad style={styles.emptyCard}>
                <Icon name="party-popper" size={24} color={scale.charcoal[300]} />
                <Text style={[type.caption11, styles.emptySub]}>
                  No kudos yet — be the first to recognize {person.name.split(' ')[0]}.
                </Text>
              </Card>
            ) : (
              person.kudos.map((k, i) => (
                <Card key={i} pad>
                  <View style={styles.kudoTop}>
                    <Pill tone={VALUE_TONE[k.value] ?? 'blue'} dot>
                      {k.value}
                    </Pill>
                    <Text style={type.caption11}>{k.time}</Text>
                  </View>
                  <Text style={[type.body14, styles.kudoText]}>{k.text}</Text>
                  <View style={styles.kudoFrom}>
                    <Avatar name={k.from} size={24} />
                    <Text style={type.caption11}>
                      from <Text style={styles.fromName}>{k.from}</Text>
                    </Text>
                  </View>
                </Card>
              ))
            )}
          </>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.bg },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: space[3],
    paddingHorizontal: space[5],
    paddingBottom: space[3],
  },
  backBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pressed: { opacity: 0.6 },

  content: { padding: space[5], gap: space[3] },

  identity: { alignItems: 'center', paddingVertical: space[6] },
  identityName: {
    fontFamily: fonts.sora600,
    fontSize: 19,
    lineHeight: 23,
    letterSpacing: -0.19,
    color: colors.text,
    marginTop: space[3],
  },
  identityMeta: { marginTop: space[1] },
  locRow: { flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 6 },
  actions: { flexDirection: 'row', gap: space[2], marginTop: space[4] },

  kudosHead: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  kudosCount: {
    fontFamily: fonts.mono500,
    fontSize: 12,
    color: colors.textSubtle,
    fontVariant: ['tabular-nums'],
  },

  kudoTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 9,
  },
  kudoText: { color: colors.text, marginTop: space[2] },
  kudoFrom: { flexDirection: 'row', alignItems: 'center', gap: space[2], marginTop: 11 },
  fromName: { fontFamily: fonts.inter500, color: colors.textMuted },

  emptyCard: { alignItems: 'center' },
  emptySub: { marginTop: space[2], textAlign: 'center', color: colors.textMuted },
});

export default ProfileScreen;
