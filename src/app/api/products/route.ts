export const runtime = "nodejs";

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/utils/connect";

//fetch all products
export const GET = async (req: NextRequest) => {
  const { searchParams } = new URL(req.url);
  const cat = searchParams.get("cat");
  console.log("cat ids" + cat);

  try {
    const products = await prisma.product.findMany({
      where: {
        ...(cat ? { catSlug: cat } : { isFeatured: true }),
      },
    });

    return new NextResponse(JSON.stringify(products), { status: 200 });
  } catch (err) {
    console.log(err);

    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 },
    );
  }
};

//add nw product
export const POST = async (req: NextRequest) => {
  try {
    const body = await req.json();
    const product = await prisma.product.create({
      data: body,
    });

    return new NextResponse(JSON.stringify(product), { status: 201 });
  } catch (err) {
    console.log(err);

    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 },
    );
  }
};
