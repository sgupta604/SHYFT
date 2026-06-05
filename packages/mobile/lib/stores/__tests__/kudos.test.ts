import { useKudosStore } from '@/lib/stores/kudos';
import { KUDOS } from '@/lib/data/kudos';

const reset = () => useKudosStore.setState({ kudos: KUDOS.map((k) => ({ ...k })) });

describe('kudos store — cheer', () => {
  beforeEach(reset);

  it('seeds from lib/data KUDOS', () => {
    expect(useKudosStore.getState().kudos).toHaveLength(KUDOS.length);
  });

  it('cheering an un-cheered kudo sets flag and increments count', () => {
    // k1 starts cheered: false, cheers: 16
    useKudosStore.getState().toggleCheer('k1');
    const k1 = useKudosStore.getState().kudos.find((k) => k.id === 'k1')!;
    expect(k1.cheered).toBe(true);
    expect(k1.cheers).toBe(17);
  });

  it('un-cheering a cheered kudo clears flag and decrements count', () => {
    // k2 starts cheered: true, cheers: 31
    useKudosStore.getState().toggleCheer('k2');
    const k2 = useKudosStore.getState().kudos.find((k) => k.id === 'k2')!;
    expect(k2.cheered).toBe(false);
    expect(k2.cheers).toBe(30);
  });

  it('round-trip toggle returns to seed', () => {
    useKudosStore.getState().toggleCheer('k1');
    useKudosStore.getState().toggleCheer('k1');
    const k1 = useKudosStore.getState().kudos.find((k) => k.id === 'k1')!;
    expect(k1.cheered).toBe(false);
    expect(k1.cheers).toBe(16);
  });

  it('does not mutate unrelated kudos', () => {
    useKudosStore.getState().toggleCheer('k1');
    const k3 = useKudosStore.getState().kudos.find((k) => k.id === 'k3')!;
    expect(k3.cheers).toBe(9);
  });
});
