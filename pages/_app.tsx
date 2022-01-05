import '../styles/globals.css'
import type { AppProps } from 'next/app'
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import NextLink from 'next/link'

import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
} from "@apollo/client";
import * as React from "react";

const client = new ApolloClient({
  uri: process.env.NEXT_PUBLIC_ALPHASEA_THEGRAPH_ENDPOINT,
  cache: new InMemoryCache()
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
      <ApolloProvider client={client}>
          <AppBar position="static">
              <Toolbar>
                  <NextLink href="/" passHref>
                      <Button color="inherit" style={{textTransform: 'none'}}>AlphaSea</Button>
                  </NextLink>
                  <NextLink href="/debug" passHref>
                      <Button color="inherit">Debug</Button>
                  </NextLink>
              </Toolbar>
          </AppBar>
          <Component {...pageProps} />
      </ApolloProvider>
  )
}

export default MyApp

