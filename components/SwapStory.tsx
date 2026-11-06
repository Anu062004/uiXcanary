"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { rich } from "./rich";
import { SWAP_STORY } from "@/lib/content";

/*
  Canary Swap story: the section pins to the screen and each image pops up as a small
  framed picture, then grows with the scroll until it covers the whole screen; its
  caption arrives once it is full and fades as the next image pops up over it.
  Per slide, --g is how far it has grown (0 → 1) and --t how far its caption is in.
  The position eases toward the scroll target. Phones and reduced motion get the
  images stacked with their captions instead (see globals.css).
*/
const smooth = (x: number) => { const k = Math.min(1, Math.max(0, x)); return k * k * (3 - 2 * k); };

export function SwapStory() {
  const root = useRef<HTMLDivElement>(null);
  const slides = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const n = SWAP_STORY.length;
    let raf = 0, cur = -1, target = 0;
    const measure = () => {
      const sticky = el.firstElementChild as HTMLElement;
      const r = el.getBoundingClientRect();
      const t = Math.min(1, Math.max(0, -r.top / Math.max(1, r.height - sticky.offsetHeight)));
      return t * n; // 0 … n
    };
    const paint = (s: number) => {
      slides.current.forEach((f, i) => {
        if (!f) return;
        // grows over the first half of its scroll segment; the caption lands by five sixths and
        // holds until the next image pops up, then fades as that one starts to grow
        const g = smooth((s - i) * 2.2);
        const next = smooth((s - i - 1) * 2.2);
        const t = smooth((s - i) * 3 - 1.5) * (1 - smooth(next * 4));
        f.style.setProperty("--g", g.toFixed(4));
        f.style.setProperty("--t", t.toFixed(4));
      });
    };
    const frame = () => {
      raf = 0;
      if (getComputedStyle(el).display === "none") return;
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
    <div className="story" ref={root} style={{ "--n": SWAP_STORY.length } as React.CSSProperties}>
      <div className="story__sticky">
        {SWAP_STORY.map((s, i) => (
          <figure key={s.image} className={`story__slide story__slide--${s.tone}`} ref={(f) => { slides.current[i] = f; }}>
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
