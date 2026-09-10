import { useCallback, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import PatternLock from "./components/PatternLock/PatternLock";
import LoveLetter from "./components/LoveLetter/LoveLetter";
import Album from "./components/Album/Album";

type Stage = "lock" | "letter" | "album";

function MusicToggle() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [available, setAvailable] = useState(false);
  const [playing, setPlaying] = useState(false);

  const toggle = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) {
      audio.pause();
      setPlaying(false);
    } else {
      audio.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
    }
  }, [playing]);

  return (
    <>
      {/* Optional: drop a file at public/audio/ambient.mp3 to enable this.
          The button only appears once the browser confirms the file can play,
          so nothing breaks if you never add one. */}
      <audio
        ref={audioRef}
        src="/audio/ambient.mp3"
        loop
        preload="none"
        onCanPlayThrough={() => setAvailable(true)}
        onError={() => setAvailable(false)}
      />
      {available && (
        <motion.button
          type="button"
          onClick={toggle}
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          aria-label={playing ? "Pause music" : "Play music"}
          className="fixed right-4 top-4 z-50 flex h-10 w-10 items-center justify-center rounded-full border border-rose/30 bg-plum/70 text-rose backdrop-blur transition hover:border-rose/60"
        >
          {playing ? "♫" : "♪"}
        </motion.button>
      )}
    </>
  );
}

export default function App() {
  const [stage, setStage] = useState<Stage>("lock");
  const letterRef = useRef<HTMLDivElement | null>(null);

  const handleUnlock = useCallback(() => {
    setStage("letter");
  }, []);

  const handleContinueToAlbum = useCallback(() => {
    setStage("album");
    // give the album a moment to mount, then bring it into view
    window.requestAnimationFrame(() => {
      document.getElementById("album")?.scrollIntoView({ behavior: "smooth" });
    });
  }, []);

  return (
    <div className="bg-ink">
      {stage !== "lock" && <MusicToggle />}

      <AnimatePresence mode="wait">
        {stage === "lock" && (
          <motion.div key="lock" exit={{ opacity: 0 }} transition={{ duration: 0.6 }}>
            <PatternLock onUnlock={handleUnlock} />
          </motion.div>
        )}
      </AnimatePresence>

      {stage !== "lock" && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.1, ease: "easeOut" }}
        >
          <LoveLetter ref={letterRef} onContinueToAlbum={handleContinueToAlbum} />
          {stage === "album" && <Album />}
        </motion.div>
      )}
    </div>
  );
}