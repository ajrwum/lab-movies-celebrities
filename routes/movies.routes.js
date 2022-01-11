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
  console.log(`--- --- route GET: /movies`);
  try {
    const movies = await Movie.find();
    res.render('movies/movies', { movies });
  } catch (error) {
    next(error);
  }
});

// - the route to display the create form
router.get('/create', async (req, res, next) => {
  console.log(`--- --- route GET: /movies/create`);
  try {
    const celebrities = await Celebrity.find();
    res.render('movies/new-movie', { celebrities });
  } catch (error) {
    
  }
});

// - the route to display the update / edit form
router.get('/:id/edit', async (req, res, next) => {
  console.log(`--- --- route GET: /movies/:id/edit`);
  try {
    // getting the data from the route and the form fields
    const id = req.params.id;
    // getting all data from db, including about the cast
    const movie = await Movie.findById(id).populate('cast');
    // getting all celebrities from db to display the select options
    const celebrities = await Celebrity.find();
    // creating a special array to be able to display the current cast
    const enhancedCelebrities = [];
    for (celebrity of celebrities) {
      const enhanced = {
        _id: celebrity._id,
        name: celebrity.name,
        occupation: celebrity.occupation,
        catchPhrase: celebrity.catchPhrase,
        enhanced: false
      };
      for (movieCast of movie.cast) { 
        if (celebrity._id.equals(movieCast._id)) {
          enhanced.selected = true;
        }
      }
      enhancedCelebrities.push(enhanced);
    }
    // rendering the page with the movie and the enhancedCelebrities array
    res.render('movies/edit-movie', { movie, enhancedCelebrities });
  }
  catch (e) {
    next(e);
  }
});

// - the route to display one movie's details
router.get('/:id', async (req, res, next) => {
  console.log(`--- --- route GET: /movies/:id`);
  try {
    const movie = await Movie.findById(req.params.id).populate("cast");
    res.render('movies/movie-details', { movie });
  } catch (error) {
    next(error);
  }
});

// - the route to actually create the movie in db
router.post('/create', async (req, res, next) => {
  console.log(`--- --- route POST: /movies/create`);
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

// - the route to actually update the movie in db
router.post('/:id/edit', async (req, res, next) => {
  console.log(`--- --- route POST: /movies/:id/edit`);
  try {
    // getting the id
    const id = req.params.id;
    // getting the user's input
    const movie = { ...req.body };
    // testing if the cast is a string (only 1 id passed) or the expected array
    if (typeof movie.cast === 'string') movie.cast = [ movie.cast ];
    console.log(`movie.cast`, movie.cast);
    await Movie.findByIdAndUpdate(id, movie);
    // redirect to all movies page
    res.redirect(`/movies/${id}`);
  }
  catch (e) {
    next(e);
  }
});

// - the route to delete a movie
router.post('/:id/delete', async (req, res, next) => {
  console.log(`--- --- route POST: /movies/:id/delete`);
  try {
    const id = req.params.id;
    await Movie.findByIdAndRemove(id);
    res.redirect('/movies');
  } catch (error) {
    next(error);
  }
});


module.exports = router;