import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useInput } from "../hooks/useInput";

const Search = ({setSearchResults, setContentType}) => {

    const navigate = useNavigate ();
    const search = useInput ();
    const select = useInput ();
    const searchQuery = search.value;
    const contentType = select.value;
    const isSubmitDisabled = !contentType;

    const handleSubmit = event => {

        event.preventDefault ();  
        
        axios.get (`/api/${contentType}s/search?query=${searchQuery}`)

            .then (searchResults => {

                setSearchResults (searchResults.data)
                setContentType (contentType)
                navigate (`/search/results?query=${searchQuery}`)
            })
            .catch (console.error);
    }

    return (
    
        <div>
            <form onSubmit={handleSubmit} className="field has-addons has-addons-centered m-6">
                <div className="control">
                    <input 
                        type="text" 
                        onChange={search.onChange} 
                        value={search.value} 
                        placeholder="Search movies or shows"
                        required={true} 
                        className="input"
                    />
                </div>
                <div className="control">
                    <div className="select">
                        <select onChange={select.onChange} value={select.value}>
                            <option value={""} disabled={true}>Select</option>
                            <option value={"movie"}>Movies</option>
                            <option value={"show"}>Shows</option>
                        </select>
                    </div>
                </div>
                <div className="control">
                    <button 
                        type="submit"
                        disabled={isSubmitDisabled} 
                        className={`button is-rounded ${isSubmitDisabled ? "is-static cursor-not-allowed" : ""}`}
                    >Search</button>
                </div>
            </form>
        </div>
    );
}

export default Search;