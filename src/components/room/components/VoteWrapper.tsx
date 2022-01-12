import { Flex, Heading, Spacer, useRadioGroup } from "@chakra-ui/react";
import { useRouter } from "next/router";

import SpokerRadioBox from "components/ui/SpokerRadioBox";
import SpokerWrapperGrid from "components/ui/SpokerWrapperGrid";
import { updatePoint } from "services/firebase/room";
import { RoomInstance } from "types/RawDB";
import { pointOptions } from "types/room";

type VoteWrapperProps = {
  roomData: RoomInstance;
  currentUser: firebase.default.User;
  showVote: boolean;
};

const VoteWrapper = ({ roomData, currentUser, showVote }: VoteWrapperProps) => {
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
    <SpokerWrapperGrid gap={4}>
      <Heading color="teal.600">Vote!</Heading>

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
