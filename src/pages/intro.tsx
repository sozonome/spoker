import { Button, Grid, Heading, Text } from "@chakra-ui/react";
import SomeInfo from "components/hall/components/SomeInfo";

import SpokerWrapperGrid from "components/ui/SpokerWrapperGrid";
import { useRouter } from "next/router";

const Intro = () => {
  const router = useRouter();

  return (
    <Grid gap={8}>
      <SpokerWrapperGrid textAlign="center" gap={8}>
        <Heading>Estimate with your team</Heading>

        <Text>
          Welcome to my take on scrum poker web app. Just click start below.
        </Text>

        <Button colorScheme="pink" onClick={() => router.push("/")}>
          Start
        </Button>
      </SpokerWrapperGrid>
      <SomeInfo />
    </Grid>
  );
};

export default Intro;
