/**
 * Kudos store — cheer toggle single source of truth.
 *   cheered ? { cheered: false, cheers: cheers - 1 }
 *           : { cheered: true,  cheers: cheers + 1 }
 */
import { create } from 'zustand';
import { KUDOS } from '@/lib/data/kudos';
import type { Kudo } from '@/lib/data/types';

interface KudosState {
  kudos: Kudo[];
  toggleCheer: (id: string) => void;
}

export const useKudosStore = create<KudosState>((set) => ({
  kudos: KUDOS.map((k) => ({ ...k })),
  toggleCheer: (id) =>
    set((s) => ({
      kudos: s.kudos.map((k) =>
        k.id === id
          ? { ...k, cheered: !k.cheered, cheers: k.cheered ? Math.max(0, k.cheers - 1) : k.cheers + 1 }
          : k
      ),
    })),
}));
