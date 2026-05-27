import { prisma } from "@/utils/connect";
import { NextRequest, NextResponse } from "next/server";
console.log("STRIPE KEY EXISTS:", !!process.env.STRIPE_SECRET_KEY);
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
export const POST = async (
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) => {
  const { id } = await params;
  const order = await prisma.order.findUnique({
    where: { id: id },
  });
  if (order) {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(Number(order.price) * 100),
      currency: "cad",

      automatic_payment_methods: { enabled: true },
    });
    await prisma.order.update({
      where: {
        id: id,
      },
      data: { intent_id: paymentIntent.id },
    });
    console.log("CREATED INTENT:", paymentIntent?.id);
    return new NextResponse(
      JSON.stringify({ clientSecret: paymentIntent.client_secret }),
    );
  } else {
    return NextResponse.json({ message: "Order not found" }, { status: 403 });
  }
};
