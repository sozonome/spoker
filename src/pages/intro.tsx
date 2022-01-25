import { Button, Container, Heading, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";

import SomeInfo from "lib/components/hall/components/SomeInfo";
import SpokerWrapperGrid from "lib/components/ui/SpokerWrapperGrid";
import { trackEvent } from "lib/utils/trackEvent";

const Intro = () => {
  const router = useRouter();

  const handleClickStart = () => {
    trackEvent("Open app from Intro page", "navigate");
    router.push("/");
  };

  return (
    <Container paddingX={0} display="grid" gridGap={8}>
      <SpokerWrapperGrid textAlign="center" gap={8}>
        <Heading>Estimate with your team</Heading>

        <Text>
          Welcome to my take on scrum poker web app. Just click start below.
        </Text>

        <Button colorScheme="pink" onClick={handleClickStart}>
          Start
        </Button>
      </SpokerWrapperGrid>
      <SomeInfo />
    </Container>
  );
};

export default Intro;
