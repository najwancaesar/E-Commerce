// Logo SVG: tajam, ringan, tanpa perlu file gambar eksternal
export default function Logo({ className = "w-9 h-9" }) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-label="LCD Logo" role="img">
      <defs>
        <linearGradient id="lcdGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#4f46e5" />
          <stop offset="50%" stopColor="#7c3aed" />
          <stop offset="100%" stopColor="#06b6d4" />
        </linearGradient>
      </defs>

      <rect x="6" y="6" width="52" height="52" rx="16" fill="url(#lcdGrad)" />
      <text
        x="32"
        y="38"
        textAnchor="middle"
        fontSize="18"
        fontWeight="800"
        fill="white"
        fontFamily="ui-sans-serif, system-ui"
      >
        LCD
      </text>
    </svg>
  );
}
