import { useRouter } from 'next/router';

import { useUserRole } from '~/lib/hooks/useUserRole';
import { submitVote } from '~/lib/services/firebase/room/update/submitVote';
import { useAuth } from '~/lib/stores/auth';
import { useRoomStore } from '~/lib/stores/room';
import type { PointEntry } from '~/lib/types/RawDB';

export const useVote = () => {
  const router = useRouter();
  const currentUser = useAuth((state) => state.currentUser);
  const { roomData, users } = useRoomStore((state) => ({
    roomData: state.roomData,
    users: state.users,
  }));
  const { isOwner } = useUserRole();

  const {
    query: { id },
  } = router;

  const handleFinishVote = async (estimate: number) => {
    if (roomData && currentUser && isOwner) {
      const pointEntries: Array<PointEntry> = users.map(
        (user) => ({ name: user.name, point: user.point ?? 0 }) as PointEntry
      );
      await submitVote({
        roomId: id as string,
        task: roomData.task,
        entries: pointEntries,
        estimate,
        queue: roomData.queue,
        completed: roomData.completed,
      });
    }
  };

  return {
    handleFinishVote,
  };
};
