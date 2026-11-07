"use client";

import { useEffect, useRef, useState } from "react";
import { Icon } from "./Icon";
import { NAV } from "@/lib/content";
import { onScrollFrame } from "@/lib/scroll";

export function Header() {
  const [active, setActive] = useState<string>("top");
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const progress = useRef<HTMLDivElement>(null);

  /* progress bar + compact header on scroll */
  useEffect(() => {
    let max = 1, was: boolean | null = null;
    return onScrollFrame({
      measure: () => { max = document.documentElement.scrollHeight - innerHeight; },
      frame: (y) => {
        if (progress.current) progress.current.style.transform = `scaleX(${max > 0 ? Math.min(1, y / max).toFixed(4) : 0})`;
        const is = y > 24;
        if (is !== was) { was = is; setScrolled(is); }
      },
    });
  }, []);

  /* scroll spy */
  useEffect(() => {
    const spy = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) setActive(e.target.id); }),
      { rootMargin: "-40% 0px -55% 0px" },
    );
    NAV.forEach(({ id }) => { const el = document.getElementById(id); if (el) spy.observe(el); });
    return () => spy.disconnect();
  }, []);

  const toggleTheme = () => {
    const root = document.documentElement;
    const cur = root.getAttribute("data-theme") || (matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
    const next = cur === "dark" ? "light" : "dark";
    root.setAttribute("data-theme", next);
    try { localStorage.setItem("canary.theme", next); } catch {}
  };

  return (
    <>
      <div className="progress" ref={progress} aria-hidden="true" />
      <header className={`head${scrolled ? " is-scrolled" : ""}`}>
        <div className="container">
          <a className="logo" href="#top" aria-label="Canary home"><span className="bird" aria-hidden="true" /><b>Canary</b></a>
          <nav className={`nav${open ? " is-open" : ""}`} id="nav" aria-label="Primary" onClick={(e) => { if ((e.target as HTMLElement).closest("a")) setOpen(false); }}>
            {NAV.map(({ id, label }) => (
              <a key={id} href={`#${id}`} className={active === id ? "is-on" : undefined} aria-current={active === id ? "true" : undefined}>{label}</a>
            ))}
          </nav>
          <button className="icon-btn theme-btn" type="button" onClick={toggleTheme} aria-label="Switch colour theme">
            <Icon name="sun" size={20} className="sun" />
            <Icon name="moon" size={20} className="moon" />
          </button>
          <button className="icon-btn menu-btn" type="button" aria-expanded={open} aria-controls="nav" aria-label="Open menu" onClick={() => setOpen((o) => !o)}>
            <Icon name="menu" size={20} />
          </button>
        </div>
      </header>
    </>
  );
}
