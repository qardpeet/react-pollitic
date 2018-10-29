import React, { Component } from 'react';
import PaddedContainerHOC from '../hoc/PaddedContainerHOC';
import PollDisplay from './FunctionalComponents/PollDisplay';
import PreLoader from './FunctionalComponents/PreLoader';
import axios from 'axios';

const apiLink = 'http://pollitic.herokuapp.com/api/';

class PollsFull extends Component {
	state = {
		status: 'pending'
	}

	componentDidMount() {
		this.getApiData(this.props.sort, this.props.context);	
	}


	componentDidUpdate(prevProps) {
		if (this.props.sort !== prevProps.sort || this.props.context !== prevProps.context) {
			this.getApiData(this.props.sort, this.props.context);			
		}		
	}

	componentWillUnmount() {
		this.cancelTokenSource && this.cancelTokenSource.cancel();
	}
	
	getApiData = (sortBy, contextBy) => {
		this.cancelTokenSource = axios.CancelToken.source();
		this.setState({status: 'pending'});

		axios.get(apiLink + contextBy, {
			cancelToken: this.cancelTokenSource.token,
			params: {
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