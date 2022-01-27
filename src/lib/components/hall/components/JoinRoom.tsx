import { Button, Grid, Heading } from "@chakra-ui/react";
import Link from "next/link";
import type { ChangeEventHandler } from "react";
import { useState } from "react";

import SpokerInput from "lib/components/ui/SpokerInput";
import SpokerWrapperGrid from "lib/components/ui/SpokerWrapperGrid";

const JoinRoom = () => {
  const [roomId, setRoomId] = useState<string>("");

  const handleChangeInput: ChangeEventHandler<HTMLInputElement> = (e) =>
    setRoomId(e.target.value);

  return (
    <SpokerWrapperGrid gap={8} backgroundColor="orange.500" color="white">
      <Heading size="lg">or Join the Party!</Heading>

      <Grid gap={4}>
        <SpokerInput
          label="Room ID"
          value={roomId}
          onChange={handleChangeInput}
          placeholder="quick-brown-fox"
          _placeholder={{ color: "orange.200" }}
        />
      </Grid>

      <Link href={`/join/${roomId}`} passHref>
        <Button
          as="a"
          disabled={roomId.length === 0}
          alignSelf="flex-end"
          backgroundColor="black"
          _hover={{ backgroundColor: "orange.400" }}
        >
          Let Me in!
        </Button>
      </Link>
    </SpokerWrapperGrid>
  );
};

export default JoinRoom;
