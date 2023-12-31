import axios from 'axios';
import { SpotifyPlaylistData } from './playlist_interface';

export default async function self_playlists(token: string): Promise<SpotifyPlaylistData | null> {
  const url = 'https://api.spotify.com/v1/me/playlists';
  const headers = {
    Authorization: `Bearer ${token}`,
  };

  try {
    const response = await axios.get(url, { headers });
    return response.data;
  } catch (error) {
    // Handle the error
    console.log("whoops");
    return null;
  }
};
