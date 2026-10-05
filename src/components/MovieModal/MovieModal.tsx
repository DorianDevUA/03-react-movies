import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import type { Movie } from '../../types/movie';
import css from './MovieModal.module.css';

interface MovieModalProps {
  movie: Movie | null;
  onClose: () => void;
}

const MovieModal = ({ movie, onClose }: MovieModalProps) => {
  useEffect(() => {
    function handleKeyDown(evt: KeyboardEvent) {
      if (evt.code === 'Escape') {
        onClose();
      }
    }

    // Закриття модалки при натисканні клавіши Escape
    document.addEventListener('keydown', handleKeyDown);
    // Заборона прокрутки фону
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  if (!movie) {
    return;
  }

  // Закриття модалки по кліку на Backdrop
  function handleBackdropClick(evt: React.MouseEvent<HTMLDivElement>) {
    if (evt.target === evt.currentTarget) {
      onClose();
    }
  }

  return createPortal(
    <div
      className={css.backdrop}
      role="dialog"
      aria-modal="true"
      onClick={handleBackdropClick}
    >
      <div className={css.modal}>
        <button
          className={css.closeButton}
          aria-label="Close modal"
          onClick={onClose}
        >
          &times;
        </button>
        <img
          src={`https://image.tmdb.org/t/p/original${movie?.backdrop_path}`}
          alt={movie?.title}
          className={css.image}
        />
        <div className={css.content}>
          <h2>{movie?.title}</h2>
          <p>{movie?.overview}</p>
          <p>
            <strong>Release Date:</strong> {movie?.release_date}
          </p>
          <p>
            <strong>Rating:</strong> {movie?.vote_average}/10
          </p>
        </div>
      </div>
    </div>,
    document.body,
  );
};

export default MovieModal;
