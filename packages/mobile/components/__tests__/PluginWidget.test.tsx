import { render, fireEvent, screen } from '@testing-library/react-native';
import { PluginWidget } from '../PluginWidget';
import type { Plugin } from '@/lib/data/types';

const base: Omit<Plugin, 'widget'> = {
  id: 'pl-x',
  name: 'Test Plugin',
  dev: 'Platform Tools',
  icon: 'bus',
  tone: 'blue',
  category: 'Workplace',
  slot: 'today',
  installed: true,
  installs: 1000,
  rating: 4.5,
  blurb: 'A test plugin.',
  permissions: [],
};

describe('PluginWidget', () => {
  it('renders the name header and the "via {dev}" attribution', async () => {
    await render(
      <PluginWidget
        plugin={{ ...base, widget: { kind: 'next', value: '12', unit: 'min', label: 'Route B', note: 'On time' } }}
      />
    );
    expect(screen.getByText('Test Plugin')).toBeTruthy();
    expect(screen.getByText('via Platform Tools')).toBeTruthy();
  });

  it('renders a next widget with value, unit, label and note', async () => {
    await render(
      <PluginWidget
        plugin={{ ...base, widget: { kind: 'next', value: '12', unit: 'min', label: 'Route B -> Downtown', note: 'On time' } }}
      />
    );
    expect(screen.getByText('12')).toBeTruthy();
    expect(screen.getByText('min')).toBeTruthy();
    expect(screen.getByText('Route B -> Downtown')).toBeTruthy();
    expect(screen.getByText('On time')).toBeTruthy();
  });

  it('renders a list widget with its label and every item', async () => {
    await render(
      <PluginWidget
        plugin={{ ...base, widget: { kind: 'list', label: 'Cafe menu', items: ['Item one', 'Item two', 'Item three'] } }}
      />
    );
    expect(screen.getByText('Cafe menu')).toBeTruthy();
    expect(screen.getByText('Item one')).toBeTruthy();
    expect(screen.getByText('Item two')).toBeTruthy();
    expect(screen.getByText('Item three')).toBeTruthy();
  });

  it('renders a stat widget with value, label and the delta pill', async () => {
    await render(
      <PluginWidget
        plugin={{ ...base, widget: { kind: 'stat', value: '$48,210', label: 'Vested balance', delta: '+2.4% this quarter', deltaTone: 'green' } }}
      />
    );
    expect(screen.getByText('$48,210')).toBeTruthy();
    expect(screen.getByText('Vested balance')).toBeTruthy();
    expect(screen.getByText('+2.4% this quarter')).toBeTruthy();
  });

  it('renders a progress widget with used/total, unit, label and a bar', async () => {
    await render(
      <PluginWidget
        plugin={{ ...base, widget: { kind: 'progress', label: 'Toward 20-hour goal', used: 14, total: 20, unit: 'hrs' } }}
      />
    );
    expect(screen.getByText('14')).toBeTruthy();
    expect(screen.getByText('of 20 hrs')).toBeTruthy();
    expect(screen.getByText('Toward 20-hour goal')).toBeTruthy();
    expect(screen.getByTestId('plugin-progress-bar')).toBeTruthy();
  });

  it('renders without a body when the widget spec is absent', async () => {
    await render(<PluginWidget plugin={{ ...base }} />);
    expect(screen.getByText('Test Plugin')).toBeTruthy();
  });

  it('calls onOpen when the options button is pressed', async () => {
    const onOpen = jest.fn();
    await render(
      <PluginWidget
        onOpen={onOpen}
        plugin={{ ...base, widget: { kind: 'next', value: '12', unit: 'min', label: 'Route B', note: 'On time' } }}
      />
    );
    await fireEvent.press(screen.getByLabelText('Plugin options'));
    expect(onOpen).toHaveBeenCalled();
  });
});
