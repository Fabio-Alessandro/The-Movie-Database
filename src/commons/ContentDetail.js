import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { convertMinutes } from "../utils";

const ContentDetail = () => {

    const [content, setContent] = useState ({});
    const { type, id } = useParams ();

    useEffect (() => {

        axios.get (`/api/${type}s/${type}/${id}`)

            .then (content => setContent (content.data))
            .catch (console.error);
    }, [type, id]);

    if (!content.id) return (
    
        <p className="has-text-centered">Loading...</p>
    );

    return (

        <div className="columns">
            <div className="column">
                <figure className="image is-2by3">
                    <img 
                        src={
                            
                            content.poster_path ? 
                                `https://image.tmdb.org/t/p/original${content.poster_path}` : 
                                "https://i.ibb.co/bLb5Y24/unavailable-movie-poster.jpg"
                        } 
                        alt="Poster"
                    />
                </figure>
            </div>
            <div className="column m-6">
                <h2 className="title is-1 mb-6">{content.title || content.name}</h2>
                <h6 className="subtitle is-6 mb-6">{content.tagline}</h6>
                <h4 className="subtitle is-4">Overview</h4>
                <p className="mb-6">{content.overview}</p>
                <div className="columns is-size-7 mt-6">
                    <div className="column">
                        <p><strong>Release Date</strong></p>
                        <p>{content.release_date || content.first_air_date}</p>
                    </div>
                    <div className="column">
                        <p><strong>Genres</strong></p>
                        <p>{content.genres.map (genre => {
                                
                            return genre.name;
                        }).join (", ")}</p>
                    </div>
                    <div className="column">
                        <p><strong>Runtime</strong></p>
                        <p>{convertMinutes (content.runtime || content.last_episode_to_air.runtime)}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ContentDetail;