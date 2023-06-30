import { NextRequest, NextResponse } from 'next/server'
import authorize_code from '../../../spotify/authorize_code'
import { cookies } from 'next/headers'

export async function POST(request: NextRequest) {
    const codeSent = await request.json()
    const code = codeSent.code
    const authorizations = await authorize_code(code)

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

    cookies().set({
        name: 'refresh_token',
        value: authorizations[2],
        httpOnly: false,
        expires: refreshTokenExpires,
    });

    return NextResponse.json('Hello, Next.js!', {
        status: 200,
    })
}
