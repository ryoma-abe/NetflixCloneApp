import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export default async function FavoritesPage() {
  const user = await getCurrentUser();

  if (!user?.email) return [];

  const currentUser = await prisma.user.findUnique({
    where: { email: user.email },
    include: { favorites: true },
  });

  const favorites = currentUser?.favorites ?? [];

  return (
    <ul className="space-y-2">
      {favorites.map((movie) => (
        <li key={movie.id} className="border p-3 rounded">
          <p className="font-semibold">{movie.title}</p>
          <p className="text-sm text-gray-500">
            {movie.genre} / {movie.duration}
          </p>
        </li>
      ))}
    </ul>
  );
}
