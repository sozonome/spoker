import { Box } from '@chakra-ui/react';
import type { ReactNode } from 'react';

import { AuthWrapper } from '~/lib/layout/components/auth/auth-wrapper';

import { Footer } from './components/footer';
import { Header } from './components/header';
import { Meta } from './components/meta';
import { RouteWrapper } from './components/route-wrapper';

type LayoutProps = {
  children: ReactNode;
};

export const Layout = ({ children }: LayoutProps) => {
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
