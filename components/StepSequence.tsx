"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { rich } from "./rich";
import { StepFacts } from "./StepFacts";
import { ProblemText } from "./ProblemText";
import { PROBLEM, STEPS } from "@/lib/content";
import { onScrollFrame, pageTop, clamp01, smooth } from "@/lib/scroll";

/*
  Desktop "How it works": the section pins while you scroll, and the images arrive
  one by one (01 the problem, then 02–05 the fixes), each sliding up over the last
  as the one beneath shrinks back. Per image, --e is how far it has entered (0 → 1)
  and --c how far the next one has covered it (0 → 1); the copy on the left follows
  the active slide. The position follows the scroll directly (no catch-up lag). Phones and reduced motion get the card layout in Journal.
*/
const SLIDES = [
  { num: PROBLEM.num, kind: PROBLEM.kind, image: PROBLEM.image, alt: PROBLEM.alt, step: null },
  ...STEPS.map((s) => ({ num: s.num, kind: s.kind, image: s.image, alt: s.alt, step: s })),
];

export function StepSequence() {
  const root = useRef<HTMLDivElement>(null);
  const figs = useRef<(HTMLElement | null)[]>([]);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const n = SLIDES.length;
    let on = false, from = 0, span = 1, last = -1, prev = "";
    return onScrollFrame({
      measure: () => {
        on = getComputedStyle(el).display !== "none";
        prev = "";
        if (!on) return;
        const sticky = el.firstElementChild as HTMLElement;
        from = pageTop(el) - (parseFloat(getComputedStyle(sticky).top) || 0);
        span = Math.max(1, el.offsetHeight - sticky.offsetHeight);
      },
      frame: (y) => {
        if (!on) return;
        const s = clamp01((y - from) / span) * (n - 1); // 0 … n-1: which slide we are on, fractionally
        const key = s.toFixed(4);
        if (key === prev) return;
        prev = key;
        figs.current.forEach((f, i) => {
          if (!f) return;
          // each change happens in the middle of its scroll segment, so every image holds for a while
          const e = i === 0 ? 1 : smooth((s - (i - 1)) * 1.7 - 0.35);
          const c = smooth((s - i) * 1.7 - 0.35);
          f.style.setProperty("--e", e.toFixed(4));
          f.style.setProperty("--c", c.toFixed(4));
        });
        const a = Math.min(n - 1, Math.max(0, Math.round(s)));
        if (a !== last) { last = a; setActive(a); }
      },
    });
  }, []);

  /* clicking a slide in the index scrolls to its point in the sequence */
  const go = (i: number) => {
    const el = root.current;
    if (!el) return;
    const sticky = el.firstElementChild as HTMLElement;
    const top = parseFloat(getComputedStyle(sticky).top) || 0;
    const span = el.offsetHeight - sticky.offsetHeight;
    scrollTo({ top: el.getBoundingClientRect().top + scrollY - top + (span * i) / (SLIDES.length - 1), behavior: "smooth" });
  };

  return (
    <div className="seq" ref={root} style={{ "--n": SLIDES.length } as React.CSSProperties}>
      <div className="seq__sticky">
        <div className="seq__copy">
          <ol className="seq__nav" aria-label="Steps">
            {SLIDES.map((s, i) => (
              <li key={s.num}>
                <button type="button" className={i === active ? "is-on" : undefined} aria-current={i === active ? "step" : undefined} onClick={() => go(i)}>
                  <b>{s.num}</b><span className="seq__navk">{s.kind}</span>
                </button>
              </li>
            ))}
          </ol>
          <div className="seq__texts">
            {SLIDES.map((s, i) => (
              <div key={s.num} className={`seq__text${i === active ? " is-on" : ""}`} aria-hidden={i !== active}>
                {s.step ? (
                  <>
                    <p className="kicker"><b>{s.num}</b><span>{s.kind}</span></p>
                    <h3>{s.step.title}</h3>
                    <p>{rich(s.step.body)}</p>
                    <StepFacts step={s.step} />
                  </>
                ) : <ProblemText />}
              </div>
            ))}
          </div>
        </div>
        <div className="seq__stage">
          {SLIDES.map((s, i) => (
            <figure key={s.num} className="seq__fig" ref={(f) => { figs.current[i] = f; }}>
              <Image src={s.image} alt={s.alt} fill sizes="(max-width: 1240px) 60vw, 720px" priority={i === 0} />
              <figcaption><b>{s.num}</b>{s.kind}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </div>
  );
}
