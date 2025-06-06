"use client";
import { Movie } from "@/types/Movie";
import axios from "@/lib/axios";
import React, { useEffect, useState } from "react";
import { requests } from "@/lib/request";
import Image from "next/image";

export default function Banner() {
  const [movie, setMovie] = useState<Movie>();

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get<{ results: Movie[] }>(
        requests.fetchNetflixOriginals
      );
      setMovie(
        request.data.results[
          Math.floor(Math.random() * request.data.results.length - 1)
        ]
      );
    }
    fetchData();
  }, []);
  const imageUrl = "https://image.tmdb.org/t/p/original";

  return (
    <div className="relative w-full h-[500px]">
      {movie && (
        <Image
          src={`${imageUrl}${movie.backdrop_path}`}
          alt={movie.title}
          fill
          sizes="100vw"
          className="object-cover object-top"
        />
      )}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black/80 to-transparent" />
    </div>
  );
}
