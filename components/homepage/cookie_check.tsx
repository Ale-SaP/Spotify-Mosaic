import 'server-only'

import { cookies } from 'next/headers'
import WelcomeText from './unlogged/welcomeText'

export default function CookieCheck() {
  const cookieStore = cookies()

  if (cookieStore.has("access_token") && cookieStore.has("refresh_token")) {
    //User is logged in and has both tokens; contact the API!
    return <div>You are logged in</div>
  }

  else if (!cookieStore.has("access_token") && cookieStore.has("refresh_token")) {
    //User is logged in but doesn't have access token; refresh the token!
    return <div>You need to refresh the token!</div>
  }

  else if (!cookieStore.has("refresh_token") && !cookieStore.has("access_token")) {
    //User is not logged in!
    return <WelcomeText />
  }

  else {
    //Something went wrong! Provably user tinkering; should delete the cookies and redirect to login
    return <WelcomeText />
  }
}
