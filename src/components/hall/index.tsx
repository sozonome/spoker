import {
  Box,
  Grid,
  Heading,
  Link as ChakraLink,
  ListItem,
  Text,
  UnorderedList,
} from "@chakra-ui/react";
import { useRouter } from "next/router";

import SpokerButton from "components/ui/SpokerButton";
import SpokerInput from "components/ui/SpokerInput";
import SpokerWrapperGrid from "components/ui/SpokerWrapperGrid";

const HallWrapper = () => {
  const router = useRouter();

  return (
    <Grid gap={12}>
      <Grid templateColumns={["1fr", "1fr", "repeat(2, 1fr)"]} gap={12}>
        <SpokerWrapperGrid gap={8}>
          <Heading size="lg">Create Room</Heading>

          <Grid gap={4}>
            <SpokerInput label="Room Name" placeholder="The Quick Brown Fox" />
            <SpokerInput
              label="Room ID"
              placeholder="define your own room slug"
            />
          </Grid>

          <SpokerButton colorScheme="green">Let's Have Some Fun!</SpokerButton>
        </SpokerWrapperGrid>

        <SpokerWrapperGrid gap={8} backgroundColor="orange.500" color="white">
          <Heading size="lg">Or Join Party</Heading>

          <Grid gap={4}>
            <SpokerInput
              label="Room ID"
              placeholder="quick-brown-fox"
              _placeholder={{ color: "white" }}
            />
          </Grid>

          <SpokerButton
            alignSelf="flex-end"
            backgroundColor="black"
            _hover={{ backgroundColor: "orange.400" }}
            onClick={() => router.push("/room")}
          >
            Let Me in!
          </SpokerButton>
        </SpokerWrapperGrid>
      </Grid>

      <SpokerWrapperGrid gap={4}>
        <Box>
          <Heading size="md">
            Why in the world do I bother to make this?
          </Heading>
          <UnorderedList>
            <ListItem>
              <ChakraLink href="https://spoker.agus.dev" isExternal>
                spoker.agus.dev
              </ChakraLink>
            </ListItem>
            <ListItem>
              <ChakraLink href="https://scrumpoker.online/" isExternal>
                scrumpoker.online
              </ChakraLink>
            </ListItem>
          </UnorderedList>
          <Text>
            Icons made by{" "}
            <ChakraLink
              href="https://www.freepik.com"
              title="Freepik"
              isExternal
            >
              Freepik
            </ChakraLink>{" "}
            from{" "}
            <ChakraLink
              href="https://www.flaticon.com/"
              title="Flaticon"
              isExternal
            >
              www.flaticon.com
            </ChakraLink>
          </Text>
        </Box>

        {/* <Box>
          <Heading size="md">Which stacks are used?</Heading>
          <UnorderedList>
            <ListItem>Next.js</ListItem>
            <ListItem>Chakra-UI</ListItem>
            <ListItem>Firebase</ListItem>
          </UnorderedList>
          <Text>Design inspired by Contra-UI Kit (Vijay Verma)</Text>
        </Box> */}
      </SpokerWrapperGrid>
    </Grid>
  );
};

export default HallWrapper;
