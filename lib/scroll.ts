/*
  One shared scroll loop for every scroll-linked effect on the page.

  Effects register a `measure` (runs on load, resize and whenever the page's height changes;
  the only place layout is read) and a `frame` (runs at most once per animation frame while
  scrolling; must only write styles, computing from the cached measurements + scrollY).
  Keeping all reads out of the scroll frame avoids forced layouts, which were what made
  scrolling hitch.
*/
type Effect = { measure?: () => void; frame: (y: number, vh: number) => void };

const effects = new Set<Effect>();
let raf = 0, dirty = true, started = false;

const run = () => {
  raf = 0;
  const vh = innerHeight;
  if (dirty) { dirty = false; effects.forEach((e) => e.measure?.()); }
  const y = scrollY;
  effects.forEach((e) => e.frame(y, vh));
};
const kick = () => { if (!raf) raf = requestAnimationFrame(run); };
const remeasure = () => { dirty = true; kick(); };

function start() {
  if (started) return;
  started = true;
  addEventListener("scroll", kick, { passive: true });
  addEventListener("resize", remeasure);
  addEventListener("load", remeasure);
  new ResizeObserver(remeasure).observe(document.body);
}

export function onScrollFrame(effect: Effect) {
  start();
  effects.add(effect);
  remeasure();
  return () => { effects.delete(effect); };
}

/* An element's top edge in page coordinates (call from `measure` only). */
export const pageTop = (el: Element) => el.getBoundingClientRect().top + scrollY;

export const clamp01 = (x: number) => Math.min(1, Math.max(0, x));
export const smooth = (x: number) => { const k = clamp01(x); return k * k * (3 - 2 * k); };
