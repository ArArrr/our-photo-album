import Motif, { type MotifKind } from "../Decorations/Motif";
import Tape from "../Decorations/Tape";

type Props = {
  title?: string;
  caption?: string;
  motif?: MotifKind;
};

export default function NoteCard({ title, caption, motif }: Props) {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-4 px-8 text-center">
      <div className="relative w-full max-w-[240px] rounded-[3px] bg-blush-light/90 p-5 shadow-[0_10px_24px_-10px_rgba(0,0,0,0.45)]">
        <Tape className="absolute -top-3 left-1/2 -translate-x-1/2" rotate={-4} />
        {title && <p className="font-hand text-xl text-plum">{title}</p>}
        {caption && <p className="mt-2 font-hand text-lg leading-snug text-plum/80">{caption}</p>}
      </div>
      {motif && <Motif kind={motif} className="h-12 w-12 opacity-90" />}
    </div>
  );
}