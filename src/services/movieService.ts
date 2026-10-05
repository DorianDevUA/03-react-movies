import axios from 'axios';
import type { Movie } from '../types/movie';

axios.defaults.baseURL = 'https://api.themoviedb.org/3';
axios.defaults.headers.common['Authorization'] =
  `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`;

export const fetchMovies = async (query: string): Promise<Movie[]> => {
  const params = new URLSearchParams({
    language: 'en-US',
    include_adult: 'false',
    page: '1',
    query,
  });

  const url = `/search/movie?${params}`;

  const response = await axios.get(url);

  return response.data.results;
};
