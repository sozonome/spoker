import { Button } from "@chakra-ui/button";
import { Grid, Heading } from "@chakra-ui/layout";
import { useRouter } from "next/router";
import { useState } from "react";

import SpokerInput from "components/ui/SpokerInput";
import SpokerWrapperGrid from "components/ui/SpokerWrapperGrid";

const JoinRoom = () => {
  const router = useRouter();
  const [roomId, setRoomId] = useState<string>("");

  return (
    <SpokerWrapperGrid gap={8} backgroundColor="orange.500" color="white">
      <Heading size="lg">or Join the Party!</Heading>

      <Grid gap={4}>
        <SpokerInput
          label="Room ID"
          value={roomId}
          onChange={(e) => setRoomId(e.target.value)}
          placeholder="quick-brown-fox"
          _placeholder={{ color: "orange.200" }}
        />
      </Grid>

      <Button
        alignSelf="flex-end"
        backgroundColor="black"
        _hover={{ backgroundColor: "orange.400" }}
        onClick={() => router.push(`/join/${roomId}`)}
      >
        Let Me in!
      </Button>
    </SpokerWrapperGrid>
  );
};

export default JoinRoom;
