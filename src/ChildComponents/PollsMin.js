import React, { Component } from 'react';
import PaddedContainerHOC from '../hoc/PaddedContainerHOC';
import PollDisplay from './FunctionalComponents/PollDisplay';
import PreLoader from './FunctionalComponents/PreLoader';
import axios from 'axios';

const apiLink = 'http://pollitic.herokuapp.com/api/ongoing';

class PollsMin extends Component {
	state = {
		headers: {
			new: 'ახალი',
			hot: 'კონტროვერსიალური',
			closed: 'დასრულებული'
		},
		status: 0
	}

	componentDidMount() {
		axios.get(apiLink, {
			params: {
				number: 4,
				sort: this.props.sort
			}
			})
			.then(response => {
				this.setState({
					apiData: response.data,
					status: response.status
				});
			})
			.catch(error => {
				this.setState({
					status: error.response.status
				});				
			});
	}

	render() {
		return (
			<React.Fragment>
				<h3>{this.state.headers[this.props.sort]}</h3>
				<div className="row">
					{ this.state.status === 200 ? (<PollDisplay polls={this.state.apiData.data.polls} size='small' />) : (<PreLoader />) }
				</div>
			</React.Fragment>
		);
	}
}

export default PaddedContainerHOC(PollsMin);