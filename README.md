# For You ♡ — a little digital world for Loraine

A private, interactive love-letter website: a 9-dot pattern lock, a scrolling
love letter, and a flip-through photo album.

## Run it locally

```bash
npm install
npm run dev
```

Then open the local URL it prints (usually `http://localhost:5173`).

To build a static, deployable version:

```bash
npm run build
npm run preview   # optional, to check the production build locally
```

The build output goes to `dist/` — you can drag that folder into any static
host (Netlify, Vercel, GitHub Pages, etc.) or open `dist/index.html` directly.

## The unlock pattern

The pattern lock combination is set in
`src/components/PatternLock/PatternLock.tsx`:

```ts
const CORRECT_PATTERN = [8, 4, 5, 6, 2, 1, 3, 7, 9];
```

Change that array to change the combination. Dots are numbered left-to-right,
top-to-bottom (1–9).

## Editing the love letter

All of the letter's text lives in `src/data/letter.ts` — the hero copy, each
scroll section (`letterSections`), and the closing line before the album.
Each section can optionally show a small sticker (`motif`) and can be aligned
`"left"`, `"right"`, or `"center"`.

## Editing the photo album

The album's pages live in `src/data/memories.ts`, as a simple ordered list.
Each entry is one page: `cover`, `photo`, `note`, `collage`, `blank`, or
`closing`. Add, remove, or reorder entries freely — the album adapts
automatically.

To add a real photo:

1. Drop the image file into `public/photos/` (e.g. `public/photos/photo-01.jpg`).
2. Reference it in `memories.ts`:
   ```ts
   { type: "photo", image: "/photos/photo-01.jpg", date: "June 14, 2025", caption: "our little adventure" }
   ```

Leave `image` out and a soft placeholder frame shows instead, so it's safe to
write captions and dates before you have the photo.

## Optional background music

If you'd like quiet background music, add an audio file at
`public/audio/ambient.mp3`. A small music note button will appear in the
corner automatically once a working file is detected — muted and off by
default, and only ever played if the person taps it. If no file is present,
the button simply doesn't appear.

## Project structure

```
src/
  components/
    PatternLock/     the entry pattern lock
    LoveLetter/       hero + scrolling letter sections + transition
    Album/            the flip-book photo album
    Decorations/      shared illustrations (peony, motifs, tape, hearts, petals)
  data/
    letter.ts         all love-letter text
    memories.ts        all album pages
  App.tsx             wires the three stages together
  index.css           theme colors, fonts, and global styles
```