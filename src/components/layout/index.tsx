import { Box } from "@chakra-ui/react";
import { ReactNode } from "react";

import Header from "./Header";
import Footer from "./Footer";
import Meta from "./Meta";

type LayoutProps = {
  children: ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  const loggedIn = false;

  return (
    <Box margin="0 auto" maxWidth="4xl" transition="0.5s ease-out">
      <Meta />

      <Box margin="8">
        <Header />
        <Box as="main" marginY={22}>
          {loggedIn && children}
        </Box>
        <Footer />
      </Box>
    </Box>
  );
};

export default Layout;
