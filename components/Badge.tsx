import { Icon } from "./Icon";
import { STATUS, type Status } from "@/lib/content";

export function Badge({ status, children }: { status: Status; children?: React.ReactNode }) {
  const s = STATUS[status];
  return (
    <span className={`badge b-${status}`}>
      <Icon name={s.icon} />
      {children ?? s.label}
    </span>
  );
}
