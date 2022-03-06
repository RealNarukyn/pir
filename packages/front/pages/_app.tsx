import React from 'react';
import Head from 'next/head';
import Script from 'next/script';
import { UserProvider } from '@auth0/nextjs-auth0';

// Importing CSS
import '../public/css/style.css';
import '../public/css/Carousel.css';
import '../public/css/MyNavbar.css';

import { MyNavbar } from '../components/Navbar/MyNavbar';

const App = ({ Component, pageProps, initialUser }) => {
  return (
    <>
      <Head>
        <title>Padel Indoor Rubí</title>
      </Head>

      {/* MY APP */}
      <UserProvider user={initialUser}>
        <MyNavbar />

        <Component {...pageProps} />
      </UserProvider>


      {/* Bootstrap */}
      <Script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p" crossOrigin="anonymous"/>
    </>
  );
};

export default App;
