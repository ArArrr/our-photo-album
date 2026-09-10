import { motion, useReducedMotion } from "framer-motion";
import { useMemo } from "react";

type Props = {
  count?: number;
  className?: string;
};

export default function FloatingPetals({ count = 8, className = "" }: Props) {
  const reduceMotion = useReducedMotion();

  const petals = useMemo(
    () =>
      Array.from({ length: count }).map((_, i) => ({
        id: i,
        left: Math.round(Math.random() * 100),
        delay: Math.random() * 8,
        duration: 14 + Math.random() * 10,
        size: 10 + Math.random() * 10,
        drift: Math.random() * 60 - 30,
      })),
    [count]
  );

  if (reduceMotion) return null;

  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`} aria-hidden="true">
      {petals.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: `${p.left}%`,
            top: "-5%",
            width: p.size,
            height: p.size,
            background: "radial-gradient(circle at 30% 30%, #f3d6da, #c98a95)",
            opacity: 0.5,
          }}
          animate={{
            y: ["0vh", "110vh"],
            x: [0, p.drift],
            opacity: [0, 0.6, 0.6, 0],
            rotate: [0, 180],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
}