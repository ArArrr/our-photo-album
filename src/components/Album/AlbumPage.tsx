import type { Memory } from "../../data/memories";
import PhotoFrame from "./PhotoFrame";
import BlankMemory from "./BlankMemory";
import NoteCard from "./NoteCard";
import CollagePage from "./CollagePage";
import Peony from "../Decorations/Peony";
import Motif from "../Decorations/Motif";

type Props = {
  memory: Memory;
  pageNumber: number;
};

export default function AlbumPage({ memory, pageNumber }: Props) {
  return (
    <div className="relative flex h-full w-full flex-col items-center justify-center bg-paper">
      <PageBody memory={memory} />
      {memory.type !== "cover" && (
        <span className="absolute bottom-3 right-4 font-hand text-sm text-plum/35">
          {pageNumber}
        </span>
      )}
    </div>
  );
}

function PageBody({ memory }: { memory: Memory }) {
  switch (memory.type) {
    case "cover":
      return (
        <div className="flex h-full w-full flex-col items-center justify-center gap-4 px-8 text-center">
          <Peony className="h-16 w-16" />
          <h3 className="font-display text-2xl italic text-plum">{memory.title}</h3>
          {memory.caption && (
            <p className="max-w-[26ch] font-hand text-lg text-plum/60">{memory.caption}</p>
          )}
        </div>
      );
    case "photo":
      return (
        <div className="flex h-full w-full items-center justify-center">
          <div className="scale-[0.78] sm:scale-100">
            <PhotoFrame image={memory.image} date={memory.date} caption={memory.caption} />
          </div>
          {memory.motif && (
            <Motif
              kind={memory.motif}
              className="absolute bottom-6 right-6 h-9 w-9 opacity-90 sm:bottom-8 sm:right-8"
            />
          )}
        </div>
      );
    case "note":
      return <NoteCard title={memory.title} caption={memory.caption} motif={memory.motif} />;
    case "collage":
      return (
        <CollagePage
          image={memory.image}
          image2={memory.image2}
          date={memory.date}
          caption={memory.caption}
          caption2={memory.caption2}
          motif={memory.motif}
        />
      );
    case "blank":
      return <BlankMemory prompt={memory.prompt} />;
    case "closing":
      return (
        <div className="flex h-full w-full flex-col items-center justify-center gap-4 px-8 text-center">
          <Peony variant="white" className="h-14 w-14" />
          <h3 className="font-display text-2xl italic text-plum">{memory.title}</h3>
          {memory.caption && (
            <p className="max-w-[28ch] font-hand text-lg leading-snug text-plum/70">
              {memory.caption}
            </p>
          )}
          <span className="mt-1 text-rose">♡</span>
        </div>
      );
    default:
      return null;
  }
}