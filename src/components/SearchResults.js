import { Link } from "react-router-dom";
import Card from "../commons/Card";

const SearchResults = ({searchResults, contentType}) => (

    <div className="m-5">

        <h2 className="title is-1 has-text-centered my-6">Search Results</h2>
    {searchResults.length ? (
        
        <div className="columns is-multiline layout mx-5">
        {searchResults.map (content => (

            <div key={content.id} className="column is-3">
                <Link to={`/single/${contentType}/${content.id}`}>
                    <Card title={content.title || content.name} poster={content.poster_path}/>
                </Link>
            </div>  
        ))}
        </div>
    ) : (

        <div className="has-text-centered">
            <h2 className="subtitle is-4">Looks empty...</h2>
        </div>
    )}
    </div>
);

export default SearchResults;