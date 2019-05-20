import * as actionTypes from './actionTypes';
import axios from 'axios';

const APIKey = "3b6b78317bc1157702924e5fea68ac343f460bc3";

export const signIn = (fname, lname, id, token, email) => {
	return {
		type: actionTypes.SIGN_IN,
		auth: true,
		token: token,
		first_name: fname,
		last_name: lname,
		email: email,
		id: id,
		error: ""
	};
};

export const signInError = (error) => {
	return {
		type: actionTypes.SIGN_IN_ERROR,
		error: error
	};
};

export const listEvents = (events) => {
	return {
		type: actionTypes.LIST_ALL_EVENTS,
		events: events
	};
}

export const refreshToken = (newToken) => {
	return {
		type: actionTypes.REFRESH_TOKEN,
		token: newToken
	};
};

export const joinEvent = (updatedEvent) => {
	return {
		type: actionTypes.JOIN_EVENT,
		event: updatedEvent
	};
};

export const leaveEvent = (updatedEvent) => {
	return {
		type: actionTypes.JOIN_EVENT,
		event: updatedEvent
	};
};

export const logOut = () => {
	return {
		type: actionTypes.LOG_OUT
	};
};

export const postSignUp = (fname,lname,email,password) => {
	return dispatch => {
		axios.post('https://testproject-api-v2.strv.com/users', {
			firstName:fname,
			lastName: lname,
			email: email,
			password: password
		}, {
			headers: {
				"content-type": "application/json",
				APIKey: APIKey
			}
		}).then(res => {
			console.log(res);
		}).catch(error => {
			console.log(error);
		  	dispatch(signInError(error));
		});
	};
};

export const postSignIn = (email, password) => {
	return dispatch => {
		axios.post('https://testproject-api-v2.strv.com/auth/native', {
			email: email,
			password: password
		}, {
			headers: {
				"content-type": "application/json",
				APIKey: APIKey
			}
		}).then(res => {
			console.log(res);
			localStorage.setItem("token", res.headers.authorization);
			localStorage.setItem("refrToken", res.headers["refresh-token"]);
			localStorage.setItem("auth", true);
			dispatch(signIn(res.data.firstName, res.data.lastName, res.data.id, res.headers.authorization, email));
		}).catch(error => {
			console.log(error);
		  	dispatch(signInError(error));
		});
	};
};

export const fetchEvents = () => {
	return dispatch => {
		axios.get("https://testproject-api-v2.strv.com/events",{
			headers: {
				"content-type": "application/json",
				APIKey: APIKey
			}
		}).then(res => {
			dispatch(listEvents(res.data));
		}).catch(error => {
			console.log(error);
		});
	};
};

export const postRefreshToken = () => {
	return dispatch => {
		let refrToken = localStorage.getItem("refrToken");
		if (refrToken) {
			axios.post("https://testproject-api-v2.strv.com/auth/native",{
				refreshToken: refrToken
			}, {
				headers: {
					"content-type": "application/json",
					APIKey: APIKey
				}
			}).then(res => {
				localStorage.setItem("token", res.headers.authorization);
				dispatch(refrToken(res.headers.authorization));
			}).catch(error => {
				console.log(error);
			});
		}
	};
};

export const postJoinEvent = (event_id, token) => {
	return dispatch => {
		console.log(token);
		axios.post(`https://testproject-api-v2.strv.com/events/${event_id}/attendees/me`, null, {
			headers: {
				"content-type": "application/json",
				APIKey: APIKey,
				authorization: token
			}
		}).then(res => {
			dispatch(joinEvent(res.data))
		}).catch(error => {
			console.log(error);
		});
	};
};

export const deleteLeaveEvent = (event_id, token) => {
	return dispatch => {
		console.log(token);
		axios.delete(`https://testproject-api-v2.strv.com/events/${event_id}/attendees/me`, {
			headers: {
				"content-type": "application/json",
				APIKey: APIKey,
				authorization: token
			}
		}).then(res => {
			dispatch(leaveEvent(res.data))
		}).catch(error => {
			console.log(error);
		});
	};
};

export const loggingOut = () => {
	return dispatch => {
		localStorage.removeItem("auth");
		localStorage.removeItem("token");
		localStorage.removeItem("refrToken");
		dispatch(logOut());
	};
};

//brucebanner@strv.com:kill3r
// axios.post('https://testproject-api-v2.strv.com/auth/native',{email:'brucebanner@strv.com',password:'kill3r'},{headers:{'content-type':'application/json', APIKey:'3b6b78317bc1157702924e5fea68ac343f460bc3'}}).then(res => {console.log(res)}).catch(error => {console.log(error)})
