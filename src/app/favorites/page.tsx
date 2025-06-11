"use client";
import React from "react";
import Header from "@/components/Header";
import Image from "next/image";
import { Movie } from "@/types/Movie";

// ダミーデータ
const favoriteMovies: Movie[] = [
  {
    id: "1",
    title: "The Crown",
    name: "The Crown",
    poster_path: "/qJMF_qTqsAX0vNmERr0IM4jrYaO.jpg",
    backdrop_path: "/qJMF_qTqsAX0vNmERr0IM4jrYaO.jpg",
    overview:
      "Follows the political rivalries and romance of Queen Elizabeth II's reign and the events that shaped the second half of the twentieth century.",
  },
  {
    id: "2",
    title: "Stranger Things",
    name: "Stranger Things",
    poster_path: "/49WJfeN0moxb9IPfGn8AIqMGskD.jpg",
    backdrop_path: "/49WJfeN0moxb9IPfGn8AIqMGskD.jpg",
    overview:
      "When a young boy vanishes, a small town uncovers a mystery involving secret experiments, terrifying supernatural forces, and one strange little girl.",
  },
  {
    id: "3",
    title: "The Witcher",
    name: "The Witcher",
    poster_path: "/7vjaCdMw15FEbXyLQTVa04URsPm.jpg",
    backdrop_path: "/7vjaCdMw15FEbXyLQTVa04URsPm.jpg",
    overview:
      "Geralt of Rivia, a mutated monster-hunter for hire, journeys toward his destiny in a turbulent world where people often prove more wicked than beasts.",
  },
  {
    id: "4",
    title: "Wednesday",
    name: "Wednesday",
    poster_path: "/9PFonBhy4cQy7Jz20NpMygczOkv.jpg",
    backdrop_path: "/9PFonBhy4cQy7Jz20NpMygczOkv.jpg",
    overview:
      "Smart, sarcastic and a little dead inside, Wednesday Addams investigates a murder spree while making new friends — and foes — at Nevermore Academy.",
  },
  {
    id: "5",
    title: "Money Heist",
    name: "Money Heist",
    poster_path: "/reEMJA1uzscCbkpeRJeTT2bjqUp.jpg",
    backdrop_path: "/reEMJA1uzscCbkpeRJeTT2bjqUp.jpg",
    overview:
      "To carry out the biggest heist in history, a mysterious man called the Professor recruits a band of eight robbers who have a single characteristic: none of them has anything to lose.",
  },
  {
    id: "6",
    title: "Dark",
    name: "Dark",
    poster_path: "/2S1nLSVU5xh4qUEGoP8PY0P9q82.jpg",
    backdrop_path: "/2S1nLSVU5xh4qUEGoP8PY0P9q82.jpg",
    overview:
      "A family saga with a supernatural twist, set in a German town, where the disappearance of two young children exposes the relationships among four families.",
  },
];

export default function FavoritesPage() {
  const baseImageUrl = "https://image.tmdb.org/t/p/w500";

  return (
    <main className="bg-black min-h-screen text-white">
      <Header />

      {/* メインコンテンツ */}
      <div className="pt-20 px-8">
        {/* ページヘッダー */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">お気に入り</h1>
          <p className="text-gray-400 text-lg">
            あなたがお気に入りに追加した作品 ({favoriteMovies.length}件)
          </p>
        </div>

        {/* お気に入り作品の表示 */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
          {favoriteMovies.map((movie) => (
            <div key={movie.id} className="group relative">
              {/* 画像 */}
              <div className="relative">
                <Image
                  src={`${baseImageUrl}${movie.poster_path}`}
                  alt={movie.title}
                  width={200}
                  height={300}
                  className="rounded object-cover w-full h-auto group-hover:scale-105 transition-transform duration-300"
                />

                {/* ホバー時のオーバーレイ */}
                <div className="absolute inset-0 bg-black bg-opacity-60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded flex items-center justify-center">
                  <div className="flex gap-2">
                    <div className="bg-white text-black w-10 h-10 rounded-full flex items-center justify-center">
                      ▶
                    </div>
                    <div className="bg-red-600 text-white w-10 h-10 rounded-full flex items-center justify-center">
                      ♥
                    </div>
                  </div>
                </div>
              </div>

              {/* タイトル */}
              <div className="mt-2">
                <h3 className="text-sm font-medium truncate">{movie.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
