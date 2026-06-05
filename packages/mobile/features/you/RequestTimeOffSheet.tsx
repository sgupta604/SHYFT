/**
 * RequestTimeOffSheet — static request-form preview in the shared Sheet shell.
 * The fields are visual-only (no backend today); "Submit request" closes the
 * sheet. Opens from the PTO snapshot on the You screen.
 */
import { StyleSheet, Text, View } from 'react-native';
import { Button } from '@/components/Button';
import { Icon } from '@/components/Icon';
import { Sheet } from '@/components/Sheet';
import { colors } from '@/lib/theme/colors';
import { radii, space } from '@/lib/theme/spacing';
import { fonts, type } from '@/lib/theme/type';

export type RequestTimeOffSheetProps = {
  visible: boolean;
  onClose: () => void;
};

const FIELDS: { icon: string; label: string; value: string }[] = [
  { icon: 'calendar', label: 'Type', value: 'Vacation (PTO)' },
  { icon: 'calendar-days', label: 'Dates', value: 'Pick a start and end date' },
  { icon: 'message-square', label: 'Note for your manager', value: 'Optional' },
];

export function RequestTimeOffSheet({ visible, onClose }: RequestTimeOffSheetProps) {
  return (
    <Sheet visible={visible} title="Request time off" onClose={onClose}>
      <View style={styles.fields}>
        {FIELDS.map((f) => (
          <View key={f.label} style={styles.field}>
            <Icon name={f.icon} size={17} color={colors.textMuted} />
            <View style={styles.fieldText}>
              <Text style={styles.fieldLabel}>{f.label}</Text>
              <Text style={styles.fieldValue}>{f.value}</Text>
            </View>
          </View>
        ))}
      </View>
      <Text style={styles.note}>You have 14 days remaining. Requests route to your manager for approval.</Text>
      <Button variant="primary" block icon="check" onPress={onClose}>
        Submit request
      </Button>
    </Sheet>
  );
}

const styles = StyleSheet.create({
  fields: { gap: space[2] },
  field: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: colors.bgElev,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radii.md,
    padding: 13,
  },
  fieldText: { flex: 1 },
  fieldLabel: { ...type.caption11, fontSize: 11.5 },
  fieldValue: { fontFamily: fonts.inter500, fontSize: 13.5, lineHeight: 18, color: colors.text, marginTop: 1 },
  note: { ...type.caption11, fontSize: 12, lineHeight: 17, color: colors.textMuted, paddingHorizontal: 2 },
});

export default RequestTimeOffSheet;
