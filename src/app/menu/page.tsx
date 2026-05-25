import { Menu } from "@/types/types";
import Link from "next/link";
import React from "react";
import { headers } from "next/headers";

// Build absolute URL for server-side fetch
async function absoluteUrl(path: string) {
  const h = await headers();
  const host = h.get("host");
  const protocol = process.env.NODE_ENV === "production" ? "https" : "http";
  return `${protocol}://${host}${path}`;
}
const getData = async () => {
  const url = await absoluteUrl("/api/categories");

  const res = await fetch(url, {
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error("Failed");
  }
  return res.json();
};

const menuPage = async () => {
  const menu: Menu = await getData();
  return (
    <div className="p-4 lg:px-20 h-[calc(100vh-6rem)] md:h-[calc(100vh-9rem)] flex flex-col md:flex-row w-full items-center">
      {menu.map((category) => (
        <Link
          href={`/menu/${category.slug}`}
          key={category.id}
          className="w-full h-1/2 bg-cover p-8 md:h-[60vh] "
          style={{ backgroundImage: `url(${category.img})` }}
        >
          <div className={`text-${category.color}`}>
            <h1 className="uppercase font-bold text-3xl">{category.title}</h1>
            <p className="text-md my-6">{category.desc}</p>
            <button
              className={`hidden lg:block bg-black  text-white py-2 px-4 rounded-md`}
            >
              Explore
            </button>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default menuPage;
