/**
 * Stipend math — pure, UI-independent, the future API seam.
 *   remaining = total - used
 *   pct       = min(100, round(used / total * 100))   (0 when total is 0)
 *   low       = remaining <= total * 0.2               (use-it-or-lose-it warn)
 */

export function stipendRemaining(total: number, used: number): number {
  return total - used;
}

export function stipendPct(total: number, used: number): number {
  if (total <= 0) return 0;
  return Math.min(100, Math.round((used / total) * 100));
}

export function stipendLow(total: number, used: number): boolean {
  return stipendRemaining(total, used) <= total * 0.2;
}

export interface StipendComputed {
  remaining: number;
  pct: number;
  low: boolean;
}

export function computeStipend({ total, used }: { total: number; used: number }): StipendComputed {
  return {
    remaining: stipendRemaining(total, used),
    pct: stipendPct(total, used),
    low: stipendLow(total, used),
  };
}
