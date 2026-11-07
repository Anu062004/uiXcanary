import Image from "next/image";
import { Icon } from "./Icon";
import { Badge } from "./Badge";
import { ExtensionLink } from "./ExtensionLink";
import { rich } from "./rich";
import { Deck } from "./Deck";
import { GET_CANARY } from "@/lib/content";

/* Light syntax colouring for the snippet: keywords and strings. */
function highlight(code: string) {
  return code.split(/("[^"]*"|\bconst\b|\bawait\b)/).map((part, i) =>
    part.startsWith('"') ? <span key={i} className="s">{part}</span>
      : part === "const" || part === "await" ? <span key={i} className="k">{part}</span>
      : part,
  );
}

export function GetCanary() {
  const { extension: ext, agent } = GET_CANARY;
  return (
    <section className="sec sec--card" id="get" aria-labelledby="get-h">
      <div className="container">
        <div className="sec-head rv">
          <p className="idx">05 — Get Canary</p>
          <div><h2 id="get-h">Get <b>Canary</b></h2></div>
        </div>
        <Deck>
          <div className="card deck__card" data-pop="0">
            <figure className="get-fig" data-fx>
              <Image src={ext.image} alt={ext.alt} fill sizes="(max-width: 860px) 100vw, 580px" />
              <figcaption className="get-tag"><b>01</b> For people</figcaption>
            </figure>
            <div className="deck__body">
            <div className="top">
              <span className="tile"><span className="bird" aria-hidden="true" /></span>
              <div><p className="get-kick">Chrome · built from source</p><h3>{ext.title}</h3></div>
            </div>
            <p className="get-lede">{ext.lede}</p>
            <ExtensionLink className="get-btn get-btn--lg" source={ext.source} />
            <dl className="specs specs--steps">
              {ext.steps.map((s) => <div key={s.k}><dt>{s.k}</dt><dd>{rich(s.v)}</dd></div>)}
            </dl>
            <div className="get-foot get-foot--col get-panel">
              <span className="get-foot__label">Every request gets a label</span>
              <div className="row-wrap">{ext.labels.map((s) => <Badge key={s} status={s} />)}</div>
            </div>
            </div>
          </div>

          <div className="card deck__card" data-pop="1">
            <figure className="get-fig" data-fx>
              <Image src={agent.image} alt={agent.alt} fill sizes="(max-width: 860px) 100vw, 580px" />
              <figcaption className="get-tag"><b>02</b> For agents</figcaption>
            </figure>
            <div className="deck__body">
            <div className="top">
              <span className="tile"><Icon name="code" size={24} /></span>
              <div><p className="get-kick">viem · ethers · any language</p><h3>{agent.title}</h3></div>
            </div>
            <p className="get-lede">{agent.lede}</p>
            <dl className="specs">
              {agent.specs.map((s) => <div key={s.k}><dt>{s.k}</dt><dd>{rich(s.v)}</dd></div>)}
            </dl>
            <div className="code">
              <div className="code__bar"><span className="code__dots" aria-hidden="true"><i /><i /><i /></span><span>{agent.file}</span><span>viem</span></div>
              <pre>{highlight(agent.code)}</pre>
            </div>
            <div className="get-foot get-foot--rule">
              <a className="btn btn--ghost" href={agent.source} target="_blank" rel="noopener">Read the SDK on GitHub<Icon name="arrowRight" /></a>
              <span className="row-wrap">{agent.works.map((w) => <span key={w} className="chip">{w}</span>)}</span>
            </div>
            </div>
          </div>
        </Deck>
      </div>
    </section>
  );
}
