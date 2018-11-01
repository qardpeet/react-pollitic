import React, { Component } from 'react';
import axios from 'axios';
import cancelablePromise from '../helpers/cancelablePromise';
import PreLoader from './FunctionalComponents/PreLoader';
import PaddedContainerHOC from '../hoc/PaddedContainerHOC';
import PollDisplay from './FunctionalComponents/PollDisplay';
import { Redirect } from 'react-router-dom';

const apiLink = 'http://pollitic.herokuapp.com/api/';

class PollsFull extends Component {
    state = {
        status: 'pending',
    };

    pendingPromises = [];

    componentDidMount() {
        this.getApiData(this.props.sort, this.props.context);
    }

    componentDidUpdate(prevProps) {
        if (
            this.props.sort !== prevProps.sort ||
            this.props.context !== prevProps.context
        ) {
            this.getApiData(this.props.sort, this.props.context);
        }
    }

    componentWillUnmount() {
        this.pendingPromises.map(p => p.cancel());
    }

    appendPendingPromise = promise => {
        this.pendingPromises = [...this.pendingPromises, promise];
    };

    removePendingPromise = promise => {
        this.pendingPromises = this.pendingPromises.filter(p => p !== promise);
    };

    getApiData = (sortBy, contextBy) => {
        this.setState({
            status: 'pending',
        });

        const wrappedPromise = cancelablePromise(
            axios.get(apiLink + contextBy, {
                params: {
                    sort: sortBy,
                },
            })
        );

        this.appendPendingPromise(wrappedPromise);

        return wrappedPromise.promise
            .then(response => {
                if (response.data.status === 'success') {
                    this.setState({
                        apiData: response.data,
                        status: response.statusText,
                    });
                }
            })
            .then(() => this.removePendingPromise(wrappedPromise))
            .catch(response => {
                if (!response.isCanceled) {
                    this.setState({
                        status: response.error.response.statusText,
                    });
                    this.removePendingPromise(wrappedPromise);
                }
            });
    };

    getHeaderName = (sortBy, contextBy) => {
        if (contextBy === 'closed') return 'დასრულებული';
        if (sortBy === 'hot') return 'კონტროვერსიალური';
        return 'ახალი';
    };

    render() {
        if (this.state.status === 'OK') {
            return (
                <React.Fragment>
                    <h3>
                        {this.getHeaderName(
                            this.props.sort,
                            this.props.context
                        )}
                    </h3>
                    <div className="row">
                        <PollDisplay
                            polls={this.state.apiData.data.polls}
                            size="large"
                        />
                    </div>
                </React.Fragment>
            );
        } else if (this.state.status === 'Not Found') {
            return <Redirect to={'/404'} />;
        }

        return <PreLoader />;
    }
}

export default PaddedContainerHOC(PollsFull);
