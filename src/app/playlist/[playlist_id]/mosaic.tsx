"use client"

import { SpotifyPlaylistTrack } from "../../../../spotify/playlist_interface"
import Image from "next/image"

export default function Mosaic({ track }: { track: SpotifyPlaylistTrack }) {
    return (
        <div>
            <Image src={track.track.album.images[0].url} width={150} height={150} alt="Picture of the author" />
        </div>
    )
}