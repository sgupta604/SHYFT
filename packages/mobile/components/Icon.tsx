/**
 * Icon — lucide-react-native wrapper.
 *
 * Accepts kebab-case prototype names (e.g. 'cloud-sun') and resolves them to
 * the PascalCase lucide component. Exposes a stroke-weight prop (Clarity uses
 * 2 default, 2.4 for active tab icons).
 *
 * Icon-name audit (plan Task 2.1): the three suspects volleyball / glass-water
 * / square-parking ALL exist in lucide-react-native ^1.17. Substitutions made:
 *   check-circle-2 -> circle-check
 *   help-circle    -> circle-question-mark
 */
import * as Lucide from 'lucide-react-native';
import type { LucideProps } from 'lucide-react-native';
import { colors } from '@/lib/theme/colors';

/** Prototype name -> available lucide name (only where the original is gone). */
const ALIASES: Record<string, string> = {
  'check-circle-2': 'circle-check',
  'help-circle': 'circle-question-mark',
};

function toPascal(name: string): string {
  return name
    .split('-')
    .map((s) => (s.length ? s[0].toUpperCase() + s.slice(1) : s))
    .join('');
}

export type IconProps = {
  name: string;
  size?: number;
  strokeWidth?: number;
  color?: string;
} & Omit<LucideProps, 'name' | 'size' | 'strokeWidth' | 'color'>;

export function Icon({
  name,
  size = 20,
  strokeWidth = 2,
  color = colors.text,
  ...rest
}: IconProps) {
  const resolved = ALIASES[name] ?? name;
  const Cmp = (Lucide as Record<string, unknown>)[toPascal(resolved)] as
    | React.ComponentType<LucideProps>
    | undefined;
  if (!Cmp) {
    if (__DEV__) {
      console.warn(`[Icon] unknown lucide icon: "${name}" -> "${resolved}"`);
    }
    const Fallback = Lucide.Square;
    return <Fallback size={size} strokeWidth={strokeWidth} color={color} {...rest} />;
  }
  return <Cmp size={size} strokeWidth={strokeWidth} color={color} {...rest} />;
}

export default Icon;
