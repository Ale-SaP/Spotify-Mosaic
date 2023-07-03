import querystring from 'querystring';
import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

export default async function refresh_tokens(refreshToken: string) {
  const authOptions = {
    url: 'https://accounts.spotify.com/api/token',
    method: 'POST',
    headers: { 'Authorization': 'Basic ' + (Buffer.from(process.env.CLIENT_ID + ':' + process.env.CLIENT_SECRET).toString('base64')) },
    data: querystring.stringify({
      grant_type: 'refresh_token',
      refresh_token: refreshToken
    }),
    json: true
  };

  try {
    const response = await axios(authOptions);
    const { access_token, refresh_token, expires_in } = response.data;
    if (refresh_token) {
      return [expires_in, access_token, refresh_token];
    }
    else {
      return [expires_in, access_token];
    }
  }
  catch (error) {
    return [0, '', ''];
  }


}