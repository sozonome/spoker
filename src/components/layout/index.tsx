import { Box } from "@chakra-ui/layout";
import { ReactNode } from "react";

import Header from "./Header";
import Footer from "./Footer";
import Meta from "./Meta";
import RouteWrapper from "./RouteWrapper";
import AuthWrapper from "components/auth/AuthWrapper";

type LayoutProps = {
  children: ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  return (
    <Box margin="0 auto" maxWidth="4xl" transition="0.5s ease-out">
      <Meta />

      <Box margin="8">
        <Header />
        <RouteWrapper>
          <AuthWrapper>
            <Box as="main" marginY={22}>
              {children}
            </Box>
          </AuthWrapper>
        </RouteWrapper>
        <Footer />
      </Box>
    </Box>
  );
};

export default Layout;
