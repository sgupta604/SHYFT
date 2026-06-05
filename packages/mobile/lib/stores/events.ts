/**
 * Events store — RSVP single source of truth.
 * Toggle ports App.jsx:44-45 verbatim:
 *   going  -> { rsvp: null,    going: going - 1 }
 *   else   -> { rsvp: 'going', going: going + 1 }
 * Guarded so the count never drops below 0.
 */
import { create } from 'zustand';
import { EVENTS } from '@/lib/data/events';
import type { EventItem } from '@/lib/data/types';

interface EventsState {
  events: EventItem[];
  toggleRsvp: (id: string) => void;
}

export const useEventsStore = create<EventsState>((set) => ({
  events: EVENTS.map((e) => ({ ...e })),
  toggleRsvp: (id) =>
    set((s) => ({
      events: s.events.map((e) =>
        e.id === id
          ? e.rsvp === 'going'
            ? { ...e, rsvp: null, going: Math.max(0, e.going - 1) }
            : { ...e, rsvp: 'going', going: e.going + 1 }
          : e
      ),
    })),
}));
