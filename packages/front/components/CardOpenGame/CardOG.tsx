import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Button from '@mui/material/Button';

import { CardOpenGameProps } from '../../types/Props';
import { beautyDate } from '../../utils/date';
import { PlayerInfo } from './PlayerInfo';

const CardContainer = styled.div`
    margin: 1em;
    padding: 2em;
    box-shadow: 2px 1px 5px rgb(65,76,203);

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const UpperSection = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
`;

const BottomSection = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: flex-start;
`;

const StyledH6 = styled.h6`
    font-weight: bold;
    font-size: 1em;
`;

export const CardOG:React.FC<{book: CardOpenGameProps}> = ({ book }) => {
  const [pDate, setPDate] = useState('');

  useEffect(() => {
    setPDate(beautyDate(book.bDate));
  });


  return (
    <CardContainer>

      <UpperSection>
        <StyledH6>Pista X / Padel-Padbol</StyledH6>
        <StyledH6>{pDate} comença a: {book.initTime}H</StyledH6>
        <h6>
          <b>Nivell</b>
          {' '}
          <i>min: {book.minSkill}</i>
          {' / '}
          <i>max: {book.maxSkill}</i>
        </h6>
      </UpperSection>

      <BottomSection>
        {book.players.map((player, i) => <PlayerInfo key={i} player={player} />)}
      </BottomSection>

      {book.stillJoinable ?
        <Button variant="contained">UNIR-SE</Button> :
        <Button variant="contained" disabled>UNIR-SE</Button>
      }

    </CardContainer>
  );
};
