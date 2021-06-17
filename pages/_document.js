import React from 'react';
import Document, { Head, Main, NextScript } from 'next/document';
import { ServerStyleSheet } from 'styled-components';
import theme from '../config';
import * as control from '../myfuncs.js'

class MyDocument extends Document {
  static async getInitialProps({ renderPage }) {
    console.log("Hello from line 9");
    const sheet = new ServerStyleSheet();
    const page = renderPage(App => props =>
      sheet.collectStyles(<App {...props} />)
    );
    const styleTags = sheet.getStyleElement();

    return {
      ...page,
      styleTags,
    };
  }

  render() {
    const { styleTags } = this.props;

    return (
      <html lang="en">
        <Head>
          <meta charSet="utf-8" />
          <meta
            name="viewport"
            content="initial-scale=1.0, width=device-width, viewport-fit=cover"
          />
          <link rel="manifest" href="/manifest.json" />
          <meta name="theme-color" content={theme.primary} />
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link href="https://fonts.googleapis.com/css2?family=Josefin+Sans:ital,wght@0,300;0,400;0,700;1,300;1,400;1,700&display=swap" rel="stylesheet" />
          {styleTags}
        </Head>
        <body style={{backgroundColor: "black"}}>
          <canvas style={{position: "fixed", opacity: "0", zIndex: "0"}} width="900" height="900" id="stars" />
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}

export default MyDocument;
