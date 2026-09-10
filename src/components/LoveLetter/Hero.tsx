import { motion } from "framer-motion";
import FloatingPetals from "../Decorations/FloatingPetals";
import Peony from "../Decorations/Peony";
import { heroCopy } from "../../data/letter";

export default function Hero() {
  return (
    <section className="relative flex min-h-dvh flex-col items-center justify-center overflow-hidden bg-ink px-6 text-center">
      <FloatingPetals count={7} />
      <div
        className="pointer-events-none absolute left-1/2 top-1/3 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-25 blur-[130px]"
        style={{ background: "radial-gradient(circle, #e83d7a, transparent 70%)" }}
      />

      <Peony className="absolute left-4 top-10 h-14 w-14 opacity-30 md:left-16 md:h-24 md:w-24" />
      <Peony variant="white" className="absolute bottom-16 right-6 h-16 w-16 opacity-25 md:right-20 md:h-28 md:w-28" />

      <motion.p
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: "easeOut" }}
        className="font-hand text-2xl text-blush md:text-3xl"
      >
        {heroCopy.kicker}
      </motion.p>

      <motion.h1
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.15, ease: "easeOut" }}
        className="glow-text mt-2 font-display text-5xl font-medium tracking-tight text-paper md:text-7xl"
      >
        {heroCopy.title}
      </motion.h1>

      <div className="mt-8 space-y-1">
        {heroCopy.lines.map((line, i) => (
          <motion.p
            key={line}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 + i * 0.15, ease: "easeOut" }}
            className="font-display text-xl italic text-rose md:text-2xl"
          >
            {line}
          </motion.p>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.2 }}
        className="absolute bottom-12 flex flex-col items-center gap-3"
      >
        <span className="font-hand text-lg text-rose/80">{heroCopy.instruction}</span>
        <motion.span
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="block h-8 w-px bg-gradient-to-b from-rose to-transparent"
        />
      </motion.div>
    </section>
  );
}