/**
 * AllKudosSheet — "Recent kudos" bottom sheet. Lists every kudos card with a
 * live cheer toggle. Reads the kudos store directly so cheers stay in sync with
 * the Today card behind it.
 */
import { useKudosStore } from '@/lib/stores/kudos';
import { Sheet } from '@/components/Sheet';
import { KudosCard } from './KudosCard';

export type AllKudosSheetProps = {
  onClose: () => void;
};

export function AllKudosSheet({ onClose }: AllKudosSheetProps) {
  const kudos = useKudosStore((s) => s.kudos);
  const toggleCheer = useKudosStore((s) => s.toggleCheer);

  return (
    <Sheet title="Recent kudos" onClose={onClose}>
      {kudos.map((k) => (
        <KudosCard key={k.id} kudo={k} onCheer={toggleCheer} />
      ))}
    </Sheet>
  );
}

export default AllKudosSheet;
