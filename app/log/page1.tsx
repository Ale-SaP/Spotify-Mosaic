'use server'
import authorize_code from "../../api/authorize_code";
import { cookies } from 'next/headers'

export default async function Log({ searchParams }) {
    const cookieStore = cookies()
    const Codes = authorize_code(searchParams["code"]);
    if (Codes[0] != 0) {

        cookies().set({
            name: 'access_token',
            value: Codes[1],
            httpOnly: false,
            expires: Codes[0]
        })

        cookies().set({
            name: 'refresh_token',
            value: Codes[2],
            httpOnly: false,
            expires: 86400
        })


        return (
            <div className="hero min-h-screen bg-base-200">
                <div className="hero-content text-center">
                    <div className="max-w-md">
                        <h1 className="text-5xl font-bold">Hello there</h1>
                        <p className="py-6">Wait till we log you in!</p>
                    </div>
                </div>
            </div>
        );
    }
    else {
        return (
            <div className="hero min-h-screen bg-base-200">
            <div className="hero-content text-center">
                <div className="max-w-md">
                    <h1 className="text-5xl font-bold">Hello there</h1>
                    <p className="py-6">Some kind of error happened!</p>
                </div>
            </div>
        </div>
        )
    }
}