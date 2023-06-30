'use server'

import { SpotifyPlaylist } from "../../api/playlist_interface";
import PlaylistBox from "./playlistBox";

type containerProps = {
    playlists: SpotifyPlaylist[];
};

export default async function PlaylistsContainer({ playlists }: containerProps) {

    return (
        <>
            {playlists.map((playlist) => (
                <PlaylistBox key={playlist.id} playlist={playlist} />
            ))}
        </>
    )
}