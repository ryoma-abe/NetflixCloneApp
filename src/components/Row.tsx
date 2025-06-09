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
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

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
          <li
            key={movie.id}
            className="relative min-w-[160px] flex-shrink-0 cursor-pointer"
            onClick={() => setSelectedMovie(movie)}
          >
            <Image
              src={`${imageUrl}${
                isLargeRow ? movie.poster_path : movie.backdrop_path
              }`}
              alt={movie.name || "Movie Poster"}
              width={isLargeRow ? 160 : 240}
              height={isLargeRow ? 240 : 135}
              className="rounded object-cover"
            />
          </li>
        ))}
      </ul>

      {selectedMovie && (
        <div
          className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
          onClick={() => setSelectedMovie(null)}
        >
          <div
            className="bg-neutral-900 text-white rounded-lg p-6 w-[90%] max-w-xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedMovie(null)}
              className="absolute top-2 right-2 text-white text-xl"
            >
              ✕
            </button>

            <h2 className="text-xl font-bold mb-4">{selectedMovie.name}</h2>

            <Image
              src={`${imageUrl}${selectedMovie.backdrop_path}`}
              alt={selectedMovie.name}
              width={800}
              height={450}
              className="rounded mb-4"
            />

            <div className="flex justify-center gap-4 mb-4">
              <button className="bg-white text-black rounded-full p-2 hover:scale-105 transition">
                <FaRegCirclePlay size={22} />
              </button>
              <button className="bg-white text-black rounded-full p-2 hover:scale-105 transition">
                <AiOutlineLike size={22} />
              </button>
            </div>

            <p className="text-sm text-neutral-300 text-center">
              映画の詳細などをここに記載できます。
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
