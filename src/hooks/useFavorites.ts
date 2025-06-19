// src/hooks/useFavorites.ts
import { useEffect, useState } from "react";
import { Movie } from "@/types/Movie";
import { handleFavorite, handleRemoveFavorite } from "@/lib/favorite";

export function useFavorites() {
  const [favorites, setFavorites] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);

  // 初期取得
  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const res = await fetch("/api/favorite");
        if (!res.ok) return;
        const data: Movie[] = await res.json();
        setFavorites(data);
      } catch (err) {
        console.error("お気に入り取得エラー:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, []);

  // お気に入り追加
  const addFavorite = async (movie: Movie) => {
    setFavorites((prev) => [...prev, movie]);
    const success = await handleFavorite(movie.id);
    if (!success) {
      setFavorites((prev) => prev.filter((m) => m.id !== movie.id));
    }
  };

  // お気に入り削除
  const removeFavorite = async (movieId: string) => {
    const backup = [...favorites];
    setFavorites((prev) => prev.filter((m) => m.id !== movieId));
    const success = await handleRemoveFavorite(movieId);
    if (!success) {
      setFavorites(backup); // ロールバック
    }
  };

  return {
    favorites,
    loading,
    addFavorite,
    removeFavorite,
  };
}
