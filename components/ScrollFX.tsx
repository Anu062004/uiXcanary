"use client";

import { useEffect } from "react";

/*
  Scroll-linked image reveal for every [data-fx] frame.
  --pe: 0 → 1 as the frame rises from the bottom edge to a quarter of the way up (eased).
  --q:  -1 → 1 as the frame's centre crosses the viewport, for a gentle parallax.
  The look (window opening, zoom settling, drift) lives in globals.css.
*/
export function ScrollFX() {
  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const els = Array.from(document.querySelectorAll<HTMLElement>("[data-fx]"));
    if (!els.length) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      const vh = innerHeight;
      for (const el of els) {
        const r = el.getBoundingClientRect();
        if (r.bottom < -vh * 0.5 || r.top > vh * 1.5) continue; // far off screen
        const p = Math.min(1, Math.max(0, (vh - r.top) / (vh * 0.7)));
        const pe = 1 - Math.pow(1 - p, 3);
        const q = Math.max(-1, Math.min(1, (r.top + r.height / 2 - vh / 2) / vh));
        el.style.setProperty("--pe", pe.toFixed(4));
        el.style.setProperty("--q", q.toFixed(4));
      }
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    document.documentElement.setAttribute("data-fx-on", "");
    update();
    addEventListener("scroll", onScroll, { passive: true });
    addEventListener("resize", onScroll);
    return () => { removeEventListener("scroll", onScroll); removeEventListener("resize", onScroll); cancelAnimationFrame(raf); };
  }, []);
  return null;
}
