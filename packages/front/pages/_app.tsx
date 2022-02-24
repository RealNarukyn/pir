import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';

import { MyNavbar } from '../components/Navbar';

interface AppProps {
    Component: any;
    pageProps: any;
}

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <>
      <MyNavbar />
      <h1>Welcome to PIR Front-End</h1>
      <Component {...pageProps} />
    </>
  );
};

export default App;
