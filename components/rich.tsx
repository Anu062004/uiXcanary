/* Renders `code` and *emphasis* inside a line of copy. */
export function rich(text: string) {
  return text.split(/(`[^`]+`|\*[^*]+\*)/).map((part, i) => {
    if (part.startsWith("`")) return <code key={i}>{part.slice(1, -1)}</code>;
    if (part.startsWith("*")) return <em key={i}>{part.slice(1, -1)}</em>;
    return part;
  });
}
