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
    <div>
      {movie && (
        <Image
          src={`${imageUrl}${movie.backdrop_path}`}
          alt={movie.title || "Movie Poster"}
          width={1000}
          height={300}
        />
      )}
    </div>
  );
}
