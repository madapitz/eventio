import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Registration from '../../../containers/Registration/Registration';
import classes from '../Registration.module.css';
import specific from './SignUp.module.css';

class SignUp extends Component {

	state = {
		firstname: "",
		lastname: "",
		email: "",
		password: "",
		repeatedPassword: ""
	}

	handleFirstNameChange = (event) => {
		this.setState({firstname: event.target.value});
	}

	handleLastNameChange = (event) => {
		this.setState({lastname: event.target.value});
	}

	handleEmailChange = (event) => {
		this.setState({email: event.target.value});
	}

	handlePasswordChange = (event) => {
		this.setState({password: event.target.value});
	}

	handleRepeatedPasswordChange = (event) => {
		this.setState({repeatedPassword: event.target.value});
	}

	render() {
		return (
			<Registration>
				<p className={classes.NoAccount} >Already have an account? <Link to="/signin">sign in</Link></p>
				<form className={[classes.Form, specific.Form].join(" ")}>
					<div className={specific.SignUp}>
						<h2>Get started absolutely free.</h2>
						<p>Enter your details below.</p>
						<div>
							<input type="text"
							value={this.state.firstname}
							onChange={this.handleFirstNameChange} 
							placeholder="" />
							<span>First name</span>
						</div>
						<div>
							<input type="text"
							value={this.state.lastname}
							onChange={this.handleLastNameChange} 
							placeholder="" />
							<span>Last name</span>
						</div>
						<div>
							<input type="email"
							value={this.state.email}
							onChange={this.handleEmailChange} 
							placeholder="" />
							<span>Email</span>
						</div>
						<div>
							<input type="password"
							value={this.state.password}
							onChange={this.handlePasswordChange} 
							placeholder=""/>
							<span>Password</span>
						</div>
						<div>
							<input type="password" 
							value={this.state.repeatedPassword}
							onChange={this.handleRepeatedPasswordChange} 
							placeholder=""/>
							<span>Repeat password</span>
						</div>
						<p className={classes.NoAccountMobile} >Already have an account? <Link to="/signin">sign in</Link></p>
						<button>Sign up</button>
					</div>
				</form>
			</Registration>
		);
	}
}

export default SignUp;
