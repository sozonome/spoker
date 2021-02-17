import { ChakraProvider } from "@chakra-ui/react";
import Head from "next/head";
import "@fontsource/jost/latin.css";
import "@fontsource/inter/latin.css";

import Layout from "components/layout";

import customTheme from "styles/customTheme";
import "styles/globals.css";
import AuthWrapper from "components/auth/AuthWrapper";
import RouteWrapper from "components/layout/RouteWrapper";
import { AuthProvider } from "components/auth/AuthProvider";

const MyApp = ({ Component, pageProps }) => {
  return (
    <ChakraProvider theme={customTheme}>
      <Head>
        <meta
          name="viewport"
          content="minimum-scale=1, maximum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, viewport-fit=cover"
        />
      </Head>
      <AuthProvider>
        <AuthWrapper>
          <RouteWrapper>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </RouteWrapper>
        </AuthWrapper>
      </AuthProvider>
    </ChakraProvider>
  );
};

export default MyApp;
