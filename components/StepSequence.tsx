"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { rich } from "./rich";
import { StepFacts } from "./StepFacts";
import { STEPS } from "@/lib/content";

/*
  Desktop "How Canary fixes it": the section pins while you scroll, and the step
  images arrive one by one, each sliding up over the last as the one beneath
  shrinks back. Per image, --e is how far it has entered (0 → 1) and --c how far
  the next one has covered it (0 → 1); the copy on the left follows the active step.
  Phones and reduced motion get the card list in Journal instead (see globals.css).
*/
const smooth = (x: number) => { const k = Math.min(1, Math.max(0, x)); return k * k * (3 - 2 * k); };

export function StepSequence() {
  const root = useRef<HTMLDivElement>(null);
  const figs = useRef<(HTMLElement | null)[]>([]);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const n = STEPS.length;
    let raf = 0, last = -1;
    const update = () => {
      raf = 0;
      if (getComputedStyle(el).display === "none") return;
      const sticky = el.firstElementChild as HTMLElement;
      const r = el.getBoundingClientRect(), top = parseFloat(getComputedStyle(sticky).top) || 0;
      const t = Math.min(1, Math.max(0, (top - r.top) / Math.max(1, r.height - sticky.offsetHeight)));
      const s = t * (n - 1); // 0 … n-1: which step we are on, fractionally
      figs.current.forEach((f, i) => {
        if (!f) return;
        // each change happens in the middle of its scroll segment, so every image holds for a moment
        const e = i === 0 ? 1 : smooth((s - (i - 1)) * 1.6 - 0.3);
        const c = smooth((s - i) * 1.6 - 0.3);
        f.style.setProperty("--e", e.toFixed(4));
        f.style.setProperty("--c", c.toFixed(4));
      });
      const a = Math.min(n - 1, Math.max(0, Math.round(s)));
      if (a !== last) { last = a; setActive(a); }
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    update();
    addEventListener("scroll", onScroll, { passive: true });
    addEventListener("resize", onScroll);
    return () => { removeEventListener("scroll", onScroll); removeEventListener("resize", onScroll); cancelAnimationFrame(raf); };
  }, []);

  /* clicking a step in the index scrolls to its point in the sequence */
  const go = (i: number) => {
    const el = root.current;
    if (!el) return;
    const sticky = el.firstElementChild as HTMLElement;
    const top = parseFloat(getComputedStyle(sticky).top) || 0;
    const span = el.offsetHeight - sticky.offsetHeight;
    scrollTo({ top: el.getBoundingClientRect().top + scrollY - top + (span * i) / (STEPS.length - 1), behavior: "smooth" });
  };

  return (
    <div className="seq" ref={root} style={{ "--n": STEPS.length } as React.CSSProperties}>
      <div className="seq__sticky">
        <div className="seq__copy">
          <ol className="seq__nav" aria-label="Steps">
            {STEPS.map((s, i) => (
              <li key={s.num}>
                <button type="button" className={i === active ? "is-on" : undefined} aria-current={i === active ? "step" : undefined} onClick={() => go(i)}>
                  <b>{s.num}</b>{s.kind}
                </button>
              </li>
            ))}
          </ol>
          <div className="seq__texts">
            {STEPS.map((s, i) => (
              <div key={s.num} className={`seq__text${i === active ? " is-on" : ""}`} aria-hidden={i !== active}>
                <p className="kicker"><b>{s.num}</b><span>{s.kind}</span></p>
                <h3>{s.title}</h3>
                <p>{rich(s.body)}</p>
                <StepFacts step={s} />
              </div>
            ))}
          </div>
        </div>
        <div className="seq__stage">
          {STEPS.map((s, i) => (
            <figure key={s.num} className="seq__fig" ref={(f) => { figs.current[i] = f; }} style={{ "--i": i } as React.CSSProperties}>
              <Image src={s.image} alt={s.alt} fill sizes="(max-width: 1240px) 60vw, 720px" />
              <figcaption><b>{s.num}</b>{s.kind}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </div>
  );
}
