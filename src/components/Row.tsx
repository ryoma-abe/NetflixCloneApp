"use client";

import axios from "@/lib/axios";
import { Movie } from "@/types/Movie";
import Image from "next/image";
import { useEffect, useState } from "react";
import { FaRegCirclePlay } from "react-icons/fa6";
import { AiOutlineLike } from "react-icons/ai";

type TMDBResponse = {
  results: Movie[];
};

type RowProps = {
  fetchUrl: string;
  isLargeRow: boolean;
  title: string;
};

export default function Row({ fetchUrl, isLargeRow, title }: RowProps) {
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get<TMDBResponse>(fetchUrl);
      setMovies(request.data.results);
    }
    fetchData();
  }, [fetchUrl]);

  const imageUrl = "https://image.tmdb.org/t/p/original";
  return (
    <div className="mb-8 px-4">
      <p className="text-xl font-semibold mb-2">{title}</p>
      <ul className="flex gap-4 overflow-x-auto overscroll-x-contain whitespace-nowrap [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
        {movies.map((movie) => (
          <li key={movie.id} className="relative min-w-[160px] flex-shrink-0">
            {/* サムネイル */}
            <Image
              src={`${imageUrl}${
                isLargeRow ? movie.poster_path : movie.backdrop_path
              }`}
              alt={movie.name || "Movie Poster"}
              width={isLargeRow ? 160 : 240}
              height={isLargeRow ? 240 : 135}
              className="rounded object-cover"
            />

            {/* 常時表示ボタン */}
            <div className="absolute bottom-2 left-2 flex gap-2">
              <button className="bg-black/60 text-white rounded-full p-1 hover:bg-white/80 hover:text-black transition">
                <FaRegCirclePlay size={18} />
              </button>
              <button className="bg-black/60 text-white rounded-full p-1 hover:bg-white/80 hover:text-black transition">
                <AiOutlineLike size={18} />
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
