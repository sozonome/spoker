import { Box, Flex, Link, Text } from '@chakra-ui/react';
import { RiGithubFill } from 'react-icons/ri';

import SupportCTA from '~/lib/components/support/SupportCTA';
import { packageInfo } from '~/lib/constants/packageInfo';
import { EVENT_TYPE_LINK } from '~/lib/constants/tracking';
import { trackEvent } from '~/lib/utils/trackEvent';

const Footer = () => {
  const handleClick = (eventName: string) => () => {
    trackEvent({
      eventName,
      eventData: { type: EVENT_TYPE_LINK },
    });
  };

  return (
    <Box
      display={{ base: 'grid', md: 'flex' }}
      as="footer"
      width="full"
      alignItems="center"
      justifyContent="center"
      paddingY={8}
      gap={{ base: 0, md: 4 }}
    >
      <Text fontSize="sm">
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

      <Flex alignItems="center" justifyContent="center">
        <SupportCTA />
      </Flex>

      <Flex
        marginLeft={{ md: 'auto' }}
        justifyContent="center"
        alignItems="center"
        gridGap={2}
      >
        <Link
          href={`${packageInfo.repository.url}/blob/main/CHANGELOG.md`}
          isExternal
          onClick={handleClick('open repo changelog')}
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
    </Box>
  );
};

export default Footer;
