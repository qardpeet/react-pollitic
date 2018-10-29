import React, { Component } from 'react';
import axios from 'axios';
import cancelablePromise from '../helpers/cancelablePromise';
import PreLoader from './FunctionalComponents/PreLoader';
import PaddedContainerHOC from '../hoc/PaddedContainerHOC';
import PollDisplay from './FunctionalComponents/PollDisplay';

const apiLink = 'http://pollitic.herokuapp.com/api/ongoing';

class PollsMin extends Component {
	state = {
		headers: {
			new: 'ახალი',
			hot: 'კონტროვერსიალური',
			closed: 'დასრულებული'
		},
		status: 'pending'
	}

	pendingPromises = [];

	componentDidMount() {
		this.getApiData(this.props.sort);
	}

	componentWillUnmount() {
		this.pendingPromises.map(p => p.cancel());
	}

	appendPendingPromise = promise => {
		this.pendingPromises = [...this.pendingPromises, promise];
	}

	removePendingPromise = promise => {
		this.pendingPromises = this.pendingPromises.filter(p => p !== promise);
	}

	getApiData = (sortBy) => {
		this.setStatus('pending');

		const wrappedPromise = cancelablePromise(
			axios.get(apiLink, {
				params: {
					number: 4,
					sort: sortBy
				}
			})
		);

		this.appendPendingPromise(wrappedPromise);

		return wrappedPromise.promise
			.then(response => {
				this.setState({
					apiData: response.data,
					status: response.statusText
				});
			})
			.then(() => this.removePendingPromise(wrappedPromise))
			.catch(error => {
				if (!error.isCanceled) {
					this.setState({ status: error.response.statusText });
					this.removePendingPromise(wrappedPromise);
				}		
			});		
	}

	setStatus = (status) => {
		const wrappedPromise = cancelablePromise(
			new Promise(r => 
				this.setState({
					status: status
				})
			)
		);
		this.appendPendingPromise(wrappedPromise);
		return wrappedPromise.promise;
	}

	render() {
		return (
			<React.Fragment>
				<h3>{this.state.headers[this.props.sort]}</h3>
				<div className="row">
					{ this.state.status === 'OK' ? (<PollDisplay polls={this.state.apiData.data.polls} size='small' />) : (<PreLoader />) }
				</div>
			</React.Fragment>
		);
	}
}

export default PaddedContainerHOC(PollsMin);