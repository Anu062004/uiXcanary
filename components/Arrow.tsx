/* An inline arrow drawn as SVG, so it looks the same whatever font fallback the browser picks for "→". */
export function Arrow({ label = "to" }: { label?: string }) {
  return (
    <svg className="arr" viewBox="0 0 24 24" role="img" aria-label={label}>
      <path d="M4 12h15" /><path d="m13 6 6 6-6 6" />
    </svg>
  );
}
