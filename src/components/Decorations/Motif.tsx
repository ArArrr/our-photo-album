export type MotifKind =
  | "sushi"
  | "chocolate"
  | "camera"
  | "salmon"
  | "liempo"
  | "pichi"
  | "dress"
  | "peony";

type Props = {
  kind: MotifKind;
  className?: string;
};

// Small, hand-drawn-feeling sticker illustrations. Kept simple and
// stylized (not photographic) so they read as scrapbook doodles.
export default function Motif({ kind, className = "" }: Props) {
  switch (kind) {
    case "sushi":
      return (
        <svg viewBox="0 0 64 64" className={className} aria-hidden="true">
          <ellipse cx="32" cy="46" rx="24" ry="9" fill="#f6ece9" />
          <rect x="10" y="20" width="44" height="24" rx="10" fill="#f6ece9" stroke="#c98a95" strokeWidth="2" />
          <rect x="10" y="20" width="44" height="9" rx="4" fill="#e07b95" opacity="0.85" />
          <circle cx="20" cy="24.5" r="1.4" fill="#fff" />
          <circle cx="27" cy="25.5" r="1.4" fill="#fff" />
          <circle cx="34" cy="24" r="1.4" fill="#fff" />
          <rect x="10" y="34" width="44" height="6" fill="#1c0f16" opacity="0.85" />
        </svg>
      );
    case "chocolate":
      return (
        <svg viewBox="0 0 64 64" className={className} aria-hidden="true">
          <rect x="8" y="14" width="48" height="36" rx="6" fill="#8a4a3a" />
          <rect x="8" y="14" width="48" height="36" rx="6" fill="none" stroke="#e8b9c0" strokeWidth="2" />
          {[0, 1, 2].map((r) =>
            [0, 1, 2].map((c) => (
              <rect
                key={`${r}-${c}`}
                x={14 + c * 14}
                y={20 + r * 10}
                width="10"
                height="7"
                rx="1.5"
                fill="#6d382a"
              />
            ))
          )}
          <path d="M8 14 L32 4 L56 14" fill="none" stroke="#e83d7a" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );
    case "camera":
      return (
        <svg viewBox="0 0 64 64" className={className} aria-hidden="true">
          <rect x="8" y="20" width="48" height="32" rx="6" fill="#1c0f16" stroke="#e8b9c0" strokeWidth="2" />
          <rect x="22" y="12" width="16" height="10" rx="2" fill="#1c0f16" stroke="#e8b9c0" strokeWidth="2" />
          <circle cx="32" cy="36" r="11" fill="none" stroke="#e8b9c0" strokeWidth="2.5" />
          <circle cx="32" cy="36" r="5" fill="#e83d7a" />
          <circle cx="47" cy="26" r="2" fill="#e8b9c0" />
        </svg>
      );
    case "salmon":
      return (
        <svg viewBox="0 0 64 64" className={className} aria-hidden="true">
          <ellipse cx="32" cy="42" rx="26" ry="10" fill="#f6ece9" />
          <path
            d="M14 32 Q32 16 50 32 Q32 40 14 32Z"
            fill="#e8837a"
          />
          <path d="M18 32 Q32 24 46 32" fill="none" stroke="#f3b3a7" strokeWidth="2" opacity="0.8" />
          <path d="M18 34 Q32 28 46 34" fill="none" stroke="#f3b3a7" strokeWidth="2" opacity="0.8" />
        </svg>
      );
    case "liempo":
      return (
        <svg viewBox="0 0 64 64" className={className} aria-hidden="true">
          <ellipse cx="32" cy="46" rx="25" ry="9" fill="#f6ece9" />
          <rect x="12" y="20" width="40" height="20" rx="8" fill="#c9793a" />
          <rect x="12" y="24" width="40" height="4" fill="#8a4a24" opacity="0.6" />
          <rect x="12" y="32" width="40" height="4" fill="#8a4a24" opacity="0.6" />
        </svg>
      );
    case "pichi":
      return (
        <svg viewBox="0 0 64 64" className={className} aria-hidden="true">
          <ellipse cx="22" cy="40" rx="11" ry="8" fill="#e8b9c0" />
          <ellipse cx="38" cy="34" rx="11" ry="8" fill="#f3d6da" />
          <ellipse cx="30" cy="46" rx="11" ry="8" fill="#e07b95" />
          <circle cx="19" cy="37" r="1.6" fill="#fff" opacity="0.7" />
          <circle cx="35" cy="31" r="1.6" fill="#fff" opacity="0.7" />
        </svg>
      );
    case "dress":
      return (
        <svg viewBox="0 0 64 64" className={className} aria-hidden="true">
          <path
            d="M26 8 h12 l4 10 -6 4 8 30 h-24 l8 -30 -6 -4 z"
            fill="#e8b9c0"
            stroke="#c98a95"
            strokeWidth="1.5"
          />
          <path d="M26 8 q6 6 12 0" fill="none" stroke="#c98a95" strokeWidth="1.5" />
        </svg>
      );
    case "peony":
      return (
        <svg viewBox="0 0 64 64" className={className} aria-hidden="true">
          <circle cx="32" cy="32" r="6" fill="#e83d7a" />
          {Array.from({ length: 8 }).map((_, i) => {
            const a = (i / 8) * Math.PI * 2;
            const x = 32 + Math.cos(a) * 16;
            const y = 32 + Math.sin(a) * 16;
            return <ellipse key={i} cx={x} cy={y} rx="9" ry="6" fill="#e8b9c0" transform={`rotate(${(a * 180) / Math.PI} ${x} ${y})`} opacity="0.85" />;
          })}
        </svg>
      );
    default:
      return null;
  }
}