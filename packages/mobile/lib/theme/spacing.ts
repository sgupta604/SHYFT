/**
 * Clarity — spacing (4pt base) + radii.
 * Ported from colors_and_type.css (--s-* and --r-*).
 */

export const space = {
  1: 4, // inline icon padding
  2: 8, // between inline elements
  3: 12, // tight group
  4: 16, // between fields, default gap
  5: 20, // card padding
  6: 24, // section dividers
  8: 32, // page padding
  12: 48, // section spacing
  16: 64, // hero / large breathing room
} as const;

export const radii = {
  sm: 8, // tags, kbd, tiny chrome
  md: 10, // buttons, inputs, nav items
  lg: 14, // category icon tiles
  xl: 20, // cards, tables
  '2xl': 28, // modals, dialogs
  full: 9999, // pills, avatars
} as const;
