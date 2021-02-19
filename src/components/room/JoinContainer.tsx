import {
  Button,
  Container,
  Grid,
  Heading,
  HStack,
  useRadioGroup,
} from "@chakra-ui/react";
import { useRouter } from "next/router";

import SpokerWrapperGrid from "components/ui/SpokerWrapperGrid";
import SpokerRadioBox from "components/ui/SpokerRadioBox";

const DUMMY_ROOM_NAME = "Hello World";

const JoinContainer = () => {
  const router = useRouter();
  const {
    query: { id },
  } = router;

  const roleOptions = ["observer", "participant"];
  const { getRootProps, getRadioProps } = useRadioGroup({
    name: "role",
    defaultValue: "participant",
    onChange: console.log,
  });

  const group = getRootProps();

  return (
    <Container paddingX={0}>
      <SpokerWrapperGrid gap={8}>
        <Heading>Welcome 🎉</Heading>

        <Heading size="md">{DUMMY_ROOM_NAME}</Heading>

        <Grid gap={2}>
          <Heading size="sm">Pick your role:</Heading>

          <HStack {...group}>
            {roleOptions.map((roleOption) => {
              const radio = getRadioProps({ value: roleOption });

              return (
                <SpokerRadioBox key={roleOption} {...radio}>
                  {roleOption}
                </SpokerRadioBox>
              );
            })}
          </HStack>
        </Grid>

        <Button colorScheme="blue">Let's Go!</Button>
      </SpokerWrapperGrid>
    </Container>
  );
};

export default JoinContainer;
