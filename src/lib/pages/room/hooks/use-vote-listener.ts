import { useToast } from '@chakra-ui/react';
import * as React from 'react';
import { useReward } from 'react-rewards';

import { CURRENT_VOTE_WRAPPER_ID } from '~/lib/constants/wrapperkeys';
import { useRoomStore } from '~/lib/stores/room';

export const useVoteListener = () => {
  const toast = useToast();
  const roomData = useRoomStore((state) => state.roomData);
  const showVote = useRoomStore((state) => state.showVote);
  const { reward } = useReward(CURRENT_VOTE_WRAPPER_ID, 'confetti');

  React.useEffect(() => {
    if (showVote) {
      reward();
    }
  }, [showVote, reward]);

  React.useEffect(() => {
    if (roomData?.task.lastVoted?.name) {
      toast({
        description: `${roomData.task.lastVoted.name} just voted`,
        status: 'info',
        position: 'bottom-right',
      });
    }
  }, [roomData?.task.lastVoted?.name, roomData?.task.lastVoted?.time, toast]);
};
