import { render, fireEvent, screen } from '@testing-library/react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StipendDetailScreen } from '../StipendDetailScreen';

const mockBack = jest.fn();
jest.mock('expo-router', () => ({
  useRouter: () => ({ push: jest.fn(), back: mockBack }),
}));

const insets = { top: 0, bottom: 0, left: 0, right: 0 };
const frame = { x: 0, y: 0, width: 390, height: 844 };

function renderDetail(id: string) {
  return render(
    <SafeAreaProvider initialMetrics={{ insets, frame }}>
      <StipendDetailScreen id={id} />
    </SafeAreaProvider>
  );
}

describe('StipendDetailScreen', () => {
  beforeEach(() => mockBack.mockClear());

  it('renders the hero balance and transaction history for a stipend with claims', async () => {
    await renderDetail('st1');
    expect(screen.getByText('Learning stipend')).toBeTruthy();
    expect(screen.getByText('TRANSACTION HISTORY')).toBeTruthy();
    expect(screen.getByText('Frontend Masters — annual')).toBeTruthy();
  });

  it('renders receipt status tags', async () => {
    await renderDetail('st1');
    expect(screen.getByText('Reimbursed')).toBeTruthy();
    expect(screen.getByText('Approved')).toBeTruthy();
  });

  it('renders the Submit receipt action and eligibility FAQ', async () => {
    await renderDetail('st1');
    expect(screen.getByText('Submit receipt')).toBeTruthy();
    expect(screen.getByText("What's eligible?")).toBeTruthy();
  });

  it('renders the empty state for a stipend with no claims', async () => {
    await renderDetail('st3'); // Home office, tx: []
    expect(screen.getByText('Home office stipend')).toBeTruthy();
    expect(screen.getByText('No claims yet')).toBeTruthy();
  });

  it('calls router.back when the back chevron is pressed', async () => {
    await renderDetail('st1');
    fireEvent.press(screen.getByLabelText('Back'));
    expect(mockBack).toHaveBeenCalled();
  });
});
