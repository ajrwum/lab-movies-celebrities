const Celebrity = require("../models/Celebrity.model");
const Movie = require("../models/Movie.model");

// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();

// all your routes here

/** ------------------------------------------------ */
/** PREFIX, set in app.js: ------   /movies   ------ */
/** ------------------------------------------------ */

// - the route to display all movies
router.get('/', async (req, res, next) => {
  try {
    const movies = await Movie.find();
    res.render('movies/movies', { movies });
  } catch (error) {
    next(error);
  }
});

// - the route to display the create form
router.get('/create', async (req, res, next) => {
  try {
    const celebrities = await Celebrity.find();
    res.render('movies/new-movie', { celebrities });
  } catch (error) {
    
  }
});

// - the route to display one movie's details
router.get('/:id', async (req, res, next) => {
  try {
    const movie = await Movie.findById(req.params.id).populate("cast");
    res.render('movies/movie-details', { movie });
  } catch (error) {
    next(error);
  }
});

// - the route to actually create the movie in db
router.post('/create', async (req, res, next) => {
  try {
    // getting the user's input
    const movie = { ...req.body };
    // testing if the cast is a string (only 1 id passed) or the expected array
    if (typeof movie.cast === 'string') movie.cast = [ movie.cast ];
    await Movie.create(movie);
    // redirect to all movies page
    res.redirect('/movies');
  } catch (error) {
    next(error);
  }
});

// - the route to delete a movie
router.post('/:id/delete', async (req, res, next) => {
  try {
    const id = req.params.id;
    await Movie.findByIdAndRemove(id);
    res.redirect('/movies');
  } catch (error) {
    next(error);
  }
});


module.exports = router;