import { Grid } from "@chakra-ui/react";

import CreateRoom from "./components/CreateRoom";
import JoinRoom from "./components/JoinRoom";
import SomeInfo from "./components/SomeInfo";

const HallWrapper = () => {
  return (
    <Grid gap={12}>
      <Grid templateColumns={["1fr", "1fr", "repeat(2, 1fr)"]} gap={12}>
        <CreateRoom />
        <JoinRoom />
      </Grid>

      <SomeInfo />
    </Grid>
  );
};

export default HallWrapper;
