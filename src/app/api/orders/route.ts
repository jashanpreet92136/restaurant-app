export const runtime = "nodejs";

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/utils/connect";
import { getAuthSession } from "@/utils/auth";

//fetch all products
export const GET = async (req: NextRequest) => {
  const session = await getAuthSession();

  if (session) {
    try {
      if (session.user.isAdmin) {
        const orders = await prisma.order.findMany();
        return new NextResponse(JSON.stringify(orders), { status: 200 });
      }
      const orders = await prisma.order.findMany({
        where: {
          userEmail: session.user.email!,
        },
      });
      return new NextResponse(JSON.stringify(orders), { status: 200 });
    } catch (err) {
      console.log(err);

      return NextResponse.json(
        { message: "Something went wrong" },
        { status: 500 },
      );
    }
  } else {
    return NextResponse.json(
      { message: "User is not logged In!" },
      { status: 401 },
    );
  }
};

export const POST = async (req: NextRequest) => {
  const session = await getAuthSession();
  const body = await req.json();
  if (session) {
    try {
      const order = await prisma.order.create({ data: body });
      return new NextResponse(JSON.stringify(order), { status: 201 });
    } catch (err) {
      console.log(err);

      return NextResponse.json(
        { message: "Something went wrong" },
        { status: 500 },
      );
    }
  } else {
    return NextResponse.json(
      { message: "User is not logged In!" },
      { status: 401 },
    );
  }
};
