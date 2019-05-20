import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Registration from '../../../containers/Registration/Registration';
import classes from '../Registration.module.css';
import specific from './SignUp.module.css';
import * as mainActions from '../../../store/actions/mainActions';

class SignUp extends Component {

	state = {
		firstname: "",
		lastname: "",
		email: "",
		password: "",
		repeatedPassword: "",
		error: false
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

	checkFormValidity = () => {
		let validation = [];
		if (this.state.firstname !== "") {
			validation.push(1);
		}
		if (this.state.lastname !== "") {
			validation.push(1);
		}
		if (this.state.email !== "") {
			validation.push(1);
		}
		if (this.state.password !== "") {
			validation.push(1);
		}
		if (this.state.repeatedPassword !== "") {
			validation.push(1);
		}
		if (this.state.password === this.state.repeatedPassword) {
			validation.push(1);
		}

		let sum = validation.reduce((a,b) => a+b,0);
		return sum;
	}

	handleSubmit = (event) => {
		if (this.checkFormValidity() === 6) {
			this.props.onSigningUp(this.state.firstname, this.state.lastname, this.state.email,this.state.password);
			this.props.history.push("/");
		} else {
			this.setState({error: true});
		}
		event.preventDefault();
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
							className={this.state.password !== this.state.repeatedPassword ? "errorInput" : null}
							value={this.state.repeatedPassword}
							onChange={this.handleRepeatedPasswordChange} 
							placeholder=""/>
							<span>Repeat password</span>
						</div>
						<p className={classes.NoAccountMobile} >Already have an account? <Link to="/signin">sign in</Link></p>
						<button onClick={this.handleSubmit} >Sign up</button>
					</div>
				</form>
			</Registration>
		);
	}
}

const mapDispatchToProps = dispatch => {
	return {
		onSigningUp: (fname, lname, email, password) => dispatch(mainActions.postSignUp(fname, lname, email,password))
	};
};

export default connect(null, mapDispatchToProps)(SignUp);
