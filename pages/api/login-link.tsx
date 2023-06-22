import { NextApiRequest, NextApiResponse } from 'next';
import querystring from 'querystring';
import Cors from 'cors';
import dotenv from 'dotenv';
import { serialize } from 'cookie';

dotenv.config();

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

    const redirectUrl = 'https://accounts.spotify.com/authorize?' +
        querystring.stringify({
            response_type: 'code',
            client_id: process.env.CLIENT_ID ,
            scope: process.env.SCOPE,
            redirect_uri: process.env.REDIRECT_URI,
    });

    // Make the Axios request
    try {
        const ac_token_cookie = serialize("test1", "test1 value", { httpOnly: false, path: "/", maxAge: 86400});
        const re_token_cookie = serialize("test2", "test2 value", { httpOnly: false, path: "/", maxAge: 86400});
        res.setHeader("Set-Cookie", [ac_token_cookie, re_token_cookie]);  
        res.json(redirectUrl);
    } catch (error) {
        res.status(500).json({ error: 'An error occurred' });
    }
}
