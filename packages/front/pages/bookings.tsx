import React from 'react';
import styled from 'styled-components';

import { BookingForm } from '../components/BookingForm/BookingForm';

const FlexSection = styled.div`
  width: 100%;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Bookings = () => {
  return (
    <FlexSection>
      <BookingForm />
    </FlexSection>
  );
};

export default Bookings;
