import querystring from 'querystring';
import axios from 'axios';

export default async function refresh_tokens(refreshToken: string) {
  const authOptions = {
    url: 'https://accounts.spotify.com/api/token',
    method: 'POST',
    data: querystring.stringify({
      grant_type: 'refresh_token',
      refresh_token: refreshToken,
    }),
    headers: {
      'Authorization': 'Basic ' + (Buffer.from(process.env.CLIENT_ID + ':' + process.env.CLIENT_SECRET).toString('base64')),
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  };

  try {
    const response = await axios(authOptions);
    const { access_token, refresh_token, expires_in } = response.data;
    return [expires_in, access_token, refresh_token];
  }
  catch (error) {
    console.log(error);
    return [0, '', ''];
  }


}