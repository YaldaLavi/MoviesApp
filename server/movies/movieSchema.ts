import { Schema, model } from 'mongoose';
import { Movie } from '../types';

const movieSchema = new Schema<Movie>({
  id: { type: Number, required: true },
  numberOfRates: { type: Number, required: true },
  comments: {type: [], required: true },
  rate: { type: Number, required: true },
});

const MovieSchema = model<Movie>('Movie', movieSchema);

export default MovieSchema;
