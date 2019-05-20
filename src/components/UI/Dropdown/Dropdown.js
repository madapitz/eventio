import React from 'react';
import classes from './Dropdown.module.css';

const dropdown = (props) => {
	let dropd = null;
	if (props.display) {
		dropd = <div className={classes.Dropdown}>
					<p className={classes.Profile} >Profile</p>
					<p onClick={props.lout} className={classes.LogOut} >Log out</p>
				</div>;
	}
	console.log(props.display);
	return dropd;
};

export default dropdown;