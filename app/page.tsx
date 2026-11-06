import { Intro } from "@/components/Intro";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Journal } from "@/components/Journal";
import { Demo } from "@/components/Demo";
import { Evidence } from "@/components/Evidence";
import { Swap } from "@/components/Swap";
import { GetCanary } from "@/components/GetCanary";
import { Sponsors } from "@/components/Sponsors";
import { EndBand } from "@/components/EndBand";
import { Footer } from "@/components/Footer";
import { Reveal } from "@/components/Reveal";
import { ScrollFX } from "@/components/ScrollFX";

export default function Home() {
  return (
    <>
      <Intro />
      <Header />
      <main>
        <Hero />
        <Journal />
        <Demo />
        <Evidence />
        <Swap />
        <GetCanary />
        <Sponsors />
        <EndBand />
      </main>
      <Footer />
      <Reveal />
      <ScrollFX />
    </>
  );
}
