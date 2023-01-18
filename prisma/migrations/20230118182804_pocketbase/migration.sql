-- CreateTable
CREATE TABLE "Playlist" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "playlistID" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "Track" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "playlistID" INTEGER NOT NULL,
    "permalink" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "artworkUrl" TEXT NOT NULL,
    "waveformUrl" TEXT NOT NULL,
    "stationPermalink" TEXT NOT NULL,
    CONSTRAINT "Track_playlistID_fkey" FOREIGN KEY ("playlistID") REFERENCES "Playlist" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
