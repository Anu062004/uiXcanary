import { Icon } from "./Icon";
import { EXTENSION_URL } from "@/lib/content";

/* Every "Get extension" button: the Chrome Web Store once EXTENSION_URL is set, the Get Canary section until then. */
export function ExtensionLink({ className }: { className: string }) {
  const external = EXTENSION_URL !== "";
  return (
    <a className={className} href={external ? EXTENSION_URL : "#get"} {...(external ? { target: "_blank", rel: "noopener" } : {})}>
      Get extension<Icon name="arrowUpRight" />
    </a>
  );
}
