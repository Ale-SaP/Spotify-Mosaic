import { NextRequest, NextResponse } from 'next/server'
import refresh_tokens from '../../../spotify/refresh_tokens'
import { cookies } from 'next/headers'

export async function POST(request: NextRequest) {
    const codeSent = await request.json()
    const code = await codeSent.refresh_token?.value
    const authorizations = await refresh_tokens(code)

    const currentEpochTime = Math.floor(Date.now() / 1000);
    const accessTokenExpiry = currentEpochTime + authorizations[0];
    const refreshTokenExpiry = currentEpochTime + 86400;
    const accessTokenExpires = new Date(accessTokenExpiry * 1000); // Multiply by 1000 to convert seconds to milliseconds
    const refreshTokenExpires = new Date(refreshTokenExpiry * 1000);

    cookies().set({
        name: 'access_token',
        value: authorizations[1],
        httpOnly: false,
        expires: accessTokenExpires,
    });

    if (authorizations[2] !== undefined && authorizations[2] !== null && authorizations[2] !== '') {
        cookies().set({
            name: 'refresh_token',
            value: authorizations[2],
            httpOnly: false,
            expires: refreshTokenExpires,
        })
    }

    return NextResponse.json('Hello, Next.js!', {
        status: 200,
    })
}
