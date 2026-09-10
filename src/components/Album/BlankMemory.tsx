import Tape from "../Decorations/Tape";
import Heart from "../Decorations/Heart";

type Props = {
  prompt?: string;
};

export default function BlankMemory({ prompt = "A memory waiting to happen..." }: Props) {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center px-6 text-center">
      <Tape className="mb-3" rotate={-6} color="#c98a95" />
      <div className="flex h-40 w-52 flex-col items-center justify-center gap-3 rounded-[2px] border border-dashed border-plum/25 sm:h-44 sm:w-60">
        <Heart className="h-5 w-5 opacity-30" fill="#a86b78" />
        <p className="font-hand text-lg text-plum/50">this page is waiting</p>
        <p className="font-hand text-lg text-plum/50">for us</p>
      </div>
      <p className="mt-5 font-hand text-xl text-plum/70">{prompt}</p>
      <span className="mt-1 block h-px w-10 bg-plum/20" />
      <p className="mt-2 text-[11px] italic text-plum/40">add a memory someday ♡</p>
    </div>
  );
}