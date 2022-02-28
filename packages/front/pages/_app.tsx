import React from 'react';
import Head from 'next/head';
import Script from 'next/script';
import styled from 'styled-components';
import { UserProvider, getSession } from '@auth0/nextjs-auth0';

import '../public/css/MyNavbar.css';
import { MyNavbar } from '../components/Navbar/MyNavbar';

const FlexAPP = styled.div`
  width: 100vw;
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

const App = ({ Component, pageProps, initialUser }) => {
  return (
    <>
      <Head>
        <title>Padel Indoor Rubi</title>
      </Head>

      {/* MY APP */}
      <UserProvider user={initialUser}>
        <MyNavbar />

        <FlexAPP>
          <Component {...pageProps} />
        </FlexAPP>
      </UserProvider>


      {/* Bootstrap */}
      <Script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p" crossOrigin="anonymous"/>
    </>
  );
};

App.getInitialProps = async ({ ctx }) => {
  const session = getSession(ctx.req, ctx.res);

  console.log('initial USER from initial props');
  console.log(session);

  return {
    initialUser: session?.user,
  };
};

export default App;
