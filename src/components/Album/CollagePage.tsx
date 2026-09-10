import PhotoFrame from "./PhotoFrame";
import Motif, { type MotifKind } from "../Decorations/Motif";

type Props = {
  image?: string;
  image2?: string;
  date?: string;
  caption?: string;
  caption2?: string;
  motif?: MotifKind;
};

export default function CollagePage({ image, image2, date, caption, caption2, motif }: Props) {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-3 px-4">
      <div className="scale-[0.62] sm:scale-75">
        <PhotoFrame image={image} date={date} caption={caption} rotate={-6} />
      </div>
      <div className="-mt-10 scale-[0.62] self-end sm:scale-75">
        <PhotoFrame image={image2} caption={caption2} rotate={5} />
      </div>
      {motif && <Motif kind={motif} className="mt-1 h-10 w-10 opacity-90" />}
    </div>
  );
}