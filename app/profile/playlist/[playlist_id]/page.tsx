"use server"

import { cookies } from "next/headers";
import axios from "axios";
import { SpotifyPlaylist, SpotifyPlaylistData } from "../../../../api/playlist_interface";
import PlaylistsContainer from "../../playlistsContainer";
import Image from "next/image";

export default async function Page({ params }: { params: { playlist_id: string } })  {
    const res = await axios.post(`http://localhost:3000/api/get-playlist`, { "access_token": cookies().get("access_token"), "playlist_id": params.playlist_id });

    const deserializedData = JSON.parse(res.data.serializedData);

    if (deserializedData != null) {}
    return (
        <div>
            {deserializedData.tracks.items.map(
                track => {
                    return (
                        <div>
                            <Image src={track.track.album.images[0].url} alt="aaa" width={150} height={150}/>
                        </div>
                    )
                }
            )}
        </div>
    )
}