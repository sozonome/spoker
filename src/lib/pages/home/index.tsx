import { Button, Container, Flex, Heading, Text } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { NextSeo } from 'next-seo';

import { EVENT_TYPE_NAVIGATE } from '~/lib/constants/tracking';
import { trackEvent } from '~/lib/utils/trackEvent';

const Home = () => {
  const router = useRouter();

  const handleClickStart = () => {
    trackEvent({
      eventName: 'Open app from Home page',
      eventData: { type: EVENT_TYPE_NAVIGATE },
    });
    router.push('/');
  };

  return (
    <Container
      paddingX={0}
      display="grid"
      gridGap={16}
      alignItems="center"
      minHeight={{ base: '50vh', sm: '60vh' }}
    >
      <NextSeo title="Estimate with your Team" />
      <Flex
        direction="column"
        gap={6}
        textAlign="center"
        alignItems="center"
        marginY={12}
      >
        <Flex direction="column" gap={4}>
          <Heading size="3xl" fontWeight="extrabold">
            <Text
              as="span"
              bgGradient="linear(to-br, purple.300, purple.800)"
              bgClip="text"
            >
              Estimate
            </Text>{' '}
            with
            <br />
            your{' '}
            <Text
              as="span"
              bgGradient="linear(to-br, teal.400, teal.800)"
              bgClip="text"
            >
              team
            </Text>
          </Heading>

          <Text color="gray">
            spoker: real-time multiplayer scrum poker app.
          </Text>
        </Flex>

        <Button colorScheme="orange" onClick={handleClickStart}>
          Start
        </Button>
      </Flex>
    </Container>
  );
};

export default Home;
