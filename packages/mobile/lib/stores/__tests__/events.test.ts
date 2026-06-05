import { useEventsStore } from '@/lib/stores/events';
import { EVENTS } from '@/lib/data/events';

const reset = () => useEventsStore.setState({ events: EVENTS.map((e) => ({ ...e })) });

describe('events store — RSVP', () => {
  beforeEach(reset);

  it('seeds from lib/data EVENTS', () => {
    expect(useEventsStore.getState().events).toHaveLength(EVENTS.length);
  });

  it('toggling a not-going event sets going and increments count', () => {
    // e1 starts rsvp: null, going: 18
    useEventsStore.getState().toggleRsvp('e1');
    const e1 = useEventsStore.getState().events.find((e) => e.id === 'e1')!;
    expect(e1.rsvp).toBe('going');
    expect(e1.going).toBe(19);
  });

  it('toggling a going event clears rsvp and decrements count', () => {
    // e2 starts rsvp: 'going', going: 64
    useEventsStore.getState().toggleRsvp('e2');
    const e2 = useEventsStore.getState().events.find((e) => e.id === 'e2')!;
    expect(e2.rsvp).toBeNull();
    expect(e2.going).toBe(63);
  });

  it('round-trip toggle returns to the seed values', () => {
    useEventsStore.getState().toggleRsvp('e1');
    useEventsStore.getState().toggleRsvp('e1');
    const e1 = useEventsStore.getState().events.find((e) => e.id === 'e1')!;
    expect(e1.rsvp).toBeNull();
    expect(e1.going).toBe(18);
  });

  it('never drops the going count below 0', () => {
    useEventsStore.setState({
      events: [{ ...EVENTS[0], id: 'z', rsvp: 'going', going: 0 }],
    });
    useEventsStore.getState().toggleRsvp('z');
    const z = useEventsStore.getState().events.find((e) => e.id === 'z')!;
    expect(z.going).toBe(0);
    expect(z.rsvp).toBeNull();
  });

  it('does not mutate unrelated events', () => {
    useEventsStore.getState().toggleRsvp('e1');
    const e3 = useEventsStore.getState().events.find((e) => e.id === 'e3')!;
    expect(e3.going).toBe(11);
  });
});
