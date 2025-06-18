// app/favorites/page.tsx

import { fetchFavoriteIds } from "@/lib/favorite";

export default async function FavoritesPage() {
  const favoriteIds = await fetchFavoriteIds();

  return (
    <div className="max-w-2xl mx-auto py-10 px-4">
      <h1 className="text-2xl font-bold mb-6 text-center">
        お気に入りの映画ID一覧
      </h1>
      <ul className="space-y-4">
        {favoriteIds.map((id) => (
          <li
            key={id}
            className="bg-neutral-800 text-white p-4 rounded shadow flex items-center justify-between"
          >
            <span className="font-mono">{id}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
