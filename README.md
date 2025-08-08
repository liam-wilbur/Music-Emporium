## Music Emporium

A community emporium of ideas where anyone can share stream‑of‑consciousness experiences with music. Type an artist, an album, and your thoughts — the app fetches the album art and publishes your post to a live message board.

- Live site: `https://muemporium.com`

---

## Features
- **Create posts**: Enter album title, artist, and your thoughts; optionally add a display name.
- **Automatic album art**: Fetches cover art based on artist + album via the `album-art` package.
- **Real-time feed**: Posts persist in Firebase Firestore and render instantly to all users, sorted newest-first.
- **Reactions**: Like/dislike counters update live.
- **Responsive design**: Mobile-friendly layout.

---

## Tech stack
- **Frontend**: React, CSS + `woah.css`,
- **Backend**: Firebase (Firestore, Auth, Analytics)
- **Album art**: `album-art` (fetches cover art URLs from external services)

---

## How it works
1. User visits `Create Post` and enters:
   - `Title` (album title)
   - `Artist`
   - `Post` (free‑form text)
   - `User` (display name)
2. On submit, the app queries `album-art(artist, { album: title })`.
3. If found, the album art URL is saved alongside the post in Firestore with a server timestamp.
4. The `Music` page subscribes to Firestore and renders posts in reverse chronological order.
5. Users can read posts and click like/dislike.

---
