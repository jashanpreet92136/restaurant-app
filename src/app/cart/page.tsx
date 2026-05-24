"use client";
import { useCartStore } from "@/utils/store";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const cart = () => {
  const { totalItems, totalPrice, products, removeFromCart } = useCartStore();
  const { data: session } = useSession();
  const router = useRouter();
  const handleCheckout = async () => {
    if (!session) {
      toast.error("You have to login !");
      router.push("/");
    } else {
      try {
        const res = await fetch("/api/orders", {
          method: "POST",
          headers: { "Content-type": "application/json" },
          body: JSON.stringify({
            price: totalPrice,
            products: products,
            status: "Not paid",
            userEmail: session.user.email,
          }),
        });

        const data = await res.json();
        router.push(`/pay/${data.id}`);
      } catch (err) {
        console.log(err);
      }
    }
  };
  return (
    <div className="flex flex-col text-red-500 md:flex-row w-full h-[calc(100vh-6rem)] md:h-[calc(100vh-9rem)]  ">
      {/* left */}
      <div className=" md:w-1/2 md:h-full w-full h-1/2 p-4 flex flex-col justify-center overflow-scroll  md:px-10">
        {/* single item */}

        {products.map((item) => (
          <div
            className="flex  justify-between items-center mb-4 "
            key={item.id}
          >
            {item.img && (
              <Image src={item.img} alt="" width={100} height={100} />
            )}
            <div className="">
              <h1 className="uppercase font-bold text-xl md:text-2xl">
                {item.title} X {item.quantity}
              </h1>
              <span>{item.optionTitle}</span>
            </div>
            <h2 className="font-bold cursor-pointer  text-lg md:text-xl">
              ${item.price.toFixed(2)}
            </h2>

            <span
              className="cursor-pointer"
              onClick={() => {
                removeFromCart(item);
              }}
            >
              X
            </span>
          </div>
        ))}
      </div>

      {/* right */}
      <div className="md:w-1/2 p-4 md:h-full w-full h-1/2 bg-fuchsia-50 flex flex-col justify-center gap-2 md:px-10">
        <div className="flex justify-between m-2">
          <span> Subtotal({totalItems})items</span>
          <span>${totalPrice.toFixed(2)}</span>
        </div>

        <div className="flex justify-between m-2">
          <span> Service cost</span>
          <span className="">$0.00</span>
        </div>
        <div className="flex justify-between m-2">
          <span> Delivery</span>
          <span className="text-green-500">Free!</span>
        </div>

        <hr className="my-2" />
        <div className="flex justify-between m-2">
          <span>TOTAL(INCL. VAT)</span>
          <span className="font-bold">${totalPrice.toFixed(2)}</span>
        </div>
        <button
          className="self-end mt-4 bg-red-500 text-white p-3 rounded-md w-1/2 md:w-[35%]"
          onClick={handleCheckout}
        >
          Checkout
        </button>
      </div>
    </div>
  );
};

export default cart;
