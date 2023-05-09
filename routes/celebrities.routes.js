// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const express = require("express");
const router = express.Router();
const Celebrity = require("../models/Celebrity.model.js");

router.get("/create", (req, res, next) => {
  res.render("celebrities/new-celebrity.hbs");
});

router.post("/create", (req, res, next) => {
  //console.log(req.body);
  const { name, occupation, catchPhrase } = req.body;
  Celebrity.create({
    name,
    occupation,
    catchPhrase,
  })
    .then(() => {
      console.log("added new celebrity");
      res.redirect("celebrities");
    })
    .catch((err) => {
      next(err);
    });
});

router.get("/celebrities", (req, res, next) => {
  Celebrity.find()
    .then((celebrity) => {
      res.render("celebrities/celebrities.hbs", {
        celebrity,
      });
    })
    .catch((err) => {
      next(err);
    });
});

router.get("/:id", (req, res, next) => {
  Celebrity.findById(req.params.id)
    .then((celebrity) => {
      res.render("celebrities/details.hbs", {
        celebrity,
      });
    })
    .catch((err) => {
      next(err);
    });
});

router.get("/:id/edit", (req, res, next) => {
  Celebrity.findById(req.params.id)
    .then((celebrity) => {
      res.render("celebrities/edit.hbs", {
        celebrity,
      });
    })
    .catch((err) => {
      next(err);
    });
});

router.post("/:id/edit", (req, res, next) => {
  const { name, occupation, catchPhrase } = req.body;
  Celebrity.findByIdAndUpdate(req.params.id, {
    name,
    occupation,
    catchPhrase,
  })
    .then(() => {
      console.log("Celebrity Updated !");
      res.redirect("/celebrities/celebrities");
    })
    .catch((err) => {
      next(err);
    });
});
router.post("/:id/delete", (req, res, next) => {
  Celebrity.findByIdAndRemove(req.params.id)
    .then(() => {
      console.log("Deleted Celebrity");
      res.redirect("/celebrities/celebrities");
    })
    .catch((err) => {
      next(err);
    });
});

module.exports = router;
