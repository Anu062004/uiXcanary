"use client";

import { useEffect } from "react";

/* Sections marked .rv fade up as they enter the viewport (skipped under reduced motion). */
export function Reveal() {
  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const els = Array.from(document.querySelectorAll<HTMLElement>(".rv"));
    els.forEach((el) => { if (el.getBoundingClientRect().top > innerHeight * 0.92) el.classList.add("is-pending"); });
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.remove("is-pending"); io.unobserve(e.target); } }),
      { rootMargin: "0px 0px -8% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
  return null;
}
