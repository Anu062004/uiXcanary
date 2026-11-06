import { Arrow } from "./Arrow";

/* Renders `code`, *emphasis*, **bold** and → (as an SVG arrow) inside a line of copy. */
export function rich(text: string) {
  return text.split(/(`[^`]+`|\*\*[^*]+\*\*|\*[^*]+\*|→)/).map((part, i) => {
    if (part === "→") return <Arrow key={i} label="then" />;
    if (part.startsWith("`")) return <code key={i}>{part.slice(1, -1)}</code>;
    if (part.startsWith("**")) return <b key={i}>{part.slice(2, -2)}</b>;
    if (part.startsWith("*")) return <em key={i}>{part.slice(1, -1)}</em>;
    return part;
  });
}
