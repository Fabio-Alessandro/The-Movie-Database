import { Link } from "react-router-dom";
import Card from "../commons/Card";

const TrendingResults = ({trendingMovies, trendingShows}) => (

    <div>
        <div className="m-5">
            <h2 className="title is-1 has-text-centered my-6">Trending Movies</h2>
            <div className="columns is-multiline layout mx-5">
            {trendingMovies.map (movie => (

                <div key={movie.id} className="column is-3">
                    <Link to={`/single/movie/${movie.id}`}>
                        <Card title={movie.title} poster={movie.poster_path}/>
                    </Link>
                </div>  
            ))}
            </div>
        </div>
        <div className="m-5">
            <h2 className="title is-1 has-text-centered my-6">Trending Shows</h2>
            <div className="columns is-multiline layout mx-5">
            {trendingShows.map (show => (

                <div key={show.id} className="column is-3">
                    <Link to={`/single/show/${show.id}`}>
                        <Card title={show.name} poster={show.poster_path}/>
                    </Link>
                </div>  
            ))}
            </div>
        </div>
    </div>
);

export default TrendingResults;