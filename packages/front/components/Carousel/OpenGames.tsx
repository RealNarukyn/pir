import Link from 'next/link';
import React from 'react';
import styled from 'styled-components';

const StyledContainer = styled.div`
    padding: 2em;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    
    background: #2020209c;
    
    border-radius: 5px;
    box-shadow: 2px 1px 5px black;
`;
const StyledH2 = styled.h2`
    color: white;
    font-size: 47px;
    font-weight: bold;
    margin: 0;
    margin-top: 0.5em;
`;
const StyledH5 = styled.h5`
    color: #e4ff00;
    font-size: 24px;
    margin: 0.25em;
`;
const StyledText = styled.span`
    padding: 0.5em 1em;
    background: rgb(65,76,203);
    margin: 1em;
    color: #d5d5d5;
    cursor: pointer;
    border: 1px solid #d5d5d5;
    &:hover {
        color: #ffff;
        border: 1px solid #ffff;
    }
`;

export const OpenGames = () => {
  return (
    <div className='carousel-bg open-games-bg'>
      <StyledContainer>
        <StyledH2>Partides Obertes</StyledH2>
        <StyledH5>Uneix-te a partides creades per la gent!</StyledH5>
        <Link href="/bookings">
          <StyledText><b>JUGA!</b></StyledText>
        </Link>
      </StyledContainer>
    </div>
  );
};
