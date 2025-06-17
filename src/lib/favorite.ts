import { prisma } from "@/lib/prisma";
//　ログインしているユーザーのお気に入りを取得する関数
export async function upsertMovieFromTMDB(movieId: string) {
  const TMDB_API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY!;
  const res = await fetch(
    `https://api.themoviedb.org/3/tv/${movieId}?api_key=${TMDB_API_KEY}&language=ja-JP`
  );

  if (!res.ok) throw new Error("TMDB API fetch failed");

  const data = await res.json();
  const thumbnail = data.poster_path
    ? `https://image.tmdb.org/t/p/w500${data.poster_path}`
    : "/no-image.jpg";

  return prisma.movie.upsert({
    where: { id: movieId },
    update: {
      title: data.name,
      description: data.overview,
      thumbnail,
      videoUrl: "",
      genre: data.genres?.[0]?.name ?? "ジャンル不明",
      duration: data.episode_run_time?.[0]
        ? `${data.episode_run_time[0]}分`
        : "不明",
    },
    create: {
      id: movieId,
      title: data.name,
      description: data.overview,
      thumbnail,
      videoUrl: "",
      genre: data.genres?.[0]?.name ?? "ジャンル不明",
      duration: data.episode_run_time?.[0]
        ? `${data.episode_run_time[0]}分`
        : "不明",
    },
  });
}
