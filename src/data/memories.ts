// ─────────────────────────────────────────────────────────
// EDIT ME: this is the photo album.
//
// To add a real memory, drop a photo into /public/photos
// (e.g. /public/photos/photo-01.jpg) and reference it below
// as `image: "/photos/photo-01.jpg"`. Leave `image` out and
// a soft placeholder frame will show instead — so it's safe
// to fill in dates and captions before you have the photo.
//
// Page types:
//   "cover"   — a title page, no photo
//   "photo"   — a single photo, with optional date + caption
//   "note"    — a handwritten-style note card, no photo
//   "collage" — two photos on one page
//   "blank"   — an intentionally empty page for a future memory
//   "closing" — the final page
//
// `motif` (optional) adds a tiny sticker. Options:
//   "sushi" | "chocolate" | "camera" | "salmon" | "liempo" |
//   "pichi" | "dress" | "peony"
// ─────────────────────────────────────────────────────────

import type { MotifKind } from "../components/Decorations/Motif";

export type Memory =
  | { type: "cover"; title: string; caption?: string }
  | { type: "photo"; image?: string; date?: string; caption?: string; motif?: MotifKind }
  | { type: "note"; title?: string; caption?: string; motif?: MotifKind }
  | {
      type: "collage";
      image?: string;
      image2?: string;
      date?: string;
      caption?: string;
      caption2?: string;
      motif?: MotifKind;
    }
  | { type: "blank"; prompt?: string }
  | { type: "closing"; title: string; caption?: string };

export const memories: Memory[] = [
  {
    type: "cover",
    title: "Loraine's Album",
    caption: "A few of the moments I kept, and a lot of room for the ones still coming.",
  },
  {
    type: "photo",
    date: "someday",
    caption: "add your first photo here",
    motif: "camera",
  },
  {
    type: "note",
    title: "the sushi night",
    caption: "you ordered enough for four people and still finished mine, too.",
    motif: "sushi",
  },
  {
    type: "collage",
    caption: "salmon sashimi, again",
    caption2: "the pichi-pichi you wouldn't share",
    motif: "salmon",
  },
  {
    type: "blank",
    prompt: "a memory waiting to happen...",
  },
  {
    type: "photo",
    date: "",
    caption: "the pink dress day",
    motif: "dress",
  },
  {
    type: "note",
    title: "liempo, obviously",
    caption: "you said it was the best you've ever had. you say that every time.",
    motif: "liempo",
  },
  {
    type: "blank",
    prompt: "put our next adventure here.",
  },
  {
    type: "photo",
    date: "",
    caption: "a peony for you",
    motif: "peony",
  },
  {
    type: "note",
    title: "a small chocolate wrapper",
    caption: "kept because it \"looked cute.\" i know. i kept it too.",
    motif: "chocolate",
  },
  {
    type: "blank",
    prompt: "reserved for us.",
  },
  {
    type: "blank",
    prompt: "this page is still waiting for us.",
  },
  {
    type: "closing",
    title: "This book isn't finished.",
    caption: "Because neither are we. There are still so many pages left.",
  },
];