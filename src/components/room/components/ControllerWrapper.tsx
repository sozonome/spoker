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
import { BiLink, BiShareAlt } from "react-icons/bi";

import SpokerWrapperGrid from "components/ui/SpokerWrapperGrid";
import { clearPoints } from "functions/firebase/room";
import { RoomUser } from "types/room";

type ControllerWrapperProps = {
  users: Array<RoomUser>;
  isObservant: boolean;
};

const ControllerWrapper = ({ users, isObservant }: ControllerWrapperProps) => {
  const router = useRouter();
  const {
    query: { id },
  } = router;
  const toast = useToast();

  const handleClearPoints = () => {
    clearPoints(id as string);
  };

  const handleCopyRoomLink = () => {
    const roomLink = `${location.protocol}//${location.host}/join/${id}`;
    navigator.clipboard.writeText(roomLink);

    toast({
      title: `Room Link Copied!\n${roomLink}`,
      status: "success",
      isClosable: true,
      position: "top-right",
    });
  };

  return (
    <SpokerWrapperGrid gap={4}>
      <Heading>Controller</Heading>

      <Flex gridGap={2} wrap="wrap">
        {isObservant && (
          <Button colorScheme="red" onClick={handleClearPoints}>
            Clear
          </Button>
        )}
        <Button colorScheme="orange" onClick={() => router.push(`/join/${id}`)}>
          Rejoin
        </Button>
      </Flex>

      <Box>
        <Button
          leftIcon={<BiShareAlt />}
          rightIcon={<BiLink />}
          colorScheme="blue"
          onClick={handleCopyRoomLink}
        >
          Copy Invite Link
        </Button>
      </Box>

      <Flex wrap="wrap" gridGap={2}>
        <Heading size="sm">Current Users: </Heading>
        <OrderedList spacing={1}>
          {users.map((user, userIndex) => (
            <ListItem key={userIndex}>{user.name}</ListItem>
          ))}
        </OrderedList>
      </Flex>
    </SpokerWrapperGrid>
  );
};

export default ControllerWrapper;
