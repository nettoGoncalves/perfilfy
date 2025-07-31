import Header from "@/app/components/landing-page/header";
import Button from "@/app/components/ui/button";
import TextInput from "@/app/components/ui/text-input";
import { Rocket } from "lucide-react";
import CreateLinkForm from "./create-link-form";
import { Metadata } from "next";
import { getSEOTags } from "@/app/lib/seo";

export const metadata: Metadata = getSEOTags({
  appName: "Perfilfy - Criar",
  appDescription: "Perfilfy - Criar",
  keywords: [
    "construir presença digital simples",
    "gerar link personalizado",
    "criar página de apresentação",
  ],
  appDomain: "https://perfilfy.com/",
  canonicalUrlRelative: "/criar",
});

export default function CriarPage() {
  return (
    <div>
      <Header />
      <div className="h-screen flex flex-col gap-10 items-center justify-center max-w-xl mx-auto">
        <div className="flex items-center gap-4">
          <h1 className="text-4xl font-bold text-accent-blue-dark">
            Escolha seu link
          </h1>
        </div>
        <CreateLinkForm />
      </div>
    </div>
  );
}
