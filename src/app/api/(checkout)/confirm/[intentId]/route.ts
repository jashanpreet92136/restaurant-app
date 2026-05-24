import { prisma } from "@/utils/connect";
import { NextRequest, NextResponse } from "next/server";

export const PUT = async (
  req: NextRequest,
  { params }: { params: Promise<{ intentId: string }> },
) => {
  const { intentId } = await params;

  try {
    await prisma.order.updateMany({
      where: { intent_id: intentId },
      data: { status: "being prepared" },
    });

    return NextResponse.json(
      { message: "Order has been updated!" },
      { status: 201 },
    );
  } catch (e) {
    return NextResponse.json(
      { message: "Something went wrong!" },
      { status: 503 },
    );
  }
};
