import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Registration from '../../../containers/Registration/Registration';
import classes from '../Registration.module.css';
import * as mainActions from '../../../store/actions/mainActions';

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

	handleSubmit = (event) => {
		this.props.onSigningIn(this.state.email,this.state.password);
		this.props.history.push("/dashboard");
		event.preventDefault();
	};

	render() {
		let showHide = "show";
		if(!this.state.hidePassword) {
			showHide = "hide";
		}

		let subheader = <p>Enter your details below.</p>;

		if (this.props.error !== "") {
			subheader = <p className="errorText">Oops! That email and password combination is not valid.</p>;
		}

		return (
			<Registration>
				<p className={classes.NoAccount} >Don't have an account? <Link to="/signup">sign up</Link></p>
				<form className={classes.Form} >
					<div>
						<h2>Sign in to Eventio.</h2>
						{subheader}
						<div>
							<input type="email"
							value={this.state.email}
							className={this.props.error !=="" ? "errorInput":null}
							onChange={this.handleEmailChange} 
							placeholder="" />
							<span>Email</span>
						</div>
						<div>
							<input type={this.state.hidePassword ? "password": "text"} 
							value={this.state.password}
							className={this.props.error !=="" ? "errorInput":null}
							onChange={this.handlePasswordChange} 
							placeholder=""/>
							<span>Password</span>
							<span onClick={this.hideP} >{showHide}</span>
						</div>
						<p className={classes.NoAccountMobile} >Don't have an account? <Link to="/signup">sign up</Link></p>
						<button onClick={this.handleSubmit}>Sign in</button>
					</div>
				</form>
			</Registration>
		);
	}
}

const mapStateToProps = state => {
	return {
		error: state.error,
		fname: state.first_name
	};
};

const mapDispatchToProps = dispatch => {
	return {
		onSigningIn: (email, password) => dispatch(mainActions.postSignIn(email,password))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
