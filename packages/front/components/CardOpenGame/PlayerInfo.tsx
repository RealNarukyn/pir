import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import CircularProgress from '@mui/material/CircularProgress';

import { getUserInfo } from '../../lib/fetcher';
import { Loading } from '../Loading';
import { UserAPI } from '../../types/types';

const PlayerContainer = styled.div`
    margin: 0.5em;
    padding: 1em;

    border-radius: 1999px;
    border: 1px solid black;

    width: 4em;
    height: 4em;

    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;

    background: ${(props) => props.theme.hasPlayer? '#e2f12fc2': '#ef3131c9'}
`;

export const PlayerInfo:React.FC<{ id:string; e: number }> = ({ id, e }) => {
  const [loading, setLoading] = useState(true);
  const [playerData, setPlayerData] = useState({} as UserAPI);

  useEffect(() => {
    if (!id) {
      setLoading(false);
      return;
    }

    setLoading(false);
    // getUserInfo(id).then((data) => {
    //   setPlayerData(data);
    //   setLoading(false);
    // });
  }, [loading]);

  if (loading) return <CircularProgress sx={{ margin: '1em' }}/>;

  return (
    <PlayerContainer theme={id? { hasPlayer: true}: { hasPlayer: false}}>
      <span>user:{e+1}</span>
    </PlayerContainer>
  );
};
