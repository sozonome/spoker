import { Box } from "@chakra-ui/react";

import HallWrapper from "components/hall";

const Home = () => {
  // if not logged in return restricted routes (auth)

  // if logged in
  return (
    <Box mb={8} w="full">
      <HallWrapper />
    </Box>
  );
};

export default Home;
