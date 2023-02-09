import { Box, Spinner, Text } from '@chakra-ui/react';

const SpokerLoading = () => {
  return (
    <Box gap={2} margin="auto" textAlign="center" alignItems="center">
      <Spinner size="xl" thickness="0.5rem" marginX="auto" />
      <Text fontSize="lg">Loading...</Text>
    </Box>
  );
};

export default SpokerLoading;
