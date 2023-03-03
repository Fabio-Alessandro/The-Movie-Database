const express = require ("express");
const { default: axios } = require ("axios");
const qs = require ("qs");

const router = express.Router ();
const APIKey = "ac9dddfe1963d4de3384ba1fdf7d428f";

router.get ("/trending", (req, res) => {

    axios.get (`https://api.themoviedb.org/3/trending/movie/week?api_key=${APIKey}`)

        .then (trending => res.send (trending.data.results))
        .catch (console.error);
});

router.get ("/search", (req, res) => {
    
    const query = req.query.query;

    axios.get (`https://api.themoviedb.org/3/search/movie?api_key=${APIKey}&${qs.stringify ({ query })}&page=1`)

        .then (searchResults => res.send (searchResults.data.results))
        .catch (console.error);
});

router.get ("/movie/:id", (req, res) => {

    axios.get (`https://api.themoviedb.org/3/movie/${req.params.id}?api_key=${APIKey}`)

        .then (movie => res.send (movie.data))
        .catch (console.error);
});

module.exports = router;