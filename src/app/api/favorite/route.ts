// app/api/favorite/route.ts
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { movieId } = await req.json();
  console.log("受け取った movieId:", movieId);
  return NextResponse.json({ status: "OK", receivedId: movieId });
}
