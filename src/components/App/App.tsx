import { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { fetchMovies } from '../../services/movieService';
import type { Movie } from '../../types/movie';
import SearchBar from '../SearchBar/SearchBar';
import MovieGrid from '../MovieGrid/MovieGrid';
import Loader from '../Loader/Loader';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import MovieModal from '../MovieModal/MovieModal';

const App = () => {
  const [movies, setMovies] = useState<Movie[] | null>(null);
  const [movie, setMovie] = useState<Movie | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isHttpError, setIsHttpError] = useState(false);

  const handleSearch = async (query: string) => {
    try {
      setIsLoading(true);
      setIsHttpError(false);
      setMovies(null);

      const movieList = await fetchMovies(query);

      if (!movieList.length) {
        toast.error('No movies found for your request.');
        return;
      }

      setMovies(movieList);
    } catch {
      toast.error('There was an error, please try again...');
      setIsHttpError(true);
    } finally {
      setIsLoading(false);
    }
  };

  const onModalClose = () => {
    setIsModalOpen(false);
    setMovie(null); // Скидаємо вибраний фільм
  };

  const handleSelectMovie = (selectedMovie: Movie) => {
    setIsModalOpen(true);
    setMovie(selectedMovie);
  };

  return (
    <>
      <SearchBar onSubmit={handleSearch} />

      {isLoading ? (
        <Loader />
      ) : isHttpError ? (
        <ErrorMessage />
      ) : (
        movies && <MovieGrid movies={movies} onSelect={handleSelectMovie} />
      )}

      {isModalOpen && <MovieModal movie={movie} onClose={onModalClose} />}

      <Toaster position="top-center" />
    </>
  );
};

export default App;
