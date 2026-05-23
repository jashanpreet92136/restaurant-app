import { AddressElement } from "@stripe/react-stripe-js";
import React from "react";

const AddressForm = () => {
  return (
    <form>
      <h3>Address</h3>
      <AddressElement
        options={{ mode: "shipping" }}
        onChange={(e) => {
          if (e.complete) {
            const address = e.value.address;
          }
        }}
      />
    </form>
  );
};

export default AddressForm;
