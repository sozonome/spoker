import {
  Box,
  Button,
  Flex,
  Heading,
  ListItem,
  OrderedList,
  useToast,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import * as React from "react";
import { BiLink, BiShareAlt } from "react-icons/bi";

import SpokerWrapperGrid from "lib/components/shared/SpokerWrapperGrid";
import { clearPoints } from "lib/services/firebase/room/update/point/clear";
import type { RoomUser } from "lib/types/room";

type ControllerWrapperProps = {
  users: Array<RoomUser>;
  isResetEnabled: boolean;
};

const ControllerWrapper = ({
  users,
  isResetEnabled,
}: ControllerWrapperProps) => {
  const router = useRouter();
  const {
    query: { id },
  } = router;
  const toast = useToast();

  const handleClearPoints = () => {
    clearPoints(id as string);
  };

  const handleCopyRoomLink = () => {
    const roomLink = `${window.location.protocol}//${window.location.host}/join/${id}`;
    navigator.clipboard.writeText(roomLink);

    toast({
      title: `Room Link Copied!\n${roomLink}`,
      status: "success",
      isClosable: true,
      position: "top",
    });
  };

  const currentUserList = React.useMemo(
    () =>
      users.map((user) => (
        <ListItem key={user.uid}>
          {user.name} - {user.role}
        </ListItem>
      )),
    [users]
  );

  return (
    <SpokerWrapperGrid gap={2}>
      <Heading size="md">Controller</Heading>

      <Flex gridGap={2} wrap="wrap">
        {isResetEnabled && (
          <Button size="sm" colorScheme="red" onClick={handleClearPoints}>
            Reset
          </Button>
        )}
        <Button
          size="sm"
          colorScheme="orange"
          onClick={() => router.push(`/join/${id}`)}
        >
          Rejoin
        </Button>
      </Flex>

      <Box>
        <Button
          leftIcon={<BiShareAlt />}
          rightIcon={<BiLink />}
          colorScheme="blue"
          onClick={handleCopyRoomLink}
          size="sm"
        >
          Copy Invite Link
        </Button>
      </Box>

      <Flex wrap="wrap" gridGap={2}>
        <Heading size="sm">Current Users: </Heading>
        <OrderedList spacing={1}>{currentUserList}</OrderedList>
      </Flex>
    </SpokerWrapperGrid>
  );
};

export default ControllerWrapper;
