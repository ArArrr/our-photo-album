import Heart from "../Decorations/Heart";

type Props = {
  image?: string;
  date?: string;
  caption?: string;
  rotate?: number;
  alt?: string;
};

export default function PhotoFrame({ image, date, caption, rotate = -2, alt }: Props) {
  return (
    <div
      className="inline-block rounded-[2px] bg-paper p-2.5 pb-6 shadow-[0_14px_30px_-10px_rgba(0,0,0,0.55)]"
      style={{ transform: `rotate(${rotate}deg)` }}
    >
      <div className="relative flex h-40 w-52 items-center justify-center overflow-hidden bg-gradient-to-br from-blush-light to-rose-dust/70 sm:h-44 sm:w-60">
        {image ? (
          <img src={image} alt={alt ?? caption ?? "a memory"} className="h-full w-full object-cover" />
        ) : (
          <div className="flex flex-col items-center gap-2 text-plum/70">
            <Heart className="h-6 w-6 opacity-60" fill="#a86b78" />
            <span className="font-hand text-lg">our memory</span>
            <span className="text-[10px] uppercase tracking-[0.15em] text-plum/50">
              photo goes here
            </span>
          </div>
        )}
      </div>
      {(date || caption) && (
        <div className="mt-2 px-1 text-center">
          {date && <p className="font-hand text-base text-plum/70">{date}</p>}
          {caption && <p className="text-xs italic text-plum/60">"{caption}"</p>}
        </div>
      )}
    </div>
  );
}