import React from 'react';
import styled from 'styled-components';
import CircularProgress from '@mui/material/CircularProgress';

const StyledH4 = styled.h4`
    font-weight: bold;
    margin: 1em;
`;

const CenterLoading = styled.div`
    width: 100%;
    margin: 3em;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

export const Loading = () => {
  return (
    <CenterLoading>
      <StyledH4>CARREGANT</StyledH4>
      <CircularProgress />
    </CenterLoading>
  );
};
