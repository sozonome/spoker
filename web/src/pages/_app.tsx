import { ChakraProvider, createStandaloneToast } from "@chakra-ui/react";
import { DefaultSeo } from "next-seo";
import type { AppProps } from "next/app";
import Head from "next/head";
import "@fontsource/outfit/latin.css";

import defaultSEOConfig from "../../next-seo.config";
import Layout from "lib/layout";
import customTheme from "lib/styles/theme";
import "lib/styles/globals.css";

const { ToastContainer } = createStandaloneToast({ theme: customTheme });

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <ChakraProvider theme={customTheme}>
        <Head>
          <meta
            name="viewport"
            content="minimum-scale=1, maximum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, viewport-fit=cover"
          />
        </Head>
        <DefaultSeo {...defaultSEOConfig} />
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ChakraProvider>
      <ToastContainer />
    </>
  );
};

export default MyApp;
