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
        return_url: "http://localhost:3000/success",
      },
    });

    if (error) {
      if (error.type === "card_error" || error.type === "validation_error") {
        setMessage(error.message || "Payment failed");
      } else {
        setMessage("An unexpected error occurred.");
      }
    }

    setIsLoading(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement />
      <AddressForm />
      <button
        className=" bg-red-500 text-white p-2 mt-3 w-1/5 font-bold mx-auto rounded-md"
        disabled={isLoading || !stripe || !elements}
      >
        {isLoading ? "Processing..." : "Pay now"}
      </button>

      {message && <div>{message}</div>}
    </form>
  );
};

export default CheckoutForm;
