import axios from 'axios';

export const apiClient = axios.create({ baseURL: process.env.API_HOST });
export const frontClient = axios.create();

export const getTracks = async () => {
  const res = await frontClient.get('/api/getFetcher');
  if (res.status !== 200) {
    console.log('Error retrieving tracks', res.data.message);
    return [];
  }

  return res.data;
};
