/**
 * PersonRow — one teammate in the directory: avatar, name, role · team, an
 * optional kudos count, and a chevron. Tapping opens the profile.
 * Ports the directory button from PeopleScreen.jsx.
 */
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Avatar } from '@/components/Avatar';
import { Icon } from '@/components/Icon';
import type { Person } from '@/lib/data/types';
import { colors } from '@/lib/theme/colors';
import { space } from '@/lib/theme/spacing';
import { fonts, type } from '@/lib/theme/type';

export type PersonRowProps = {
  person: Person;
  last?: boolean;
  onPress: () => void;
};

export function PersonRow({ person, last, onPress }: PersonRowProps) {
  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      style={({ pressed }) => [
        styles.row,
        !last && styles.divider,
        pressed && styles.pressed,
      ]}
    >
      <Avatar name={person.name} size={40} />
      <View style={styles.body}>
        <Text style={styles.name}>{person.name}</Text>
        <Text style={[type.caption11, styles.meta]}>
          {person.role} · {person.team}
        </Text>
      </View>
      {person.kudos.length > 0 ? (
        <View style={styles.kudos}>
          <Icon name="party-popper" size={14} color={colors.textSubtle} />
          <Text style={styles.kudosCount}>{person.kudos.length}</Text>
        </View>
      ) : null}
      <Icon name="chevron-right" size={17} color={colors.textSubtle} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: space[3],
    paddingVertical: 11,
  },
  divider: { borderBottomWidth: 1, borderBottomColor: colors.border },
  pressed: { opacity: 0.6 },
  body: { flex: 1, minWidth: 0 },
  name: { fontFamily: fonts.inter600, fontSize: 13.5, color: colors.text },
  meta: { marginTop: 2 },
  kudos: { flexDirection: 'row', alignItems: 'center', gap: 5 },
  kudosCount: {
    fontFamily: fonts.mono600,
    fontSize: 12,
    color: colors.textSubtle,
    fontVariant: ['tabular-nums'],
  },
});

export default PersonRow;
