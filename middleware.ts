import { NextResponse } from "next/server";

// we are not exporting by default
export async function middleware(req, ev) {

  const a_token = req.cookies.get("access_token")
  const r_token = req.cookies.get("refresh_token")
  const { pathname } = req.nextUrl;
  if (a_token && r_token) {
    console.log("user is logged in");
  }
  else if (a_token && !r_token) {
    console.log("user is logged in but refresh token is missing");
  }
  else if (!a_token && r_token) {
    console.log("user is not logged in but refresh token is present");
  }
  else {
    console.log("user is not logged in");
  }
  return NextResponse.next();
}
