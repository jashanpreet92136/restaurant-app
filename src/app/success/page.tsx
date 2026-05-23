"use client";

import { useCartStore } from "@/utils/store";
import { useSearchParams, useRouter } from "next/navigation";

import React, { useEffect } from "react";
import ConfettiExplosion from "react-confetti-explosion";

const Page = () => {
  const searchParama = useSearchParams();
  const { clearCart } = useCartStore();

  clearCart();

  const payment_intent = searchParama.get("payment_intent");
  console.log("pay " + payment_intent);
  const router = useRouter();
  useEffect(() => {
    const makeRequest = async () => {
      try {
        const res = await fetch(
          `http://localhost:3000/api/confirm/${payment_intent}`,
          {
            method: "PUT",
          },
        );

        router.push("/orders");
      } catch (e) {}
    };
    makeRequest();
  }, [payment_intent]);
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
};

export default Page;
