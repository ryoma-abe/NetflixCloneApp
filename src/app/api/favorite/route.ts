// app/api/favorite/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { PrismaClient } from "@prisma/client";

// Prismaクライアントを初期化（App Routerならlib化推奨）
const prisma = new PrismaClient();

// POSTリクエスト処理
export async function POST(req: NextRequest) {
  const session = await getServerSession();

  if (!session?.user?.email) {
    return NextResponse.json({ error: "ログインが必要です" }, { status: 401 });
  }

  const { movieId } = await req.json();
  const movieIdStr = String(movieId);

  try {
    // ユーザー取得
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });
    if (!user) {
      return NextResponse.json(
        { error: "ユーザーが見つかりません" },
        { status: 404 }
      );
    }

    // TMDBから情報を取得
    const response = await fetch(
      `https://api.themoviedb.org/3/tv/${movieIdStr}?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&language=ja-JP`
    );
    if (!response.ok) {
      return NextResponse.json(
        { error: "映画情報の取得に失敗しました" },
        { status: 502 }
      );
    }
    const movieData = await response.json();

    // サムネイルURLの構築（poster_pathがnullの場合の対策あり）
    const thumbnail = movieData.poster_path
      ? `https://image.tmdb.org/t/p/w500${movieData.poster_path}`
      : "/no-image.jpg";

    // movieテーブルにupsert（存在すれば更新、なければ作成）
    await prisma.movie.upsert({
      where: { id: movieIdStr },
      update: {
        title: movieData.name,
        description: movieData.overview,
        thumbnail,
        videoUrl: "", // 必要なら /videos API で追加可能
        genre: movieData.genres?.[0]?.name ?? "ジャンル不明",
        duration: movieData.episode_run_time?.[0]
          ? `${movieData.episode_run_time[0]}分`
          : "不明",
      },
      create: {
        id: movieIdStr,
        title: movieData.name,
        description: movieData.overview,
        thumbnail,
        videoUrl: "",
        genre: movieData.genres?.[0]?.name ?? "ジャンル不明",
        duration: movieData.episode_run_time?.[0]
          ? `${movieData.episode_run_time[0]}分`
          : "不明",
      },
    });

    // お気に入りに登録
    await prisma.user.update({
      where: { id: user.id },
      data: {
        favorites: {
          connect: { id: movieIdStr },
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
