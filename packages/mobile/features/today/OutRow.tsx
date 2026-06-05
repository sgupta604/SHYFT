/**
 * OutRow — a single "who's out today" row. Ports OutRow from Cards.jsx:
 *   avatar · name (+ optional note) · kind pill (tone dot).
 * `last` drops the hairline divider on the final row inside the card.
 */
import { StyleSheet, Text, View } from 'react-native';
import { Avatar } from '@/components/Avatar';
import { Pill } from '@/components/Pill';
import { colors } from '@/lib/theme/colors';
import { fonts, type } from '@/lib/theme/type';
import type { OutPerson } from '@/lib/data/types';

export type OutRowProps = {
  person: OutPerson;
  last?: boolean;
};

export function OutRow({ person, last }: OutRowProps) {
  return (
    <View style={[styles.row, last ? null : styles.divider]}>
      <Avatar name={person.name} size={36} />
      <View style={styles.body}>
        <Text style={styles.name}>{person.name}</Text>
        {person.note ? <Text style={[type.label12, styles.note]}>{person.note}</Text> : null}
      </View>
      <Pill tone={person.tone} dot>
        {person.kind}
      </Pill>
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', gap: 11, paddingVertical: 11 },
  divider: { borderBottomWidth: 1, borderBottomColor: colors.border },
  body: { flex: 1 },
  name: { fontFamily: fonts.inter500, fontSize: 13.5, color: colors.text },
  note: { color: colors.textSubtle, marginTop: 2 },
});

export default OutRow;
