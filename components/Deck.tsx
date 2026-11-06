"use client";

import { Children, useEffect, useRef } from "react";

/*
  A pinned deck of cards: the section sticks to the screen and each card pops up from
  below as a small card, then grows into a large screen-filling card; the next one pops
  up over it while the one beneath sinks back. Per card, --g is how far it has grown
  (0 → 1) and --c how far the next one has covered it. The position eases toward the
  scroll target. Phones, short screens and reduced motion get the cards as a grid
  (see globals.css), which is also the layout before JS runs.
*/
const smooth = (x: number) => { const k = Math.min(1, Math.max(0, x)); return k * k * (3 - 2 * k); };

export function Deck({ children }: { children: React.ReactNode }) {
  const root = useRef<HTMLDivElement>(null);
  const n = Children.count(children);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const cards = Array.from(el.querySelectorAll<HTMLElement>(":scope > .deck__sticky > *"));
    let raf = 0, cur = -1, target = 0;
    const pinned = () => getComputedStyle(el.firstElementChild as HTMLElement).position === "sticky";
    const measure = () => {
      const sticky = el.firstElementChild as HTMLElement;
      const r = el.getBoundingClientRect();
      return Math.min(1, Math.max(0, -r.top / Math.max(1, r.height - sticky.offsetHeight))) * cards.length;
    };
    const paint = (s: number) => cards.forEach((c, i) => {
      // pops up and grows over the first half of its segment, then holds until the next card arrives
      c.style.setProperty("--g", smooth((s - i) * 2.2 + (i === 0 ? 0.35 : 0)).toFixed(4));
      c.style.setProperty("--c", smooth((s - i - 1) * 2.2).toFixed(4));
    });
    const frame = () => {
      raf = 0;
      if (!pinned()) return;
      target = measure();
      cur = cur < 0 ? target : cur + (target - cur) * 0.085;
      if (Math.abs(target - cur) < 0.0005) cur = target;
      paint(cur);
      if (cur !== target) raf = requestAnimationFrame(frame);
    };
    const kick = () => { if (!raf) raf = requestAnimationFrame(frame); };
    kick();
    addEventListener("scroll", kick, { passive: true });
    addEventListener("resize", kick);
    return () => { removeEventListener("scroll", kick); removeEventListener("resize", kick); cancelAnimationFrame(raf); };
  }, []);

  return (
    <div className="deck" ref={root} style={{ "--n": n } as React.CSSProperties}>
      <div className="deck__sticky get">{children}</div>
    </div>
  );
}
