import {
  Button,
  Container,
  Grid,
  Heading,
  HStack,
  useRadioGroup,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useState } from "react";

import SpokerWrapperGrid from "components/ui/SpokerWrapperGrid";
import SpokerRadioBox from "components/ui/SpokerRadioBox";

import { roleOptions, RoleType } from "types/room";

const DUMMY_ROOM_NAME = "Hello World";

const JoinContainer = () => {
  const router = useRouter();
  const {
    query: { id },
  } = router;

  const [role, setRole] = useState<RoleType>("participant");
  const { getRootProps, getRadioProps } = useRadioGroup({
    name: "role",
    defaultValue: role,
    onChange: (value) => setRole(value as RoleType),
  });
  const group = getRootProps();

  const handleJoin = () => {
    console.log({ role, id });
  };

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

        <Button colorScheme="blue" onClick={handleJoin}>
          Let's Go!
        </Button>
      </SpokerWrapperGrid>
    </Container>
  );
};

export default JoinContainer;
