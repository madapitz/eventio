import React, { Component } from 'react';
import Registration from '../../../containers/Registration/Registration';
import classes from '../Registration.module.css';

class SignIn extends Component {

	state = {
		hidePassword: true,
		email: "",
		password: ""
	}

	hideP = () => {
		this.setState(prevState => ({hidePassword:!prevState.hidePassword}));
	}

	handleEmailChange = (event) => {
		this.setState({email: event.target.value});
	}

	handlePasswordChange = (event) => {
		this.setState({password: event.target.value});
		console.log(event.target.value);
	}

	render() {
		let showHide = "show";
		if(!this.state.hidePassword) {
			showHide = "hide";
		}

		return (
			<Registration>
				<p className={classes.NoAccount} >Don't have an account? <a>sign up</a></p>
				<form className={classes.Form}>
					<div>
						<h2>Sign in to Eventio.</h2>
						<p>Enter your details below.</p>
						<div>
							<input type="email"
							value={this.state.email}
							onChange={this.handleEmailChange} 
							placeholder="" />
							<span>Email</span>
						</div>
						<div>
							<input type={this.state.hidePassword ? "password": "text"} 
							value={this.state.password}
							onChange={this.handlePasswordChange} 
							placeholder=""/>
							<span>Password</span>
							<span onClick={this.hideP} >{showHide}</span>
						</div>
						<button>Sign in</button>
					</div>
				</form>
			</Registration>
		);
	}
}

export default SignIn;
