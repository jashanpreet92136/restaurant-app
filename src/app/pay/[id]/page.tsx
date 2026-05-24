"use client";
import React, { use, useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "@/components/CheckoutForm";
import { StripeElementsOptions } from "@stripe/stripe-js";
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY!);

const Page = ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = use(params);
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    const makeRequest = async () => {
      try {
        const res = await fetch(`/api/create-intent/${id}`, {
          method: "POST",
        });
        const data = await res.json();

        setClientSecret(data.clientSecret);
      } catch (e) {
        console.log(e);
      }
    };
    makeRequest();
  }, [id]);

  const options: StripeElementsOptions = {
    clientSecret,
    appearance: {
      theme: "stripe",
    },
  };
  return (
    <div className="min-h-screen  flex justify-center items-center px-4">
      <div className="w-[75%] max-w-4xl py-4 px-8 rounded-xl shadow-md h-[80%]">
        {clientSecret && (
          <Elements options={options} stripe={stripePromise}>
            <CheckoutForm />
          </Elements>
        )}
      </div>
    </div>
  );
};

export default Page;
