import * as actionTypes from '../actions/actionTypes';

const initialState = {
	auth: false,
	token: "",
	first_name:"",
	last_name: "",
	email: "",
	id: "",
	error: "",
	loading: false,
	events: []
}

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.SIGN_IN:
			return {
				...state,
				auth: action.auth,
				token: action.token,
				email:action.email,
				first_name:action.first_name,
				last_name:action.last_name,
				id:action.id,
				error: action.error
			};
		case actionTypes.SIGN_IN_ERROR:
			return {
				...state,
				error: action.error
			};
		case actionTypes.LIST_ALL_EVENTS:
			return {
				...state,
				events: [...action.events]
			}
		case actionTypes.REFRESH_TOKEN:
			return {
				...state,
				token: action.token
			}
		case actionTypes.JOIN_EVENT:
			let events = [...state.events];
			let toUpdateEventIndex = events.findIndex(e => e.id === action.event.id);
			events[toUpdateEventIndex] = action.event;
			if (toUpdateEventIndex) {
				return {
					...state,
					events: [...events]
				};
			} else {
				return {
					...state
				};
			}
		case actionTypes.LEAVE_EVENT:
			let cEvents = [...state.events];
			let toDeleteEventIndex = cEvents.findIndex(e => e.id === action.event.id);
			console.log(toDeleteEventIndex);
			cEvents[toDeleteEventIndex] = action.event;
			if (toDeleteEventIndex) {
				return {
					...state,
					events: [...cEvents]
				};
			} else {
				return {
					...state
				};
			}
		case actionTypes.LOG_OUT:
			return {
				...state,
				auth: false,
				token: "",
				first_name:"",
				last_name: "",
				email: "",
				id: "",
				error: "",
				loading: false,
				events: []
			};
		default:
			return state;
	}
};

export default reducer;