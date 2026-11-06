import type { IconName } from "@/components/Icon";

export const REPO_URL = "https://github.com/SCARPxVeNOM/canary_repo";
export const SWAP_URL = "https://canary-swap.vercel.app";

/* Canary Swap story: three full-screen images, one after another (components/SwapStory.tsx).
   tone: the image's brightness, so the caption picks readable colours. */
export const SWAP_STORY = [
  {
    image: "/assets/images/swap.jpg", tone: "light" as const,
    alt: "Two frosted glass coins pass each other along a teal light line through a glass arch, while a rust-red paper tag lies left behind on the near side",
    kicker: "Canary Swap", title: "Quote without your address.",
    body: "The swap goes through. Your address stays behind.",
  },
  {
    image: "/assets/images/swap-quote.jpg", tone: "dark" as const,
    alt: "A glass instrument with a teal gauge hovers over a frosted teal coin on a glass rail, joined only by a single vertical light line",
    kicker: "Quote", title: "The price comes from the chain.",
    body: "An `eth_call` to the Uniswap v4 Quoter with the pool key and the amount. No quote API sees who is asking.",
  },
  {
    image: "/assets/images/swap-compare.jpg", tone: "light" as const,
    alt: "Two glass tiles side by side: the frosted left one holds a glowing rust-red bead, the clear right one with a teal edge is empty",
    kicker: "What a quote sends", title: "Same price. One less secret.",
    body: "app.uniswap.org sends your wallet as `swapper`. Canary Swap sends no address. In our runs both came to about 2,236 USDC.",
  },
];

/* Set your Chrome Web Store URL here once; every "Get extension" button uses it. */
export const EXTENSION_URL = "";

export type Status = "ok" | "part" | "blk" | "exp" | "ni";

export const STATUS: Record<Status, { label: string; icon: IconName }> = {
  ok: { label: "Protected", icon: "shield" },
  part: { label: "IP only", icon: "globe" },
  blk: { label: "Blocked", icon: "ban" },
  exp: { label: "Detected, unprotected", icon: "alert" },
  ni: { label: "Not inspected", icon: "eyeOff" },
};

export const NAV = [
  { id: "top", label: "Home" },
  { id: "journal", label: "How it works" },
  { id: "demo", label: "Demo" },
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

/* 01 · the problem: the lead card on phones, the first slide of the sequence on desktop */
export const PROBLEM = {
  num: "01",
  kind: "The problem",
  image: "/assets/images/note-1.jpg",
  alt: "A frosted-glass teal bird perched on a glowing fibre-optic cable in a dark server corridor, with a thin red light leaking through a gap",
  title: "Your dapp talks to strangers.",
  body: "Dapps send reads straight from your browser to their own RPC provider, and often your address to analytics too. One `eth_getBalance` call hands over three things:",
  leaks: [
    { what: "Address", where: "in the call’s parameters" },
    { what: "IP", where: "in the connection" },
    { what: "App", where: "in the provider URL or project key" },
  ],
  aside: "Agents leak the same way, through their reads, API calls and LLM prompts.",
};

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

/* The 40-second demo, recorded live on 6 Nov 2026 (official repo: demo-video/: Playwright footage, ffmpeg, Remotion). No sound. */
export const DEMO = {
  src: "/assets/video/canary-demo.mp4",
  poster: "/assets/video/canary-demo.jpg",
  chapters: [
    { at: 3.5, label: "Without Canary", text: "On connect, LeakyDash's tracker and RPC provider get your address." },
    { at: 11.5, label: "With Canary", text: "The privacy label from ENS on connect; the tracker gets nothing, the provider sees a Tor exit." },
    { at: 19.5, label: "The popup", text: "Overview, Activity and Manifest for the same page." },
    { at: 25.5, label: "Canary Swap", text: "A Uniswap v4 quote over eth_call, with no address in any request." },
    { at: 33.5, label: "Stress run", text: "651 RPC calls, all through anon-rpc; 0 failed closed or sent direct." },
  ],
};

export const SPONSORS = [
  { name: "ENS", href: "https://ens.domains", domain: "ens.domains", logo: "/assets/sponsors/ens.svg", w: 300, h: 94, variant: "ens" as const },
  { name: "Uniswap Foundation", href: "https://uniswap.org", domain: "uniswap.org", logo: "/assets/sponsors/uniswap.svg", w: 1001, h: 251, variant: "plain" as const },
  { name: "Ethereum Foundation", href: "https://ethereum.org", domain: "ethereum.org", logo: "/assets/sponsors/ethereum.svg", w: 1920, h: 1080, variant: "crop" as const },
];

/* Get Canary. Every line here is checked against the official repo's READMEs
   (README.md quick start, extension/README.md, packages/gateway, packages/agent). */
export const GET_CANARY = {
  extension: {
    image: "/assets/images/get-extension.jpg",
    alt: "A frosted teal glass shield in front of a glass browser window: a teal light line passes through while small red particles stop against the shield",
    title: "Browser extension",
    lede: "Works with dapps as they are: no fork, no changes. What it covers is measured, gaps included.",
    source: `${REPO_URL}/tree/main/extension`,
    steps: [
      { k: "Gateway", v: "Run a tor-js gateway first: one Docker container from `gateway/`. The build points Canary at it." },
      { k: "Build", v: "`cd extension && npm install && npm run build`" },
      { k: "Load", v: "Chrome → Extensions → Developer mode → **Load unpacked** → `extension/dist`. Use a separate Chrome profile: it runs on every site." },
      { k: "Use", v: "Reload your dapp tabs. The popup shows what was protected, blocked or missed, and the site’s privacy label from ENS." },
    ],
    labels: ["ok", "part", "blk", "exp", "ni"] as Status[],
  },
  agent: {
    image: "/assets/images/get-sdk.jpg",
    alt: "A smiling white robot at a desk whose cables all run into one glowing teal gateway cube, leaving as a single cable",
    title: "Agent SDK and gateway",
    lede: "One local policy for any agent. The SDK plugs into viem or ethers.",
    source: `${REPO_URL}/tree/main/packages/agent`,
    specs: [
      { k: "Gateway", v: "Any language. Point the RPC URL at `127.0.0.1:18545/<chainId>` and `HTTPS_PROXY` at `127.0.0.1:18080`." },
      { k: "SDK", v: "viem transport, ethers provider, and `llmFetch`, which turns wallets into `WALLET_1` before a prompt leaves." },
      { k: "Policy", v: "The agent’s ENS `privacy.manifest`. Undeclared hosts are blocked." },
    ],
    file: "agent.ts",
    code: `const canary = await createCanary({
  gateway: "http://127.0.0.1:18545",
  wallets: [account.address]
});
const client = createPublicClient({
  chain: sepolia,
  transport: canary.viemTransport()
});`,
    works: ["viem", "ethers v6", "Python via gateway"],
  },
};
