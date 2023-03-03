const express = require ("express");
const { default: axios } = require ("axios");
const qs = require ("qs");

const router = express.Router (); 
const APIKey = "ac9dddfe1963d4de3384ba1fdf7d428f";

router.get ("/trending", (req, res) => {

    axios.get (`https://api.themoviedb.org/3/trending/tv/week?api_key=${APIKey}`)

        .then (trending => res.send (trending.data.results))
        .catch (console.error);
});

router.get ("/recommended", (req, res) => {

    axios.get (`https://api.themoviedb.org/3/tv/top_rated?api_key=${APIKey}&page=1`)

        .then (recommended => res.send (recommended.data.results))
        .catch (console.error);
});

router.get ("/search", (req, res) => {
    
    const query = req.query.query;

    axios.get (`https://api.themoviedb.org/3/search/tv?api_key=${APIKey}&page=1&${qs.stringify ({ query })}`)

        .then (searchResults => res.send (searchResults.data.results))
        .catch (console.error);
});

router.get ("/show/:id", (req, res) => {

    axios.get (`https://api.themoviedb.org/3/tv/${req.params.id}?api_key=${APIKey}`)

        .then (show => res.send (show.data))
        .catch (console.error);
});

module.exports = router;