"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import CartIcon from "./CartIcon";

const links = [
  {
    id: 1,
    title: "Homepage",
    url: "/",
  },
  {
    id: 2,
    title: "Menu",
    url: "/menu",
  },
  {
    id: 3,
    title: "Working Hours",
    url: "/",
  },
  {
    id: 4,
    title: "Contact",
    url: "/",
  },
];
const Menu = () => {
  const [open, setOpen] = useState(false);
  const user = false;
  let handleOnClick = () => {
    setOpen(!open);
  };
  return (
    <div>
      <Image
        onClick={handleOnClick}
        src={open ? "/open.png" : "/close.png"}
        width={20}
        height={20}
        alt=""
      />

      {!open && (
        <div className="bg-red-500 w-screen gap-8 z-10 text-white absolute left-0 top-24 h-[calc(100vh-6rem)] flex items-center justify-center text-3xl flex-col">
          {links.map((item) => (
            <Link key={item.id} href={item.url}>
              {item.title}
            </Link>
          ))}

          {!user ? (
            <Link href="/login">Login</Link>
          ) : (
            <Link href="/orders">Orders</Link>
          )}

          <CartIcon />
        </div>
      )}
    </div>
  );
};

export default Menu;
