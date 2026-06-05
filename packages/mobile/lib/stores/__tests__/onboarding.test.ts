import { useOnboardingStore, selectDoneCount } from '@/lib/stores/onboarding';
import { ONBOARDING } from '@/lib/data/onboarding';

const reset = () =>
  useOnboardingStore.setState({ checklist: ONBOARDING.checklist.map((c) => ({ ...c })) });

describe('onboarding store — checklist', () => {
  beforeEach(reset);

  it('seeds from lib/data ONBOARDING checklist', () => {
    expect(useOnboardingStore.getState().checklist).toHaveLength(5);
  });

  it('starts with 2 of 5 done (o1, o2 pre-done)', () => {
    expect(selectDoneCount(useOnboardingStore.getState())).toBe(2);
  });

  it('toggling an undone item marks it done and bumps the count', () => {
    useOnboardingStore.getState().toggle('o3');
    const o3 = useOnboardingStore.getState().checklist.find((c) => c.id === 'o3')!;
    expect(o3.done).toBe(true);
    expect(selectDoneCount(useOnboardingStore.getState())).toBe(3);
  });

  it('toggling a done item un-marks it and drops the count', () => {
    useOnboardingStore.getState().toggle('o1');
    const o1 = useOnboardingStore.getState().checklist.find((c) => c.id === 'o1')!;
    expect(o1.done).toBe(false);
    expect(selectDoneCount(useOnboardingStore.getState())).toBe(1);
  });

  it('checking everything yields 5/5', () => {
    ['o3', 'o4', 'o5'].forEach((id) => useOnboardingStore.getState().toggle(id));
    expect(selectDoneCount(useOnboardingStore.getState())).toBe(5);
  });

  it('total is the checklist length', () => {
    expect(useOnboardingStore.getState().checklist.length).toBe(5);
  });
});
