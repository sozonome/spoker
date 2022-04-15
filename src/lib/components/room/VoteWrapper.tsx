import {
  Flex,
  Heading,
  Spacer,
  useColorModeValue,
  useRadioGroup,
} from "@chakra-ui/react";
import type { User } from "firebase/auth";
import { useRouter } from "next/router";

import SpokerRadioBox from "lib/components/shared/SpokerRadioBox";
import SpokerWrapperGrid from "lib/components/shared/SpokerWrapperGrid";
import { updatePoint } from "lib/services/firebase/room";
import type { RoomInstance } from "lib/types/RawDB";
import { pointOptions } from "lib/types/room";

type VoteWrapperProps = {
  roomData: RoomInstance;
  currentUser: User;
  showVote: boolean;
};

const VoteWrapper = ({ roomData, currentUser, showVote }: VoteWrapperProps) => {
  const wrapperBackgroundColor = useColorModeValue("orange.50", "gray.600");
  const router = useRouter();
  const {
    query: { id },
  } = router;

  const handleUpdatePoint = (point: number) => {
    if (currentUser && !(roomData.config.isFreezeAfterVote && showVote)) {
      updatePoint({ uid: currentUser.uid, point, roomId: id as string });
    }
  };

  const { getRootProps, getRadioProps } = useRadioGroup({
    name: "vote",
    value: currentUser && String(roomData?.users?.[currentUser.uid]?.point),
    onChange: (value) => {
      handleUpdatePoint(Number(value));
    },
  });
  const voteOptionGroup = getRootProps();

  return (
    <SpokerWrapperGrid gap={4} backgroundColor={wrapperBackgroundColor}>
      <Heading size="lg">Vote!</Heading>

      <Flex wrap="wrap" gridGap={2} {...voteOptionGroup}>
        {pointOptions.map((voteOption) => {
          const radio = getRadioProps({ value: voteOption });

          return (
            <SpokerRadioBox key={voteOption} {...radio}>
              {voteOption}
            </SpokerRadioBox>
          );
        })}
      </Flex>
      <Spacer />
    </SpokerWrapperGrid>
  );
};

export default VoteWrapper;
