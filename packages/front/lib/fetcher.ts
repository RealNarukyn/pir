import axios from 'axios';

import { CardOpenGameProps } from '../types/Props';
import { UserAPI } from '../types/types';

export const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_HOST
});
export const frontClient = axios.create();

export const getTracks = async () => {
  const res = await frontClient.get('/api/getTracks');
  if (res.status !== 200) {
    console.log('Error retrieving tracks', res.data.message);
    return [];
  }

  return res.data;
};

export const joinGame = async (bookID:string) => {
  try {
    const res = await frontClient.put('/api/joinGame', { bookID });
    console.log('res from joinGame at fetcher.ts', res);
    if (res.status !== 200) {
      console.log('Error retrieving tracks', res.data.error);
      return alert(res.data.error);
    }

    return alert(res.data.message);
  } catch (error) {
    console.log('error at joinGame fetcher', error);
    return alert('Internal Server Error...');
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
