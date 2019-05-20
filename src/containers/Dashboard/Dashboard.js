import React, { Component } from 'react';
import { connect } from 'react-redux';
import AsGallery from "../../components/Card/AsGallery/AsGallery";
import AsList from "../../components/Card/AsList/AsList";
import classes from './Dashboard.module.css';
import * as mainActions from '../../store/actions/mainActions';
import Dropdown from '../../components/UI/Dropdown/Dropdown';

class Dashboard extends Component {

	state = {
		asList: false,
		showDropdown: false
	}

	componentWillMount() {
		this.props.onFetchingEvents();
	}

	toListCardOrder = () => {
		this.setState({asList: true});
	}

	toGalleryCardOrder = () => {
		this.setState({asList:false});
	}

	toggleDropdown = () => {
		this.setState((prevState) => ({showDropdown:!prevState.showDropdown}));
		console.log(this.state.showDropdown);
	}

	loggingOut = () => {
		this.props.onLoggingOut();
		this.props.history.push("/");
	}

	render() {
		let allEvents = this.props.events.map(e => {
			let fecha = new Date(e.createdAt).toLocaleDateString('default',{
				year: 'numeric',
			    month: 'long',
			    day: '2-digit',
			    hour: '2-digit',
			    minute:'2-digit'
			}).split(", ");

			let isJoined = e.attendees.find(a => a.id === this.props.user_id);
			return (<AsGallery 
					 key={e.id}
					 cardID={e.id}
					 cardDate={`${fecha[0]}, ${fecha[1]} - ${fecha[2]}`}
					 cardTitle={e.title}
					 cardAuthor={`${e.owner.firstName} ${e.owner.lastName}`}
					 cardBody={e.description}
					 cardPeople={`${e.attendees.length} of ${e.capacity}`}
					 userIsOwner={e.owner.id === this.props.user_id}
					 userIsJoined={isJoined} />);
		});

		if (this.state.asList) {
			allEvents = this.props.events.map(e => {
				let fecha = new Date(e.createdAt).toLocaleDateString('default',{
					year: 'numeric',
				    month: 'long',
				    day: '2-digit',
				    hour: '2-digit',
				    minute:'2-digit'
				}).split(", ");

				let isJoined = e.attendees.find(a => a.id === this.props.user_id);
				return (<AsList 
						key={e.id}
						 cardID={e.id}
						 cardDate={`${fecha[0]}, ${fecha[1]} - ${fecha[2]}`}
						 cardTitle={e.title}
						 cardAuthor={`${e.owner.firstName} ${e.owner.lastName}`}
						 cardBody={e.description}
						 cardPeople={`${e.attendees.length} of ${e.capacity}`}
						 userIsOwner={e.owner.id === this.props.user_id}
						 userIsJoined={isJoined}/>);
			});
		}

		return (
			<div className={classes.Dashboard}>
				<h1 className="logo">E.</h1>
				<div className={classes.Profile}>
					<div className="initials">{`${this.props.fname[0]}${this.props.lname[0]}`}</div> 
					<p onClick={this.toggleDropdown} >{`${this.props.fname} ${this.props.lname}`} <i className="fas fa-sort-down"></i></p>
				</div>

				<Dropdown display={this.state.showDropdown} lout={this.loggingOut} />

				<div className={classes.Container}>
					<ul>
						<li className="active">all events</li>
						<li>future events</li>
						<li>past events</li>
					</ul>

					<div className={classes.Order}>
						<p onClick={this.toGalleryCardOrder} className={!this.state.asList ? "active" : null} ><i className="fas fa-th"></i></p>
						<p onClick={this.toListCardOrder} className={this.state.asList ? "active" : null}><i className="fas fa-th-list"></i></p>
					</div>

					{allEvents}
				</div>

				<div className={classes.CreateEvent}><span>+</span></div>

			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		user_id: state.id,
		fname: state.first_name,
		lname: state.last_name,
		events: state.events
	};
};

const mapDispatchToProps = dispatch => {
	return {
		onFetchingEvents: () => dispatch(mainActions.fetchEvents()),
		onLoggingOut: () => dispatch(mainActions.loggingOut())
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);