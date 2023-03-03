import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Card from "../commons/Card";

const RecommendedResults = ({user, setUser, recommendedMovies, recommendedShows}) => {

    const navigate = useNavigate ();

    useEffect (() => {

        axios.get ("/api/user/me")

            .then (user => setUser (user.data))
            .catch (console.error);
    }, [setUser]);

    return (
        <>
    {user.email ?
        <div className="m-5">
            <div className="has-text-centered ">
                <h2 className="title is-1 mt-6">Recommended</h2>
                <h4 className="mb-6">Top rated movies & shows for your collection.</h4>
            </div>
            <div className="columns is-multiline layout mx-5">
            {recommendedMovies.slice (0, 10).map (movie => (

                <div key={movie.id} className="column is-3">
                    <Link to={`/single/movie/${movie.id}`}>
                        <Card title={movie.title} poster={movie.poster_path}/>
                    </Link>
                </div>  
            ))}
            {recommendedShows.slice (0, 10).map (show => (

                <div key={show.id} className="column is-3">
                    <Link to={`/single/show/${show.id}`}>
                        <Card title={show.name} poster={show.poster_path}/>
                    </Link>
                </div>  
            ))}
            </div>
        </div>
        :
        navigate ("404")}
        </>
    );
}

export default RecommendedResults; 