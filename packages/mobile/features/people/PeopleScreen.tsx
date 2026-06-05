/**
 * PeopleScreen — People tab. Ports PeopleScreen.jsx:
 *   - Search field that filters the directory live (name / role / team).
 *   - Segmented Directory | Out | Holidays.
 *   - Directory: a teammate row per person -> router.push('/person/:id').
 *   - Out: who's out today + the Workday sync note.
 *   - Holidays: company holidays with date blocks + "Office closed" pills.
 * Mock data is read straight from lib/data (static directory — no store needed).
 */
import { useMemo, useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { PersonRow } from './PersonRow';
import { Card } from '@/components/Card';
import { Icon } from '@/components/Icon';
import { Pill } from '@/components/Pill';
import { SectionHeader } from '@/components/SectionHeader';
import { Segmented } from '@/components/Segmented';
import { Avatar } from '@/components/Avatar';
import { PEOPLE } from '@/lib/data/people';
import { HOLIDAYS, OUT_TODAY } from '@/lib/data/misc';
import { colors } from '@/lib/theme/colors';
import { radii, space } from '@/lib/theme/spacing';
import { fonts, type } from '@/lib/theme/type';

const TABS = ['Directory', 'Out', 'Holidays'];

export function PeopleScreen() {
  const insets = useSafeAreaInsets();
  const [tab, setTab] = useState('Directory');
  const [query, setQuery] = useState('');

  const matches = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return PEOPLE;
    return PEOPLE.filter((p) =>
      `${p.name} ${p.role} ${p.team}`.toLowerCase().includes(q)
    );
  }, [query]);

  return (
    <View style={styles.root}>
      <ScrollView
        contentContainerStyle={[styles.content, { paddingBottom: space[8] + insets.bottom }]}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.search}>
          <Icon name="search" size={17} color={colors.textSubtle} />
          <TextInput
            value={query}
            onChangeText={setQuery}
            placeholder="Search people, teams…"
            placeholderTextColor={colors.textSubtle}
            autoCapitalize="none"
            autoCorrect={false}
            style={styles.searchInput}
          />
        </View>

        <Segmented options={TABS} value={tab} onChange={setTab} />

        {tab === 'Directory' && (
          <>
            <SectionHeader
              title={`${matches.length} ${matches.length === 1 ? 'teammate' : 'teammates'}`}
            />
            {matches.length === 0 ? (
              <Card style={styles.emptyCard}>
                <Icon name="users" size={24} color={colors.borderStrong} />
                <Text style={[type.label12, styles.emptyTitle]}>No teammates found</Text>
                <Text style={[type.caption11, styles.emptySub]}>
                  Try a different name, team, or role.
                </Text>
              </Card>
            ) : (
              <Card style={styles.listCard}>
                {matches.map((p, i) => (
                  <PersonRow
                    key={p.id}
                    person={p}
                    last={i === matches.length - 1}
                    onPress={() => router.push(`/person/${p.id}`)}
                  />
                ))}
              </Card>
            )}
          </>
        )}

        {tab === 'Out' && (
          <>
            <SectionHeader title="Out today" />
            <Card style={styles.outCard}>
              {OUT_TODAY.map((o, i) => (
                <View
                  key={o.name}
                  style={[styles.outRow, i !== OUT_TODAY.length - 1 && styles.divider]}
                >
                  <Avatar name={o.name} size={36} />
                  <View style={styles.outBody}>
                    <Text style={styles.outName}>{o.name}</Text>
                    {o.note ? (
                      <Text style={[type.caption11, styles.meta]}>{o.note}</Text>
                    ) : null}
                  </View>
                  <Pill tone={o.tone} dot>
                    {o.kind}
                  </Pill>
                </View>
              ))}
            </Card>
            <View style={styles.note}>
              <Icon name="info" size={14} color={colors.textSubtle} />
              <Text style={[type.caption11, styles.noteText]}>
                Request time off in Workday — it syncs here automatically.
              </Text>
            </View>
          </>
        )}

        {tab === 'Holidays' && (
          <>
            <SectionHeader title="Company holidays" />
            <Card style={styles.holidayCard}>
              {HOLIDAYS.map((h, i) => {
                const [mon, day] = h.date.split(' ');
                return (
                  <View
                    key={h.name}
                    style={[
                      styles.holidayRow,
                      i !== HOLIDAYS.length - 1 && styles.divider,
                    ]}
                  >
                    <View style={styles.dateBlock}>
                      <Text style={styles.dateDay}>{day}</Text>
                      <Text style={styles.dateMon}>{mon}</Text>
                    </View>
                    <View style={styles.holidayBody}>
                      <Text style={styles.holidayName}>{h.name}</Text>
                      <Text style={[type.caption11, styles.meta]}>{h.day}</Text>
                    </View>
                    {h.closed ? (
                      <Pill tone="neutral" dot={false}>
                        Office closed
                      </Pill>
                    ) : null}
                  </View>
                );
              })}
            </Card>
          </>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.bg },
  content: { padding: space[5], gap: space[3] },

  search: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 9,
    height: 40,
    paddingHorizontal: space[3],
    borderWidth: 1,
    borderColor: colors.borderStrong,
    borderRadius: radii.md,
    backgroundColor: colors.bgElev,
  },
  searchInput: {
    flex: 1,
    fontFamily: fonts.inter400,
    fontSize: 13.5,
    color: colors.text,
    padding: 0,
  },

  listCard: { paddingHorizontal: space[5], paddingVertical: 2 },
  emptyCard: { alignItems: 'center', paddingVertical: 28, paddingHorizontal: space[6] },
  emptyTitle: { marginTop: space[2] },
  emptySub: { marginTop: space[1], textAlign: 'center' },

  outCard: { paddingHorizontal: space[5], paddingVertical: 4 },
  outRow: { flexDirection: 'row', alignItems: 'center', gap: 11, paddingVertical: 11 },
  outBody: { flex: 1 },
  outName: { fontFamily: fonts.inter500, fontSize: 13.5, color: colors.text },

  note: { flexDirection: 'row', alignItems: 'center', gap: space[2], marginTop: space[1] },
  noteText: { flex: 1 },

  holidayCard: { overflow: 'hidden' },
  holidayRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    paddingVertical: 14,
    paddingHorizontal: space[4],
  },
  dateBlock: { width: 42, alignItems: 'center' },
  dateDay: { fontFamily: fonts.sora600, fontSize: 15, lineHeight: 16, color: colors.accent },
  dateMon: {
    fontFamily: fonts.inter500,
    fontSize: 10.5,
    marginTop: 1,
    textTransform: 'uppercase',
    letterSpacing: 0.42,
    color: colors.textSubtle,
  },
  holidayBody: { flex: 1 },
  holidayName: { fontFamily: fonts.inter500, fontSize: 14, color: colors.text },

  divider: { borderBottomWidth: 1, borderBottomColor: colors.border },
  meta: { marginTop: 2 },
});

export default PeopleScreen;
