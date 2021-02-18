import { Button, Heading, Text } from "@chakra-ui/react";

import SpokerWrapperGrid from "components/ui/SpokerWrapperGrid";
import { useRouter } from "next/router";

const Intro = () => {
  const router = useRouter();

  return (
    <>
      <SpokerWrapperGrid textAlign="center" gap={8}>
        <Heading size="xl">Online Scrum Poker</Heading>
        <Heading size="md">Estimate with your team</Heading>

        <Text>
          Welcome to my take on scrum poker web app. As scrum master just click
          start below.
        </Text>

        <Button colorScheme="pink" onClick={() => router.push("/")}>
          Start
        </Button>
      </SpokerWrapperGrid>
    </>
  );
};

export default Intro;
