import querystring from 'querystring';
import dotenv from 'dotenv';
dotenv.config();

export default function redirect_url() {
    return ('https://accounts.spotify.com/authorize?' +
        querystring.stringify({
            response_type: 'code',
            client_id: process.env.CLIENT_ID,
            scope: process.env.SCOPE,
            redirect_uri: process.env.REDIRECT_URI,
        }))
}