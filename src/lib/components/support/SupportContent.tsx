import { Button, Grid, Link, Text } from '@chakra-ui/react';

import { sponsorLinks } from './constants';

const SupportContent = () => {
  return (
    <Grid gap={4}>
      <Text>Support this project</Text>

      <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)' }} gap={2}>
        {sponsorLinks.map((sponsorLink) => (
          <Button
            as={Link}
            href={sponsorLink.url}
            isExternal
            colorScheme={sponsorLink.colorScheme}
            leftIcon={sponsorLink.icon}
            fontSize={{ base: 'sm', md: 'md' }}
            flexDirection="column"
            key={sponsorLink.label}
          >
            <Text>{sponsorLink.label}</Text>
            {sponsorLink.description && (
              <Text fontSize="xs">{sponsorLink.description}</Text>
            )}
          </Button>
        ))}
      </Grid>
    </Grid>
  );
};

export default SupportContent;
