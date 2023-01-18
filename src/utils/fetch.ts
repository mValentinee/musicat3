import { PlaylistResponse, PlaylistRefactored } from "../types";
import { z } from "zod";
import { TRPCError } from "@trpc/server";

// header options
const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "55b9fe8337mshc0ef62c754536fdp12ececjsn0db06744573e",
    "X-RapidAPI-Host": "soundcloud-scraper.p.rapidapi.com",
  },
};

// soundcloud Scraper API From RapidAPI
const SoundCloud_Scraper_API_Playlist_URL =
  "https://soundcloud-scraper.p.rapidapi.com/v1/playlist/tracks?playlist=https%3A%2F%2Fsoundcloud.com";
// playlist ID(s)
const RECENTLY_ADDED_PLAYLIST_ID = "%2Fv-val-1%2Fsets%2Fmusicarecentlyadded";
const RECOMMENDED_PLAYLIST_ID =
  "%2Fhotsince-82%2Fsets%2Fknee-deep-in-november-2";
// fetch playlist function includes refactoring playlist response
export const fetch_PLAYLIST = async () => {
  try {
    // fetch playlist data
    const recentlyAdded = await fetch(
      `${SoundCloud_Scraper_API_Playlist_URL}${RECENTLY_ADDED_PLAYLIST_ID}`,
      options
    );
    const recommended = await fetch(
      `${SoundCloud_Scraper_API_Playlist_URL}${RECOMMENDED_PLAYLIST_ID}`,
      options
    );

    // jsonify playlist data as PlaylistResponse
    const recentlyAddedJson = await recentlyAdded.json() satisfies PlaylistResponse;
    const recommendedJson = await recommended.json() satisfies PlaylistResponse;

    // function to refactor playlist response to only include necessary data matching PlaylistRefactored

    const refactorPlaylist = async  (playlist: PlaylistResponse)=> {
      // refactor playlist response
      const refactoredPlaylist = await {
        playlistID: playlist.id,

        tracks: playlist.tracks.items.map((track) => ({
          id: track.id,
          permalink: track.permalink,
          title: track.title,
          artworkUrl: track.artworkUrl,
          waveformUrl: track.waveformUrl,
          stationPermalink: track.stationPermalink,
        })),
      };
      // return refactored playlist
      return refactoredPlaylist satisfies PlaylistRefactored;
    };
    // refactor playlists as PlaylistRefactored
    const recentlyAddedRefactored = refactorPlaylist(recentlyAddedJson) satisfies PlaylistRefactored;
    const recommendedRefactored = refactorPlaylist(recommendedJson) satisfies PlaylistRefactored;
    // return refactored playlists
    return [recentlyAddedRefactored, recommendedRefactored];
  } catch (err) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      cause: err
    });
  }
};
