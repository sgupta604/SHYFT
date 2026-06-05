import { avatarTone, initials, AV_TONES } from '@/lib/utils/avatar';

describe('avatar utils', () => {
  it('initials take the first letter of the first two words, uppercased', () => {
    expect(initials('Maya Patel')).toBe('MP');
    expect(initials('Platform team')).toBe('PT');
    expect(initials('alex')).toBe('A');
    expect(initials('')).toBe('');
  });

  it('tone is deterministic for a given name', () => {
    expect(avatarTone('Maya Patel')).toBe(avatarTone('Maya Patel'));
  });

  it('tone is always within the 8-tone palette', () => {
    ['Maya Patel', 'Sam Okafor', 'Priya Anand', 'x', ''].forEach((n) => {
      expect(AV_TONES).toContain(avatarTone(n));
    });
  });
});
