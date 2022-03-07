import React, { useState } from 'react';
import styled from 'styled-components';

import { ReactChild } from '../../types/ReactChildren';

const ButtonPrev = styled.button`
  position: relative;
  top: -23.5em;
  left: 5%;

  padding: 1em 2em;;
  background: #e4ff00;
  border: none;
  border-radius: 1999px;
`;
const ButtonNext = styled.button`
  position: relative;
  top: -23.5em;
  left: 85%;
  
  padding: 1em 2em;;
  background: #e4ff00;
  border: none;
  border-radius: 1999px;
`;

export const Carousel:React.FC<{children: ReactChild}> = ({ children }) => {
  const [activeChild, setActiveChild] = useState(0);

  const nextChild = () => {
    const numChilds = children.length - 1;

    if (activeChild >= numChilds) return setActiveChild(0);
    return setActiveChild(activeChild+1);
  };
  const prevChild = () => {
    const numChilds = children.length;
    if (activeChild <= 0) return setActiveChild(numChilds - 1);
    return setActiveChild(activeChild-1);
  };

  return (
    <div className="carousel">
      {children[activeChild]}

      <ButtonPrev onClick={prevChild}>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-caret-left-fill" viewBox="0 0 16 16">
          {/* eslint-disable-next-line max-len */}
          <path d="m3.86 8.753 5.482 4.796c.646.566 1.658.106 1.658-.753V3.204a1 1 0 0 0-1.659-.753l-5.48 4.796a1 1 0 0 0 0 1.506z"/>
        </svg>
      </ButtonPrev>

      <ButtonNext onClick={nextChild}>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-caret-right-fill" viewBox="0 0 16 16">
          {/* eslint-disable-next-line max-len */}
          <path d="m12.14 8.753-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z"/>
        </svg>
      </ButtonNext>

    </div>
  );
};
