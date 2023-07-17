"server-strict"

import { cookies } from "next/headers";
import axios from "axios";
import Mosaic from "./mosaic";

export default async function Page({ params }: { params: { playlist_id: string } }) {
    if ((cookies().get("access_token") == null) && cookies().get("refresh_token") != null) {
        try {
            const refreshing = await axios.post(`http://localhost:3000/api/refresh`, { "refresh_token": cookies().get("refresh_token") });
        }
        catch (e) {
        }
    }

    const res = await axios.post(`http://localhost:3000/api/get-playlist`,
        { "access_token": cookies().get("access_token"), "playlist_id": params.playlist_id });

    const deserializedData = JSON.parse(res.data.serializedData);

    if (deserializedData == null) {
        return (
            <div>Whoops! An error occured</div>
        )
    }
    return (
        <>
        <div className="grid grid-cols-7 mx-auto">
            {deserializedData.tracks.items.map(
                track => {
                    return (
                        <Mosaic key={track.track.id} track={track} />
                    )
                }
            )}

        </div>
        </>
    )
}