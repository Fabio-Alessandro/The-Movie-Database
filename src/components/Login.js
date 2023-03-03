import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useInput } from "../hooks/useInput";

const Login = ({user, setUser}) => {

    const navigate = useNavigate ();
    const email = useInput ();
    const password = useInput ();
    const data = {

        email: email.value,
        password: password.value
    }

    useEffect (() => {

        if (user.email) navigate ("/");
    }, [user, navigate]);

    const handleSubmit = event => {

        event.preventDefault ();

        axios.post ("/api/user/login", data)

            .then (user => {
                
                setUser (user.data);
                navigate ("/my/recommendations");
            })
            .catch (error => {
                
                console.error (error);
                alert ("Invalid credentials, please try again.");
            });
    }

	return (

        <div className="layout m-6">
        {!user.email ? 
            <form onSubmit={handleSubmit}>
                <label className="label my-3">E-Mail</label>
                <input 
                    type="email" 
                    onChange={email.onChange} 
                    value={email.value} 
                    placeholder="E-Mail" 
                    required={true} 
                    className="input my-3"
                />
                <label className="label my-3">Password</label>
                <input 
                    type="password" 
                    onChange={password.onChange} 
                    value={password.value} 
                    placeholder="Password" 
                    required={true} 
                    className="input my-3"
                />
                <button type="submit" className="button my-5">Submit</button>
            </form>
            :
            <p className="has-text-centered">Loading...</p>}
        </div>
	);
}

export default Login;