import {
  Grid,
  Heading,
  Link,
  ListItem,
  Text,
  UnorderedList,
} from '@chakra-ui/react';

import SpokerWrapperGrid from '~/lib/components/shared/SpokerWrapperGrid';

const SomeInfo = () => {
  return (
    <SpokerWrapperGrid gap={4}>
      <Grid gap={2}>
        <Heading size="md">Why in the world do I bother to make this?</Heading>

        <UnorderedList>
          <ListItem>
            <Link href="https://spoker.agus.dev" isExternal>
              spoker.agus.dev
            </Link>
          </ListItem>
          <ListItem>
            <Link href="https://scrumpoker.online/" isExternal>
              scrumpoker.online
            </Link>
          </ListItem>
        </UnorderedList>

        <Text fontSize="sm">
          Icons made by{' '}
          <Link href="https://www.freepik.com" title="Freepik" isExternal>
            Freepik
          </Link>{' '}
          from{' '}
          <Link href="https://www.flaticon.com/" title="Flaticon" isExternal>
            www.flaticon.com
          </Link>
        </Text>
      </Grid>
    </SpokerWrapperGrid>
  );
};

export default SomeInfo;
