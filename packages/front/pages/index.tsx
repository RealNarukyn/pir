import React, { useEffect } from 'react';
import { getTracks, testPost } from '../lib/fetcher';

const Index = () => {
  useEffect(() => {
    getTracks();
    testPost();
  });

  return (
    <h1>Index</h1>
  );
};

export default Index;
