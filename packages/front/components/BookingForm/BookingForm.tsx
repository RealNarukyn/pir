import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';

import { addDays } from '../../utils/date';
import { createBooking, getTracks } from '../../lib/fetcher';
import { Error } from './Error';
import { capitalize } from '../../utils/string';
import _ from 'lodash';
import { useUser } from '@auth0/nextjs-auth0';
import { BookingReq } from '../../types/types';

const FlexForm = styled.form`
  width: 50vw;
  padding: 1em;
  border: 1px solid black;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const GroupFormElem = styled.div`
  width: 100%;
  margin: 1em;

  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
`;

const FormElement = styled.div`
  display:flex;
  flex-direction: column;
  margin: 0.5em;
`;

const RadioBtnWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const SelectorTimeWrap = styled.div`
  margin: 0.25em;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
`;

export const BookingForm = () => {
  const { user } = useUser();

  const [loading, setLoading] = useState(true);
  const [minDate, setMinDate] = useState('');
  const [maxDate, setMaxDate] = useState('');
  const [tracks, setTracks] = useState([]);
  const [minHour, setMinHour] = useState(8);

  useEffect(() => {
    getTracks().then((data) => {
      setTracks(data);
      setLoading(false);
    });

    const _maxDate = new Date(
        addDays(new Date(), 7)
    ).toISOString().split('T')[0];
    setMaxDate(_maxDate);

    const _minDate = new Date().toISOString().split('T')[0];
    setMinDate(_minDate);

    const _minHour = new Date().getHours();
    setMinHour(_minHour);
  }, [loading]);

  const {
    register, handleSubmit, reset,
    formState: { errors },
    setError, watch
  } = useForm({
    defaultValues: {
      bDate: '', bEmail: '', bName: '', duration: '',
      hour: '', minute: '', trackID: '',
    },
  });

  const formState = watch();

  const submit = handleSubmit(async (data) => {
    const {
      bDate, bEmail, bName, duration, hour, minute, trackID
    } = data;

    const today = new Date().toISOString().split('T')[0];
    if (bDate === today) {
      if (parseInt(hour) < minHour) {
        return setError('hour', {
          message: 'No pots reservar el pasat!!!!'
        });
      }
    }

    const initTime = `${hour}:${minute}`;
    const reqObject:BookingReq = {
      bDate,
      bEmail,
      bName,
      duration: parseInt(duration),
      initTime,
      trackID,
      userID: user?.sub || ''
    };

    console.log('reqObject', reqObject);

    const isOK = await createBooking(reqObject);
    if (!isOK) alert('[ Internal Server Error ] - Check the console...');

    alert('Reserva realitzada!');
    reset();

    // reset();
  });

  return (
    <div style={{ padding: '1em' }}>
      <h3>Fes la teva reserva</h3>
      <FlexForm onSubmit={submit}>
        <GroupFormElem>

          <FormElement>
            <label>Escull un dia per reservar:</label>
            <input
              type="date"
              min={minDate} max={maxDate}
              {...register('bDate', {
                required: 'Escull una data...',
              })}
            />
            <Error field="bDate" errors={errors} />
          </FormElement>

          <FormElement>
            <label>Escull quina pista vols:</label>
            <select
              {...register('trackID', {
                required: 'Escull una pista'
              })}>
              {tracks.map((track, index) =>
                <option key={index} value={track._id}>
                  {capitalize(track.trackType)}: {track.trackNum}
                </option>
              )}
            </select>
            <Error field="trackID" errors={errors} />
          </FormElement>

        </GroupFormElem>

        <GroupFormElem>

          <FormElement>
            <label>Escull la hora per jugar:</label>
            <SelectorTimeWrap>
              <select
                {...register('hour', {
                  required: 'Escull una hora per jugar'
                })}
              >
                {_.range(8, 24).map((e) =>
                  <option key={e} value={(e).toString().padStart(2, '0')}>
                    {(e).toString().padStart(2, '0')} H
                  </option>
                )}
              </select>

              <select
                {...register('minute', {
                  required: 'Escull una hora per jugar'
                })}
              >
                {formState.hour === '23' ?
                <option value="00">00 M</option> :
                <>
                  <option value="00">00 M</option>
                  <option value="30">30 M</option>
                </>
                }
              </select>
            </SelectorTimeWrap>
            <Error field="initTime" errors={errors} />
          </FormElement>

          <FormElement>
            <label>Escull la durada del partit:</label>
            <RadioBtnWrapper>
              <div style={{ margin: '0.25em' }}>
                <input type="radio" value="60"
                  {...register('duration', { required: 'Escull una opció'})}
                />
                <label style={{marginLeft: '2px'}}>60min</label>
              </div>

              <div style={{ margin: '0.25em' }}>
                <input type="radio" value="90"
                  {...register('duration', { required: 'Escull una opció'})}
                />
                <label style={{marginLeft: '2px'}} >90min</label>
              </div>

              <div style={{ margin: '0.25em' }}>
                <input type="radio" value="120"
                  {...register('duration', { required: 'Escull una opció'})}
                />
                <label style={{marginLeft: '2px'}}>120min</label>
              </div>
            </RadioBtnWrapper>
            <Error field="duration" errors={errors} />
          </FormElement>

        </GroupFormElem>

        <GroupFormElem>
          <FormElement>
            <label>Quí reserva?</label>
            <input
              type="text" {...register('bName', {
                required: 'Omple amb un nom!'
              })}
            />
            <Error field="bName" errors={errors}/>
          </FormElement>

          <FormElement>
            <label>Email de contacte?</label>
            <input
              type="email" {...register('bEmail', {
                required: 'Omple amb un email!'
              })}
            />
            <Error field="bEmail" errors={errors}/>
          </FormElement>
        </GroupFormElem>

        <input type="submit" value="Reserva!"/>
      </FlexForm>
    </div>

  );
};
