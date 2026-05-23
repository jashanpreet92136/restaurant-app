"use client";
import { Product } from "@/types/types";
import { useCartStore } from "@/utils/store";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const Price = ({ product }: { product: Product }) => {
  const { addToCart } = useCartStore();
  const [total, setTotal] = useState<number>(Number(product.price));
  const [quantity, setQuantity] = useState(1);
  const [selected, setSelected] = useState(0);

  useEffect(() => {
    const basePrice = Number(product.price);

    const optionPrice = product.options?.length
      ? Number(product.options[selected].additionalPrice)
      : 0;

    setTotal(Number((basePrice + optionPrice) * quantity));
  }, [quantity, selected, product]);

  const handleCart = () => {
    addToCart({
      id: product.id,
      title: product.title,
      img: product.img,
      price: total,
      ...(product.options?.length && {
        optionTitle: product.options[selected].title,
      }),
      quantity: quantity,
    });
    toast.success("Item is added to cart,successfully!");
  };
  return (
    <div>
      <h2 className="text-xl  md:text-3xl font-bold">${total.toFixed(2)}</h2>
      {/* option container */}
      <div className="flex text-red-500 gap-4 m-2 md:mt-6">
        {product.options?.length &&
          product.options?.map((option, index) => (
            <button
              type="button"
              className=" min-w-24 rounded-md p-2 ring-1 hover:bg-red-500 hover:text-white  ring-red-500  "
              key={option.title}
              style={{
                background: selected === index ? "rgb(248 113 113)" : "white",
                color: selected === index ? "white" : "red",
              }}
              onClick={() => setSelected(index)}
            >
              {option.title}
            </button>
          ))}
      </div>
      {/* quantity and add to cart button */}
      <div className="flex justify-around items-center border-red-500  rounded-md ring-1 mt-2 md:mt-6">
        {/* quantity */}
        <div className=" p-2 flex justify-between items-center  w-full">
          <span>Quantity</span>
          <div className=" flex gap-2">
            <button
              onClick={() => setQuantity((prev) => (prev > 1 ? prev - 1 : 1))}
            >
              {"<"}
            </button>
            <span>{quantity}</span>
            <button onClick={() => setQuantity((prev) => prev + 1)}>
              {">"}
            </button>
          </div>
        </div>
        <div className="flex bg-red-500 ring-1 ring-red-500 p-2 text-white ">
          <button onClick={handleCart} className=" rounded-md w-[96]">
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default Price;
