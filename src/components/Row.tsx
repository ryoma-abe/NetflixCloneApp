"use client";

import axios from "@/lib/axios";
import { Movie } from "@/types/Movie";

import { useEffect, useState } from "react";
import MovieCard from "./MovieCard";
import { MovieModal } from "./MovieModal";

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

  // モーダルを閉じる関数
  const onClose = () => {
    setSelectedMovie(null);
  };
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
            <MovieCard
              movie={movie}
              isLargeRow={isLargeRow}
              imageUrl={imageUrl}
            />
          </li>
        ))}
      </ul>

      {selectedMovie && (
        <MovieModal
          onClose={onClose}
          movie={selectedMovie}
          imageUrl={imageUrl}
        />
      )}
    </div>
  );
}
