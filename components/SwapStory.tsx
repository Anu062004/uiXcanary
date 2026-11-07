"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { rich } from "./rich";
import { SWAP_STORY } from "@/lib/content";
import { onScrollFrame, pageTop, clamp01, smooth } from "@/lib/scroll";

/*
  Canary Swap story: the section pins to the screen and each image pops up as a small
  framed picture, then grows with the scroll until it covers the whole screen; its
  caption arrives once it is full and fades as the next image pops up over it.
  Per slide, --g is how far it has grown (0 → 1) and --t how far its caption is in.
  The position follows the scroll directly (no catch-up lag). Phones and reduced motion get the
  images stacked with their captions instead (see globals.css).
*/

export function SwapStory() {
  const root = useRef<HTMLDivElement>(null);
  const slides = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const n = SWAP_STORY.length;
    let on = false, from = 0, span = 1, prev = "";
    return onScrollFrame({
      measure: () => {
        const sticky = el.firstElementChild as HTMLElement;
        on = getComputedStyle(sticky).position === "sticky";
        prev = "";
        if (!on) { slides.current.forEach((f) => { if (f) f.style.visibility = ""; }); return; }
        from = pageTop(el);
        span = Math.max(1, el.offsetHeight - sticky.offsetHeight);
      },
      frame: (y) => {
        if (!on) return;
        const s = clamp01((y - from) / span) * n; // 0 … n
        const key = s.toFixed(4);
        if (key === prev) return;
        prev = key;
        slides.current.forEach((f, i) => {
          if (!f) return;
          // grows over the first half of its scroll segment; the caption lands by five sixths and
          // holds until the next image pops up, then fades as that one starts to grow
          const g = smooth((s - i) * 2.2);
          const next = smooth((s - i - 1) * 2.2);
          const t = smooth((s - i) * 3 - 1.5) * (1 - smooth(next * 4));
          f.style.setProperty("--g", g.toFixed(4));
          f.style.setProperty("--t", t.toFixed(4));
          // slides not yet reached, or fully covered, are taken out of painting
          f.style.visibility = g <= 0 || next >= 1 ? "hidden" : "visible";
        });
      },
    });
  }, []);

  return (
    <div className="story" ref={root} style={{ "--n": SWAP_STORY.length } as React.CSSProperties}>
      <div className="story__sticky">
        {SWAP_STORY.map((s, i) => (
          <figure key={s.image} className={`story__slide story__slide--${s.tone}`} ref={(f) => { slides.current[i] = f; }} style={{ "--bg": s.bg } as React.CSSProperties}>
            <div className="story__img"><Image src={s.image} alt={s.alt} fill sizes="100vw" /></div>
            <figcaption className="story__cap">
              <span className="story__k"><b>0{i + 1}</b>{s.kicker}</span>
              <span className="story__t">{s.title}</span>
              <span className="story__d">{rich(s.body)}</span>
            </figcaption>
          </figure>
        ))}
      </div>
    </div>
  );
}
