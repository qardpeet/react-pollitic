import React, { Component } from 'react';
import axios from 'axios';
import cancelablePromise from '../helpers/cancelablePromise';
import PreLoader from '../ChildComponents/FunctionalComponents/PreLoader';
import PollDisplay from '../ChildComponents/FunctionalComponents/PollDisplay';
import { Redirect } from 'react-router-dom';
import PaddedContainerHOC from '../hoc/PaddedContainerHOC';
import GraphOrSignature from '../ChildComponents/FunctionalComponents/GraphOrSignature';
import AddVote from '../ChildComponents/AddVote';
import { FacebookShareButton, FacebookIcon } from 'react-share';
import ApiConfig from '../ApiConfig';

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
            axios.get(`${ApiConfig.url}/api/poll/${pollId}/view`)
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
                    {this.state.apiData.data.poll.requirePhoneAuth === 'True' ? (
                        <div className="mobile-verification-status">
                            <i className="material-icons" style={{ color: '#7cb342' }}>
                                mobile_friendly
                            </i>
                            <p>გამოკითხვაზე SMS ვერიფიკაცია სავალდებულოა</p>
                        </div>
                    ) : (
                        <div className="mobile-verification-status">
                            <i className="material-icons" style={{ color: '#e57373' }}>
                                mobile_off
                            </i>
                            <p>გამოკითხვაზე SMS ვერიფიკაცია არასავალდებულოა</p>
                        </div>
                    )}
                    <PollDisplay size="large" polls={[this.state.apiData.data.poll]} />
                    <p className="pollitic-description">
                        {this.state.apiData.data.poll.description}
                    </p>
                    <FacebookShareButton
                        url={`https://pollitic.ge${this.props.match.url}`}
                        className="facebook-share"
                    >
                        <FacebookIcon size={32} />
                    </FacebookShareButton>
                    {this.state.apiData.data.poll.isClosed !== 'True' ? (
                        <>
                            <hr />
                            <AddVote
                                candidates={this.state.apiData.data.poll.candidates}
                                pollId={this.state.apiData.data.poll.id}
                                setModal={this.props.setModal}
                                requirePhoneAuth={this.state.apiData.data.poll.requirePhoneAuth}
                                getPollApiData={this.getApiData}
                            />
                        </>
                    ) : null}
                    <GraphOrSignature
                        totalVotes={this.state.apiData.data.poll.totalVotes}
                        candidates={this.state.apiData.data.poll.candidates}
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
