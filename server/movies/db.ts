
import { connect } from 'mongoose';
import { Movie } from '../types';
import MovieSchema from './movieSchema';


const URL = 'mongodb://saltadmin:episalt@localhost:27017/saltcarts';

const createMovie = async (movie: Movie) => {
  await connect(URL);
  // The new cart still needs to be added to the MongoDb =)
  const newMovieSchema = new MovieSchema({
    id: movie.id,
    // name: movie.name,
    numberOfRates: movie.numberOfRates,
    rate: movie.rate,
  });
  await newMovieSchema.save();
};

const getMovieById = async (id:number) => {
  await connect(URL);
  const movies = await MovieSchema.find({ id: id });
  return movies;
};

const updateMovie = async movie => {
  await connect(URL);
  const updatedMovie = await MovieSchema.findOneAndUpdate(
    { id: movie.id },
    { $set: movie },
    {
      new: true,
    },
  );
  return updatedMovie;
};

export default {
  createMovie,
  getMovieById,
  updateMovie,
};
