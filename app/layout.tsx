import type { Metadata, Viewport } from "next";
import { IBM_Plex_Mono, Plus_Jakarta_Sans, Syne, Ubuntu } from "next/font/google";
import "./globals.css";

const syne = Syne({ subsets: ["latin"], weight: ["600", "700", "800"], variable: "--font-syne", display: "swap" });
const jakarta = Plus_Jakarta_Sans({ subsets: ["latin"], weight: ["400", "500", "600"], variable: "--font-jakarta", display: "swap" });
const plexMono = IBM_Plex_Mono({ subsets: ["latin"], weight: ["400", "500"], variable: "--font-plex-mono", display: "swap" });
const ubuntu = Ubuntu({ subsets: ["latin"], weight: ["300", "400", "500", "700"], variable: "--font-ubuntu", display: "swap" });

const description = "Canary reroutes dapp RPC reads over Tor, blocks third-party wallet-address leaks, and reports what it protected and what it couldn't see.";

export const metadata: Metadata = {
  metadataBase: new URL("https://uixcanary.vercel.app"),
  title: "Canary — privacy for wallets and agents",
  description,
  icons: { icon: "/assets/favicon.png" },
  openGraph: {
    type: "website",
    url: "/",
    title: "Canary — privacy for wallets and agents",
    description: "Private RPC reads over Tor, blocked wallet-address leaks, and honest coverage counts.",
    images: [{ url: "/assets/og.jpg", width: 1200, height: 630 }],
  },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#F5FAFC" },
    { media: "(prefers-color-scheme: dark)", color: "#061219" },
  ],
};

/* Before first paint: apply the saved theme (no light flash in dark mode) and skip the intro if it already played this session. */
const themeScript = `try{var d=document.documentElement,t=localStorage.getItem('canary.theme');if(t==='dark'||t==='light')d.setAttribute('data-theme',t);if(sessionStorage.getItem('canary.intro')==='1')d.setAttribute('data-intro','seen')}catch(e){}`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${syne.variable} ${jakarta.variable} ${plexMono.variable} ${ubuntu.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
