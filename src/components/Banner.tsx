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
      const { data } = await axios.get<{ results: Movie[] }>(
        requests.fetchNetflixOriginals
      );
      const picked =
        data.results[Math.floor(Math.random() * data.results.length)];
      setMovie(picked);
    }
    fetchData();
  }, []);

  const imageUrl = "https://image.tmdb.org/t/p/original";

  return (
    <div className="relative w-full h-[500px] text-white">
      {movie && (
        <>
          <Image
            src={`${imageUrl}${movie.backdrop_path}`}
            alt={movie.name}
            fill
            sizes="100vw"
            className="object-cover object-top"
          />

          {/* グラデーションオーバーレイ */}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black/80 to-transparent" />

          {/* タイトル & ディスクリプション */}
          <div className="absolute bottom-16 left-6 right-6 max-w-xl">
            <h2 className="mb-2 text-3xl font-bold drop-shadow-md">
              {movie.name}
            </h2>
            <p className="text-sm leading-relaxed line-clamp-3 drop-shadow-md">
              {movie.overview}
            </p>
          </div>
        </>
      )}
    </div>
  );
}
