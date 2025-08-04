import { Metadata } from "next";
import FAQ from "../components/landing-page/faq";
import Header from "../components/landing-page/header";
import Hero from "../components/landing-page/hero";
import Pricing from "../components/landing-page/pricing";
import { getSEOTags } from "../lib/seo";

export const metadata: Metadata = getSEOTags({
  appName: "Perfilfy – Seu cartão de visitas digital profissional",
  appDescription:
    "Transforme sua reputação em presença com o seu Perfilfy — seu cartão de visitas digital profissional.",
  keywords: [
    "identidade profissional",
    "cartão de visitas digital",
    "página profissional que reúne seus dados",
    "presença digital para autônomos",
    "autoridade digital",
    "cartão de visitas digital profissional"
  ],
  appDomain: "https://perfilfy.com/",
  canonicalUrlRelative: "/",
});

export default function Home() {
  return (
    <main className="max-w-7xl mx-auto px-4">
      <Header />
      <Hero />
      <Pricing />
      <FAQ />
    </main>
  );
}
