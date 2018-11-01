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
        },
        status: 'pending',
    };

    pendingPromises = [];

    componentDidMount() {
        this.getApiData(this.props.sort);
    }

    componentDidUpdate(prevProps) {
        if (this.props.sort !== prevProps.sort) {
            this.getApiData(this.props.sort);
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

    getApiData = sortBy => {
        this.setState({
            status: 'pending',
        });

        const wrappedPromise = cancelablePromise(
            axios.get(apiLink, {
                params: {
                    number: 4,
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

    render() {
        if (this.state.status === 'OK') {
            return (
                <React.Fragment>
                    <h3>{this.state.headers[this.props.sort]}</h3>
                    <div className="row">
                        <PollDisplay
                            polls={this.state.apiData.data.polls}
                            size="small"
                        />
                    </div>
                </React.Fragment>
            );
        }

        return <PreLoader />;
    }
}

export default PaddedContainerHOC(PollsMin);
