import React from "react";
import Menu from "./Menu";
import Link from "next/link";
import CartIcon from "./CartIcon";
import Image from "next/image";
import UserLinks from "./UserLinks";

const Navbar = () => {
  return (
    <div className="p-4 h-12   text-red-500 flex items-center  justify-between text-md-500 border-b-2 border-solid border-red-500 md:h-18 md:text-lg lg:px-20 xl:px-40">
      <div className="hidden md:flex gap-4 flex-1">
        <Link href="/">Homepage</Link>
        <Link href="/menu">Menu</Link>
        <Link href="/">Contact</Link>
      </div>
      <div className="uppercase  text-lg md:font-bold flex-1 md:text-center">
        <Link href="/">Massimo</Link>
      </div>

      <div className=" hidden md:flex gap-4 items-center justify-end flex-1">
        <div className=" md:absolute top-3 r-2 lg:static flex items-center gap-2 cursor-pointer bg-red-300 px-1 rounded-md">
          <Image src="/phone.png" alt="" width={15} height={15} />
          <span>566 677 7878</span>
        </div>
        <UserLinks />
        <CartIcon />
      </div>

      <div className="md:hidden">
        <Menu />
      </div>
    </div>
  );
};

export default Navbar;
