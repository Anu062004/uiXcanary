import { Icon } from "./Icon";
import { SwapStory } from "./SwapStory";
import { REPO_URL, SWAP_URL } from "@/lib/content";

/* Canary Swap (official repo: swap/). The request bodies are from the recorded scan of
   app.uniswap.org (test-artifacts/scans/quote/) and from the page's own V4 Quoter call. */
export function Swap() {
  return (
    <section className="sec" id="swap" aria-labelledby="sw-h">
      <div className="container">
        <div className="sec-head rv">
          <p className="idx">04 — Canary Swap</p>
          <div>
            <h2 id="sw-h">Quote <b>without your address</b></h2>
            <p className="lede">Asking app.uniswap.org for a quote sends your address to Uniswap’s server as <code>swapper</code>, with the tokens and the amount, before you sign anything. Canary Swap asks the chain instead.</p>
          </div>
        </div>
      </div>
      <SwapStory />
      <div className="container">
        <div className="get">
          <div className="card" data-pop="0">
            <div className="top"><span className="tile"><Icon name="swap" size={24} /></span><h3>Canary Swap</h3></div>
            <p>Uniswap v4 quotes read from the chain, and swaps through the Universal Router. No quote API, and no address in the request.</p>
            <a className="get-btn get-btn--lg" href={SWAP_URL} target="_blank" rel="noopener">Open Canary Swap<Icon name="arrowUpRight" /></a>
            <dl className="specs">
              <div><dt>Quote</dt><dd>An <code>eth_call</code> to the v4 Quoter with the pool key and the amount. The page shows every request a quote sent, decoded, and checks that your address is in none of them.</dd></div>
              <div><dt>Swap</dt><dd>One Universal Router transaction (<code>V4_SWAP</code>) that your wallet signs, on our ETH/CNRY pool on Sepolia. On Ethereum it quotes the ETH/USDC pools.</dd></div>
              <div><dt>ENS</dt><dd><code>swap.canary.eth</code> declares one recipient, the public RPC. The verifier scanned the site and signed the verdict: <b>matches</b>.</dd></div>
              <div><dt>Agents</dt><dd>The same swap through the Canary gateway, with the signed transaction sent over anon-rpc.</dd></div>
            </dl>
            <div className="get-foot">
              <a className="btn btn--ghost" href={`${REPO_URL}/tree/main/swap`} target="_blank" rel="noopener">Read the code on GitHub<Icon name="arrowRight" /></a>
              <span className="row-wrap"><span className="chip">V4 Quoter</span><span className="chip">StateView</span><span className="chip">Permit2</span></span>
            </div>
          </div>

          <div className="card" data-pop="1">
            <div className="top"><span className="tile"><Icon name="eye" size={24} /></span><h3>What a quote sends</h3></div>
            <p>The same 1 ETH → USDC quote on Ethereum, two ways. Recorded from app.uniswap.org with a synthetic wallet.</p>
            <div className="code">
              <div className="code__bar"><span>app.uniswap.org</span><span>POST /quote</span></div>
              <pre>
                {"{"}{"\n"}
                {"  "}<span className="s">&quot;type&quot;</span>: <span className="s">&quot;EXACT_INPUT&quot;</span>,{"\n"}
                {"  "}<span className="s">&quot;amount&quot;</span>: <span className="s">&quot;1000000000000000000&quot;</span>,{"\n"}
                {"  "}<span className="s">&quot;tokenIn&quot;</span>: <span className="s">&quot;0x0000…0000&quot;</span>,{"\n"}
                {"  "}<span className="s">&quot;tokenOut&quot;</span>: <span className="s">&quot;0xA0b8…eB48&quot;</span>,{"\n"}
                {"  "}<span className="x">&quot;swapper&quot;: &quot;0xA683…d4b8&quot;</span>{"  "}<span className="c">{"// the wallet"}</span>{"\n"}
                {"}"}
              </pre>
            </div>
            <div className="code">
              <div className="code__bar"><span>Canary Swap</span><span>eth_call → V4 Quoter</span></div>
              <pre>
                <span className="k">quoteExactInputSingle</span>({"{"}{"\n"}
                {"  "}poolKey: {"{"} <span className="s">0x0000…0000</span>, <span className="s">0xA0b8…eB48</span>, <span className="s">500</span>, <span className="s">10</span> {"}"},{"\n"}
                {"  "}zeroForOne: <span className="k">true</span>,{"\n"}
                {"  "}exactAmount: <span className="s">1000000000000000000</span>{"\n"}
                {"})"}{"  "}<span className="c">{"// no address"}</span>
              </pre>
            </div>
            <p>In our runs both came to about 2,236 USDC. With the Canary extension, the page’s reads go over anon-rpc too, so the RPC doesn’t see your IP either.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
