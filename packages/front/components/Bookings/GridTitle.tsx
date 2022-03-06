import React from 'react';
import styled from 'styled-components';

const Grid = styled.div`
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

export const GridTitle = () => {
  return (<p>title</p>);
};
