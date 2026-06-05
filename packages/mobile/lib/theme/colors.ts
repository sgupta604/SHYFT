/**
 * Clarity — color scales + semantic tokens (light theme).
 * Ported 1:1 from docs/design/.../colors_and_type.css.
 * Anchors: blue #329af0, charcoal #212529 (Mantine palette).
 * Dark theme tokens deferred (see plan Non-Goals).
 */

export const scale = {
  blue: {
    25: '#f1f9ff',
    50: '#e7f5ff',
    100: '#d0ebff',
    200: '#a5d8ff',
    300: '#74c0fc',
    400: '#4dabf7',
    500: '#329af0', // anchor — buttons, active
    600: '#228be6', // hover
    700: '#1c7ed6',
    800: '#1971c2',
    900: '#1864ab',
  },
  charcoal: {
    25: '#f8f9fa', // page background
    50: '#f1f3f5',
    100: '#e9ecef',
    200: '#dee2e6',
    300: '#ced4da',
    400: '#adb5bd',
    500: '#868e96',
    600: '#495057',
    700: '#343a40',
    800: '#2b3035',
    900: '#212529', // primary text / Shyft black
  },
  green: { 300: '#8ce99a', 500: '#51cf66', 700: '#2f9e44' },
  orange: { 300: '#ffc078', 500: '#ff922b', 700: '#e8590c' },
  pink: { 300: '#faa2c1', 500: '#f06595', 700: '#c2255c' },
  purple: { 300: '#e599f7', 500: '#cc5de8', 700: '#9c36b5' },
  yellow: { 300: '#ffe066', 500: '#fcc419', 700: '#f08c00' },
} as const;

/** Semantic tokens (light). Always reference these in components — never raw scale. */
export const colors = {
  bg: scale.charcoal[25], // page background
  bgElev: '#ffffff', // card / panel surfaces
  bgSubtle: scale.charcoal[50], // hover, table header
  bgSunken: scale.charcoal[100], // wells, dropzones

  border: scale.charcoal[100], // default 1px hairlines
  borderStrong: scale.charcoal[200], // inputs, buttons

  text: scale.charcoal[900], // primary
  textMuted: scale.charcoal[600], // secondary, descriptions
  textSubtle: scale.charcoal[500], // captions, placeholders

  accent: scale.blue[500], // primary action, links, focus
  accentHover: scale.blue[600],
  accentSoft: scale.blue[50], // active nav, accent badges
  focusRing: 'rgba(50, 154, 240, 0.22)',

  success: scale.green[700],
  warn: scale.orange[500],
  danger: scale.pink[700],

  white: '#ffffff',
} as const;

/** Bright/category tones used by Pill, IconTile, StatusBanner, progress bars. */
export type Tone = 'blue' | 'green' | 'orange' | 'pink' | 'purple' | 'neutral';

export default colors;
