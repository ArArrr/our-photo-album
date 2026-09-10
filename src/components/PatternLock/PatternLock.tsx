import { useCallback, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Peony from "../Decorations/Peony";

const CORRECT_PATTERN = [8, 4, 5, 6, 2, 1, 3, 7, 9];
const GRID = [1, 2, 3, 4, 5, 6, 7, 8, 9];
const SIZE = 300; // svg viewbox size
const PAD = 42;
const STEP = (SIZE - PAD * 2) / 2;

function dotPosition(n: number) {
  const idx = n - 1;
  const col = idx % 3;
  const row = Math.floor(idx / 3);
  return { x: PAD + col * STEP, y: PAD + row * STEP };
}

type Props = {
  onUnlock: () => void;
};

export default function PatternLock({ onUnlock }: Props) {
  const [path, setPath] = useState<number[]>([]);
  const [dragging, setDragging] = useState(false);
  const [pointer, setPointer] = useState<{ x: number; y: number } | null>(null);
  const [status, setStatus] = useState<"idle" | "error" | "success">("idle");
  const svgRef = useRef<SVGSVGElement | null>(null);

  const toLocal = useCallback((clientX: number, clientY: number) => {
    const svg = svgRef.current;
    if (!svg) return { x: 0, y: 0 };
    const rect = svg.getBoundingClientRect();
    const x = ((clientX - rect.left) / rect.width) * SIZE;
    const y = ((clientY - rect.top) / rect.height) * SIZE;
    return { x, y };
  }, []);

  const hitTest = useCallback((x: number, y: number) => {
    for (const n of GRID) {
      const p = dotPosition(n);
      const dist = Math.hypot(p.x - x, p.y - y);
      if (dist < 26) return n;
    }
    return null;
  }, []);

  const addDot = useCallback((n: number) => {
    setPath((prev) => (prev.includes(n) ? prev : [...prev, n]));
  }, []);

  const reset = useCallback(() => {
    setPath([]);
    setStatus("idle");
  }, []);

  const handleStart = useCallback(
    (clientX: number, clientY: number) => {
      if (status === "success") return;
      const { x, y } = toLocal(clientX, clientY);
      const hit = hitTest(x, y);
      setDragging(true);
      setStatus("idle");
      setPointer({ x, y });
      if (hit) {
        setPath([hit]);
      } else {
        setPath([]);
      }
    },
    [hitTest, toLocal, status]
  );

  const handleMove = useCallback(
    (clientX: number, clientY: number) => {
      if (!dragging || status === "success") return;
      const { x, y } = toLocal(clientX, clientY);
      setPointer({ x, y });
      const hit = hitTest(x, y);
      if (hit) addDot(hit);
    },
    [dragging, hitTest, toLocal, addDot, status]
  );

  const handleEnd = useCallback(() => {
    if (!dragging) return;
    setDragging(false);
    setPointer(null);

    setPath((current) => {
      if (current.length === 0) return current;
      const isCorrect =
        current.length === CORRECT_PATTERN.length &&
        current.every((v, i) => v === CORRECT_PATTERN[i]);

      if (isCorrect) {
        setStatus("success");
        window.setTimeout(() => onUnlock(), 1300);
      } else {
        setStatus("error");
        window.setTimeout(() => {
          setPath([]);
          setStatus("idle");
        }, 650);
      }
      return current;
    });
  }, [dragging, onUnlock]);

  useEffect(() => {
    const move = (e: PointerEvent) => handleMove(e.clientX, e.clientY);
    const up = () => handleEnd();
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", up);
    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);
    };
  }, [handleMove, handleEnd]);

  const lineColor =
    status === "error" ? "#7a2338" : status === "success" ? "#ffdce6" : "#e83d7a";

  const points = path.map(dotPosition);
  const linePoints = [...points];
  if (dragging && pointer && status === "idle") linePoints.push(pointer);

  const polyline = linePoints.map((p) => `${p.x},${p.y}`).join(" ");

  return (
    <div className="relative flex min-h-dvh w-full flex-col items-center justify-center overflow-hidden bg-ink px-6 py-16 grain">
      {/* ambient glow */}
      <div
        className="pointer-events-none absolute -top-40 left-1/2 h-[560px] w-[560px] -translate-x-1/2 rounded-full opacity-30 blur-[120px]"
        style={{ background: "radial-gradient(circle, #e83d7a, transparent 70%)" }}
      />
      <div
        className="pointer-events-none absolute bottom-[-200px] right-[-100px] h-[420px] w-[420px] rounded-full opacity-20 blur-[110px]"
        style={{ background: "radial-gradient(circle, #c98a95, transparent 70%)" }}
      />

      <Peony className="absolute left-6 top-8 h-16 w-16 opacity-40 md:left-14 md:top-14 md:h-24 md:w-24" />
      <Peony
        variant="white"
        className="absolute bottom-10 right-6 h-14 w-14 opacity-30 md:bottom-16 md:right-14 md:h-20 md:w-20"
      />

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 mb-10 text-center"
      >
        <p className="font-hand text-2xl text-blush md:text-3xl">a little secret awaits...</p>
        <h1 className="mt-1 font-display text-2xl font-medium tracking-tight text-paper md:text-3xl">
          Trace the path to unlock it.
        </h1>
      </motion.div>

      <motion.div
        animate={
          status === "error"
            ? { x: [0, -10, 10, -8, 8, -4, 4, 0] }
            : { x: 0 }
        }
        transition={{ duration: 0.5 }}
        className="relative z-10"
      >
        <AnimatePresence>
          {status === "success" && (
            <motion.div
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 2.4 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.1, ease: "easeOut" }}
              className="pointer-events-none absolute inset-0 rounded-full"
              style={{
                background:
                  "radial-gradient(circle, rgba(232,61,122,0.55), rgba(232,61,122,0) 70%)",
              }}
            />
          )}
        </AnimatePresence>

        <svg
          ref={svgRef}
          viewBox={`0 0 ${SIZE} ${SIZE}`}
          className="h-[78vw] max-h-[340px] w-[78vw] max-w-[340px] touch-none select-none md:h-[340px] md:w-[340px]"
          onPointerDown={(e) => handleStart(e.clientX, e.clientY)}
          role="application"
          aria-label="Pattern lock. Drag between the nine dots to enter the unlock pattern."
        >
          {linePoints.length > 1 && (
            <motion.polyline
              points={polyline}
              fill="none"
              stroke={lineColor}
              strokeWidth={6}
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{
                filter: `drop-shadow(0 0 10px ${lineColor}aa)`,
              }}
            />
          )}

          {GRID.map((n) => {
            const p = dotPosition(n);
            const active = path.includes(n);
            const isLast = status === "success" && path[path.length - 1] === n;
            return (
              <g key={n}>
                {active && (
                  <circle
                    cx={p.x}
                    cy={p.y}
                    r={isLast ? 22 : 17}
                    fill="none"
                    stroke={lineColor}
                    strokeWidth={1.5}
                    opacity={0.5}
                  />
                )}
                <circle
                  cx={p.x}
                  cy={p.y}
                  r={active ? 11 : 8}
                  fill={active ? lineColor : "#f6ece9"}
                  opacity={active ? 1 : 0.55}
                  style={{
                    transition: "r 150ms ease, fill 150ms ease, opacity 150ms ease",
                    filter: active ? `drop-shadow(0 0 8px ${lineColor}cc)` : undefined,
                  }}
                />
              </g>
            );
          })}
        </svg>
      </motion.div>

      <p className="relative z-10 mt-10 max-w-[240px] text-center text-sm text-rose/80 md:max-w-xs">
        Connect the dots in the right order to open it.
      </p>
    </div>
  );
}