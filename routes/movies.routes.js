// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();

const Movie = require("../models/Movie.model.js");
const Celebrity = require("../models/Celebrity.model.js");

router.get("/create", (req, res, next) => {
  Celebrity.find()
    .then((allCelebrities) => {
      res.render("movies/new-movie.hbs", {
        allCelebrities,
      });
    })
    .catch((err) => {
      next(err);
    });
});

router.post("/create", (req, res, next) => {
  //console.log(req.body);
  const { title, genre, plot, cast } = req.body;
  Movie.create({
    title,
    genre,
    plot,
    cast,
  })
    .then(() => {
      console.log("Added New Movie !");
      res.redirect("/movies/movies");
    })
    .catch((err) => {
      next(err);
    });
});

router.get("/movies", (req, res, next) => {
  Movie.find()
    .then((movie) => {
      console.log(movie);
      res.render("movies/movies.hbs", {
        movie,
      });
    })
    .catch((err) => {
      next(err);
    });
});

router.get("/:id", (req, res, next) => {
  //console.log(req.params);
  Movie.findById(req.params.id)
    .populate("cast")
    .then((movieDetails) => {
      //console.log(movieDetails);
      res.render("movies/movie-details.hbs", {
        movieDetails,
      });
    })
    .catch((err) => {
      next(err);
    });
});

router.post("/:id/delete", (req, res, next) => {
  Movie.findByIdAndRemove(req.params.id)
    .then(() => {
      console.log("deleted movie!");
      res.redirect("/movies/movies");
    })
    .catch((err) => {
      next(err);
    });
});

router.get("/:id/edit", (req, res, next) => {
  Movie.findById(req.params.id)
    .populate("cast")
    .then((allMovies) => {
      console.log(allMovies);
      Celebrity.find().then((allCelebrities) => {
        res.render("movies/edit-movie.hbs", {
          allMovies,
          allCelebrities,
        });
      });
    })
    .catch((err) => {
      next(err);
    });
});

router.post("/:id/edit", (req, res, next) => {
  const { title, genre, plot, cast } = req.body;
  Movie.findByIdAndUpdate(req.params.id, {
    title,
    genre,
    plot,
    cast,
  })
    .then(() => {
      console.log("updated!");
      res.redirect("/movies/movies");
    })
    .catch((err) => {
      next(err);
    });
});
module.exports = router;
