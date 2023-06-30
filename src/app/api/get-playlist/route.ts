import { NextRequest, NextResponse } from "next/server";
import get_playlist from "../../../spotify/get_playlist";

export async function POST(request: NextRequest, response: NextResponse) {
    const codeSent = await request.json()
    const a_token = codeSent.access_token.value
    const playlist_id = codeSent.playlist_id
    if (!a_token || !playlist_id ) {
        return NextResponse.json("aaaa", { status: 500 })
    }
    const data = await get_playlist(a_token, playlist_id)
    const serializedData = JSON.stringify(data);

    return NextResponse.json({ serializedData })

}