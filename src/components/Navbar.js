import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'

const Navbar = ({user, setUser}) => {

    const navigate = useNavigate ();

    const handleLogout = () => {

        axios.post ("/api/user/logout")

            .then (() => {
                
                setUser ({});
                navigate ("/");
            })
            .catch (console.error);
    }
    
    return (
    
        <nav className="navbar">
            <div className="navbar-item ml-3">
                <Link to="/"><h3 className="has-text-dark">TMDB</h3></Link> 
            </div>
            <div className="navbar-item navbar-end mr-3">
                <Link to="/search">
                    <FontAwesomeIcon icon={faSearch} className="mr-5 has-text-dark"/>
                    <span className="mr-5 has-text-dark">Search</span>
                </Link>
            {!user.email ?
                <>
                <Link to="/register"><button className="button mx-2">Register</button></Link>
                <Link to="/login"><button className="button">Log In</button></Link>
                </>
                :
                <button onClick={handleLogout} className="button">Log Out</button>}
            </div>
        </nav>
    );
}

export default Navbar;