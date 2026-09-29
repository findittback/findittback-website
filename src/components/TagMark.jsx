export default function TagMark({ className = "h-6 w-6" }) {
  return (
    <svg viewBox="0 0 32 32" className={className} fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path
        d="M4 16 L11 5 a3 3 0 0 1 2.5-1.4 H26 a2 2 0 0 1 2 2 v20.8 a2 2 0 0 1-2 2 H13.5 A3 3 0 0 1 11 27 Z"
        fill="var(--color-brass-400)"
      />
      <circle cx="21.5" cy="11" r="2.4" fill="#000F26" />
    </svg>
  );
}
