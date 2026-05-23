"use client";
import { useCartStore } from "@/utils/store";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const CartIcon = () => {
  const { totalItems, totalPrice } = useCartStore();
  const { data: session } = useSession();

  return (
    <Link
      href={session?.user.isAdmin ? "/add" : "/cart"}
      className="flex   items-center justify-center gap-3 md:gap-1"
    >
      {session?.user.isAdmin ? (
        <button className="p-1"> +product</button>
      ) : (
        <span>
          {" "}
          <Image src="/cart.png" alt="" width={20} height={20} />
          Cart ({totalItems})
        </span>
      )}
    </Link>
  );
};

export default CartIcon;
