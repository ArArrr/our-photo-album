type Props = {
  className?: string;
  color?: string;
  rotate?: number;
};

export default function Tape({ className = "", color = "#e8b9c0", rotate = -4 }: Props) {
  return (
    <div
      className={`pointer-events-none select-none ${className}`}
      style={{
        width: 72,
        height: 26,
        background: `linear-gradient(180deg, ${color}cc, ${color}99)`,
        transform: `rotate(${rotate}deg)`,
        boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
        opacity: 0.85,
      }}
    >
      <div
        style={{
          width: "100%",
          height: "100%",
          backgroundImage:
            "repeating-linear-gradient(45deg, rgba(255,255,255,0.25) 0, rgba(255,255,255,0.25) 2px, transparent 2px, transparent 8px)",
        }}
      />
    </div>
  );
}