import { useEffect, useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import axios from 'axios';
import Navbar from './components/Navbar';
import Search from './components/Search';
import Register from "./components/Register";
import Login from './components/Login';
import TrendingResults from "./components/TrendingResults";
import SearchResults from './components/SearchResults';
import ContentDetail from './commons/ContentDetail';
import NotFound from './commons/NotFound';

function App () {

    const [user, setUser] = useState ({});
	const [trendingMovies, setTrendingMovies] = useState ([]);
    const [trendingShows, setTrendingShows] = useState ([]);
	const [searchResults, setSearchResults] = useState ([]);
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
    }, []);

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
				<Route path="/single/:type/:id" element={<ContentDetail />} />
				<Route path="/register" element={<Register />} />
				<Route path="/login" element={<Login setUser={setUser} />} />
				<Route path="*" element={<Navigate to="404" />} />
				<Route path="404" element={<NotFound />} />
			</Routes>
		</div>
	);
}

export default App;