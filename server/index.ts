import express, { Request, Response, Application } from 'express';
import {
  getMovie, updateMovieRate, updateMovieComment,
} from './movies';
import axios from "axios";


var cors = require('cors')


const apiKey = '8c5f8d6cdb68d80d6bd849469438a47d'

const app: Application = express();
app.use(cors()) // Use this after the variable declaration
const port = 3001;
app.use(express.json());

app.get('/api/movie/:id', async (req, res) => {
  const { id } = req.params;
  if (id === undefined) {
    res.status(400).json({ message: 'id not found' });
    return;
  }
  const movieDetail = await getMovie(parseInt(id));
  return res
    .status(201)
    .json(movieDetail);
});

app.get('/api/movie/info/:id', async (req, res) => {
  const { id } = req.params;
  if (id === undefined) {
    res.status(400).json({ message: 'id not found' });
    return;
  }
  const url = `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&language=en-US`
  const { data } = await axios.get(url);
  const movieInfo = data;
  return res
    .status(201)
    .json(movieInfo);
});

app.get('/api/search/:title', async (req, res) => {
  const { title } = req.params;
  if (title === undefined) {
    res.status(400).json({ message: 'title not found' });
    return;
  }

  const url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=en-US&query=${title}&page=1&include_adult=false`;
  const { data } = await axios.get(url);
  const moviesList = data;
  res.json(moviesList);
});

app.get('/api/trending/list', async (req: Request, res: Response) => {
  const url = `https://api.themoviedb.org/3/trending/all/day?api_key=${apiKey}`;
  const { data } = await axios.get(url)
  const moviesList = data
  res.status(200).json(moviesList);
});

app.get('/api/movies/list/:page', async (req: Request, res: Response) => {
  const { page } = req.params;
  if (page === undefined) {
    res.status(400).json({ message: 'page not found' });
    return;
  }
  const url = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_watch_monetization_types=flatrate`;
  const { data } = await axios.get(url);
  const moviesList = data;
  res.status(200).json(moviesList);
});

app.get('/api/tv/list/:page', async (req: Request, res: Response) => {

  const { page } = req.params;
  if (page === undefined) {
    res.status(400).json({ message: 'page not found' });
    return;
  }
  const url = `https://api.themoviedb.org/3/discover/tv?api_key=${apiKey}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_watch_monetization_types=flatrate`;
  const { data } = await axios.get(url);
  const moviesList = data;
  res.status(200).json(moviesList);
});

app.post('/api/movie/rate', async (req, res) => {
  const { id, rate } = req.body;
  if (id === undefined) {
    res.status(400).json({ message: 'id not found' });
    return;
  }
  if (rate === undefined) {
    res.status(400).json({ message: 'rate not found' });
    return;
  }

  const movie = await getMovie(id);
  const updatedMovie = await updateMovieRate(movie, rate)
  res.status(201).json(updatedMovie);
});

app.post('/api/movie/comment', async (req, res) => {
  const { id, comment } = req.body;
  if (id === undefined) {
    res.status(400).json({ message: 'id not found' });
    return;
  }
  if (comment === undefined) {
    res.status(400).json({ message: 'rate not found' });
    return;
  }

  const movie = await getMovie(id);
  const updatedMovie = await updateMovieComment(movie, comment)
  res.status(201).json(updatedMovie);
});

// Don't change the code below this line!
if (require.main === module) {
  app.listen(port);
  // eslint-disable-next-line no-console
  console.log(`App listening on port ${port}`);
}

export = { app };
