// src/lib/request.ts

// ✅ Next.js では process.env から取得
const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
const BASE_URL = "/discover/tv?api_key=";

// ✅ named export
export const requests = {
  fetchTrending: `/trending/all/week?api_key=${API_KEY}&watch_region=JP&language=ja-JP`,
  fetchNetflixOriginals: `${BASE_URL}${API_KEY}&with_networks=213&watch_region=JP&language=ja`,
  fetchTopRated: `${BASE_URL}${API_KEY}&language=ja-JP`,
  fetchActionMovies: `${BASE_URL}${API_KEY}&with_genres=10759&watch_region=JP&language=ja-JP`,
  fetchNewsMovies: `${BASE_URL}${API_KEY}&with_genres=10763&watch_region=JP&language=ja-JP`,
  fetchKidsMovies: `${BASE_URL}${API_KEY}&with_genres=10762&watch_region=JP&language=ja-JP`,
  fetchRomanceMovies: `${BASE_URL}${API_KEY}&with_genres=10749&watch_region=JP&language=ja-JP`,
  fetchDocumentMovies: `${BASE_URL}${API_KEY}&with_genres=99&watch_region=JP&language=ja-JP`,
  fetchMovieVideos: (movieId: string) =>
    `/tv/${movieId}/videos?api_key=${API_KEY}`,
};
