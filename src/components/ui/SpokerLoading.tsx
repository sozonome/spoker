import { Box, Text } from "@chakra-ui/layout";
import { Spinner } from "@chakra-ui/spinner";

const SpokerLoading = () => {
  return (
    <Box gap={2} margin="auto" textAlign="center" alignItems="center">
      <Spinner size="xl" thickness="0.5rem" marginX="auto" />
      <Text fontSize="lg">Loading...</Text>
    </Box>
  );
};

export default SpokerLoading;
