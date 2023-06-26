'use server'
import { SpotifyPlaylist } from "../../api/playlist_interface";
import Image from "next/image";
import PlaylistButton from "./playlistButton";

type PlaylistBoxProps = {
    playlist: SpotifyPlaylist;
};

export default async function PlaylistBox({ playlist }: PlaylistBoxProps) {
    return (
        <div className="max-w-md max-h-sm basis-1/5">
            <div key={playlist.id} className="card w-sm bg-base-100 shadow-xl mx-2 my-2">
                <div className="card-body">
                    <div className="figure">
                        <Image src={playlist.images[0].url} width={200} height={200} alt="Picture of the author" />
                    </div>
                    <h2 className="">{playlist.name}</h2>
                    <h2 className="">{playlist.owner.display_name}</h2>
                    <div className="card-actions justify-center">
                        <PlaylistButton id={playlist.id} />
                    </div>
                </div>
            </div>
        </div>

    )
}