import { ChakraProvider } from "@chakra-ui/react";
import { AppProps } from "next/app";
import Head from "next/head";
import "@fontsource/jost/latin.css";
import "@fontsource/inter/latin.css";

import Layout from "components/layout";
import { AuthProvider } from "components/auth/AuthProvider";

import customTheme from "styles/customTheme";
import "styles/globals.css";

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <ChakraProvider theme={customTheme}>
      <Head>
        <meta
          name="viewport"
          content="minimum-scale=1, maximum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, viewport-fit=cover"
        />
      </Head>
      <AuthProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </AuthProvider>
    </ChakraProvider>
  );
};

export default MyApp;
