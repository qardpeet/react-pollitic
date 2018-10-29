import React, { Component } from 'react';
import PaddedContainerHOC from '../hoc/PaddedContainerHOC';
import PollDisplay from './FunctionalComponents/PollDisplay';
import PreLoader from './FunctionalComponents/PreLoader';
import axios from 'axios';
import cancelablePromise from './FunctionalComponents/cancelablePromise';

const apiLink = 'http://pollitic.herokuapp.com/api/';

class PollsFull extends Component {
	state = {
		status: 'pending'
	}

	pendingPromises = [];

	componentDidMount() {
		this.getApiData(this.props.sort, this.props.context);
	}

	componentDidUpdate(prevProps) {
		if (this.props.sort !== prevProps.sort || this.props.context !== prevProps.context) {
			this.getApiData(this.props.sort, this.props.context);
		}		
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
	
	getApiData = (sortBy, contextBy) => {
		this.setStatus('pending');

		const wrappedPromise = cancelablePromise(
			axios.get(apiLink + contextBy, {
				params: {
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

	getHeaderName = (sortBy, contextBy) => {
		if(contextBy === 'closed') return 'დასრულებული';
		if(sortBy === 'hot') return 'კონტროვერსიალური';
		return 'ახალი';
	}
    
    render() {
        return(
            <React.Fragment>
                <h3>{this.getHeaderName(this.props.sort, this.props.context)}</h3>
				<div className="row">
                    { this.state.status === 'OK' ? (<PollDisplay polls={this.state.apiData.data.polls} size='large' />) : (<PreLoader />)}
				</div>                
            </React.Fragment> 
        ); 
    }
}

export default PaddedContainerHOC(PollsFull);