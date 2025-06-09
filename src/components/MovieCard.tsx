import { Movie } from "@/types/Movie";
import Image from "next/image";
import React from "react";
type Props = {
  movie: Movie;
  isLargeRow: boolean;
  imageUrl: string;
};

export default function MovieCard({ movie, isLargeRow, imageUrl }: Props) {
  return (
    <Image
      src={`${imageUrl}${isLargeRow ? movie.poster_path : movie.backdrop_path}`}
      alt={movie.name || "Movie Poster"}
      width={isLargeRow ? 160 : 240}
      height={isLargeRow ? 240 : 135}
      className="rounded object-cover"
    />
  );
}
