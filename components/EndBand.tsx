"use client";

import { useEffect, useRef } from "react";
import { ExtensionLink } from "./ExtensionLink";

export function EndBand() {
  const ball = useRef<HTMLDivElement>(null);

  /* the sphere drifts against the scroll as the band passes */
  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      const el = ball.current;
      if (!el?.parentElement) return;
      const r = el.parentElement.getBoundingClientRect(), k = (r.top + r.height / 2 - innerHeight / 2) / innerHeight;
      el.style.transform = `translate3d(0,${(k * 120).toFixed(1)}px,0)`;
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    update();
    addEventListener("scroll", onScroll, { passive: true });
    return () => { removeEventListener("scroll", onScroll); cancelAnimationFrame(raf); };
  }, []);

  return (
    <section className="end" aria-labelledby="end-h">
      <div className="end__ball" ref={ball} aria-hidden="true" />
      <div className="container">
        <h2 id="end-h" className="rv">Keep your <b>wallet <span>quiet.</span></b></h2>
        <div className="act rv" style={{ "--d": 1 } as React.CSSProperties}>
          <p>Private reads. Blocked leaks. Honest counts.</p>
          <ExtensionLink className="get-btn get-btn--dark" />
          <a className="btn btn--ghost" href="#journal">How it works</a>
        </div>
      </div>
    </section>
  );
}
