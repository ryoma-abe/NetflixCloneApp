"use client";
import { Movie } from "@/types/Movie";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState<Movie[]>([]);

  useEffect(() => {
    const fetchFavorites = async () => {
      const res = await fetch("/api/favorite");
      if (!res.ok) return;
      const data = await res.json();
      setFavorites(data);
    };
    fetchFavorites();
  }, []);

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
            className="bg-neutral-800 text-white rounded-2xl overflow-hidden shadow hover:shadow-lg transition-shadow"
          >
            {/* サムネイル */}
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

            {/* テキスト部 */}
            <div className="p-4">
              <h3 className="text-lg font-bold truncate">{movie.title}</h3>
              <p className="text-sm text-gray-400 mt-1">
                {movie.genre}・{movie.duration}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
