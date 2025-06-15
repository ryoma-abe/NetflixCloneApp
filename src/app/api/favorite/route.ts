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
  try {
    // ログイン中のユーザーのメールアドレスを使って
    // データベースから「その人の情報（＝user）」を取り出して
    // user という変数にその中身を入れてる
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });
    if (!user) {
      return NextResponse.json(
        { error: "ユーザーが見つかりません" },
        { status: 404 }
      );
    }
    // ユーザーの「お気に入り」に、その映画を追加する処理
    await prisma.user.update({
      where: { id: user.id },
      data: {
        favorites: {
          connect: { id: movieId },
        },
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("お気に入り追加エラー:", error);
    return NextResponse.json(
      { error: "エラーが発生しました" },
      { status: 500 }
    );
  }
}
