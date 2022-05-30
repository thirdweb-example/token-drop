import React from "react";
import { ChainId, ThirdwebProvider } from "@thirdweb-dev/react";
import Head from "next/head";
import ThirdwebGuideFooter from "../components/guide/ThirdwebGuideFooter";
import "../styles/globals.css";

// This is the chainId your dApp will work on.
const activeChainId = ChainId.Mumbai;

function MyApp({ Component, pageProps }) {
  return (
    <ThirdwebProvider desiredChainId={activeChainId}>
      <Head>
        <title>thirdweb Token Drop Example</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta
          name="description"
          content="thirdweb Example Repository to Showcase the token drop contract, including claim and transfer features."
        />
        <meta
          name="keywords"
          content="thirdweb token drop, thirdweb token transfer, thirdweb token claim, thirdweb token claim phases"
        />
      </Head>
      <Component {...pageProps} />
      <ThirdwebGuideFooter />
    </ThirdwebProvider>
  );
}

export default MyApp;
