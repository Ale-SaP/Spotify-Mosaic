"server-strict"

import { cookies } from "next/headers";
import WelcomeText from "../../components/home/welcomeText";
export default async function Home() {
  if (cookies().get("access_token") && cookies().get("refresh_token")) {
    return (
      <div className="flex flex-col items-start justify-start h-screen p-8">
        <h1 className="text-4xl font-bold text-white mb-8">Welcome, User!</h1>
        <div className="max-w-md bg-white rounded-lg shadow-lg p-6">
          <p className="text-gray-800 mb-4">Here is your personalized content.</p>
          <ul className="list-disc list-inside">
            <li className="text-gray-800">Item 1</li>
            <li className="text-gray-800">Item 2</li>
            <li className="text-gray-800">Item 3</li>
          </ul>
        </div>
      </div>
    )
  }
  return (
    <div>
      <WelcomeText />
    </div>
  );
}