import { motion } from "framer-motion";
import Motif from "../Decorations/Motif";
import Tape from "../Decorations/Tape";
import type { LetterSection as LetterSectionType } from "../../data/letter";

type Props = {
  section: LetterSectionType;
  index: number;
};

export default function LetterSection({ section, index }: Props) {
  const align = section.align ?? "left";
  const isRight = align === "right";
  const isCenter = align === "center";

  return (
    <section className="relative flex min-h-[70vh] w-full items-center justify-center px-6 py-20 md:py-28">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-15% 0px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className={`relative w-full max-w-xl ${
          isCenter ? "text-center" : isRight ? "ml-auto text-left" : "mr-auto text-left"
        }`}
      >
        {section.motif && (
          <div
            className={`absolute -top-10 ${isRight ? "-left-6 md:-left-14" : "-right-6 md:-right-14"} hidden md:block`}
          >
            <Tape rotate={isRight ? -8 : 8} />
            <Motif kind={section.motif} className="mt-1 h-14 w-14 opacity-90 md:h-16 md:w-16" />
          </div>
        )}

        {section.eyebrow && (
          <p className="font-hand text-xl text-rose/90 md:text-2xl">{section.eyebrow}</p>
        )}
        {section.heading && (
          <h2 className="mt-2 font-display text-3xl font-medium tracking-tight text-paper md:text-4xl">
            {section.heading}
          </h2>
        )}
        <div className="mt-5 space-y-4">
          {section.body.map((para, i) => (
            <p
              key={i}
              className="max-w-[62ch] text-[15px] leading-relaxed text-paper/80 md:text-base"
            >
              {para}
            </p>
          ))}
        </div>

        {section.motif && (
          <div className="mt-6 flex items-center gap-2 md:hidden">
            <Motif kind={section.motif} className="h-10 w-10 opacity-90" />
          </div>
        )}

        <span className="mt-8 block h-px w-16 bg-gradient-to-r from-rose-dust to-transparent" />
        <span className="mt-1 block font-hand text-sm text-rose/50">
          {String(index + 1).padStart(2, "0")}
        </span>
      </motion.div>
    </section>
  );
}