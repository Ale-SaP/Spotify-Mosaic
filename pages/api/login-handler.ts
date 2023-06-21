import { NextApiRequest, NextApiResponse } from 'next';
import Cors from 'cors';
import dotenv from 'dotenv';
import axios from 'axios';
import { cookies } from 'next/headers'

dotenv.config();

// Initializing the cors middleware
// You can read more about the available options here: https://github.com/expressjs/cors#configuration-options
const cors = Cors({
  methods: ['POST', 'GET', 'HEAD'],
});

// Helper method to wait for a middleware to execute before continuing
// And to throw an error when an error happens in a middleware
function runMiddleware(req: NextApiRequest, res: NextApiResponse, fn: Function) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result: any) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Run the middleware
  await runMiddleware(req, res, cors);

  const { code } = req.body;

  if (code) {
    // Code is defined, execute the code-specific logic
    let authOptions = {
      url: 'https://accounts.spotify.com/api/token',
      form: {
        code: code,
        redirect_uri: process.env.REDIRECT_URI,
        grant_type: 'authorization_code',
      },
      headers: {
        'Authorization': 'Basic ' + (Buffer.from(process.env.CLIENT_ID + ':' + process.env.CLIENT_SECRET).toString('base64')),
      },
      json: true,
    };

    // Make the request to Spotify API to retrieve the token
    try {
      const response = await axios.post(authOptions.url, authOptions.form, { headers: authOptions.headers });
      const { access_token, refresh_token, expires_in } = response.data;

      // Setting the cookies
      cookies().set({
        name: 'access_token',
        value: access_token,
        httpOnly: false,
        path: '/',
        maxAge: expires_in,
      })

      cookies().set({
        name: 'refresh_token',
        value: refresh_token,
        httpOnly: false,
        path: '/',
        maxAge: 86400,
      })

      res.status(200).json({ message: 'Code read!' });
    } catch (error) {
      console.error('Error while retrieving token:', error);
      res.status(500).json({ error: 'Error retrieving token' });
    }
  } else {
    res.status(400).json({ error: 'No code provided' });
  }
}
