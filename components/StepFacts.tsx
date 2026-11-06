import { Badge } from "./Badge";
import type { Status, Step } from "@/lib/content";

export function StepFacts({ step }: { step: Step }) {
  return (
    <p className="facts">
      {step.kind === "Measure"
        ? (step.facts as Status[]).map((st) => <Badge key={st} status={st} />)
        : (step.facts as string[]).map((f) => <span key={f} className="chip">{f}</span>)}
    </p>
  );
}
