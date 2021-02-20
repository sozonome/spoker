import { Box } from "@chakra-ui/react";
import { AuthContext } from "components/auth/AuthProvider";

import HallWrapper from "components/hall";
import { useContext, useState } from "react";

const Home = () => {
  const { currentUser } = useContext(AuthContext);
  const [name, setName] = useState<string>();
  const [busy, setBusy] = useState<boolean>(true);
  const [isEmailVerified, setIsEmailVerified] = useState<boolean>(false);

  return (
    <Box mb={8} w="full">
      <HallWrapper />
    </Box>
  );
};

export default Home;
