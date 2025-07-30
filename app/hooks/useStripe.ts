import { loadStripe, Stripe } from "@stripe/stripe-js";
import { useEffect, useState } from "react";

export function useStripe() {
  const [stripe, setStripe] = useState<Stripe | null>(null);

  useEffect(() => {
    async function loadStripeAsync() {
      const stripeInstance = await loadStripe(
        process.env.NEXT_PUBLIC_STRIPE_PUB_KEY!
      );
      setStripe(stripeInstance);
    }

    loadStripeAsync();
  }, []);

  async function createStripeCheckout({
    metadata,
    isSubscription,
  }: {
    metadata: any;
    isSubscription: boolean;
  }) {
    try {
      const response = await fetch("/api/stripe/create-checkout", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ metadata, isSubscription }),
      });

      const data = await response.json();

      await stripe?.redirectToCheckout({
        sessionId: data.sessionId,
      });
    } catch (error) {
      const response = await fetch("/api/stripe/create-checkout", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ metadata, isSubscription }),
      });

      console.error("Erro ao criar checkout:", error);
      const text = await response.text();
      console.error("Resposta do servidor:", text);
    }
  }

  async function handleCreateStripePortal() {
    const response = await fetch("api/stripe/create-portal", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    window.location.href = data.url;
  }

  return { createStripeCheckout, handleCreateStripePortal };
}
