"use server"

import { cookies } from "next/headers";
import axios from "axios";
import Mosaic from "./mosaic";

export default async function Page({ params }: { params: { playlist_id: string } }) {
    const res = await axios.post(`http://localhost:3000/api/get-playlist`, { "access_token": cookies().get("access_token"), "playlist_id": params.playlist_id });

    const deserializedData = JSON.parse(res.data.serializedData);

    if (deserializedData != null) { }
    return (

        <div className="flex justify-center grid grid-cols-6">
            
                {deserializedData.tracks.items.map(
                    track => {
                        return (
                            <Mosaic key={track.track.id} track={track} />
                        )
                    }
                )}

        </div>
    )
}