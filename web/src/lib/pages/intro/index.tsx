import { Box, Button, Container, Heading, Text } from "@chakra-ui/react";
import { NextSeo } from "next-seo";
import { useRouter } from "next/router";

import SpokerWrapperGrid from "lib/components/shared/SpokerWrapperGrid";
import { trackEvent } from "lib/utils/trackEvent";

const Intro = () => {
  const router = useRouter();

  const handleClickStart = () => {
    trackEvent({
      eventValue: "Open app from Intro page",
      eventType: "navigate",
    });
    router.push("/");
  };

  return (
    <Container
      paddingX={0}
      display="grid"
      gridGap={8}
      minHeight="60vh"
      alignItems="center"
    >
      <NextSeo title="Intro" />
      <Box>
        <SpokerWrapperGrid textAlign="center" gap={8}>
          <Heading>Estimate with your team</Heading>

          <Text>
            Welcome to my take on scrum poker web app. Just click start below.
          </Text>

          <Button colorScheme="pink" onClick={handleClickStart}>
            Start
          </Button>
        </SpokerWrapperGrid>
      </Box>
    </Container>
  );
};

export default Intro;
