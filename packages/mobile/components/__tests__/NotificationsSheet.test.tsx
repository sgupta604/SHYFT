import { fireEvent, render, screen } from '@testing-library/react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NotificationsSheet } from '../NotificationsSheet';

const renderSheet = (onClose = jest.fn()) =>
  render(
    <SafeAreaProvider
      initialMetrics={{
        frame: { x: 0, y: 0, width: 390, height: 844 },
        insets: { top: 0, left: 0, right: 0, bottom: 0 },
      }}
    >
      <NotificationsSheet onClose={onClose} />
    </SafeAreaProvider>
  );

describe('NotificationsSheet', () => {
  it('renders the static notification items', async () => {
    await renderSheet();
    expect(screen.getByText('Notifications')).toBeTruthy();
    expect(screen.getByText('Priya gave you kudos')).toBeTruthy();
    expect(screen.getByText('Rooftop happy hour is Friday')).toBeTruthy();
  });

  it('calls onClose when the X button is pressed', async () => {
    const onClose = jest.fn();
    await renderSheet(onClose);
    // Both the scrim and the X carry the "Close" label; the X is the button.
    const closeBtn = screen
      .getAllByLabelText('Close')
      .find((n) => n.props.accessibilityRole === 'button');
    await fireEvent.press(closeBtn!);
    expect(onClose).toHaveBeenCalled();
  });
});
