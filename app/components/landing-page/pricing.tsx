import { TRIAL_DAYS } from "@/app/lib/config";
import Button from "../ui/button";
import PlanButtons from "@/app/(pages)/[profileId]/upgrade/plan-buttons";

export default function Pricing() {
  return (
    <section className="my-[150px] flex flex-col items-center gap-14">
      <div className="flex flex-col items-center gap-6">
        <h3 className="text-4xl font-bold text-accent-blue text-center">
          Planos simples, acesso completo
        </h3>
        <p className="text-content-body text-xl text-center">
          Teste gratuitamente por{" "}
          <strong className="text-accent-blue">{TRIAL_DAYS} dias</strong> e
          escolha o plano que melhor se adapta a você. Acesse todos os recursos
          da Perfilfy desde o início, sem limitações.
        </p>
      </div>
      <PlanButtons />
    </section>
  );
}
