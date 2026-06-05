/**
 * Onboarding store — checklist single source of truth.
 * `selectDoneCount` derives the "N / 5 done" counter consumed by both the
 * Onboarding screen and More's "Your first day" hero footer.
 */
import { create } from 'zustand';
import { ONBOARDING } from '@/lib/data/onboarding';
import type { ChecklistItem } from '@/lib/data/types';

interface OnboardingState {
  checklist: ChecklistItem[];
  toggle: (id: string) => void;
}

export const useOnboardingStore = create<OnboardingState>((set) => ({
  checklist: ONBOARDING.checklist.map((c) => ({ ...c })),
  toggle: (id) =>
    set((s) => ({
      checklist: s.checklist.map((c) => (c.id === id ? { ...c, done: !c.done } : c)),
    })),
}));

export const selectDoneCount = (s: OnboardingState): number =>
  s.checklist.filter((c) => c.done).length;
