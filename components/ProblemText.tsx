import { rich } from "./rich";
import { PROBLEM } from "@/lib/content";

/* The copy of 01 · The problem, shared by the phone card and the desktop sequence. */
export function ProblemText() {
  return (
    <>
      <p className="kicker"><b>{PROBLEM.num}</b><span>{PROBLEM.kind}</span></p>
      <h3>{PROBLEM.title}</h3>
      <p>{rich(PROBLEM.body)}</p>
      <dl className="specs leaks">
        {PROBLEM.leaks.map((l) => <div key={l.what}><dt>{l.what}</dt><dd>{l.where}</dd></div>)}
      </dl>
      <p className="aside">{PROBLEM.aside}</p>
    </>
  );
}
