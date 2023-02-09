import { Grid, Heading } from '@chakra-ui/react';

import { useAuth } from '~/lib/stores/auth';

import CreateRoom from './components/CreateRoom';
import JoinRoom from './components/JoinRoom';

const HallWrapper = () => {
  const displayName = useAuth((state) => state.displayName);

  return (
    <Grid gap={12}>
      <Heading>Hello, {displayName}</Heading>
      <Grid templateColumns={['1fr', '1fr', 'repeat(2, 1fr)']} gap={12}>
        <CreateRoom />
        <JoinRoom />
      </Grid>
    </Grid>
  );
};

export default HallWrapper;
