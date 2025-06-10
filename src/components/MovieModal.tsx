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
  movie: Movie;
  imageUrl: string;
  onClose: () => void;
};

export function MovieModal({ movie, imageUrl, onClose }: MovieModalProps) {
  const [trailerUrl, setTrailerUrl] = useState<string | null>("");
  // youtubeトレイラーのオプション設定
  const opts = {
    width: "100%",
    height: "390",
    playerVars: { autoplay: 1 },
  };
  // 再生ボタンを押したときの関数
  const handlePlay = async () => {
    if (trailerUrl) {
      setTrailerUrl("");
    } else {
      const moviePlayUrl = await axios.get(requests.fetchMovieVideos(movie.id));
      setTrailerUrl(
        (moviePlayUrl.data as { results: { key: string }[] }).results[0]?.key
      );
    }
  };
  // お気に入りボタンを押したときの関数
  const handleFavorite = async (movieId: string) => {
    const res = await fetch("/api/favorite", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ movieId }),
    });

    const data = await res.json();
    if (data.status === "OK") {
      console.log("サーバーから受け取ったID:", data.receivedId);
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 px-4"
      onClick={onClose}
    >
      <div
        className="bg-neutral-900 text-white rounded-lg p-6 w-full max-w-3xl relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-white text-xl"
        >
          ✕
        </button>

        <h2 className="text-2xl font-bold mb-4 text-center">{movie.name}</h2>

        {/* 画像と概要：trailerUrl がないときだけ表示 */}
        {!trailerUrl && (
          <>
            <div className="w-full rounded overflow-hidden mb-4">
              <Image
                src={`${imageUrl}${movie.backdrop_path}`}
                alt={movie.name}
                width={800}
                height={450}
                className="w-full h-auto object-cover"
              />
            </div>

            <p className="text-sm text-neutral-300 text-center mb-4">
              {movie.overview}
            </p>
          </>
        )}
        <div className="flex justify-center gap-6 mb-4">
          <button
            onClick={handlePlay}
            className="bg-white text-black rounded-full p-3 hover:scale-105 transition"
          >
            <FaRegCirclePlay size={22} />
          </button>
          <button
            onClick={() => handleFavorite(movie.id)}
            className="bg-white text-black rounded-full p-3 hover:scale-105 transition"
          >
            <AiOutlineLike size={22} />
          </button>
        </div>

        {/* YouTube動画表示*/}
        {trailerUrl && (
          <div className="aspect-video w-full overflow-hidden rounded shadow-lg">
            <YouTube
              videoId={trailerUrl}
              opts={opts}
              className="w-full h-full"
            />
          </div>
        )}
      </div>
    </div>
  );
}
