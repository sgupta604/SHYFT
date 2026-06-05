/**
 * Avatar helpers — deterministic tone hash + initials.
 * Ported verbatim from Primitives.jsx:33-40.
 *   h = (h * 31 + charCode) >>> 0  over the 8-color tone array
 *   initials = first letters of the first 2 words, uppercased
 */

export const AV_TONES = [
  '#329af0',
  '#1c7ed6',
  '#495057',
  '#9c36b5',
  '#2f9e44',
  '#e8590c',
  '#1971c2',
  '#868e96',
] as const;

export function avatarTone(name = ''): string {
  let h = 0;
  for (let i = 0; i < name.length; i++) h = (h * 31 + name.charCodeAt(i)) >>> 0;
  return AV_TONES[h % AV_TONES.length];
}

export function initials(name = ''): string {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0] ?? '')
    .join('')
    .toUpperCase();
}
