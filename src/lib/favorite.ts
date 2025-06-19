// お気に入り追加の関数
export const handleFavorite = async (movieId: string) => {
  const res = await fetch("/api/favorite", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ movieId }),
  });
  return res.ok;
};
// お気に入り削除の関数
export const handleRemoveFavorite = async (movieId: string) => {
  const res = await fetch("/api/favorite", {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ movieId }),
  });
  return res.ok;
};
