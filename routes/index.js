const express = require('express');
const router = express.Router();

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});

const moviesRouter = require("./movies.routes.js")
router.use("/movies", moviesRouter)

const celebritiesRouter = require("./celebrities.routes.js")
router.use("/celebrities", celebritiesRouter)

module.exports = router;
