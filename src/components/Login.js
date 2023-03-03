import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useInput } from "../hooks/useInput";

const Login = ({setUser}) => {

    const navigate = useNavigate ();
    const email = useInput ();
    const password = useInput ();

    const data = {

        email: email.value,
        password: password.value
    }

    const handleSubmit = event => {

        event.preventDefault ();

        axios.post ("/api/user/login", data)

            .then (user => {
                
                setUser (user.data);
                navigate ("/");
            })
            .catch (error => {
                
                console.error (error);
                alert ("Invalid credentials, please try again.");
            });
    }

	return (

        <div className="layout m-6">
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
        </div>
	);
}

export default Login;