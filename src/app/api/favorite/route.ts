import { NextResponse } from "next/server";

export async function POST() {
  return NextResponse.json({ status: "API OK" });
}
