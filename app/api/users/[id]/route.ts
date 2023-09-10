import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const id = Number(params.id);
  const user = await prisma.user.findUnique({
    where: {
      id: id,
    },
  });
  if (!user) {
    return new NextResponse("User not found", {
      status: 404,
    });
  }
  return NextResponse.json(user);
}

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  const id = Number(params.id);
  let json = await request.json();

  const updated_user = await prisma.user.update({
    where: { id: id },
    data: json,
  });

  if (!updated_user) {
    return new NextResponse("User not found", {
      status: 404,
    });
  }
  return NextResponse.json(updated_user);
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = Number(params.id);
    await prisma.user.delete({
      where: { id: id },
    });
    return new NextResponse(null, { status: 204 });
  } catch (error: any) {
    if (error.code === "pp2025") {
      return new NextResponse("User not found", { status: 404 });
    }
    return new NextResponse(error.message, { status: 500 });
  }
}
