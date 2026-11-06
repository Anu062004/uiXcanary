import Image from "next/image";
import { Badge } from "./Badge";
import { Arrow } from "./Arrow";
import { LeakCount } from "./LeakCount";
import { EVIDENCE, STRESS } from "@/lib/content";

export function Evidence() {
  return (
    <section className="sec sec--card" id="evidence" aria-labelledby="ev-h">
      <div className="container">
        <div className="sec-head rv">
          <p className="idx">02 — Evidence</p>
          <div>
            <h2 id="ev-h">The <b>evidence</b></h2>
            <p className="lede">Recorded scans and runs, 6 Nov 2026. Not live data.</p>
          </div>
        </div>
        <div className="ev">
          <article className="card ev-lead rv">
            <figure className="ev-fig">
              <Image src="/assets/images/evidence.jpg" alt="Rust-red glass beads stopped against a frosted teal glass pane, with clean empty space beyond it" fill sizes="(max-width: 860px) 100vw, 700px" />
            </figure>
            <div className="stat">
              <span className="sample" style={{ alignSelf: "flex-start" }}>RECORDED · 6 NOV 2026</span>
              <LeakCount from={12} />
              <p>Third-party address leaks across five dapps, before and after.</p>
              <ul>
                <li><Badge status="ok">4 of 5 dapps: 100% RPC routed</Badge></li>
                <li><Badge status="part">Aave: 15% (custom envelope)</Badge></li>
              </ul>
            </div>
          </article>
          <div className="card rv" id="ev-table" style={{ "--d": 1 } as React.CSSProperties}>
            <div className="table-wrap">
              <table>
                <thead><tr><th scope="col">Dapp</th><th scope="col">Recipients</th><th scope="col">RPC routed by Canary</th></tr></thead>
                <tbody>
                  {EVIDENCE.map((r, k) => (
                    <tr key={r.dapp}>
                      <td className="n">{r.dapp}<small>{r.note}</small></td>
                      <td className="m">{r.before} <Arrow /> {r.after}</td>
                      <td>
                        <span className="bar" style={{ "--d": k } as React.CSSProperties}>
                          <i style={{ "--w": `${r.routed}%` } as React.CSSProperties} />{r.routed}%
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="note">Synthetic wallet; load, connect and scroll flows. Not a safety score.</p>
          </div>
          <article className="card ev-run rv" style={{ "--d": 2 } as React.CSSProperties} aria-label="Stress run">
            <div className="stat">
              <span className="sample" style={{ alignSelf: "flex-start" }}>STRESS RUN · 6 NOV 2026</span>
              <p className="big"><span>{STRESS.calls}</span></p>
              <p>calls from one page answered through anon-rpc: 10 Sepolia swaps, 30 quotes on two chains, and bursts to 11 RPC URLs.</p>
              <ul><li><Badge status="ok">0 failed closed · 0 direct</Badge></li></ul>
            </div>
            <div className="stat">
              <span className="sample" style={{ alignSelf: "flex-start" }}>CHECKED</span>
              <p className="big">{STRESS.checked}</p>
              <p>of them checked against the same call sent straight to the node, at the same block. None differed.</p>
            </div>
            <div className="stat">
              <span className="sample" style={{ alignSelf: "flex-start" }}>LATENCY</span>
              <p className="big">{STRESS.mean}</p>
              <p>mean per request over Tor, across {STRESS.requests} requests fired in bursts. p95 {STRESS.p95}.</p>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
