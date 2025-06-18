import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";

/** ログイン中ユーザーのお気に入り映画（全プロパティ）を返す */
export async function fetchFavorites() {
  const session = await getServerSession();
  if (!session?.user?.email) return [];

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    include: { favorites: true }, // ← 作品すべてを取得
  });

  return user?.favorites ?? [];
}
