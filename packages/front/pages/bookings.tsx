import React from 'react';
import _ from 'lodash';
import styled from 'styled-components';

const BookingsGrid = styled.div`
    padding: 1em;
    margin: 1em;
    width: 75vw;

    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
`;

const GridColumn = styled.div`
  width: 10%;
  margin: 0.1em;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const GridBox = styled.div`
  width: 100%;
  height: 1.25em;

  background: ${(props) => props.theme.bg || 'white'};
  border: 1px solid black;
  cursor: pointer;
  
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const initCount = 7.5;
const Bookings = () => {
  // This will just return a rectangle of boxes
  // Dimensions: w-10 h-33
  return (
    <>
      <BookingsGrid>

        {_.range(0, 10).map((e) =>
          <GridColumn key={e}>
            {_.range(0, 33).map((f)=> {
              if (e===0 && f===0) {
                return <GridBox key={e+f} theme={{ bg: 'black' }}/>;
              }
              if (e!==0 && f===0) {
                return <GridBox key={e+f} theme={{ bg: 'blue' }}>
                  Track Type
                </GridBox>;
              }
              if (e===0 && f!==0) {
                return <GridBox key={e+f} theme={{ bg: 'yellow' }}>
                  {initCount + f/2}
                </GridBox>;
              }
              if (e!==0 && f!==0) {
                return <GridBox key={e+f} >hour</GridBox>;
              }
            })}

          </GridColumn>
        )}
      </BookingsGrid>
    </>

  );
};

export default Bookings;
