import React from 'react';
import Registration from '../../containers/Registration/Registration';
import classes from './NotFound.module.css';

const notFound = (props) => {
	return (
		<Registration>
			<div className={classes.NotFound}>
				<h1>404 Error - page not found</h1>
				<p className={classes.FirstP}>Seems like Darth Vader just hits our website and drops it down.</p>
				<p className={classes.SecondP}>Please press the refresh button and everything should be fine again.</p>
				<button className={classes.Button}
					onClick={(event) => {
						props.history.push("/");
						event.preventDefault();
					}}>refresh</button>
			</div>
		</Registration>
	);
};

export default notFound;