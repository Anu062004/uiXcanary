"use client";

import { useEffect } from "react";

/*
  Scroll-linked image reveal for every [data-fx] frame.
  --pe: 0 → 1 as the frame rises from the bottom edge to a quarter of the way up (eased).
  --q:  -1 → 1 as the frame's centre crosses the viewport, for a gentle parallax.
  Cards marked [data-pop="n"] get --pp: 0 → 1 (overshooting a little) as they rise in, n beats late.
  The look (window opening, zoom settling, drift) lives in globals.css.
*/
export function ScrollFX() {
  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const els = Array.from(document.querySelectorAll<HTMLElement>("[data-fx]"));
    const pops = Array.from(document.querySelectorAll<HTMLElement>("[data-pop]"));
    if (!els.length && !pops.length) return;
    // ease-out with a slight overshoot, so cards pop instead of sliding
    const back = (x: number) => { const c1 = 1.5, c3 = c1 + 1; return 1 + c3 * Math.pow(x - 1, 3) + c1 * Math.pow(x - 1, 2); };
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
      for (const el of pops) {
        const r = el.getBoundingClientRect();
        if (r.top > vh * 1.5) continue;
        const delay = (+el.dataset.pop! || 0) * 0.14; // later cards pop a beat behind
        const p = Math.min(1, Math.max(0, (vh - r.top) / (vh * 0.55) - delay));
        el.style.setProperty("--pp", back(p).toFixed(4));
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
