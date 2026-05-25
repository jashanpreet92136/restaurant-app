import { Product } from "@/types/types";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { headers } from "next/headers";

async function absoluteUrl(path: string) {
  const h = await headers();
  const host = h.get("host");
  const protocol = process.env.NODE_ENV === "production" ? "https" : "http";
  return `${protocol}://${host}${path}`;
}

const getData = async (category: string) => {
  const res = await fetch(await absoluteUrl(`/api/products?cat=${category}`), {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed");
  }
  return res.json();
};

type Props = {
  params: Promise<{ category: string }>;
};

const category = async ({ params }: Props) => {
  const { category } = await params;

  const products: Product[] = await getData(category);
  return (
    <div className="flex flex-wrap text-red-500   ">
      {products.map((item) => (
        <Link
          className="bg-white justify-between group  w-full h-[60vh] border-r-2 border-b-2 border-red-500  md:w-1/3"
          href={`/product/${item.id}`}
          key={item.id}
        >
          {/* image ----80% */}
          <div className="relative items-center h-[80%]   ">
            {item.img && (
              <Image src={item.img} alt="" fill className="object-contain" />
            )}
          </div>

          <div className="flex items-center mx-6 mt-2  justify-between">
            <p className="font-bold text-xl">{item.title}</p>
            <p className="group-hover:hidden font-bold text-xl ">
              ${item.price}
            </p>
            <button className=" hidden  uppercase group-hover:block  bg-red-500 text-white p-2 rounded-md">
              Add To Cart
            </button>
          </div>
          {/* text --20 % */}
        </Link>
      ))}
    </div>
  );
};

export default category;
