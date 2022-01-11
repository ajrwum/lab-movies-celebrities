const Celebrity = require("../models/Celebrity.model");

// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();

// all your routes here

/** ----------------------------------------------------- */
/** PREFIX, set in app.js: ------   /celebrities   ------ */
/** ----------------------------------------------------- */

// - the route to display all celebrities
router.get("/", async (req, res, next) => {
  try {
    res.render('celebrities/celebrities');
  } catch (error) {
    next(error);
  }
});

// - the route to display the create form
router.get("/create", (req, res, next) => {
  try {
    res.render('celebrities/new-celebrity');
  } catch (error) {
    next(error);
  }
});

// - the route to actually create the celebrity in db
router.post("/create", async (req, res, next) => {
  try {
    const celebrity = { ...req.body };
    // console.log(`celebrity`, celebrity);
    await Celebrity.create(celebrity);
    res.redirect('/celebrities');
  } catch (error) {
    // do nothing to let the current page displayed with user's previous input
    console.log('- Error while creating the celebrity: we stay on the form with current values');
  }
});


module.exports = router;