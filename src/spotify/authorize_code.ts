import querystring from 'querystring';
import dotenv from 'dotenv';
import axios from 'axios';
dotenv.config();


export default async function authorize_code(code: string): Promise<[number, string, string]> {
    const authOptions = {
        url: 'https://accounts.spotify.com/api/token',
        method: 'POST',
        data: querystring.stringify({
            code: code,
            redirect_uri: process.env.REDIRECT_URI,
            grant_type: 'authorization_code',
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
        return [0, '', ''];
    }
}