"use client";
import { useFavorites } from "@/hooks/useFavorites";
import Image from "next/image";

export default function FavoritesPage() {
  const { favorites, loading, removeFavorite } = useFavorites();

  if (loading) {
    return <p className="p-6 text-center text-gray-500">読み込み中...</p>;
  }

  if (!favorites.length) {
    return (
      <p className="p-6 text-center text-gray-500">
        まだお気に入りがありません。
      </p>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
      <h1 className="text-2xl font-bold mb-6 text-center">お気に入り作品</h1>

      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {favorites.map((movie) => (
          <li
            key={movie.id}
            className="bg-neutral-800 text-white rounded-2xl overflow-hidden shadow hover:shadow-lg transition-shadow flex flex-col"
          >
            <div className="relative w-full h-48">
              <Image
                src={
                  movie.thumbnail?.startsWith("http")
                    ? movie.thumbnail
                    : "/no-image.jpg"
                }
                alt={movie.title}
                fill
                className="object-cover"
                sizes="(max-width:768px) 100vw,
                       (max-width:1200px) 50vw,
                       33vw"
              />
            </div>
            <div className="p-4 flex flex-col flex-1">
              <h3 className="text-lg font-bold truncate">{movie.title}</h3>
              <p className="text-sm text-gray-400 mt-1">
                {movie.genre}・{movie.duration}
              </p>
              <button
                onClick={() => removeFavorite(movie.id)}
                className="mt-4 w-full bg-red-600 text-white text-sm py-2 px-4 rounded-lg hover:bg-red-700 transition-colors"
              >
                お気に入りから削除
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
