// app/api/favorite/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { PrismaClient } from "@prisma/client";

// DBに接続して操作ができるように
const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  // ログイン情報を取得
  const session = await getServerSession();
  // ログイン確認しているかの確認
  if (!session?.user?.email) {
    return NextResponse.json({ error: "ログインが必要です" }, { status: 401 });
  }

  const { movieId } = await req.json();

  // ログインしている人がDBに登録されているか確認（ユニークなメールアドレスで）
try{
  const user = await prisma.user.findUnique({
    where:{email:session.user.email}
  })
  if(!user){
    return NextResponse.json({error:"ユーザーが見つかりません"},{status:404})
  }
}












}
