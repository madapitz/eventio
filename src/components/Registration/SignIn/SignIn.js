import React, { Component } from 'react';
import Registration from '../../../containers/Registration/Registration';
import classes from '../Registration.module.css';

class SignIn extends Component {
	render() {
		return (
			<Registration>
				<p>Don't have an account? <a>sign up</a></p>
				<form className={classes.Form}>
					<h2>Sign in to Eventio.</h2>
					<p>Enter your details below.</p>
					<input type="email" placeholder="Email"/>
					<input type="password" placeholder="Password"/>
					<button>Sign in</button>
				</form>
			</Registration>
		);
	}
}

export default SignIn;
