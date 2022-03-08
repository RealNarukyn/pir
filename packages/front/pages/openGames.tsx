import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import { Loading } from '../components/Loading';
import { CardOG } from '../components/CardOpenGame/CardOG';
import { getBookings } from '../lib/fetcher';
import { addDays } from '../utils/date';

const CenterItems = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const CalendarContainer = styled.div`
    padding: 0.5em 1em;
    margin: 1em;

    box-shadow: 2px 1px 5px black;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const CenteredCards = styled.div`
    display: flex;
    flex-flow: row wrap;
    justify-content: space-evenly;
    align-items: center;
`;

const OpenGames = () => {
  const [loading, setLoading] = useState(true);
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [minDate, setMinDate] = useState('');
  const [maxDate, setMaxDate] = useState('');
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const _maxDate = new Date(
        addDays(new Date(), 7)
    ).toISOString().split('T')[0];
    setMaxDate(_maxDate);
    const _minDate = new Date().toISOString().split('T')[0];
    setMinDate(_minDate);

    getBookings(date).then((data) => {
      setBookings(data);
      setLoading(false);
    });

    console.log('bookings', bookings);
  }, [loading, date]);


  const hadleChangeDate = (e:React.ChangeEvent) => {
    setDate(e.target.value);
    setLoading(true);
  };

  if (loading) return <Loading />;

  return (
    <CenterItems>

      <CalendarContainer>
        <label>Cerca per data</label>
        <input type="date"
          onChange={hadleChangeDate} defaultValue={date}
          min={minDate} max={maxDate}
        />
      </CalendarContainer>


      <CenteredCards>
        {bookings.length === 0 && <h3>No hi ha reserves per aquest dia...</h3>}
        {bookings.map((e, i) => <CardOG key={i} book={e} />)}
      </CenteredCards>

    </CenterItems>
  );
};

export default OpenGames;
