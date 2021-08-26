import { Button, Container, Heading, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";

import SomeInfo from "components/hall/components/SomeInfo";
import SpokerWrapperGrid from "components/ui/SpokerWrapperGrid";

const Intro = () => {
  const router = useRouter();

  return (
    <Container paddingX={0} display="grid" gridGap={8}>
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
    </Container>
  );
};

export default Intro;
