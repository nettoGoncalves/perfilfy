import Header from "@/app/components/landing-page/header";
import PlanButtons from "./plan-buttons";
import { Metadata } from "next";
import { getSEOTags } from "@/app/lib/seo";

export const metadata: Metadata = getSEOTags({
  appName: "Perfilfy - Upgrade",
  appDescription: "Perfilfy - Upgrade",
  keywords: [
    "plano premium para profissionais",
    "ferramenta de marketing pessoal",
    "página profissional com estatísticas",
    "perfilfy profissional"
  ],
  appDomain: "https://perfilfy.com/",
  canonicalUrlRelative: "/upgrade",
});

export default function UpgradePage() {
  return (
    <div className="h-screen flex flex-col items-center justify-center gap-4">
      <Header />
      <h2 className="text-2xl font-bold">Escolha o plano</h2>
      <PlanButtons />
    </div>
  );
}
