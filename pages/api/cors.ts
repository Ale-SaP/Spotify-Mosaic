import type { NextApiRequest, NextApiResponse } from 'next';
import Cors from 'cors';
import axios from 'axios';

// Initializing the cors middleware
// You can read more about the available options here: https://github.com/expressjs/cors#configuration-options
const cors = Cors({
  methods: ['POST', 'GET', 'HEAD'],
});

// Helper method to wait for a middleware to execute before continuing
// And to throw an error when an error happens in a middleware
function runMiddleware(
  req: NextApiRequest,
  res: NextApiResponse,
  fn: Function
) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result: any) => {
      if (result instanceof Error) {
        return reject(result);
      }

      return resolve(result);
    });
  });
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Run the middleware
  await runMiddleware(req, res, cors);

  // Make the Axios request
  try {
    const response = await axios.get('https://api.spotify.com/v1/albums/4aawyAB9vmqN3uQ7FjRGTy');
    const data = response.data;
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred' });
  }
}