/**
 * Clarity — semantic type classes ported from colors_and_type.css.
 *
 * RN selects a custom font weight by FAMILY NAME (e.g. 'Sora_600SemiBold'),
 * never via fontWeight. letterSpacing is em→px against the fontSize
 * (e.g. -0.02em @ 40px -> -0.8). Numerals use JetBrains Mono +
 * fontVariant: ['tabular-nums'].
 *
 * Font family names come from @expo-google-fonts/{sora,inter,jetbrains-mono}.
 */
import type { TextStyle } from 'react-native';
import { colors } from './colors';

export const fonts = {
  sora400: 'Sora_400Regular',
  sora500: 'Sora_500Medium',
  sora600: 'Sora_600SemiBold',
  sora700: 'Sora_700Bold',
  inter400: 'Inter_400Regular',
  inter500: 'Inter_500Medium',
  inter600: 'Inter_600SemiBold',
  mono400: 'JetBrainsMono_400Regular',
  mono500: 'JetBrainsMono_500Medium',
  mono600: 'JetBrainsMono_600SemiBold',
} as const;

export const type = {
  // Sora display/headings
  display40: {
    fontFamily: fonts.sora600,
    fontSize: 40,
    lineHeight: 43, // 1.08
    letterSpacing: -0.8, // -0.02em @ 40
    color: colors.text,
  },
  display28: {
    fontFamily: fonts.sora600,
    fontSize: 28,
    lineHeight: 32, // 1.14
    letterSpacing: -0.42, // -0.015em @ 28
    color: colors.text,
  },
  title22: {
    fontFamily: fonts.sora600,
    fontSize: 22,
    lineHeight: 28, // 1.25
    letterSpacing: -0.22, // -0.01em @ 22
    color: colors.text,
  },
  heading17: {
    fontFamily: fonts.sora600,
    fontSize: 17,
    lineHeight: 23, // 1.35
    color: colors.text,
  },
  // Inter UI
  subtitle16: {
    fontFamily: fonts.inter500,
    fontSize: 16,
    lineHeight: 23, // 1.45
    color: colors.text,
  },
  body14: {
    fontFamily: fonts.inter400,
    fontSize: 14,
    lineHeight: 22, // 1.55
    color: colors.text,
  },
  label12: {
    fontFamily: fonts.inter500,
    fontSize: 12.5,
    lineHeight: 16, // 1.3
    color: colors.text,
  },
  caption11: {
    fontFamily: fonts.inter400,
    fontSize: 11.5,
    lineHeight: 16, // 1.4
    color: colors.textSubtle,
  },
  // JetBrains Mono numerals
  mono13: {
    fontFamily: fonts.mono500,
    fontSize: 13,
    lineHeight: 18, // 1.4
    fontVariant: ['tabular-nums'],
  },
} satisfies Record<string, TextStyle>;

export type TypeName = keyof typeof type;
