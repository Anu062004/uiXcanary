"use client";

import { useEffect, useRef, useState } from "react";
import { DEMO } from "@/lib/content";

const clock = (t: number) => `0:${String(Math.floor(t)).padStart(2, "0")}`;

export function Demo() {
  const video = useRef<HTMLVideoElement>(null);
  const [now, setNow] = useState(0);

  /* plays muted while it's on screen, until the viewer pauses it; under reduced motion it waits for play */
  useEffect(() => {
    const v = video.current;
    if (!v || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let seen = false, auto = true;
    const onPause = () => { if (seen) auto = false; };
    v.addEventListener("pause", onPause);
    const io = new IntersectionObserver(([e]) => {
      seen = e.isIntersecting;
      if (seen && auto) void v.play().catch(() => {});
      else if (!seen) v.pause();
    }, { threshold: 0.5 });
    io.observe(v);
    return () => { io.disconnect(); v.removeEventListener("pause", onPause); };
  }, []);

  const jump = (t: number) => {
    const v = video.current;
    if (!v) return;
    v.currentTime = t;
    void v.play().catch(() => {});
  };
  const current = DEMO.chapters.reduce((k, c, i) => (now >= c.at ? i : k), -1);

  return (
    <section className="sec" id="demo" aria-labelledby="demo-h">
      <div className="container">
        <div className="sec-head rv">
          <p className="idx">02 — Demo</p>
          <div><h2 id="demo-h">See it <b>work</b></h2></div>
        </div>
        <figure className="card demo rv">
          <video ref={video} src={DEMO.src} poster={DEMO.poster} width={1920} height={1080} muted playsInline loop controls preload="metadata"
            aria-describedby="demo-cap" onTimeUpdate={(e) => setNow(e.currentTarget.currentTime)} />
          <figcaption id="demo-cap">
            <ol>
              {DEMO.chapters.map((c, i) => (
                <li key={c.at}>
                  <button type="button" onClick={() => jump(c.at)} aria-current={i === current ? "step" : undefined}>
                    <b>{clock(c.at)}</b> {c.label}
                  </button>
                  <span>{c.text}</span>
                </li>
              ))}
            </ol>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
