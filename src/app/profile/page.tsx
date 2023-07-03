"use server"

import axios from "axios";
import { cookies } from "next/headers";
import { SpotifyPlaylistData } from "../../spotify/playlist_interface";
import PlaylistsContainer from "../../components/profile/playlistsContainer";

export default async function Profile() {
    let data: SpotifyPlaylistData;
    
    try {
        const refreshing = await axios.post(`http://localhost:3000/api/refresh`, { "refresh_token": cookies().get("refresh_token") });
    }
    catch (e) {
    }

    console.log(cookies().getAll())
    const res = await axios.post(`http://localhost:3000/api/my-playlists`, { "access_token": cookies().get("access_token") });

    const deserializedData = JSON.parse(res.data.serializedData);

    if (deserializedData != null) { }
    return (
        <div>
            <div className=" text-center">
                <div>
                    <div className="flex flex-wrap flex-none justify-center">
                        <PlaylistsContainer playlists={deserializedData.items} />
                    </div>
                </div>
            </div>
        </div>)
}