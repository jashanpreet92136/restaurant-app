"use client";

import {
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";

import { FormEvent, useState } from "react";
import AddressForm from "./AddressForm";

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();

  const [message, setMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsLoading(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/success`,
      },
    });

    if (error) {
      console.log(error);
      if (error.type === "card_error" || error.type === "validation_error") {
        setMessage(error.message || "Payment failed");
      } else {
        setMessage("An unexpected error occurred.");
      }
    }

    setIsLoading(false);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 w-full p-2 sm:p-4"
    >
      <PaymentElement />
      <AddressForm />
      <button
        className=" bg-red-500 text-white p-2 mt-3 md:w-1/5 font-bold   mx-auto rounded-md"
        disabled={isLoading || !stripe || !elements}
      >
        {isLoading ? "Processing..." : "Pay now"}
      </button>

      {message && <div>{message}</div>}
    </form>
  );
};

export default CheckoutForm;
