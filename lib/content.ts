import type { IconName } from "@/components/Icon";

export const REPO_URL = "https://github.com/SCARPxVeNOM/canary_repo";
export const SWAP_URL = "https://canary-swap.vercel.app";

/* Set your Chrome Web Store URL here once; every "Get extension" button uses it. */
export const EXTENSION_URL = "";

export type Status = "ok" | "part" | "blk" | "exp" | "ni";

export const STATUS: Record<Status, { label: string; icon: IconName }> = {
  ok: { label: "Protected", icon: "shield" },
  part: { label: "IP only", icon: "globe" },
  blk: { label: "Blocked", icon: "ban" },
  exp: { label: "Exposed", icon: "alert" },
  ni: { label: "Not inspected", icon: "eyeOff" },
};

export const NAV = [
  { id: "top", label: "Home" },
  { id: "journal", label: "How it works" },
  { id: "evidence", label: "Evidence" },
  { id: "swap", label: "Swap" },
  { id: "get", label: "Get Canary" },
  { id: "sponsors", label: "Sponsors" },
] as const;

export type Orb = {
  key: "a" | "b" | "c";
  kicker: string;
  title: string;
  description: string;
  status: Status;
  depth: number;
  speed: number;
  spread: number;
};

export const ORBS: Orb[] = [
  { key: "a", kicker: "Enforce", title: "Private reads", description: "Dapp RPC reads go over Tor. The endpoint sees an exit relay, not you.", status: "ok", depth: 16, speed: -0.22, spread: -0.04 },
  { key: "b", kicker: "Block", title: "Blocked leaks", description: "Trackers carrying your wallet address stop at the edge.", status: "blk", depth: 28, speed: 0.12, spread: -0.22 },
  { key: "c", kicker: "Measure", title: "Measured coverage", description: "Every request counted, gaps included.", status: "ni", depth: 22, speed: -0.42, spread: 0.2 },
];

export type Step = {
  num: string;
  kind: string;
  image: string;
  alt: string;
  title: string;
  /** `code` and *emphasis* are rendered as such */
  body: string;
  facts: string[] | Status[];
};

export const STEPS: Step[] = [
  {
    num: "02", kind: "Enforce", image: "/assets/images/note-2.jpg",
    alt: "Three translucent glass rings in a row with a single teal light beam passing through all of them",
    title: "Reads go over Tor.",
    body: "Standard reads are answered from Canary’s own endpoint through anon-rpc and tor-js. The dapp’s provider never sees them, and the endpoint sees an exit relay, not you.",
    facts: ["circuit per wallet", "15 ms batching", "3 s retry", "69 chains"],
  },
  {
    num: "03", kind: "Block", image: "/assets/images/note-3.jpg",
    alt: "A white paper strip stopped against a thick frosted blue glass pane",
    title: "Leaks stop at the edge.",
    body: "Canary wraps fetch, XHR and WebSocket. Third-party requests that carry your address are refused, and browser rules catch tracking pixels.",
    facts: ["exact matching", "checksummed · padded · base64"],
  },
  {
    num: "04", kind: "Measure", image: "/assets/images/note-4.jpg",
    alt: "Five frosted glass blocks of different heights: teal, amber, blue, grey and rust",
    title: "Every request counted.",
    body: "Each request gets a label and a receipt of what each side saw. *Not inspected* never counts as protected, and if the private route fails, the request fails closed. When a site gets your address, Canary shows its privacy label from ENS.",
    facts: ["ok", "part", "blk", "ni"] as Status[],
  },
  {
    num: "05", kind: "Agents", image: "/assets/images/note-5.jpg",
    alt: "A white robotic hand holding a blank card partly covered by a teal label",
    title: "Agents follow a policy.",
    body: "A local gateway enforces the agent’s ENS `privacy.manifest` and blocks undeclared hosts. `llmFetch` turns wallets into `WALLET_1` before a prompt leaves.",
    facts: ["viem", "ethers", "any language"],
  },
];

/* Recorded scans, 6 Nov 2026 (official repo: test-artifacts/scans/RESULTS.md). */
export const EVIDENCE = [
  { dapp: "Aave", note: "Custom first-party RPC envelope; 11 direct calls remained", before: 3, after: 0, routed: 15 },
  { dapp: "ENS app", note: "Address-bearing indexer traffic blocked", before: 2, after: 0, routed: 100 },
  { dapp: "Uniswap", note: "No third-party recipient at baseline", before: 0, after: 0, routed: 100 },
  { dapp: "revoke.cash", note: "Four failed-closed calls recorded", before: 3, after: 0, routed: 100 },
  { dapp: "Snapshot", note: "Profile and avatar calls among blocked traffic", before: 4, after: 0, routed: 100 },
];

/* Stress run of the extension on Canary Swap, 6 Nov 2026 (official repo: swap/test/stress.mjs, test-artifacts/swap/stress-canary.json). */
export const STRESS = { calls: 651, checked: 397, requests: 269, mean: "1.4 s", p95: "1.8 s" };

export const SPONSORS = [
  { name: "ENS", href: "https://ens.domains", domain: "ens.domains", logo: "/assets/sponsors/ens.svg", w: 300, h: 94, variant: "ens" as const },
  { name: "Uniswap Foundation", href: "https://uniswap.org", domain: "uniswap.org", logo: "/assets/sponsors/uniswap.svg", w: 1001, h: 251, variant: "plain" as const },
  { name: "Ethereum Foundation", href: "https://ethereum.org", domain: "ethereum.org", logo: "/assets/sponsors/ethereum.svg", w: 1920, h: 1080, variant: "crop" as const },
];
