import React from 'react';
import Head from 'next/head';
import Script from 'next/script';
import styled from 'styled-components';

import '../public/css/MyNavbar.css';
import { MyNavbar } from '../components/Navbar/MyNavbar';

interface AppProps {
  Component: any;
  pageProps: any;
}

const FlexAPP = styled.div`
  width: 100vw;
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <>
      <Head>
        <title>Padel Indoor Rubi</title>
      </Head>

      <MyNavbar />

      <FlexAPP>
        <Component {...pageProps} />
      </FlexAPP>

      {/* Bootstrap */}
      <Script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p" crossOrigin="anonymous"/>
    </>
  );
};

export default App;
