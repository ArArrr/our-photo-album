import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import AlbumPage from "./AlbumPage";
import Peony from "../Decorations/Peony";
import Tape from "../Decorations/Tape";
import { memories } from "../../data/memories";

type Flip = {
  fromIndex: number;
  toIndex: number;
  direction: "forward" | "backward";
};

const FLIP_DURATION = 0.72;
const SWIPE_THRESHOLD = 50;

export default function Album() {
  const [index, setIndex] = useState(0);
  const [flip, setFlip] = useState<Flip | null>(null);
  const reduceMotion = useReducedMotion();
  const swipeStart = useRef<{ x: number; y: number } | null>(null);
  const wasSwipe = useRef(false);

  const lastIndex = memories.length - 1;
  const canGoBack = index > 0 && !flip;
  const canGoForward = index < lastIndex && !flip;

  const goForward = useCallback(() => {
    if (flip || index >= memories.length - 1) return;
    const toIndex = index + 1;
    if (reduceMotion) {
      setIndex(toIndex);
      return;
    }
    setFlip({ fromIndex: index, toIndex, direction: "forward" });
  }, [flip, index, reduceMotion]);

  const goBack = useCallback(() => {
    if (flip || index <= 0) return;
    const toIndex = index - 1;
    if (reduceMotion) {
      setIndex(toIndex);
      return;
    }
    setFlip({ fromIndex: index, toIndex, direction: "backward" });
  }, [flip, index, reduceMotion]);

  const commitFlip = useCallback(() => {
    setFlip((current) => {
      if (!current) return current;
      setIndex(current.toIndex);
      return null;
    });
  }, []);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "ArrowRight") goForward();
      if (e.key === "ArrowLeft") goBack();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [goForward, goBack]);

  const handlePointerDown = (e: React.PointerEvent) => {
    swipeStart.current = { x: e.clientX, y: e.clientY };
    wasSwipe.current = false;
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    const start = swipeStart.current;
    swipeStart.current = null;
    if (!start) return;
    const dx = e.clientX - start.x;
    const dy = e.clientY - start.y;
    if (Math.abs(dx) > SWIPE_THRESHOLD && Math.abs(dx) > Math.abs(dy)) {
      wasSwipe.current = true;
      if (dx < 0) goForward();
      else goBack();
    }
  };

  const handleZoneClick = (direction: "forward" | "backward") => {
    if (wasSwipe.current) {
      wasSwipe.current = false;
      return;
    }
    if (direction === "forward") goForward();
    else goBack();
  };

  return (
    <section
      id="album"
      className="relative flex min-h-dvh flex-col items-center justify-center overflow-hidden bg-plum px-4 py-20 grain"
    >
      <div
        className="pointer-events-none absolute left-1/2 top-0 h-[480px] w-[480px] -translate-x-1/2 rounded-full opacity-20 blur-[130px]"
        style={{ background: "radial-gradient(circle, #e83d7a, transparent 70%)" }}
      />
      <Peony className="absolute left-4 top-10 h-14 w-14 opacity-25 md:left-10 md:h-20 md:w-20" />
      <Peony
        variant="white"
        className="absolute bottom-10 right-4 h-14 w-14 opacity-20 md:right-10 md:h-20 md:w-20"
      />

      <motion.div
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 mb-8 text-center"
      >
        <p className="font-hand text-2xl text-blush md:text-3xl">a little book of us</p>
        <h2 className="mt-1 font-display text-2xl italic text-paper/90 md:text-3xl">
          turn the pages whenever you like.
        </h2>
      </motion.div>

      {/* the book */}
      <div className="relative z-10" style={{ perspective: 1800 }}>
        <Tape
          className="absolute -top-3 left-1/2 z-20 -translate-x-1/2"
          rotate={-3}
          color="#e8b9c0"
        />

        {/* hardcover frame */}
        <div className="relative rounded-[16px] bg-gradient-to-br from-plum-light via-plum to-[#160a10] p-3 shadow-[0_30px_60px_-20px_rgba(0,0,0,0.7)] ring-1 ring-rose-dust/25">
          {/* spine */}
          <div className="pointer-events-none absolute left-3 top-3 bottom-3 w-3 rounded-l-[6px] bg-gradient-to-r from-black/50 to-transparent" />

          <div
            className="relative h-[68vh] max-h-[500px] w-[78vw] max-w-[360px] touch-pan-y select-none overflow-hidden rounded-[10px] bg-paper shadow-inner sm:w-[380px]"
            onPointerDown={handlePointerDown}
            onPointerUp={handlePointerUp}
          >
            {/* stacked page-edge lines for depth */}
            <div className="pointer-events-none absolute inset-y-2 right-0 w-2 bg-gradient-to-l from-black/10 to-transparent" />

            {/* current / target page */}
            <div className="absolute inset-0">
              <AlbumPage memory={memories[flip ? flip.toIndex : index]} pageNumber={flip ? flip.toIndex : index} />
            </div>

            {/* flipping leaf */}
            <AnimatePresence>
              {flip && (
                <motion.div
                  className="absolute inset-0"
                  style={{
                    transformOrigin: flip.direction === "forward" ? "right center" : "left center",
                    transformStyle: "preserve-3d",
                  }}
                  initial={{ rotateY: 0 }}
                  animate={{ rotateY: flip.direction === "forward" ? -180 : 180 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: FLIP_DURATION, ease: [0.45, 0, 0.2, 1] }}
                  onAnimationComplete={commitFlip}
                >
                  <div className="absolute inset-0 [backface-visibility:hidden]">
                    <AlbumPage memory={memories[flip.fromIndex]} pageNumber={flip.fromIndex} />
                  </div>
                  <div
                    className="absolute inset-0 bg-paper-dim [backface-visibility:hidden]"
                    style={{ transform: "rotateY(180deg)" }}
                  />
                  <div
                    className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black/25 via-transparent to-transparent [backface-visibility:hidden]"
                    style={{
                      opacity: flip.direction === "forward" ? 1 : 0,
                    }}
                  />
                </motion.div>
              )}
            </AnimatePresence>

            {/* click zones */}
            <button
              type="button"
              aria-label="Previous page"
              disabled={!canGoBack}
              onClick={() => handleZoneClick("backward")}
              className="absolute left-0 top-0 h-full w-1/3 cursor-w-resize disabled:cursor-default"
            />
            <button
              type="button"
              aria-label="Next page"
              disabled={!canGoForward}
              onClick={() => handleZoneClick("forward")}
              className="absolute right-0 top-0 h-full w-1/3 cursor-e-resize disabled:cursor-default"
            />
          </div>
        </div>
      </div>

      <div className="relative z-10 mt-7 flex items-center gap-5">
        <button
          type="button"
          onClick={goBack}
          disabled={!canGoBack}
          aria-label="Previous page"
          className="font-hand text-xl text-rose/80 transition disabled:opacity-30"
        >
          ‹ back
        </button>
        <span className="font-hand text-lg text-rose/50">
          {(flip ? flip.toIndex : index) + 1} / {memories.length}
        </span>
        <button
          type="button"
          onClick={goForward}
          disabled={!canGoForward}
          aria-label="Next page"
          className="font-hand text-xl text-rose/80 transition disabled:opacity-30"
        >
          next ›
        </button>
      </div>

      <p className="relative z-10 mt-3 max-w-[240px] text-center text-xs text-rose/50">
        tap either side of the book, swipe, or use the arrow keys.
      </p>
    </section>
  );
}