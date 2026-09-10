type Props = {
  className?: string;
  variant?: "pink" | "white";
};

export default function Peony({ className = "", variant = "pink" }: Props) {
  const petal = variant === "white" ? "#f3d6da" : "#e8b9c0";
  const petalDeep = variant === "white" ? "#e0c3c7" : "#c98a95";
  const center = "#e83d7a";

  return (
    <svg
      viewBox="0 0 120 120"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <g opacity="0.95">
        {Array.from({ length: 10 }).map((_, i) => {
          const angle = (i / 10) * Math.PI * 2;
          const x = 60 + Math.cos(angle) * 30;
          const y = 60 + Math.sin(angle) * 30;
          return (
            <ellipse
              key={i}
              cx={x}
              cy={y}
              rx="18"
              ry="12"
              fill={i % 2 === 0 ? petal : petalDeep}
              transform={`rotate(${(angle * 180) / Math.PI} ${x} ${y})`}
              opacity="0.85"
            />
          );
        })}
        {Array.from({ length: 6 }).map((_, i) => {
          const angle = (i / 6) * Math.PI * 2 + 0.3;
          const x = 60 + Math.cos(angle) * 14;
          const y = 60 + Math.sin(angle) * 14;
          return (
            <ellipse
              key={`in-${i}`}
              cx={x}
              cy={y}
              rx="13"
              ry="9"
              fill={petal}
              transform={`rotate(${(angle * 180) / Math.PI} ${x} ${y})`}
            />
          );
        })}
        <circle cx="60" cy="60" r="7" fill={center} opacity="0.9" />
      </g>
    </svg>
  );
}