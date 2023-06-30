import { NextResponse, NextRequest } from "next/server";
import refresh_tokens from "./src/spotify/refresh_tokens";
import { cookies } from "next/headers";

// we are not exporting by default
export async function middleware(req: NextRequest) {
  const a_token = req.cookies.get("access_token");
  const r_token = req.cookies.get("refresh_token");
  const { pathname } = req.nextUrl;

  // Add guardrails: users should not be able to access /home if they are already logged in
  // If they are not logged in, always redirect to /home
  // Important!!! The only exception for redirecting unlogged users should be /login?TOKEN, given that is where the login is made

  if (a_token && r_token) {
    // User is already logged in, continue as usual
    console.log("User is logged in");
    return NextResponse.next()
  }


  else if (a_token && !r_token) {
    // Error or user tinkering; should delete access token and redirect the user to /home
    console.log("User is logged in but refresh token is missing");
    req.cookies.delete("access_token");
    const url = req.nextUrl.clone()
    url.pathname = '/home'
    return NextResponse.rewrite(url)
  }


  else if (!a_token && r_token) {
    // Should refresh the access_token and then continue
    console.log("User is not logged in but refresh token is present");
    try {
      const newAccess = await refresh_tokens(r_token.value)
      if (newAccess[0] === 0) {
        throw Error
      }
      const currentEpochTime = Math.floor(Date.now() / 1000);
      const accessTokenExpiry = currentEpochTime + newAccess[0];
      const refreshTokenExpiry = currentEpochTime + 86400;

      const accessTokenExpires = new Date(accessTokenExpiry * 1000); // Multiply by 1000 to convert seconds to milliseconds
      const refreshTokenExpires = new Date(refreshTokenExpiry * 1000);

      cookies().set({
        name: 'access_token',
        value: newAccess[1],
        httpOnly: false,
        expires: accessTokenExpires,
      });

      cookies().set({
        name: 'refresh_token',
        value: newAccess[2],
        httpOnly: false,
        expires: refreshTokenExpires,
      });
      return NextResponse.next()
    }
    catch (e) {
      console.log(e)
      const url = req.nextUrl.clone()
      url.pathname = '/home'
      return NextResponse.rewrite(url)
    }
  }

  else {
    // User is not logged in, handle accordingly
    console.log("User is not logged in");
    if (pathname !== "/login" && !pathname.startsWith("/login?TOKEN")) {
      // Redirect to /home if not on the login page or login with token page
      const url = req.nextUrl.clone()
      url.pathname = '/home'
      return NextResponse.rewrite(url)
    }
  }

  return NextResponse.next();
}

export const config = { matcher: ['/profile'] }