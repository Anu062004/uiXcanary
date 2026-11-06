import Image from "next/image";
import { rich } from "./rich";
import { StepFacts } from "./StepFacts";
import { StepSequence } from "./StepSequence";
import { ProblemText } from "./ProblemText";
import { PROBLEM, STEPS } from "@/lib/content";

export function Journal() {
  return (
    <section className="sec" id="journal" aria-labelledby="j-h">
      <div className="container">
        <div className="sec-head rv">
          <p className="idx">01 — Field notes</p>
          <div><h2 id="j-h">How it <b>works</b></h2></div>
        </div>

        <StepSequence />
        {/* phones and reduced motion: the problem card, then the steps as a card list */}
        <article className="card lead post rv" style={{ "--d": 1 } as React.CSSProperties}>
          <figure className="fig" data-fx>
            <Image src={PROBLEM.image} alt={PROBLEM.alt} fill sizes="(max-width: 860px) 100vw, 700px" />
          </figure>
          <div className="body"><ProblemText /></div>
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
                <StepFacts step={s} />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
