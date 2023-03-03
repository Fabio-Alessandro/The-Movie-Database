const express = require ("express");
const authentication = require("./authentication");
const movies = require ("./movies");
const shows = require ("./shows");

const router = express.Router ();

router.use ("/user", authentication);
router.use ("/movies", movies);
router.use ("/shows", shows);

module.exports = router;