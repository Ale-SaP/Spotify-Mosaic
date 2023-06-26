"use server"

import axios from "axios";
import { cookies } from "next/headers";
import { SpotifyPlaylistData } from "../../api/playlist_interface";
import Image from "next/image";
import PlaylistBox from "./playlistBox";

export default async function Profile() {
    let data: SpotifyPlaylistData;
    const res = await axios.post(`http://localhost:3000/api/my-playlists`, { "access_token": cookies().get("access_token") });

    const deserializedData = JSON.parse(res.data.serializedData);
    //console.log(deserializedData.items[0]);

    if (deserializedData != null) { }
    return (
        <div>
            <div className="hero min-h-screen bg-base-200">
                <div className="hero-content text-center">
                    <div>
                        <div className="flex flex-wrap flex-none justify-center">
                            {deserializedData.items.map((playlist) => (
                                <PlaylistBox key={playlist.id} playlist={playlist} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>)
}