import BackButton from "@/components/BackButton";
import DeleteIcon from "@/components/DeleteIcon";
import Price from "@/components/Price";

import { Product } from "@/types/types";
import Image from "next/image";
import React from "react";

const getData = async (id: string) => {
  const res = await fetch(`/api/products/${id}`, {
    cache: "no-store",
  });
  console.log(res.status);
  if (!res.ok) {
    throw new Error("Failed");
  }
  return res.json();
};

const productId = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;

  const singleProduct: Product = await getData(id);
  console.log(singleProduct);
  return (
    <div className="p-4 h-screen md:px-20 lg:px-40 bg-white mt-6 flex flex-col justify-around text-red-500 md:flex-row relative">
      {singleProduct.img && (
        <div className="relative w-full h-1/2 md:h-[60%] ">
          <Image
            className="object-contain"
            src={singleProduct.img}
            alt=""
            fill
          />
        </div>
      )}
      <div className=" h-1/2 flex flex-col gap-4 md:h-[60%]">
        <h1 className="uppercase text-xl inline md:text-3xl font-bold">
          {singleProduct.title}
        </h1>

        <p>{singleProduct.desc}</p>
        <Price product={singleProduct} />
      </div>
      <DeleteIcon id={singleProduct.id} />
    </div>
  );
};

export default productId;
