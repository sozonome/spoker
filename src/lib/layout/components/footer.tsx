import { Box, Flex, Link, Text } from '@chakra-ui/react';
import { RiGithubFill } from 'react-icons/ri';

import { SpokerLogo } from '~/lib/components/spoker-logo';
import { packageInfo } from '~/lib/constants/packageInfo';
import { EVENT_TYPE_LINK } from '~/lib/constants/tracking';
import { trackEvent } from '~/lib/utils/trackEvent';

import { SupportCTA } from './support/support-cta';

export const Footer = () => {
  const handleClick = (eventName: string) => () => {
    trackEvent({
      eventName,
      eventData: { type: EVENT_TYPE_LINK },
    });
  };

  return (
    <Box
      display="flex"
      flexDirection={{ base: 'column-reverse', md: 'row' }}
      alignItems="center"
      justifyContent="center"
      as="footer"
      width="full"
      paddingY={8}
      gap={{ base: 6, md: 4 }}
    >
      <Flex
        direction="column"
        gap={2}
        alignItems={{ base: 'center', md: 'normal' }}
      >
        <Box transform="auto" scale={0.8} translateX="-10%">
          <SpokerLogo />
        </Box>
        <Text fontSize="sm" color="gray">
          2021 - {new Date().getFullYear()}
          {' | '}
          <Link
            href="https://sznm.dev"
            isExternal
            onClick={handleClick('open sznm.dev')}
          >
            sznm.dev
          </Link>
        </Text>
      </Flex>

      <Flex marginLeft={{ md: 'auto' }} alignItems="center" gridGap={6}>
        <SupportCTA />
        <Flex justifyContent="center" alignItems="center" gap={2}>
          <Link
            href={`${packageInfo.repository.url}/blob/main/CHANGELOG.md`}
            isExternal
            onClick={handleClick('open repo changelog')}
            fontSize="sm"
            fontWeight="bold"
          >
            v{packageInfo.version}
          </Link>
          <Link
            href={packageInfo.repository.url}
            onClick={handleClick('open repository')}
            isExternal
          >
            <RiGithubFill fontSize="2rem" />
          </Link>
        </Flex>
      </Flex>
    </Box>
  );
};
