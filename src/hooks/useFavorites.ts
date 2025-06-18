// src/hooks/useFavorites.ts
import { useEffect, useState } from "react";
import { Movie } from "@/types/Movie";

export function useFavorites() {
  const [favorites, setFavorites] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);

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

  return { favorites, loading };
}
