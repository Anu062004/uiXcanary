import { Icon } from "./Icon";
import { SPONSORS } from "@/lib/content";

/* Official logos, unmodified: ENS (ensdomains/ens-app-v3), Uniswap (Uniswap/brand-assets), Ethereum (ethereum.org/assets).
   Plain <img>: the SVGs are served as-is, with no re-encoding. */
export function Sponsors() {
  return (
    <section className="sec" id="sponsors" aria-labelledby="sp-h">
      <div className="container">
        <div className="sec-head rv">
          <p className="idx">05 — Sponsors</p>
          <div>
            <h2 id="sp-h">Our <b>sponsors</b></h2>
            <p className="lede">We are grateful for the support of the organizations helping bring this experience to life.</p>
            <p className="spons-note">Prize sponsors of ETHGlobal Mumbai 2026, where Canary was built.</p>
          </div>
        </div>
        <ul className="spons rv" style={{ "--d": 1 } as React.CSSProperties}>
          {SPONSORS.map((s) => (
            <li key={s.name}>
              <a className="spon" href={s.href} target="_blank" rel="noopener">
                <span className="spon__plate">
                  {s.variant === "crop" ? (
                    <span className="spon__crop"><img src={s.logo} alt="" width={s.w} height={s.h} /></span>
                  ) : (
                    <img className={`spon__logo${s.variant === "ens" ? " spon__logo--ens" : ""}`} src={s.logo} alt="" width={s.w} height={s.h} />
                  )}
                </span>
                <span className="spon__meta"><span className="spon__name">{s.name}</span><span className="spon__url">{s.domain}<Icon name="arrowUpRight" /></span></span>
                <span className="sr-only">(opens in a new tab)</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
