import { getAccessToken, withApiAuthRequired } from '@auth0/nextjs-auth0';
import { apiClient } from '../../lib/fetcher';

export default withApiAuthRequired(async (req, res) => {
  // If your Access Token is expired and you have a Refresh Token
  // `getAccessToken` will fetch you a new one using the `refresh_token` grant
  const { accessToken } = await getAccessToken(req, res);
  console.log('accessToken', accessToken);
  console.log('client', apiClient.defaults.baseURL);
  console.log('request is:', req.body);

  const resAPI = await apiClient.get('/tracks', {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  res.status(resAPI.status).json(resAPI.data);
});
