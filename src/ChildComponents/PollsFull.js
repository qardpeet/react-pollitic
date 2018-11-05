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
        polls: [],
        totalPages: null,
        page: 1,
        perPage: 10,
        scrolling: false,
    };

    pendingPromises = [];

    componentWillMount() {
        window.addEventListener('scroll', this.handleScroll);
    }

    componentDidMount() {
        this.getApiData(this.props.sort, this.props.context, true);
    }

    componentDidUpdate(prevProps) {
        if (this.props.sort !== prevProps.sort || this.props.context !== prevProps.context) {
            this.setState(
                {
                    page: 1,
                },
                () => this.getApiData(this.props.sort, this.props.context, true)
            );
        }
    }

    componentWillUnmount() {
        this.pendingPromises.map(p => p.cancel());
        window.removeEventListener('scroll', this.handleScroll);
    }

    appendPendingPromise = promise => {
        this.pendingPromises = [...this.pendingPromises, promise];
    };

    removePendingPromise = promise => {
        this.pendingPromises = this.pendingPromises.filter(p => p !== promise);
    };

    getApiData = (sortBy, contextBy, initLoad) => {
        initLoad = initLoad ? true : false;

        if (initLoad) {
            this.setState({
                status: 'pending',
            });
        }

        const wrappedPromise = cancelablePromise(
            axios.get(apiLink + contextBy, {
                params: {
                    sort: sortBy,
                    page: this.state.page,
                    perPage: this.state.perPage,
                },
            })
        );

        this.appendPendingPromise(wrappedPromise);

        return wrappedPromise.promise
            .then(response => {
                if (response.data.status === 'success') {
                    if (initLoad) {
                        this.setState({
                            polls: [...response.data.data.polls],
                            status: response.statusText,
                            page: response.data.data.page,
                            totalPages: response.data.data.totalPages,
                            scrolling: false,
                        });
                    } else {
                        this.setState({
                            polls: [...this.state.polls, ...response.data.data.polls],
                            status: response.statusText,
                            page: response.data.data.page,
                            totalPages: response.data.data.totalPages,
                            scrolling: false,
                        });
                    }
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

    handleScroll = e => {
        const { scrolling, totalPages, page } = this.state;
        if (scrolling) return;
        if (totalPages <= page) return;
        const lastPoll = document.querySelector(
            '.pollitic-item.padded-white > .row > .col:last-child'
        );
        const lastPollOffset = lastPoll.offsetTop + lastPoll.clientHeight;
        const pageOffset = window.pageYOffset + window.innerHeight;
        const bottomOffset = 20;
        if (pageOffset > lastPollOffset - bottomOffset) this.loadMorePolls();
    };

    loadMorePolls = () => {
        this.setState(
            prevState => ({
                page: ++prevState.page,
                scrolling: true,
                status: 'scrolling',
            }),
            () => this.getApiData(this.props.sort, this.props.context)
        );
    };

    getHeaderName = (sortBy, contextBy) => {
        if (contextBy === 'closed') return 'დასრულებული';
        if (sortBy === 'hot') return 'კონტროვერსიალური';
        return 'ახალი';
    };

    render() {
        const pollsDisplay = (
            <React.Fragment>
                <h3>{this.getHeaderName(this.props.sort, this.props.context)}</h3>
                <div className="row">
                    <PollDisplay polls={this.state.polls} size="large" />
                </div>
            </React.Fragment>
        );

        if (this.state.status === 'OK') {
            return pollsDisplay;
        } else if (this.state.status === 'scrolling') {
            return (
                <React.Fragment>
                    {pollsDisplay}
                    <PreLoader />
                </React.Fragment>
            );
        } else if (this.state.status === 'Not Found') {
            return <Redirect to={'/404'} />;
        }

        return <PreLoader />;
    }
}

export default PaddedContainerHOC(PollsFull);
