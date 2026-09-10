type Props = {
  className?: string;
  fill?: string;
};

export default function Heart({ className = "", fill = "#e83d7a" }: Props) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true" focusable="false">
      <path
        d="M16 28s-11-7.1-14-14.2C0.3 8.6 3 4 8 4c3 0 5.2 1.8 8 5.3C18.8 5.8 21 4 24 4c5 0 7.7 4.6 6 9.8C27 20.9 16 28 16 28z"
        fill={fill}
      />
    </svg>
  );
}