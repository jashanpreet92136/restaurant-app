"use client";

import { useCartStore } from "@/utils/store";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import ConfettiExplosion from "react-confetti-explosion";

export default function SuccessContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { clearCart } = useCartStore();

  const payment_intent = searchParams.get("payment_intent");

  useEffect(() => {
    if (!payment_intent) return;

    const makeRequest = async () => {
      try {
        await fetch(`/api/checkout/confirm/${payment_intent}`, {
          method: "PUT",
        });

        clearCart();
        router.push("/orders");
      } catch (e) {
        console.error(e);
      }
    };

    makeRequest();
  }, [payment_intent, router, clearCart]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-6">
      <ConfettiExplosion
        force={0.8}
        duration={3000}
        particleCount={550}
        width={1600}
      />
      <h1 className="text-4xl font-bold">Payment Successful 🎉</h1>
    </div>
  );
}
