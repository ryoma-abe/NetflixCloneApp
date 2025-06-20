"use client";
import Image from "next/image";
import { FaRegCirclePlay } from "react-icons/fa6";
import { AiOutlineLike, AiFillLike } from "react-icons/ai";
import { Movie } from "@/types/Movie";
import { useState } from "react";
import { requests } from "@/lib/request";
import axios from "@/lib/axios";
import YouTube from "react-youtube";
import { useFavorites } from "@/hooks/useFavorites";
import { useSession } from "next-auth/react";

type MovieModalProps = {
  movie: Movie;
  imageUrl: string;
  onClose: () => void;
};

export function MovieModal({ movie, imageUrl, onClose }: MovieModalProps) {
  const [trailerUrl, setTrailerUrl] = useState<string | null>("");
  const { favorites, addFavorite, removeFavorite } = useFavorites();
  const isFavorited = favorites.some((fav) => fav.id === movie.id);

  const { data: session } = useSession();

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

        {!trailerUrl && (
          <>
            <div className="w-full rounded overflow-hidden mb-4">
              <Image
                src={
                  movie.backdrop_path
                    ? `${imageUrl}${movie.backdrop_path}`
                    : "/no-image.jpg"
                }
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
          {session &&
            (isFavorited ? (
              <button
                onClick={() => removeFavorite(movie.id)}
                className="rounded-full p-3 hover:scale-105"
              >
                <AiFillLike size={22} />
              </button>
            ) : (
              <button
                onClick={() => addFavorite(movie)}
                className="rounded-full p-3 hover:scale-105"
              >
                <AiOutlineLike size={22} />
              </button>
            ))}
        </div>

        {trailerUrl && (
          <div className="aspect-video w-full overflow-hidden rounded shadow-lg">
            <YouTube
              videoId={trailerUrl}
              opts={{
                width: "100%",
                height: "390",
                playerVars: { autoplay: 1 },
              }}
              className="w-full h-full"
            />
          </div>
        )}
      </div>
    </div>
  );
}
