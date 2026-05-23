"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
const data = [
  {
    id: 1,
    title: "Always Fresh & Always Crispy & Always Hot",
    image: "/slide1.png",
  },
  {
    id: 2,
    title: "We deliver your order wherever you are in Canada",
    image: "/slide2.png",
  },
  {
    id: 3,
    title: "The best pizza to share with your family",
    image: "/slide3.jpg",
  },
];

const Slider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % data.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col   h-[calc(100vh-6rem)]  md:h-[calc(100vh-9rem) bg-fuchsia-50 lg:flex-row ">
      <div className="  flex items-center justify-center  font-bold flex-col  text-red-500 gap-8 flex-1">
        <h1 className="uppercase lg:text-6xl text-center md:p-10 p-4  text-3xl">
          {data[currentSlide].title}
        </h1>
        <button className=" bg-red-500 text-white  p-3 rounded-md ">
          Order Now
        </button>
      </div>
      <div className=" w-full  relative  flex-1 ">
        <Image
          src={data[currentSlide].image}
          alt=""
          fill
          className="object-cover"
        />
      </div>
    </div>
  );
};

export default Slider;
