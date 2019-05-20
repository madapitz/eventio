import React from 'react';
import ReactDOM from 'react-dom';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import './index.css';
import App from './App';
import SignIn from './components/Registration/SignIn/SignIn';
import SignUp from './components/Registration/SignUp/SignUp';
import Dashboard from './containers/Dashboard/Dashboard';
import NotFound from './components/NotFound/NotFound';
import * as serviceWorker from './serviceWorker';
import mainReducer from './store/reducers/mainReducer';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';

const store = createStore(mainReducer, applyMiddleware(thunk));

// if (localStorage.getItem("auth") === "true") {
// 	var privateRoutes = (
// 		<Route path="/dashboard" component={Dashboard} />
// 	);
// } else {
// 	var privateRoutes = (
// 		<Redirect to="/" />
// 	);
// }

const routing = (
	<Provider store={store}>
		<Router>
			<Switch>
				<Route exact path="/" component={SignIn} />
				<Route exact path="/signin" component={SignIn} />
				<Route exact path="/signup" component={SignUp} />
				<PrivateRoute path="/dashboard" component={Dashboard} />
				<Route component={NotFound} />
			</Switch>
		</Router>
	</Provider>
);

ReactDOM.render(routing, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
