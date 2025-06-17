import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import Image from "next/image";

export default async function FavoritesPage() {
  const user = await getCurrentUser();

  if (!user?.email) return [];

  const currentUser = await prisma.user.findUnique({
    where: { email: user.email },
    include: { favorites: true },
  });

  const favorites = currentUser?.favorites ?? [];

  return (
    <div className="container mx-auto p-4">
      <ul className="space-y-4">
        {favorites.map((movie) => (
          <li
            key={movie.id}
            className="border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200"
          >
            <div className="flex gap-4 p-4">
              {/* サムネイル画像 */}
              <div className="relative w-24 h-36 flex-shrink-0 rounded-md overflow-hidden bg-gray-100">
                <Image
                  src={movie.thumbnail}
                  alt={movie.title || "No Title"}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
              {/* 映画情報 */}
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-lg mb-2 line-clamp-2">
                  {movie.title}
                </h3>
                <div className="flex flex-wrap gap-2 text-sm text-gray-600">
                  <span className="bg-gray-100 px-2 py-1 rounded-full">
                    {movie.genre}
                  </span>
                  <span className="bg-gray-100 px-2 py-1 rounded-full">
                    {movie.duration}
                  </span>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
