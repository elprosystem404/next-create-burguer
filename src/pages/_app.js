import * as React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import { Router } from 'next/router';

// https://github.com/rstacruz/nprogress
import NProgress from 'nprogress';

import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { CacheProvider } from '@emotion/react';
import theme from '../theme.js';
import createEmotionCache from '../createEmotionCache.js';

import { CartBurguerContextProvider } from '../context/cartBurguerProvider/index.js';
import { BurguerContextProvider } from '../context/burguerProvider/index.js';
import Layout from '../components/shared/Layout.jsx';


// https://dev.to/guiselair/criando-um-layout-persistente-em-nextjs-1g8m
// const CustomLayout = Component.layout ? Component.layout : React.Fragment;
// <CustomLayout></CustomLayout >



// ......................................
////  N Progress
// ......................................

Router.events.on("routeChangeStart", (url) => {
  NProgress.start()
})

Router.events.on('routeChangeComplete', () => NProgress.done())
Router.events.on('routeChangeError', () => NProgress.done())



// ......................................
////  client Side Emotion Cache
// ......................................
// Client-side cache, shared for the whole session of the user in the browser.
// ......................................


const clientSideEmotionCache = createEmotionCache();

export default function MyApp(props) {

  const {
    Component,
    emotionCache = clientSideEmotionCache,
    pageProps,
    router
  } = props;

  const titlePage = Component.titlePage

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <title>Create Burguer</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />

      </Head>
      <ThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />

        <BurguerContextProvider>
          <CartBurguerContextProvider>

            <Layout titlePage={titlePage} router={router}>
              <Component {...pageProps} />
            </Layout>

          </CartBurguerContextProvider>
        </BurguerContextProvider>


      </ThemeProvider>
    </CacheProvider>
  );
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  emotionCache: PropTypes.object,
  pageProps: PropTypes.object.isRequired,
};
