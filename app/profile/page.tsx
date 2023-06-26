"use server"

import axios from "axios";
import { cookies } from "next/headers";
import { SpotifyData } from "../../api/playlist_interface";
import Image from "next/image";

export default async function Profile() {
    let data: SpotifyData;
    const res = await axios.post(`http://localhost:3000/api/my-playlists`, { "access_token": cookies().get("access_token") });

    const deserializedData = JSON.parse(res.data.serializedData);

    if (deserializedData != null) { }
    return (
        <div>
            <div className="hero min-h-screen bg-base-200">
                <div className="hero-content text-center">
                    <div className="max-w-md">
                        <h1 className="text-5xl font-bold">Hello there</h1>
                        <p className="py-6">You are logged in!</p>
                        {deserializedData.items.map((playlist) => (
                            <div>
                                <p key={playlist.id}>{playlist.name}</p>
                            </div>))}
                    </div>
                </div>
            </div>
        </div>)
}