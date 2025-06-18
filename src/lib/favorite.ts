// src/services/favorites.ts
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";

/** ログイン中ユーザーのお気に入り映画ID一覧を返す */
export async function fetchFavoriteIds() {
  const session = await getServerSession();
  if (!session?.user?.email) return [];
  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    include: { favorites: true }, // 全プロパティ
  });
  return user?.favorites.map((m) => m.id) ?? [];
}
