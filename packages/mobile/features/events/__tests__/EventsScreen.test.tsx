import { fireEvent, render, screen, within } from '@testing-library/react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { EventsScreen } from '../EventsScreen';
import { useEventsStore } from '@/lib/stores/events';
import { EVENTS } from '@/lib/data/events';

const reset = () => useEventsStore.setState({ events: EVENTS.map((e) => ({ ...e })) });

// RNTL 14 here ships an async render; await it so `screen` is populated.
const renderScreen = () =>
  render(
    <SafeAreaProvider
      initialMetrics={{
        frame: { x: 0, y: 0, width: 390, height: 844 },
        insets: { top: 0, left: 0, right: 0, bottom: 0 },
      }}
    >
      <EventsScreen />
    </SafeAreaProvider>
  );

// The "Going" segment and a going card's RSVP button can both read "Going".
// Segments carry accessibilityState.selected; the RSVP Button does not.
const pressGoingSegment = async () => {
  const seg = screen
    .getAllByRole('button')
    .find(
      (node) =>
        node.props.accessibilityState?.selected !== undefined &&
        within(node).queryByText('Going') !== null
    );
  await fireEvent.press(seg!);
};

describe('EventsScreen', () => {
  beforeEach(reset);

  it('renders without throwing and shows event titles', async () => {
    await renderScreen();
    expect(screen.getByText('Spring rooftop happy hour')).toBeTruthy();
    expect(screen.getByText(/Shipping with feature flags/)).toBeTruthy();
  });

  it('shows the live going count for an event from the store', async () => {
    await renderScreen();
    // e1 seeds going: 18
    expect(screen.getByText('18')).toBeTruthy();
  });

  it('RSVP tap flips the button label and updates the count live', async () => {
    await renderScreen();
    // e1 starts not-going -> "RSVP" button, going 18
    const rsvpButtons = screen.getAllByText('RSVP');
    await fireEvent.press(rsvpButtons[0]);

    // store reflects the toggle
    const e1 = useEventsStore.getState().events.find((e) => e.id === 'e1')!;
    expect(e1.rsvp).toBe('going');
    expect(e1.going).toBe(19);

    // UI re-renders: count shows 19
    expect(screen.getByText('19')).toBeTruthy();
  });

  it('Going segment filters to RSVP-ed events only', async () => {
    await renderScreen();
    await pressGoingSegment();
    // e2 seeds rsvp: 'going'; e1/e3 do not
    expect(screen.getByText('Spring rooftop happy hour')).toBeTruthy();
    expect(screen.queryByText(/Shipping with feature flags/)).toBeNull();
  });

  it('shows the empty state when no events are RSVP-ed under Going', async () => {
    useEventsStore.setState({ events: EVENTS.map((e) => ({ ...e, rsvp: null })) });
    await renderScreen();
    await pressGoingSegment();
    expect(screen.getByText('Nothing on your calendar')).toBeTruthy();
  });
});
