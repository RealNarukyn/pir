import React from 'react';
import styled from 'styled-components';

import { Carousel } from '../components/Carousel/Carousel';
import { CarouselItem } from '../components/Carousel/CarouselItem';
import { CarouselItemProps } from '../types/Props';

const CarouselItems: CarouselItemProps[] = [
  {
    bgImage: 'reserva-bg', title: 'RESERVA PISTA',
    subTitle: 'Accedeix i reserva pista', btnTxt: 'RESERVA!', href: 'bookings'
  },
  {
    bgImage: 'open-games-bg', title: 'PARTIDES OBERTES',
    subTitle: 'Uneix-te a partides creades per la gent!',
    btnTxt: 'JUGA!', href: 'openGames'
  },
  {
    bgImage: 'campionats-bg', title: 'CAMPIONATS DISPONIBLES',
    subTitle: 'Participa als campionats oberts',
    btnTxt: 'GUANYA!', href: 'campionats'
  },
];

const StyledInfo = styled.section`
  margin-top: 2em;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
`;

const StyledInfoDiv = styled.div`
  width: 75%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const StyledTitle = styled.h5`
  color: #434ea0;
  font-weight: 700;
  font-size: 1.5em;
`;

const Index = () => {
  return (
    <>
      <section>
        <Carousel>
          {CarouselItems.map((e, i) => <CarouselItem key= {i} itemProps={e}/>)}
        </Carousel>
      </section>

      <StyledInfo>
        <StyledInfoDiv>
          <StyledTitle>CONTACTE</StyledTitle>
          <p>info@padelindoorrubi.com</p>
          <p>935 873 474 / 637 540 424 / 640 669 390(Cafeteria)</p>
        </StyledInfoDiv>
        <StyledInfoDiv>
          <StyledTitle>HORARIS</StyledTitle>
          <p><b>De dilluns a divendres:</b> 8h a 24:00h</p>
          <p><b>Caps de setmana i festius:</b> 8h a 21:30h</p>
        </StyledInfoDiv>
        <StyledInfoDiv>
          <StyledTitle>REDS SOCIALS</StyledTitle>
          <p>facebook</p>
          <p>instagram</p>
        </StyledInfoDiv>
      </StyledInfo>
    </>
  );
};

export default Index;
