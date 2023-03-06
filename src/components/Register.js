import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useInput } from "../hooks/useInput";

const Register = ({user}) => {

	const navigate = useNavigate ();
	const name = useInput ();
	const lastName = useInput ();
	const email = useInput ();
	const password = useInput ();
	const data = { 
		
		name: name.value, 
		lastName: lastName.value, 
		email: email.value, 
		password: password.value 
	}

	useEffect (() => {

        if (user.email) navigate ("/");
    }, [user, navigate]);

	const handleSubmit = event => {

		event.preventDefault ();
	
		axios.post ("/api/user/register", data)

			.then (newUser => {
				
				if (!newUser.data) return alert ("An user with this e-mail already exists.")
				navigate ("/login");
			})
			.catch (console.error);
	}

	return (
		
		<div className="layout m-6">
		{!user.email ?
			<form onSubmit={handleSubmit}>
				<label className='label my-3'>Name</label>
				<input 
					type="text" 
					onChange={name.onChange} 
					value={name.value} 
					placeholder="Name" 
					required={true} 
					className="input my-3"
				/>
				<label className='label my-3'>Last Name</label>
				<input 
					type="text" 
					onChange={lastName.onChange} 
					value={lastName.value} 
					placeholder="Last Name" 
					required={true} 
					className="input my-3"
				/>
				<label className='label my-3'>E-Mail</label>
				<input 
					type="email" 
					onChange={email.onChange} 
					value={email.value} 
					placeholder="E-Mail" 
					required={true} 
					className="input my-3"
				/>
				<label className='label my-3'>Password</label>
				<input 
					type="password" 
					onChange={password.onChange} 
					value={password.value}
					placeholder="Password" 
					required={true} 
					className="input my-3"
				/>
				<button type="submit" className='button my-5'>Submit</button>
			</form>
			: 
			<p className="has-text-centered">Loading...</p>}
		</div>
	);
}

export default Register;