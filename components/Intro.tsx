"use client";

import { useEffect, useRef } from "react";

/* Plays once per browser session (the head script marks <html data-intro="seen"> on later visits). */
export function Intro() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = document.documentElement;
    const ready = () => requestAnimationFrame(() => root.setAttribute("data-ready", ""));
    if (root.getAttribute("data-intro") === "seen") { ready(); return; }

    let done = false;
    const end = () => {
      if (done) return;
      done = true;
      ref.current?.classList.add("is-gone");
      setTimeout(() => root.setAttribute("data-intro", "seen"), 460);
      try { sessionStorage.setItem("canary.intro", "1"); } catch {}
      ready();
    };
    const still = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const timer = setTimeout(end, still ? 700 : 2500);
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") end(); };
    addEventListener("keydown", onKey);
    ref.current?.querySelector("button")?.addEventListener("click", end);
    return () => { clearTimeout(timer); removeEventListener("keydown", onKey); };
  }, []);

  return (
    <div className="intro" ref={ref} aria-hidden="true">
      <div className="intro__in">
        <span className="bird" />
        <span className="intro__word">
          {"CANARY".split("").map((ch, i) => <span key={i} style={{ "--i": i } as React.CSSProperties}>{ch}</span>)}
        </span>
      </div>
      <span className="intro__bar" />
      <button className="intro__skip" type="button">Skip</button>
    </div>
  );
}
