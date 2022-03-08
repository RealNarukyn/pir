import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import { getUserInfo } from '../../lib/fetcher';
import { Loading } from '../Loading';
import { UserAPI } from '../../types/types';

const PlayerContainer = styled.div`
    width: 25%;
    height: 25%;

    border-radius = 1999px;
    border: 1px solid black;
`;

export const PlayerInfo:React.FC<{ id:string }> = ({ id }) => {
  const [loading, setLoading] = useState(true);
  const [playerData, setPlayerData] = useState({} as UserAPI);

  useEffect(() => {
    getUserInfo(id).then((data) => {
      setPlayerData(data);
      setLoading(false);
    });
  }, [loading]);

  if (loading) return <Loading />;

  return (
    <PlayerContainer>
        hey
    </PlayerContainer>
  );
};
