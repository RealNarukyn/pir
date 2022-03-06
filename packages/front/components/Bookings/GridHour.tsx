import React from 'react';
import styled from 'styled-components';

const GridBox = styled.div`
  width: 100%;
  height: 1.25em;

  text-align: center;
  text-size: 1em;

  background: #edede9;
  border: 1px solid black;

  display: flex;
  justify-content: center;
  align-items: center;
`;

export const GridHour:React.FC<{ hour: number}> = ({ hour }) => {
  const isDecimal = hour%1 === 0;

  if (isDecimal) {
    return <GridBox>
      {hour.toString().padStart(2, '0')}:00
    </GridBox>;
  }

  if (!isDecimal) {
    return <GridBox>
      {Math.trunc(hour).toString().padStart(2, '0')}:30
    </GridBox>;
  }
};
