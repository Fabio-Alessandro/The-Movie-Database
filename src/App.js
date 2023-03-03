import { useEffect, useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import axios from 'axios';
import Navbar from './components/Navbar';
import Search from './components/Search';
import Register from "./components/Register";
import Login from './components/Login';
import TrendingResults from "./components/TrendingResults";
import SearchResults from './components/SearchResults';
import RecommendedResults from './components/RecommendedResults';
import ContentDetail from './commons/ContentDetail';
import NotFound from './commons/NotFound';

function App () {

    const [user, setUser] = useState ({});
	const [trendingMovies, setTrendingMovies] = useState ([]);
    const [trendingShows, setTrendingShows] = useState ([]);
	const [recommendedShows, setRecommendedShows] = useState ([]);
	const [recommendedMovies, setRecommendedMovies] = useState ([]);
	const [searchResults, setSearchResults] = useState (
		
		JSON.parse (localStorage.getItem ("searchResults")) || []
	);
	const [contentType, setContentType] = useState ("");

	useEffect (() => {

        axios.get ("/api/user/me")

            .then (user => setUser (user.data))
            .catch (console.error);

		axios.get ("/api/movies/trending")

            .then (trending => setTrendingMovies (trending.data))
            .catch (console.error);

        axios.get ("/api/shows/trending")

            .then (trending => setTrendingShows (trending.data))
            .catch (console.error);

		axios.get ("/api/movies/recommended")

            .then (recommended => setRecommendedMovies (recommended.data))
            .catch (console.error);

		axios.get ("/api/shows/recommended")

            .then (recommended => setRecommendedShows (recommended.data))
            .catch (console.error);
    }, []);

	useEffect (() => {

		localStorage.setItem ("searchResults", JSON.stringify (searchResults));
	}, [searchResults]);

	if (!trendingMovies.length || !trendingShows.length) return (
	
		<p className="has-text-centered">Loading...</p>
	);

	return (

		<div>
			<Navbar user={user} setUser={setUser}/>
			<Routes>
				<Route 
					path="/" 
					element={
						
						<TrendingResults 
							trendingMovies={trendingMovies} 
							trendingShows={trendingShows} 
						/>
					}
				/>
				<Route 
					path="/search" 
					element={

						<Search 
							setSearchResults={setSearchResults}
							setContentType={setContentType}
						/>
					}
				/>
				<Route 
					path="/search/results" 
					element={
						
						<SearchResults 
							searchResults={searchResults} 
							contentType={contentType}
						/>
					} 
				/>
				<Route path="/register" element={<Register user={user}/>} />
				<Route path="/login" element={<Login user={user} setUser={setUser} />} />
				<Route 
					path='/my/recommendations' 
					element={
					
						<RecommendedResults 
							user={user} 
							setUser={setUser} 
							recommendedMovies={recommendedMovies}
							recommendedShows={recommendedShows}
						/>
					} 
				/>
				<Route path="/single/:type/:id" element={<ContentDetail />} />
				<Route path="*" element={<Navigate to="404" />} />
				<Route path="404" element={<NotFound />} />
			</Routes>
		</div>
	);
}

export default App;