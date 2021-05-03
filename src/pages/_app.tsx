import { ChakraProvider } from "@chakra-ui/react";
import { AppProps } from "next/app";
import { useRouter } from "next/router";
import Head from "next/head";
import { useEffect } from "react";
import "@fontsource/jost/latin.css";
import "@fontsource/inter/latin.css";

import Layout from "components/layout";
import { AuthProvider } from "components/auth/AuthProvider";

import { initGA, logPageView } from "lib/analytics";

import customTheme from "styles/customTheme";
import "styles/globals.css";

const MyApp = ({ Component, pageProps }: AppProps) => {
  const router = useRouter();

  useEffect(() => {
    initGA();
    // `routeChangeComplete` won't run for the first page load unless the query string is
    // hydrated later on, so here we log a page view if this is the first render and
    // there's no query string
    if (!router.asPath.includes("?")) {
      logPageView();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    // Listen for page changes after a navigation or when the query changes
    router.events.on("routeChangeComplete", logPageView);
    return () => {
      router.events.off("routeChangeComplete", logPageView);
    };
  }, [router.events]);

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
