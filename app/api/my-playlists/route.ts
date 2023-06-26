import { NextRequest, NextResponse } from "next/server";
import self_playlists from "../../../api/self_playlists";
import { SpotifyData } from "../../../api/playlist_interface";

export async function POST(request: NextRequest, response: NextResponse) {
    const codeSent = await request.json()
    const a_token = codeSent.access_token.value
    if (!a_token) {
        return NextResponse.json("aaaa", { status: 500 })
    }
    const data = await self_playlists(a_token)
    const serializedData = JSON.stringify(data);;

    return NextResponse.json({ serializedData })

}