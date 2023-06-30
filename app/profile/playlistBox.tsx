'use server'
import { SpotifyPlaylist } from "../../api/playlist_interface";
import Image from "next/image";
import PlaylistButton from "./playlistButton";
import PlaylistText from "./playlistText";

type PlaylistBoxProps = {
    playlist: SpotifyPlaylist;
};

export default async function PlaylistBox({ playlist }: PlaylistBoxProps) {
    return (
        <div className="max-w-md max-h-sm basis-1/5">
            <div key={playlist.id} className="card card-compact w-sm bg-zinc-950 shadow-xl mx-1 my-1">
                <div className="card-body">
                    <div className="figure">
                        <Image src={playlist.images[0].url} width={200} height={200} alt="Picture of the author" />
                    </div>
                    <PlaylistButton component={<PlaylistText  text={playlist.name} />} id={playlist.id}/>
                    <h2 className="font-sans font-thin italic">{playlist.owner.display_name}</h2>
                    <div className="card-actions justify-center">
                    </div>
                </div>
            </div>
        </div>

    )
}