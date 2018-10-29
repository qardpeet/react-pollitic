import React, { Component } from 'react';
import Navbar from '../ChildComponents/Navbar';
import axios from 'axios';
import cancelablePromise from '../helpers/cancelablePromise';
import PreLoader from '../ChildComponents/FunctionalComponents/PreLoader';
import PollDisplay from '../ChildComponents/FunctionalComponents/PollDisplay';
// import MainChart from '../ChildComponents/FunctionalComponents/MainChart';
// import VotePoll from '../ChildComponents/VotePoll';
// import DonutChart from '../ChildComponents/FunctionalComponents/DonutChart';
import Footer from '../ChildComponents/Footer';

class Poll extends Component {
	state = {
		status: 'pending'
	}

	pendingPromises = [];

	componentDidMount() {
		this.getApiData(this.props.match.params.poll_id);
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

	getApiData = (pollId) => {
		this.setStatus('pending');

		const wrappedPromise = cancelablePromise(
			axios.get(`https://pollitic.herokuapp.com/api/poll/${pollId}/view`)
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
				<Navbar />

				{ this.state.status === 'OK' ? (
					<div className="container">
						<div className="row">
							<PollDisplay size='large' polls={[this.state.apiData.data.poll]}/>
						</div>				
					</div>
				) : <PreLoader /> }


				<Footer />
			</React.Fragment>
		);
	}
}

export default Poll;