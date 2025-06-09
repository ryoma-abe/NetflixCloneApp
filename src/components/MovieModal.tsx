import Image from "next/image";
import { FaRegCirclePlay } from "react-icons/fa6";
import { AiOutlineLike } from "react-icons/ai";
import { Movie } from "@/types/Movie";

type MovieModalProps = {
  movie: Movie; // 表示する映画データ
  imageUrl: string; // 画像ベースURL（省略も可）
  onClose: () => void; // モーダルを閉じる関数
};
export function MovieModal({ movie, imageUrl, onClose }: MovieModalProps) {
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
          <button className="bg-white text-black rounded-full p-2 hover:scale-105 transition">
            <FaRegCirclePlay size={22} />
          </button>
          <button className="bg-white text-black rounded-full p-2 hover:scale-105 transition">
            <AiOutlineLike size={22} />
          </button>
        </div>

        <p className="text-sm text-neutral-300 text-center">
          {movie.overview}
        </p>
      </div>
    </div>
  );
}
