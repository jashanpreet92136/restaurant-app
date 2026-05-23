import Image from "next/image";
import Link from "next/link";
import React from "react";
import CountDown from "./CountDown";

const Offer = () => {
  return (
    <div className=" flex flex-col h-screen md:flex-row md:justify-between md:bg-[url('/offerBg.png')] bg-black  md:h-[80vh] text=white">
      {/* text part */}
      <div className="flex-1 flex  flex-col justify-center items-center text-center gap-8 p-6 text-white">
        <h1 className="uppercase text-2xl lg:text-4xl font-bold ">
          Delicious burger and french fry
        </h1>
        <p className=" lg:text-3xl text-xl">
          Progressively simplify effective e-toilers and process-centric methods
          of empowerment, quickly pontificate parallel.
        </p>
        <CountDown />

        <Link href={`/menu`} key={1}>
          <button className="bg-red-500 text-white rounded-md  mt-4 py-3 px-6">
            Order Now
          </button>
        </Link>
      </div>
      {/* image part */}
      <div className="  flex-1 w-full relative items-center md:h-full">
        <Image src="/offerProduct.png" alt="" fill className="object-contain" />
      </div>
    </div>
  );
};

export default Offer;
