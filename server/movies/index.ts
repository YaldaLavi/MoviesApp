import db from './db';
import { Movie } from '../types';

const getMovie = async (id: number) :Promise<Movie> => {
  const movieDB = await db.getMovieById(id);
  if (movieDB.length === 0) {
    const newMovie = {id: id,  numberOfRates: 0, rate: 0, comments: []};
     await db.createMovie(newMovie);
     return newMovie;
  }
  return movieDB[0];
}

const updateMovieRate = async (movie: Movie, rate: number) => {
  const newMovie = movie;
  newMovie.rate = Math.floor(( (movie.numberOfRates * movie.rate) + rate ) / (movie.numberOfRates + 1))
  newMovie.numberOfRates = movie.numberOfRates + 1;
  return db.updateMovie(newMovie);
};

const updateMovieComment = async (movie: Movie, comment: string) => {
  const newMovie = movie;
  newMovie.comments.push(comment);
  return db.updateMovie(newMovie);
};

export {
  getMovie,
  updateMovieRate,
  updateMovieComment,
};
