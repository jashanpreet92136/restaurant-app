import { prisma } from "@/utils/connect";
import { NextRequest, NextResponse } from "next/server";

export const PUT = async (
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) => {
  const { id } = await params;

  try {
    const { status } = await req.json();

    await prisma.order.update({
      where: {
        id,
      },
      data: {
        status,
      },
    });

    return NextResponse.json(
      { message: "Status changed successfully" },
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
