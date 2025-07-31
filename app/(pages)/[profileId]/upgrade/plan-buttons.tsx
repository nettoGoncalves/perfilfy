"use client";
import Button from "@/app/components/ui/button";
import { useStripe } from "@/app/hooks/useStripe";
import { auth } from "@/app/lib/auth";
import { getSession, signIn } from "next-auth/react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function PlanButtons() {
  const { createStripeCheckout } = useStripe();
  const { profileId } = useParams();
  const [session, setSession] = useState<any>(null);

  useEffect(() => {
    (async () => {
      const s = getSession();
      setSession(s);
    })();
  }, []);

  return (
    <div className="flex flex-col md:flex-row items-center gap-9">
      <div className="max-w-[304px] w-full p-8 flex flex-col gap-7 rounded-2xl shadow-2xl">
        <div className="flex flex-col">
          <span className="text-accent-blue-dark font-bold text-2xl">
            Mensal
          </span>
          <span className="text-content-body">Apenas</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-accent-blue-dark font-bold text-[48px]">
            R$6.90
          </span>
          <span className="text-content-headline text-2xl">/mês</span>
        </div>
        <Button
          onClick={() =>
            !session.user
              ? signIn("google", { callbackUrl: `/criar` })
              : createStripeCheckout({
                  isSubscription: true,
                  metadata: { profileId },
                })
          }
          variant="secondary"
        >
          Assinar
        </Button>
      </div>
      <div className="flex flex-col shadow-2xl rounded-b-2xl">
        <div className="flex justify-center items-center rounded-t-2xl w-[304px] bg-[linear-gradient(90deg,#1e3a8a_0%,#38bdf8_100%)]">
          <span className="uppercase text-white text-xs font-bold p-2">
            Recomendado
          </span>
        </div>
        <div className="p-[1.6px] bg-[linear-gradient(90deg,#1e3a8a_0%,#38bdf8_100%)] rounded-b-2xl">
          <div className="w-full bg-white p-8 flex flex-col gap-7 rounded-b-2xl">
            <div className="flex flex-col">
              <span className="text-accent-blue-dark font-bold text-2xl">
                Vitalício
              </span>
              <span className="text-content-body">Economize com</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="text-accent-blue font-bold text-[48px]">
                R$49,90
              </span>
            </div>
            <Button
              onClick={() =>
                !session.user
                  ? signIn("google", { callbackUrl: `/criar` })
                  : createStripeCheckout({
                      isSubscription: true,
                      metadata: { profileId },
                    })
              }
            >
              Assinar
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
