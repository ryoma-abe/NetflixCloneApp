"use client";

import axios from "@/lib/axios";
import Image from "next/image";
import { useEffect, useState } from "react";

type Movie = {
  id: string;
  src: string;
  title: string;
};

export default function Row({ fetchUrl }: { fetchUrl: string }) {
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(fetchUrl);
      setMovies(request.data.results);
    }
    fetchData();
  }, [fetchUrl]);

  return (
    <ul className="flex gap-4 overflow-x-auto overscroll-x-contain whitespace-nowrap [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
      {movies.map((movie) => (
        <li key={movie.id} className="min-w-[160px] flex-shrink-0">
          <Image
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} // ポスター画像
            alt={movie.title || "Movie Poster"}
            width={300}
            height={450}
            className="rounded object-cover transition-transform duration-300 hover:scale-105"
          />
        </li>
      ))}
    </ul>
  );
}
