import { Movie } from "@/types/Movie";
import Image from "next/image";
import React from "react";
type Props = {
  movie: Movie;
  isLargeRow: boolean;
  imageUrl: string;
  onClick: (movie: Movie) => void;
};

export default function MovieCard({
  movie,
  isLargeRow,
  imageUrl,
  onClick,
}: Props) {
  return (
    <li
      className="relative min-w-[160px] flex-shrink-0 cursor-pointer"
      onClick={() => onClick(movie)}
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
  );
}
