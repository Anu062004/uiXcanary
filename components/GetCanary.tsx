import Image from "next/image";
import { Icon } from "./Icon";
import { Arrow } from "./Arrow";
import { Badge } from "./Badge";
import { ExtensionLink } from "./ExtensionLink";
import { REPO_URL, type Status } from "@/lib/content";

const LABELS: Status[] = ["ok", "part", "blk", "exp", "ni"];

export function GetCanary() {
  return (
    <section className="sec sec--card" id="get" aria-labelledby="get-h">
      <div className="container">
        <div className="sec-head rv">
          <p className="idx">04 — Get Canary</p>
          <div><h2 id="get-h">Get <b>Canary</b></h2></div>
        </div>
        <div className="get">
          <div className="card rv" style={{ "--d": 1 } as React.CSSProperties}>
            <figure className="get-fig">
              <Image src="/assets/images/get-extension.jpg" alt="A frosted teal glass shield in front of a glass browser window: a teal light line passes through while small red particles stop against the shield" fill sizes="(max-width: 860px) 100vw, 580px" />
            </figure>
            <div className="top"><span className="tile"><span className="bird" aria-hidden="true" /></span><h3>Browser extension</h3></div>
            <p>Works on any dapp. No changes needed.</p>
            <ExtensionLink className="get-btn get-btn--lg" />
            <dl className="specs">
              <div><dt>Build</dt><dd><code>cd extension &amp;&amp; npm install &amp;&amp; npm run build</code></dd></div>
              <div><dt>Load</dt><dd>Chrome <Arrow label="then" /> Extensions <Arrow label="then" /> Developer mode <Arrow label="then" /> <b>Load unpacked</b> <Arrow label="then" /> <code>extension/dist</code>.</dd></div>
              <div><dt>Use</dt><dd>Reload your dapp tabs. The popup shows what was protected, blocked or missed, and the site’s privacy label from ENS.</dd></div>
            </dl>
            <div className="get-foot get-foot--col">
              <span className="get-foot__label">Every request gets a label</span>
              <div className="row-wrap">{LABELS.map((s) => <Badge key={s} status={s} />)}</div>
            </div>
          </div>

          <div className="card rv" style={{ "--d": 2 } as React.CSSProperties}>
            <figure className="get-fig">
              <Image src="/assets/images/get-sdk.jpg" alt="A smiling white robot at a desk whose cables all run into one glowing teal gateway cube, leaving as a single cable" fill sizes="(max-width: 860px) 100vw, 580px" />
            </figure>
            <div className="top"><span className="tile"><Icon name="code" size={24} /></span><h3>Agent SDK and gateway</h3></div>
            <p>One local policy for any agent. Plugs into viem or ethers.</p>
            <dl className="specs">
              <div><dt>Gateway</dt><dd>Any language. Point <code>RPC_URL</code> at <code>127.0.0.1:18545</code> and <code>HTTPS_PROXY</code> at <code>:18080</code>.</dd></div>
              <div><dt>SDK</dt><dd>viem transport, ethers provider, and <code>llmFetch</code>, which turns wallets into <code>WALLET_1</code> before a prompt leaves.</dd></div>
              <div><dt>Policy</dt><dd>The agent’s ENS <code>privacy.manifest</code>. Undeclared hosts are blocked.</dd></div>
            </dl>
            <div className="code">
              <div className="code__bar"><span>agent.ts</span><span>viem</span></div>
              <pre>
                <span className="k">const</span> canary = <span className="k">await</span> createCanary({"{"}{"\n"}
                {"  "}gateway: <span className="s">&quot;http://127.0.0.1:18545&quot;</span>,{"\n"}
                {"  "}wallets: [<span className="s">&quot;0x1111…1111&quot;</span>]{"\n"}
                {"});"}{"\n"}
                <span className="k">const</span> client = createPublicClient({"{"}{"\n"}
                {"  "}chain: sepolia,{"\n"}
                {"  "}transport: canary.viemTransport(){"\n"}
                {"});"}
              </pre>
            </div>
            <div className="get-foot">
              <a className="btn btn--ghost" href={REPO_URL} target="_blank" rel="noopener">Read the SDK on GitHub<Icon name="arrowRight" /></a>
              <span className="row-wrap"><span className="chip">viem</span><span className="chip">ethers v6</span><span className="chip">Python</span></span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
