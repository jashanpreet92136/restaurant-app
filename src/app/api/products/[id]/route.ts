import { getAuthSession } from "@/utils/auth";
import { prisma } from "@/utils/connect";
import { NextRequest, NextResponse } from "next/server";
// get single product---
export const GET = async (
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) => {
  const { id } = await params;

  try {
    const product = await prisma.product.findUnique({
      where: {
        id,
      },
    });

    return new NextResponse(JSON.stringify(product));
  } catch (err) {
    console.log(err);

    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 },
    );
  }
};
//delete product for admin
export const DELETE = async (
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) => {
  const { id } = await params;

  const session = await getAuthSession();

  if (!session?.user?.isAdmin) {
    return NextResponse.json(
      { message: "You are not an admin" },
      { status: 403 },
    );
  }

  try {
    await prisma.product.delete({
      where: {
        id,
      },
    });

    return NextResponse.json(
      { message: "Your product has been deleted successfully" },
      { status: 200 },
    );
  } catch (err) {
    console.log(err);

    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 },
    );
  }
};
