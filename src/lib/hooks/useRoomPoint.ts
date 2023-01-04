import * as React from "react";
import shallow from "zustand/shallow";

import { useRoomStore } from "lib/stores/room";
import { countAveragePoint, filterUserWithPoints } from "lib/utils/roomUtils";

export const useRoomPoint = () => {
  const { showVote, users } = useRoomStore(
    (state) => ({
      showVote: state.showVote,
      users: state.users,
    }),
    shallow
  );

  const participantPoints = React.useMemo(() => {
    if (!showVote) {
      return [];
    }
    return filterUserWithPoints(users).map((user) => user.point ?? 0);
  }, [showVote, users]);

  const averagePoint = React.useMemo(() => {
    const filledPoints = participantPoints.filter((point) => point);
    return countAveragePoint(filledPoints).toPrecision(2);
  }, [participantPoints]);

  return {
    averagePoint,
  };
};
