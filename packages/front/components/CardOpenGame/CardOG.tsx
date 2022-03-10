import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Button from '@mui/material/Button';
import _ from 'lodash';

import { CardOpenGameProps } from '../../types/Props';
import { beautyDate } from '../../utils/date';
import { PlayerInfo } from './PlayerInfo';
import { capitalize } from '../../utils/string';
import { joinGame } from '../../lib/fetcher';
import { useUser } from '@auth0/nextjs-auth0';

const CardContainer = styled.div`
    margin: 1em;
    padding: 2em;
    box-shadow: 0px 0px 5px 2px #e2f12f;

    width: 22em;
    height: 20em;

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

const PistaSection = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
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
  const { user } = useUser();

  const handleJoin = async () => {
    if (!user) return alert('Necessites estar loggejat!');
    await joinGame(book._id);
  };

  useEffect(() => {
    setPDate(beautyDate(book.bDate));
  });

  return (
    <CardContainer>

      <UpperSection>
        <PistaSection>
          <StyledH6>{capitalize(book.trackInfo.trackType)}</StyledH6>
          <StyledH6>Pista: {book.trackInfo.trackNum}</StyledH6>
        </PistaSection>
        <StyledH6>{pDate} comença a: {book.initTime}H</StyledH6>
        <h6>
          <b>Nivell</b>
        </h6>
        <i><b>min:</b> {book.minSkill}</i>
        <i><b>max:</b> {book.maxSkill}</i>
      </UpperSection>

      <BottomSection>
        {book.trackInfo.trackType === 'padel solo' ?
          _.range(0, 2).map((e) =>
            <PlayerInfo key={e} e={e} id={book.players[e] || ''} />) :

            _.range(0, 4).map((e) =>
              <PlayerInfo key={e} e={e} id={book.players[e] || ''} />)
        }
      </BottomSection>

      {book.stillJoinable ?
        <Button variant="contained" onClick={handleJoin}>UNIR-SE</Button> :
        <Button variant="contained" disabled>UNIR-SE</Button>
      }

    </CardContainer>
  );
};
