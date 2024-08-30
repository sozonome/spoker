import * as React from 'react';

import { useAuth } from '~/lib/stores/auth';
import { useRoomStore } from '~/lib/stores/room';
import { RoleType } from '~/lib/types/user';

export const useUserRole = () => {
  const currentUser = useAuth((state) => state.currentUser);
  const roomData = useRoomStore((state) => state.roomData);

  const userRole = React.useMemo(
    () => currentUser && roomData?.users?.[currentUser.uid]?.role,
    [currentUser, roomData?.users]
  );

  const isParticipant = userRole === RoleType.participant;
  const isObservant = userRole === RoleType.observant;
  const isOwner = userRole === RoleType.owner;

  return {
    userRole,
    isParticipant,
    isObservant,
    isOwner,
  };
};
