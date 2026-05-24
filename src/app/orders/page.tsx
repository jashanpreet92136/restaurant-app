"use client";
import { OrderType } from "@/types/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { toast } from "react-toastify";

const orders = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const queryClient = useQueryClient();

  const { isLoading, error, data } = useQuery({
    queryKey: ["orders"],
    queryFn: async () => {
      const res = await fetch("/api/orders");
      const result = await res.json();

      return Array.isArray(result) ? result : [];
    },
  });

  const mutation = useMutation({
    mutationFn: ({ id, status }: { id: string; status: string }) => {
      return fetch(`/api/orders/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status }),
      });
    },
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    },
  });

  const handleUpdate = (e: React.FormEvent<HTMLFormElement>, id: string) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const input = form.elements[0] as HTMLInputElement;
    const status = input.value;
    mutation.mutate({ id, status });
    toast.success("Status has been updated!");
  };

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/");
    }
  }, [status, router]);

  if (isLoading || status === "loading") return "Lodding..";
  return (
    <div className="p-4 md:px-10 ">
      <table className="w-full border-separate border-spacing-3 ">
        <thead>
          <tr className="text-left">
            <th className="hidden md:block">Order Id</th>
            <th>Date</th>
            <th>Price</th>
            <th className="hidden md:block"> Product</th>
            <th> Status</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((item: OrderType) => (
            <tr
              key={item.id}
              className={`${item.status == "delivered" ? "bg-red-200" : "bg-red-50"}`}
            >
              <td className="hidden md:block py-6 px-1">{item.id}</td>
              <td className="py-6 px-1">
                {item.createdAt.toString().slice(0, 10)}
              </td>
              <td className="py-6 px-1">{item.price}</td>
              <td className=" py-6 px-1 hidden md:block">
                {item.products[0].title}
              </td>
              {session?.user.isAdmin ? (
                <td>
                  <form
                    className="flex justify-center items-center"
                    onSubmit={(e) => handleUpdate(e, item.id)}
                  >
                    <input
                      placeholder={item.status}
                      className="m-1 ml-2 p-2  ring-1 ring-red-200 rounded-md"
                    />
                    <button className=" rounded-full">
                      <Image src="/edit.png" alt="" width={22} height={22} />
                    </button>
                  </form>
                </td>
              ) : (
                <td className="py-6 px-1 text-red-500">{item.status}</td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default orders;
