import { z } from "zod";

// zod schema for playlist response that comes from soundcloud scraper api
const PlaylistResponse = z.object({
  status: z.boolean(),
  type: z.literal("playlist"),
  id: z.number(),
  permalinkUrl: z.string(),
  tracks: z.object({
    nextOffset: z.number(),
    items: z.array(
      z.object({
        type: z.literal("track"),
        id: z.number(),
        permalink: z.string(),
        createdAt: z.string(),
        lastModified: z.string(),
        title: z.string(),
        caption: z.string(),
        description: z.string(),
        goPlus: z.boolean(),
        durationMs: z.number(),
        durationText: z.string(),
        artworkUrl: z.string(),
        releaseDate: z.string(),
        genre: z.string(),
        labelName: z.string(),
        license: z.string(),
        purchaseTitle: z.string(),
        purchaseUrl: z.string(),
        commentable: z.boolean(),
        commentCount: z.number(),
        likeCount: z.number(),
        playCount: z.number(),
        repostCount: z.number(),
        waveformUrl: z.string(),
        stationPermalink: z.string(),
        visuals: z.array(
          z.object({
            url: z.string(),
            entryTime: z.number(),
          })
        ),
        publisher: z.object({
          albumTitle: z.string(),
          artist: z.string(),
          writerComposer: z.string(),
          upcOrEan: z.string(),
          isrc: z.string(),
          pLine: z.string(),
          cLine: z.string(),
        }),
        tags: z.array(z.string()),
        user: z.object({
          type: z.literal("user"),
          id: z.number(),
          permalink: z.string(),
          lastModified: z.string(),
          name: z.string(),
          avatarUrl: z.string(),
          followerCount: z.number(),
          city: z.string(),
          countryCode: z.string(),
          verified: z.boolean(),
          pro: z.boolean(),
          proUnlimited: z.boolean(),
          stationPermalink: z.string(),
        }),
      })
    ),
  }),
});

// zod schema for refactored playlist response
const PlaylistRefactored = z.object({
  // id: z.number(),
  // playlistName: z.string(),
  playlistID: z.number(),
  tracks: z.array(
    z.object({
      id: z.number(),
      permalink: z.string(),
      title: z.string(),
      artworkUrl: z.string(),
      waveformUrl: z.string(),
      stationPermalink: z.string(),
    })
  ),
});

// function to refactor playlist response
export const refactorPlaylist = async (playlist: PlaylistResponse) => {
  // refactor playlist response
  const refactoredPlaylist =  {
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

export type PlaylistResponse = z.infer<typeof PlaylistResponse>;
export type PlaylistRefactored = z.infer<typeof PlaylistRefactored>;
