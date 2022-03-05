import React, { useEffect } from 'react';
import { getTracks } from '../lib/fetcher';

const Index = () => {
  useEffect(() => {
    getTracks();
  });

  return (
    <h1>Index</h1>
  );
};

export default Index;
