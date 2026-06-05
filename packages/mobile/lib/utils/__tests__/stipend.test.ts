import { stipendRemaining, stipendPct, stipendLow, computeStipend } from '@/lib/utils/stipend';

describe('stipend math', () => {
  describe('stipendRemaining', () => {
    it('is total - used', () => {
      expect(stipendRemaining(1500, 420)).toBe(1080);
    });
    it('handles zero used (full balance)', () => {
      expect(stipendRemaining(500, 0)).toBe(500);
    });
    it('handles fully used', () => {
      expect(stipendRemaining(600, 600)).toBe(0);
    });
    it('can go negative when over budget', () => {
      expect(stipendRemaining(500, 600)).toBe(-100);
    });
  });

  describe('stipendPct', () => {
    it('rounds used/total*100', () => {
      expect(stipendPct(1500, 420)).toBe(28); // 28.0
      expect(stipendPct(600, 510)).toBe(85);
    });
    it('is 0 when nothing used', () => {
      expect(stipendPct(500, 0)).toBe(0);
    });
    it('is 100 when fully used', () => {
      expect(stipendPct(600, 600)).toBe(100);
    });
    it('clamps to 100 when over budget', () => {
      expect(stipendPct(500, 600)).toBe(100);
    });
    it('guards divide-by-zero total', () => {
      expect(stipendPct(0, 0)).toBe(0);
    });
  });

  describe('stipendLow', () => {
    it('is true when remaining <= 20% of total', () => {
      // wellness: remaining 90 of 600 -> 15% -> low
      expect(stipendLow(600, 510)).toBe(true);
    });
    it('is false with comfortable balance', () => {
      // learning: remaining 1080 of 1500 -> 72% -> not low
      expect(stipendLow(1500, 420)).toBe(false);
    });
    it('is true exactly at the 20% threshold', () => {
      expect(stipendLow(500, 400)).toBe(true); // remaining 100 == 20% of 500
    });
    it('is true (and not low concern) when nothing used? full balance is not low', () => {
      expect(stipendLow(500, 0)).toBe(false);
    });
  });

  describe('computeStipend', () => {
    it('bundles remaining/pct/low for a stipend', () => {
      expect(computeStipend({ total: 600, used: 510 })).toEqual({
        remaining: 90,
        pct: 85,
        low: true,
      });
    });
    it('home-office empty stipend', () => {
      expect(computeStipend({ total: 500, used: 0 })).toEqual({
        remaining: 500,
        pct: 0,
        low: false,
      });
    });
  });
});
