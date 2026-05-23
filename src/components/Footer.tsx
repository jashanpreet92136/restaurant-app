import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <div className="flex items-center justify-between h-12 md:h-24 p-4 lg:px-20  text-red-500   ">
      <Link
        className="uppercase  text-red-500 text-xl font-bold ml-8 "
        href="/"
      >
        Massimo
      </Link>{" "}
      <p>@ All rights are reserved </p>
    </div>
  );
};

export default Footer;
