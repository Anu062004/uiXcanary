import Image from "next/image";
import { Badge } from "./Badge";
import { STEPS, type Status } from "@/lib/content";

/* Renders `code` and *emphasis* inside a line of copy. */
function rich(text: string) {
  return text.split(/(`[^`]+`|\*[^*]+\*)/).map((part, i) => {
    if (part.startsWith("`")) return <code key={i}>{part.slice(1, -1)}</code>;
    if (part.startsWith("*")) return <em key={i}>{part.slice(1, -1)}</em>;
    return part;
  });
}

export function Journal() {
  return (
    <section className="sec" id="journal" aria-labelledby="j-h">
      <div className="container">
        <div className="sec-head rv">
          <p className="idx">01 — Field notes</p>
          <div><h2 id="j-h">How it <b>works</b></h2></div>
        </div>

        <article className="card lead post rv" style={{ "--d": 1 } as React.CSSProperties}>
          <figure className="fig" data-fx>
            <Image src="/assets/images/note-1.jpg" alt="A frosted-glass teal bird perched on a glowing fibre-optic cable in a dark server corridor, with a thin red light leaking through a gap" fill sizes="(max-width: 860px) 100vw, 700px" />
          </figure>
          <div className="body">
            <p className="kicker"><b>01</b><span>The problem</span></p>
            <h3>Your dapp talks to strangers.</h3>
            <p>Dapps send reads straight from your browser to their own RPC provider, and often your address to analytics too. One <code>eth_getBalance</code> call hands over three things:</p>
            <dl className="specs leaks">
              <div><dt>Address</dt><dd>in the call’s parameters</dd></div>
              <div><dt>IP</dt><dd>in the connection</dd></div>
              <div><dt>App</dt><dd>in the provider URL or project key</dd></div>
            </dl>
            <p className="aside">Agents leak the same way, through their reads, API calls and LLM prompts.</p>
          </div>
        </article>

        <div className="steps-head rv"><p className="kicker"><b>02–05</b><span>How Canary fixes it</span></p></div>
        <div className="steps">
          {STEPS.map((s, i) => (
            <article key={s.num} className="card step rv" style={{ "--d": i + 1 } as React.CSSProperties}>
              <figure className="fig step__fig" data-fx>
                <Image src={s.image} alt={s.alt} fill sizes="(max-width: 860px) 100vw, 580px" />
              </figure>
              <div className="step__body">
                <p className="kicker"><b>{s.num}</b><span>{s.kind}</span></p>
                <h4>{s.title}</h4>
                <p>{rich(s.body)}</p>
                <p className="facts">
                  {s.kind === "Measure"
                    ? (s.facts as Status[]).map((st) => <Badge key={st} status={st} />)
                    : (s.facts as string[]).map((f) => <span key={f} className="chip">{f}</span>)}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
