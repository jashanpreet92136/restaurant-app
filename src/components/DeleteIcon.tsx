"use client";

import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "react-toastify";

const DeleteIcon = ({ id }: { id: string }) => {
  const { status, data: session } = useSession();
  const router = useRouter();
  if (status === "loading") {
    return <p>Loading....</p>;
  }
  if (status === "unauthenticated" || !session?.user.isAdmin) {
    return;
  }

  const handleDelete = async () => {
    console.log("clicked");
    const res = await fetch(`/api/products/${id}`, {
      method: "DELETE",
    });
    console.log("res" + res);
    if (res.status === 200) {
      router.push("/menu");
      toast.success("The product has been deleted");
    } else {
      const data = await res.json();

      toast.error("errore");
    }
  };
  return (
    <div>
      <button
        className="p-2 bg-fuchsia-50 rounded-full absolute top-2 right-4 hover:bg-fuchsia-100"
        onClick={handleDelete}
      >
        <Image src="/delte.png" alt="delete-icon" width={20} height={20} />
      </button>
    </div>
  );
};

export default DeleteIcon;
