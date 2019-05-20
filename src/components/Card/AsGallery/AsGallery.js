import React, { Component } from "react";
import { connect } from 'react-redux';
import classes from "./AsGallery.module.css";
import * as mainActions from '../../../store/actions/mainActions';

class AsGallery extends Component {

	joinEvent = (event) => {
		this.props.onJoining(this.props.cardID, this.props.token);
		event.preventDefault();
	}

	leaveEvent = (event) => {
		this.props.onLeaving(this.props.cardID, this.props.token);
		event.preventDefault();
	}

	render() {
		let button = <button onClick={this.joinEvent} className={[classes.CardButton, classes.CardButtonJoin].join(" ")}>Join</button>;;
		if(this.props.userIsOwner) {
			button = <button className={classes.CardButton}>Edit</button>;
		} else if(this.props.userIsJoined) {
			button = <button onClick={this.leaveEvent} className={[classes.CardButton, classes.CardButtonLeave].join(" ")}>Leave</button>;
		}

		return (
			<div className={classes.Card} >
				<p className={classes.CardDate}>{this.props.cardDate}</p>
				<h3 className="title">{this.props.cardTitle}</h3>
				<p className={classes.CardAuthor}>{this.props.cardAuthor}</p>
				<p className={classes.CardBody}>{this.props.cardBody}</p>
				<p className={classes.CardPeople}><i className="fas fa-user"></i> {this.props.cardPeople}</p>
				{button}
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		token: state.token
	};
};

const mapDispatchToProps = dispatch => {
	return {
		onJoining: (event_id, token) => dispatch(mainActions.postJoinEvent(event_id, token)),
		onLeaving: (event_id, token) => dispatch(mainActions.deleteLeaveEvent(event_id, token))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(AsGallery);