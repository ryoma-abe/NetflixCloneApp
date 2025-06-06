"use client";

import axios from "@/lib/axios";
import Image from "next/image";
import { useEffect, useState } from "react";

type Movie = {
  id: string;
  title: string;
  poster_path: string;
  backdrop_path: string;
};

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
    <ul className="flex gap-4 overflow-x-auto overscroll-x-contain whitespace-nowrap [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
      {movies.map((movie) => (
        <li key={movie.id} className="min-w-[100px] flex-shrink-0">
          <p>{title}</p>
          <Image
            src={`${imageUrl}${
              isLargeRow ? movie.poster_path : movie.backdrop_path
            }`}
            alt={movie.title || "Movie Poster"}
            width={200}
            height={100}
            className="rounded object-cover transition-transform duration-300 hover:scale-105"
          />
        </li>
      ))}
    </ul>
  );
}
