"use client";

import { useEffect } from "react";
import { onScrollFrame, pageTop } from "@/lib/scroll";

/*
  Scroll-linked image reveal for every [data-fx] frame.
  --pe: 0 → 1 as the frame rises from the bottom edge to a quarter of the way up (eased).
  --q:  -1 → 1 as the frame's centre crosses the viewport, for a gentle parallax.
  Cards marked [data-pop="n"] get --pp: 0 → 1 (overshooting a little) as they rise in, n beats late.
  Positions are measured once (and on resize), so a scroll frame only writes styles.
  The look (window opening, zoom settling, drift) lives in globals.css.
*/
export function ScrollFX() {
  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const els = Array.from(document.querySelectorAll<HTMLElement>("[data-fx]")).map((el) => ({ el, top: 0, h: 0, pe: "", q: "", pinned: false }));
    const pops = Array.from(document.querySelectorAll<HTMLElement>("[data-pop]")).map((el) => ({ el, top: 0, delay: (+el.dataset.pop! || 0) * 0.14, pp: "" }));
    if (!els.length && !pops.length) return;
    // ease-out with a slight overshoot, so cards pop instead of sliding
    const back = (x: number) => { const c1 = 1.5, c3 = c1 + 1; return 1 + c3 * Math.pow(x - 1, 3) + c1 * Math.pow(x - 1, 2); };
    document.documentElement.setAttribute("data-fx-on", "");
    return onScrollFrame({
      measure: () => {
        // measure without the pop transforms so the cached position is the resting one
        for (const p of pops) p.top = pageTop(p.el) - (parseFloat(getComputedStyle(p.el).translate.split(" ")[1] || "0") || 0);
        for (const e of els) {
          // frames inside a pinned (sticky) deck ride along with it: show them settled
          const stick = e.el.closest<HTMLElement>(".deck__sticky");
          e.pinned = !!stick && getComputedStyle(stick).position === "sticky";
          if (e.pinned) { e.el.style.setProperty("--pe", "1"); e.el.style.setProperty("--q", "0"); e.pe = "1"; e.q = "0"; continue; }
          e.top = pageTop(e.el); e.h = e.el.offsetHeight;
        }
      },
      frame: (y, vh) => {
        for (const e of els) {
          if (e.pinned) continue;
          const top = e.top - y;
          if (top + e.h < -vh * 0.5 || top > vh * 1.5) continue; // far off screen
          const p = Math.min(1, Math.max(0, (vh - top) / (vh * 0.7)));
          const pe = (1 - Math.pow(1 - p, 3)).toFixed(3);
          const q = Math.max(-1, Math.min(1, (top + e.h / 2 - vh / 2) / vh)).toFixed(3);
          if (pe !== e.pe) { e.pe = pe; e.el.style.setProperty("--pe", pe); }
          if (q !== e.q) { e.q = q; e.el.style.setProperty("--q", q); }
        }
        for (const p of pops) {
          const top = p.top - y;
          if (top > vh * 1.5) continue;
          const k = Math.min(1, Math.max(0, (vh - top) / (vh * 0.55) - p.delay));
          const pp = back(k).toFixed(3);
          if (pp !== p.pp) { p.pp = pp; p.el.style.setProperty("--pp", pp); }
        }
      },
    });
  }, []);
  return null;
}
