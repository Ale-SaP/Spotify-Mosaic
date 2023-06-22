import { NextApiRequest, NextApiResponse } from 'next';
import Cors from 'cors';
import dotenv from 'dotenv';
import axios from 'axios';
import querystring from 'querystring';


dotenv.config();

import { serialize } from "cookie";


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

      const ac_token_cookie = serialize("access_token", access_token, { httpOnly: false, path: "/", maxAge: expires_in });
      const re_token_cookie = serialize("refresh_token", refresh_token, { httpOnly: false, path: "/", maxAge: 86400 });
      res.setHeader("Set-Cookie", [ac_token_cookie, re_token_cookie]);
      res.status(200).json({ message: 'Code read!' });

    } catch (error) {
      console.error('Error while retrieving token:', error);
      res.status(500).json({ error: 'Error retrieving token' });
    }
  } else {
    res.status(400).json({ error: 'No code provided' });
  }
}
