import { motion } from "framer-motion";
import Peony from "../Decorations/Peony";
import { transitionCopy } from "../../data/letter";

type Props = {
  onContinue: () => void;
};

export default function TransitionToAlbum({ onContinue }: Props) {
  return (
    <section className="relative flex min-h-[80vh] flex-col items-center justify-center overflow-hidden bg-ink px-6 text-center">
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[480px] w-[480px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-20 blur-[120px]"
        style={{ background: "radial-gradient(circle, #e83d7a, transparent 70%)" }}
      />
      <Peony className="absolute bottom-10 left-8 h-16 w-16 opacity-25 md:h-24 md:w-24" />
      <Peony variant="white" className="absolute right-8 top-10 h-14 w-14 opacity-25 md:h-20 md:w-20" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-20% 0px" }}
        transition={{ duration: 0.9, ease: "easeOut" }}
        className="relative z-10 space-y-3"
      >
        {transitionCopy.lines.map((line) => (
          <p key={line} className="font-display text-xl italic text-rose md:text-2xl">
            {line}
          </p>
        ))}
      </motion.div>

      <motion.button
        onClick={onContinue}
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.4 }}
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.97 }}
        className="relative z-10 mt-10 rounded-full border border-rose/40 bg-plum-light/60 px-8 py-3 font-hand text-2xl text-blush shadow-[0_0_30px_-8px_rgba(232,61,122,0.6)] backdrop-blur"
      >
        {transitionCopy.cta}
      </motion.button>
    </section>
  );
}