"use client";

import { Children, useEffect, useRef } from "react";
import { onScrollFrame, pageTop, clamp01, smooth } from "@/lib/scroll";

/*
  A pinned deck of cards: the section sticks to the screen and each card pops up from
  below as a small card, then grows into a large screen-filling card; the next one pops
  up over it while the one beneath sinks back. Per card, --g is how far it has grown
  (0 → 1) and --c how far the next one has covered it. The position follows the scroll
  directly. Phones, short screens and reduced motion get the cards as a grid
  (see globals.css), which is also the layout before JS runs.
*/

export function Deck({ children }: { children: React.ReactNode }) {
  const root = useRef<HTMLDivElement>(null);
  const n = Children.count(children);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const cards = Array.from(el.querySelectorAll<HTMLElement>(":scope > .deck__sticky > *"));
    let on = false, from = 0, span = 1, prev = "";
    return onScrollFrame({
      measure: () => {
        const sticky = el.firstElementChild as HTMLElement;
        on = getComputedStyle(sticky).position === "sticky";
        if (!on) return;
        from = pageTop(el);
        span = Math.max(1, el.offsetHeight - sticky.offsetHeight);
        prev = "";
      },
      frame: (y) => {
        if (!on) return;
        const s = clamp01((y - from) / span) * cards.length;
        const key = s.toFixed(4);
        if (key === prev) return;
        prev = key;
        cards.forEach((c, i) => {
          // pops up and grows over the first half of its segment, then holds until the next card arrives
          c.style.setProperty("--g", smooth((s - i) * 2.2 + (i === 0 ? 0.35 : 0)).toFixed(4));
          c.style.setProperty("--c", smooth((s - i - 1) * 2.2).toFixed(4));
        });
      },
    });
  }, []);

  return (
    <div className="deck" ref={root} style={{ "--n": n } as React.CSSProperties}>
      <div className="deck__sticky get">{children}</div>
    </div>
  );
}
