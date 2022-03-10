import axios from 'axios';

import { CardOpenGameProps } from '../types/Props';
import { BookingReq, UserAPI } from '../types/types';

export const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_HOST
});
export const frontClient = axios.create();

export const getTracks = async () => {
  const res = await apiClient.get('/tracks');
  if (res.status !== 200) return res.data.error;

  return res.data;
};

export const joinGame = async (bookID:string) => {
  try {
    const res = await frontClient.put('/api/joinGame', { bookID });
    if (res.status=== 200) {
      return alert(res.data.message);
    }
  } catch (error:any) {
    const errRes = error.response;
    return alert(`[Error ${errRes.status}]: ${errRes.data.error}`);
  }
};

export const createBooking = async (reqObject:BookingReq):Promise<boolean> => {
  try {
    const {
      bDate, trackID, userID, bName, bEmail, initTime, duration
    } = reqObject;

    const res = await apiClient.post('/bookings/'+bDate, {
      trackID, userID, bName, bEmail, initTime, duration
    });
    if (res.status !== 200) return false;

    return true;
  } catch (error: any) {
    console.log('error is:', error);
    const errRes = error.response;
    console.error(`[Error ${errRes.status}]: ${errRes.data.error}`);
    return false;
  }
};

export const getBookings = async (date:string)
  : Promise<CardOpenGameProps[]> => {
  try {
    const res = await apiClient.get('/bookings/'+date+'/openbooks');
    if (res.status !== 200) throw new Error(res.data.error);

    return res.data;
  } catch (error) {
    console.error('Error fetching bookings:', error);
    return [];
  }
};

export const getUserInfo = async (id:string)
  : Promise<UserAPI> => {
  try {
    const res = await apiClient.get('/users/'+id);
    if (res.status === 404) return res.data;
    if (res.status !== 200) throw new Error(res.data.error);

    return res.data;
  } catch (error) {
    console.error('Error fetching user info:', error);
    return { error };
  }
};
