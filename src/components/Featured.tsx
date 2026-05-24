import { Product } from "@/types/types";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const getData = async () => {
  const res = await fetch("/api/products", {
    cache: "no-store",
  });
  if (!res.ok) {
    console.log(await res.text());
    throw new Error("API Failed");
  }
  return res.json();
};

const Featured = async () => {
  const featuredProducts: Product[] = await getData();
  return (
    <div className=" w-screen overflow-x-scroll text-red-500">
      {/* wrapper c;asss */}
      <div className="w-max flex ">
        {/* single item */}
        {featuredProducts.map((item) => (
          <div
            key={item.id}
            className="w-screen h-[70vh] flex flex-col items-center justify-around p-4 hover:bg-fuchsia-50 transition-all duration-300 md:w-[50vw] lg:w-[33vw] lg:h-[90vh]"
          >
            {/* image conatiner */}
            {item.img && (
              <div className="relative flex-1 w-full h-2/3 hover:rotate-60 transition-all duration-500 ">
                <Image src={item.img} alt="" fill className="object-contain" />
              </div>
            )}

            {/* text  container */}
            <div className="h-1/3 flex-1 flex flex-col gap-4   text-center ">
              <h1 className=" mt-3 text-xl font-bold uppercase lg:text-2xl">
                {item.title}
              </h1>
              <p className="p-4 lg:p-6">{item.desc}</p>
              <span className="text-xl font-bold">${item.price}</span>
              <Link href={`/product/${item.id}`} key={item.id}>
                <button className=" w-1/3 mx-auto text-white bg-red-500  p-2 rounded-md">
                  Add to cart
                </button>
              </Link>
            </div>
          </div>
        ))}
        ;
      </div>
    </div>
  );
};

export default Featured;
