const Movie = require('../models/Movie');

// @desc    Get all movies (with search and filter)
// @route   GET /api/movies
// @access  Public
const getMovies = async (req, res) => {
  try {
    const { search, genre, language } = req.query;
    let query = {};

    // Title search using regex (case-insensitive)
    if (search) {
      query.title = { $regex: search, $options: 'i' };
    }

    // Filter by genre
    if (genre) {
      query.genre = genre;
    }

    // Filter by language
    if (language) {
      query.language = { $regex: language, $options: 'i' };
    }

    const movies = await Movie.find(query);
    res.json(movies);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get single movie
// @route   GET /api/movies/:id
// @access  Public
const getMovieById = async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);

    if (movie) {
      res.json(movie);
    } else {
      res.status(404).json({ message: 'Movie not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create a movie
// @route   POST /api/movies
// @access  Private/Admin
const createMovie = async (req, res) => {
  try {
    const {
      title,
      description,
      genre,
      language,
      duration,
      posterUrl,
      trailerUrl,
      releaseDate,
      rating
    } = req.body;

    const movie = new Movie({
      title,
      description,
      genre,
      language,
      duration,
      posterUrl,
      trailerUrl,
      releaseDate,
      rating
    });

    const createdMovie = await movie.save();
    res.status(201).json(createdMovie);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Update a movie
// @route   PUT /api/movies/:id
// @access  Private/Admin
const updateMovie = async (req, res) => {
  try {
    const {
      title,
      description,
      genre,
      language,
      duration,
      posterUrl,
      trailerUrl,
      releaseDate,
      rating
    } = req.body;

    const movie = await Movie.findById(req.params.id);

    if (movie) {
      movie.title = title || movie.title;
      movie.description = description || movie.description;
      movie.genre = genre || movie.genre;
      movie.language = language || movie.language;
      movie.duration = duration || movie.duration;
      movie.posterUrl = posterUrl || movie.posterUrl;
      movie.trailerUrl = trailerUrl || movie.trailerUrl;
      movie.releaseDate = releaseDate || movie.releaseDate;
      movie.rating = rating || movie.rating;

      const updatedMovie = await movie.save();
      res.json(updatedMovie);
    } else {
      res.status(404).json({ message: 'Movie not found' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Delete a movie
// @route   DELETE /api/movies/:id
// @access  Private/Admin
const deleteMovie = async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);

    if (movie) {
      await Movie.deleteOne({ _id: req.params.id });
      res.json({ message: 'Movie removed' });
    } else {
      res.status(404).json({ message: 'Movie not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getMovies,
  getMovieById,
  createMovie,
  updateMovie,
  deleteMovie
};
