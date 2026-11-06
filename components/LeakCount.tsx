"use client";

import { useEffect, useRef, useState } from "react";
import { Arrow } from "./Arrow";

/* "12 → 0": when it scrolls into view, the right-hand number counts down from `from` to zero. */
export function LeakCount({ from }: { from: number }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const [n, setN] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (el.getBoundingClientRect().top < innerHeight) return; // already on screen: show the result
    setN(from);
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      io.disconnect();
      const start = performance.now(), dur = 1400;
      const step = (t: number) => {
        const k = Math.min(1, (t - start) / dur), eased = 1 - Math.pow(1 - k, 3);
        setN(Math.round(from * (1 - eased)));
        if (k < 1) requestAnimationFrame(step);
      };
      setTimeout(() => requestAnimationFrame(step), 350);
    }, { threshold: 0.6 });
    io.observe(el);
    return () => io.disconnect();
  }, [from]);

  return (
    <p className="big" ref={ref} aria-label={`${from} to 0`}>
      {from} <Arrow /> <span>{n}</span>
    </p>
  );
}
