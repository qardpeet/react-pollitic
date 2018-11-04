import React, { Component } from 'react';
import axios from 'axios';
import cancelablePromise from '../helpers/cancelablePromise';
import PreLoader from '../ChildComponents/FunctionalComponents/PreLoader';
import PollDisplay from '../ChildComponents/FunctionalComponents/PollDisplay';
import { Redirect } from 'react-router-dom';
import PaddedContainerHOC from '../hoc/PaddedContainerHOC';
import HorizontalBarChart from '../ChildComponents/FunctionalComponents/HorizontalBarChart';
import AddVote from '../ChildComponents/AddVote';
// import DonutChart from '../ChildComponents/FunctionalComponents/DonutChart';

class Poll extends Component {
    state = {
        status: 'pending',
    };

    pendingPromises = [];

    componentDidMount() {
        this.getApiData(this.props.match.params.poll_id);
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

    getApiData = pollId => {
        this.setState({
            status: 'pending',
        });

        const wrappedPromise = cancelablePromise(
            axios.get(`https://pollitic.herokuapp.com/api/poll/${pollId}/view`)
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
                    <PollDisplay
                        size="large"
                        polls={[this.state.apiData.data.poll]}
                    />
                    <p className="pollitic-description">
                        {this.state.apiData.data.poll.description}
                    </p>
                    <hr />
                    <AddVote
                        candidates={this.state.apiData.data.poll.candidates}
                        pollId={this.state.apiData.data.poll.id}
                        setModal={this.props.setModal}
                        requirePhoneAuth={
                            this.state.apiData.data.poll.requirePhoneAuth
                        }
                        getPollApiData={this.getApiData}
                    />
                    <hr />
                    <HorizontalBarChart
                        data={this.state.apiData.data.poll.candidates}
                    />
                </React.Fragment>
            );
        } else if (this.state.status === 'Not Found') {
            return <Redirect to={'/404'} />;
        }
        return <PreLoader />;
    }
}

export default PaddedContainerHOC(Poll);
