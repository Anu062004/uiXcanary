import { Icon } from "./Icon";
import { ExtensionLink } from "./ExtensionLink";
import { REPO_URL } from "@/lib/content";

export function Footer() {
  return (
    <footer className="foot" aria-labelledby="foot-h">
      <h2 id="foot-h" className="sr-only">Site footer</h2>
      <div className="container">
        <div className="foot__top">
          <div className="foot__brand">
            <a className="logo" href="#top" aria-label="Canary home"><span className="bird" aria-hidden="true" /><b>Canary</b></a>
            <p className="foot__tag">Privacy <b>made visible.</b></p>
            <ExtensionLink className="get-btn get-btn--dark" />
          </div>
          <nav className="foot__cols" aria-label="Footer">
            <div>
              <p className="foot__h">product</p>
              <a href="#journal">how it works</a>
              <a href="#evidence">evidence</a>
              <a href="#get">get canary</a>
            </div>
            <div>
              <p className="foot__h">project</p>
              <a href={REPO_URL} target="_blank" rel="noopener">github<Icon name="arrowUpRight" /></a>
              <a href="#sponsors">sponsors</a>
              <span className="foot__note">ETHGlobal Mumbai 2026</span>
            </div>
          </nav>
        </div>
        <svg className="foot__word" viewBox="0 0 1000 150" aria-hidden="true" preserveAspectRatio="xMidYMid meet">
          <defs>
            <linearGradient id="fw" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#00C9B7" stopOpacity=".22" />
              <stop offset=".9" stopColor="#00C9B7" stopOpacity="0" />
            </linearGradient>
          </defs>
          <text x="0" y="132" textLength="1000" lengthAdjust="spacingAndGlyphs" fill="url(#fw)" stroke="#294D58" strokeWidth="1.2">CANARY</text>
        </svg>
        <div className="foot__bar">
          <span>© 2026 Canary</span>
          <span className="foot__fine">Protection covers observed traffic. The dapp still sees the address you give it.</span>
          <a className="foot__up" href="#top">back to top<Icon name="arrowUp" /></a>
        </div>
      </div>
    </footer>
  );
}
