// ─────────────────────────────────────────────────────────
// EDIT ME: this is the actual text of the love letter.
// Each entry becomes one scroll-reveal section.
// `motif` (optional) places a small decorative sticker
// next to that section. Options: "sushi" | "chocolate" |
// "camera" | "salmon" | "liempo" | "pichi" | "dress" | "peony"
// ─────────────────────────────────────────────────────────

export type LetterSection = {
  id: string;
  eyebrow?: string;
  heading?: string;
  body: string[];
  motif?: "sushi" | "chocolate" | "camera" | "salmon" | "liempo" | "pichi" | "dress" | "peony";
  align?: "left" | "right" | "center";
};

export const letterSections: LetterSection[] = [
  {
    id: "everyday",
    eyebrow: "for the little moments",
    heading: "The ordinary Tuesdays.",
    body: [
      "Nobody writes songs about the ordinary Tuesdays, but that's where most of us actually happened — texting about nothing, falling asleep on a call, you sending me a photo of your food before you even take a bite.",
      "I never want to forget how easy it is to just exist next to you.",
    ],
    align: "left",
  },
  {
    id: "food",
    eyebrow: "for the food dates",
    heading: "Every table we've shared.",
    body: [
      "Sushi on a night we said we'd take it easy. Salmon sashimi you always order like it's a formality, not a decision. Pork liempo that you insist is better than anything I've ever had — and honestly, you might be right.",
      "I remember meals by who I was with, not what I ate. Every one of these has your voice attached to it.",
    ],
    motif: "sushi",
    align: "right",
  },
  {
    id: "sweet",
    eyebrow: "for the silly ones",
    heading: "The small, ridiculous joys.",
    body: [
      "A chocolate wrapper you kept because it 'looked cute.' Pichi-pichi eaten straight out of the container, no plates, no shame. The way you laugh at your own jokes before you've even finished telling them.",
      "These are the things I'd never think to write down on purpose. So I built a place that remembers them for me.",
    ],
    motif: "chocolate",
    align: "left",
  },
  {
    id: "camera",
    eyebrow: "for the days I want to remember",
    heading: "Every photo I didn't delete.",
    body: [
      "I take too many pictures of you and you always ask why. This is why. Because someday 'right now' will be a memory, and I want as much proof of it as I can carry.",
      "Turn the page after this and you'll see some of them — the ones worth keeping, and a few pages left open for the ones we haven't taken yet.",
    ],
    motif: "camera",
    align: "right",
  },
  {
    id: "future",
    eyebrow: "and for all the ones still waiting to happen",
    heading: "Everything we haven't done yet.",
    body: [
      "You in that pink dress at some event I haven't planned yet. A trip we keep saying 'someday' about. A hundred more ordinary Tuesdays that will somehow never feel ordinary because you're in them.",
      "I'm not trying to hold onto what we had. I'm trying to make room for what's next.",
    ],
    motif: "dress",
    align: "left",
  },
];

export const heroCopy = {
  kicker: "for loraine",
  title: "For You ♡",
  lines: [
    "I made a little place",
    "for all the things",
    "I never want to forget.",
  ],
  instruction: "Scroll slowly.",
};

export const transitionCopy = {
  lines: ["But a letter can only remember so much...", "So I kept the moments too."],
  cta: "Turn the page ♡",
};