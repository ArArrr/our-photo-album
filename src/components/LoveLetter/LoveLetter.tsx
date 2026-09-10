import { forwardRef } from "react";
import Hero from "./Hero";
import LetterSection from "./LetterSection";
import TransitionToAlbum from "./TransitionToAlbum";
import { letterSections } from "../../data/letter";

type Props = {
  onContinueToAlbum: () => void;
};

const LoveLetter = forwardRef<HTMLDivElement, Props>(function LoveLetter(
  { onContinueToAlbum },
  ref
) {
  return (
    <div ref={ref} className="relative bg-ink">
      <Hero />
      <div className="relative mx-auto max-w-4xl">
        {letterSections.map((section, i) => (
          <LetterSection key={section.id} section={section} index={i} />
        ))}
      </div>
      <TransitionToAlbum onContinue={onContinueToAlbum} />
    </div>
  );
});

export default LoveLetter;