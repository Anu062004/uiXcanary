import { Intro } from "@/components/Intro";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Journal } from "@/components/Journal";
import { Evidence } from "@/components/Evidence";
import { GetCanary } from "@/components/GetCanary";
import { Sponsors } from "@/components/Sponsors";
import { EndBand } from "@/components/EndBand";
import { Footer } from "@/components/Footer";
import { Reveal } from "@/components/Reveal";

export default function Home() {
  return (
    <>
      <Intro />
      <Header />
      <main>
        <Hero />
        <Journal />
        <Evidence />
        <GetCanary />
        <Sponsors />
        <EndBand />
      </main>
      <Footer />
      <Reveal />
    </>
  );
}
