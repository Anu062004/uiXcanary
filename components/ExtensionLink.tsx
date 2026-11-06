import { Icon } from "./Icon";
import { EXTENSION_URL } from "@/lib/content";

/*
  "Get extension" buttons. Once EXTENSION_URL (the Chrome Web Store listing) is set, every
  button goes there. Until then, the page's buttons lead to the install steps in Get Canary,
  and the button inside Get Canary (given `source`) says what it really is: build from source.
*/
export function ExtensionLink({ className, source }: { className: string; source?: string }) {
  if (EXTENSION_URL) {
    return <a className={className} href={EXTENSION_URL} target="_blank" rel="noopener">Get extension<Icon name="arrowUpRight" /></a>;
  }
  if (source) {
    return <a className={className} href={source} target="_blank" rel="noopener">Build from source<Icon name="arrowUpRight" /></a>;
  }
  return <a className={className} href="#get">Get extension<Icon name="arrowRight" /></a>;
}
