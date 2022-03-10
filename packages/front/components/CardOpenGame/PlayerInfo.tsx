import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

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
`;

export const PlayerInfo:React.FC<{ id:string }> = ({ id }) => {
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

  return (
    <PlayerContainer>
      <span>user:{id}</span>
    </PlayerContainer>
  );
};
