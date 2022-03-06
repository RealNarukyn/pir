import React from 'react';
import styled from 'styled-components';
import { Campionats } from '../components/Carousel/Campionats';

import { Carousel } from '../components/Carousel/Carousel';
import { OpenGames } from '../components/Carousel/OpenGames';
import { Reserva } from '../components/Carousel/Reserva';

const Index = () => {
  return (
    <>
      <section style={{ height: '75vh' }}>
        <Carousel>
          <Reserva />
          <OpenGames />
          <Campionats />
        </Carousel>
      </section>
    </>
  );
};

export default Index;
