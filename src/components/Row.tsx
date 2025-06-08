"use client";

import axios from "@/lib/axios";
import { Movie } from "@/types/Movie";
import Image from "next/image";
import { useEffect, useState } from "react";


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
          <li key={movie.id} className="min-w-[140px] flex-shrink-0">
            <Image
              src={`${imageUrl}${
                isLargeRow ? movie.poster_path : movie.backdrop_path
              }`}
              alt={movie.name || "Movie Poster"}
              width={isLargeRow ? 160 : 240}
              height={isLargeRow ? 240 : 135}
              className="rounded object-cover transition-transform duration-300 hover:scale-105"
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
