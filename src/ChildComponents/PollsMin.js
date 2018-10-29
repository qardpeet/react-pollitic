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
		status: 'pending'
	}

	componentDidMount() {
		this.getApiData(this.props.sort);
	}

	componentWillUnmount() {
		this.cancelTokenSource && this.cancelTokenSource.cancel();
	}

	getApiData = (sortBy) => {
		this.cancelTokenSource = axios.CancelToken.source();
		this.setState({status: 'pending'});

		axios.get(apiLink, {
			cancelToken: this.cancelTokenSource.token,
			params: {
				number: 4,
				sort: sortBy
			}
			})
			.then(response => {
				this.setState({
					apiData: response.data,
					status: response.statusText
				});
			})
			.catch(error => {
				if(axios.isCancel(error)){
					console.log('Cancelled API Request!');
				} else {
					this.setState({
						status: error.response.statusText,
					});
				}			
			});		
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