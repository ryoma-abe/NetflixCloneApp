"use client";
import Image from "next/image";
import { FaRegCirclePlay } from "react-icons/fa6";
import { AiOutlineLike } from "react-icons/ai";
import { Movie } from "@/types/Movie";
import { useState } from "react";
import { requests } from "@/lib/request";
import axios from "@/lib/axios";
import YouTube from "react-youtube";

type MovieModalProps = {
  movie: Movie; // 表示する映画データ
  imageUrl: string; // 画像ベースURL（省略も可）
  onClose: () => void; // モーダルを閉じる関数
};
type Options = {
  height: string;
  width: string;
  playerVars: {
    autoplay: 0 | 1 | undefined;
  };
};
export function MovieModal({ movie, imageUrl, onClose }: MovieModalProps) {
  const [trailerUrl, setTrailerUrl] = useState<string | null>("");

  const handleClick = async () => {
    if (trailerUrl) {
      setTrailerUrl("");
    } else {
      const moviePlayUrl = await axios.get(requests.fetchMovieVideos(movie.id));
      setTrailerUrl(
        (moviePlayUrl.data as { results: { key: string }[] }).results[0]?.key
      );
    }
  };
  const opts: Options = {
    height: "390",
    width: "640",
    playerVars: {
      autoplay: 1,
    },
  };
  return (
    <div
      className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-neutral-900 text-white rounded-lg p-6 w-[90%] max-w-xl relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-white text-xl"
        >
          ✕
        </button>

        <h2 className="text-xl font-bold mb-4">{movie.name}</h2>

        <Image
          src={`${imageUrl}${movie.backdrop_path}`}
          alt={movie.name}
          width={800}
          height={450}
          className="rounded mb-4"
        />

        <div className="flex justify-center gap-4 mb-4">
          <button
            onClick={handleClick}
            className="bg-white text-black rounded-full p-2 hover:scale-105 transition"
          >
            <FaRegCirclePlay size={22} />
          </button>
          <button className="bg-white text-black rounded-full p-2 hover:scale-105 transition">
            <AiOutlineLike size={22} />
          </button>
        </div>

        <p className="text-sm text-neutral-300 text-center">{movie.overview}</p>
        {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
      </div>
    </div>
  );
}
