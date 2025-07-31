import { Metadata } from "next";
import FAQ from "../components/landing-page/faq";
import Header from "../components/landing-page/header";
import Hero from "../components/landing-page/hero";
import Pricing from "../components/landing-page/pricing";
import { getSEOTags } from "../lib/seo";

export const metadata: Metadata = getSEOTags({
  appName: "Perfilfy",
  appDescription:
    "Crie seu perfil profissional online em minutos. Perfilfy é a plataforma ideal para profissionais independentes se destacarem na web com uma presença online moderna e personalizada",
  keywords: [
    "identidade profissional",
    "página pessoal para peritos judiciais",
    "página profissional que reúne seus dados",
    "presença digital para autônomos",
    "link na bio com projetos e currículo",
    "página profissional"
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
