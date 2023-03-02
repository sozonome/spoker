import { Box } from '@chakra-ui/react';
import type { ReactNode } from 'react';

import AuthWrapper from '~/lib/components/auth/AuthWrapper';

import Footer from './Footer';
import Header from './Header';
import Meta from './Meta';
import RouteWrapper from './RouteWrapper';

type LayoutProps = {
  children: ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  return (
    <Box transition="0.5s ease-out" minHeight="100vh">
      <Meta />

      <Box margin="0 auto" maxWidth="6xl" padding={8}>
        <Header />
        <RouteWrapper>
          <AuthWrapper>
            <Box as="main" marginY={12}>
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
