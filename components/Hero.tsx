"use client";

import { useEffect, useRef, useState } from "react";
import { Icon } from "./Icon";
import { Badge } from "./Badge";
import { ExtensionLink } from "./ExtensionLink";
import { ORBS, REPO_URL, type Orb } from "@/lib/content";
import { onScrollFrame } from "@/lib/scroll";

export function Hero() {
  const [active, setActive] = useState<Orb | null>(null);
  const [pinned, setPinned] = useState<Orb | null>(null);
  const [touch, setTouch] = useState(false);
  const orbRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const bodyRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const copy = useRef<HTMLDivElement>(null);

  useEffect(() => { setTouch(matchMedia("(hover: none)").matches); }, []);

  /* tap or click elsewhere, or Escape, closes the open sphere */
  useEffect(() => {
    const close = () => { setPinned(null); setActive(null); };
    const onClick = (e: MouseEvent) => { if (!(e.target as HTMLElement).closest(".orb")) close(); };
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") close(); };
    document.addEventListener("click", onClick);
    addEventListener("keydown", onKey);
    return () => { document.removeEventListener("click", onClick); removeEventListener("keydown", onKey); };
  }, []);

  /* parallax: spheres drift with the pointer and scroll; the copy lifts and fades as you leave the hero */
  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const coarse = matchMedia("(hover: none)").matches;
    let y = scrollY, vh = innerHeight, mx = 0, my = 0, tmx = 0, tmy = 0, raf = 0;
    const paint = () => {
      if (y > vh * 1.5) return; // hero is off screen: nothing to move
      const p = Math.min(y / vh, 1.4);
      ORBS.forEach((o, i) => {
        const el = orbRefs.current[i];
        if (!el) return;
        const tx = mx * o.depth + o.spread * y, ty = my * o.depth + o.speed * y;
        el.style.transform = `translate3d(${tx.toFixed(1)}px,${ty.toFixed(1)}px,0) scale(${(1 + p * 0.16).toFixed(3)})`;
      });
      if (copy.current) {
        copy.current.style.transform = `translate3d(0,${(y * 0.3).toFixed(1)}px,0)`;
        copy.current.style.opacity = Math.max(0, 1 - p * 1.25).toFixed(3);
      }
    };
    /* pointer drift eases toward the pointer, and the loop stops once it has caught up */
    const drift = () => {
      raf = 0;
      mx += (tmx - mx) * 0.08; my += (tmy - my) * 0.08;
      if (Math.abs(tmx - mx) < 0.001 && Math.abs(tmy - my) < 0.001) { mx = tmx; my = tmy; }
      paint();
      if (mx !== tmx || my !== tmy) raf = requestAnimationFrame(drift);
    };
    const onMove = (e: PointerEvent) => {
      if (scrollY > innerHeight * 1.5) return;
      tmx = (e.clientX / innerWidth - 0.5) * -1; tmy = (e.clientY / innerHeight - 0.5) * -1;
      if (!raf) raf = requestAnimationFrame(drift);
    };
    if (!coarse) addEventListener("pointermove", onMove, { passive: true });
    const stop = onScrollFrame({ frame: (sy, h) => { y = sy; vh = h; paint(); } });
    return () => { stop(); cancelAnimationFrame(raf); removeEventListener("pointermove", onMove); };
  }, []);

  const highlight = (i: number, e?: React.PointerEvent) => {
    const body = bodyRefs.current[i], el = orbRefs.current[i];
    if (!body || !el) return;
    if (!e) { body.style.setProperty("--hx", "32%"); body.style.setProperty("--hy", "26%"); return; }
    const r = el.getBoundingClientRect();
    body.style.setProperty("--hx", `${Math.round(18 + ((e.clientX - r.left) / r.width) * 50)}%`);
    body.style.setProperty("--hy", `${Math.round(14 + ((e.clientY - r.top) / r.height) * 44)}%`);
  };

  const shown = active ?? pinned;
  /* the panel keeps the last sphere while it fades out */
  const last = useRef<Orb>(ORBS[0]);
  if (shown) last.current = shown;
  const info = last.current;

  return (
    <section className={`hero${shown ? " has-hover" : ""}`} id="top" aria-label="Canary">
      <div className="orbs">
        {ORBS.map((o, i) => (
          <button
            key={o.key}
            ref={(el) => { orbRefs.current[i] = el; }}
            type="button"
            className={`orb orb--${o.key}${pinned === o ? " is-open" : ""}${shown === o ? " is-active" : ""}`}
            aria-label={o.title}
            aria-pressed={pinned === o}
            onPointerEnter={(e) => { if (e.pointerType !== "touch") setActive(o); }}
            onPointerLeave={(e) => { if (e.pointerType === "touch") return; setActive(null); highlight(i); }}
            onPointerMove={(e) => { if (e.pointerType !== "touch") highlight(i, e); }}
            onFocus={() => setActive(o)}
            onBlur={() => setActive(null)}
            onClick={() => setPinned((p) => (p === o ? null : o))}
          >
            <span className="orb__shadow" aria-hidden="true" />
            <span className="ball"><span className="ball__body" ref={(el) => { bodyRefs.current[i] = el; }} /></span>
          </button>
        ))}
      </div>

      <div className="stage container">
        <div className="copy" ref={copy}>
          <div className="copy-stack">
            <div className="copy-in">
              <h1 className="title in" style={{ "--d": 2 } as React.CSSProperties}>
                <span className="line line--a"><span>Privacy</span></span>
                <span className="line line--b"><span>made visible</span></span>
              </h1>
              <p className="sub in" style={{ "--d": 3 } as React.CSSProperties}>Private reads. Blocked leaks. Every request counted.</p>
              <p className="hint-line in" style={{ "--d": 4 } as React.CSSProperties}>{touch ? "Tap" : "Hover"} a sphere to see what Canary does.</p>
            </div>
            <div className="orb-info" aria-live="polite" aria-hidden={!shown}>
              <p className="orb-info__k">{info.kicker} · 0{ORBS.indexOf(info) + 1} / 03</p>
              <p className="orb-info__t">{info.title}</p>
              <p className="orb-info__d">{info.description}</p>
              <span className="orb-info__b"><Badge status={info.status} /></span>
            </div>
          </div>
        </div>
      </div>

      <div className="hero-foot container in" style={{ "--d": 6 } as React.CSSProperties}>
        <span className="follow">follow us:
          <a href={REPO_URL} target="_blank" rel="noopener" aria-label="Canary on GitHub"><Icon name="github" size={20} /></a>
        </span>
        <a className="scroll-cue" href="#journal"><i aria-hidden="true" />Scroll</a>
        <ExtensionLink className="get-btn" />
      </div>
    </section>
  );
}
