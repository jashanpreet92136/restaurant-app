"use client";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

import React, { useEffect } from "react";

const login = () => {
  const { data, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/");
    }
  }, [status, router]);

  if (status === "loading") {
    return <p>Loading...</p>;
  }
  console.log(status);
  return (
    <div className=" h-[calc(100vh-6rem)] md:h-[calc(100vh-9rem)] p-4 flex items-center  justify-center ">
      <div className="h-full w-full shadow-2xl md:w-[50%] flex flex-col md:flex-row rounded-md ">
        <div className="relative md:w-1/2 md:h-full w-full h-1/3  ">
          <Image src="/loginBg.png" alt="" fill className="object-cover" />
        </div>
        <div className="md:w-1/2 h-1/3 w-full p-4 flex flex-col md:gap-8">
          <h1>Welcome</h1>
          <p>Log into your account or create a new using social buttons</p>
          <button
            className="flex gap-4 p-4 ring ring-orange-100 rounded-md"
            onClick={() => signIn("google")}
          >
            <Image
              src="/google.png"
              width={20}
              height={20}
              className="object-contain"
              alt=""
            />
            <span>Sign in with Google</span>
          </button>

          <button className="flex  gap-4 p-4 ring ring-blue-100 rounded-md">
            <Image
              src="/facebook.png"
              width={20}
              height={20}
              className="object-contain"
              alt=""
            />
            <span>Sign in with Facebook</span>
          </button>
          <p className="text-sm">
            Have a problem?
            <Link href="/" className="underline">
              Contact us
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default login;
