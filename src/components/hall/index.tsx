import { Grid, Heading, Skeleton } from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";

import CreateRoom from "./components/CreateRoom";
import JoinRoom from "./components/JoinRoom";
import SomeInfo from "./components/SomeInfo";

import { AuthContext } from "components/auth/AuthProvider";

const HallWrapper = () => {
  const { currentUser } = useContext(AuthContext);
  const [displayName, setDisplayName] = useState<string>();
  const [busy, setBusy] = useState<boolean>(true);

  useEffect(() => {
    if (currentUser) {
      currentUser.reload().then(() => {
        setDisplayName(currentUser.displayName);
        setBusy(false);
      });
    } else {
      setBusy(false);
    }
  }, [currentUser]);

  return (
    <Grid gap={12}>
      <Skeleton isLoaded={!busy}>
        <Heading>Hello, {displayName}</Heading>
      </Skeleton>
      <Grid templateColumns={["1fr", "1fr", "repeat(2, 1fr)"]} gap={12}>
        <CreateRoom />
        <JoinRoom />
      </Grid>

      <SomeInfo />
    </Grid>
  );
};

export default HallWrapper;
