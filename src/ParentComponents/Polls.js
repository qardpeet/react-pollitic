import React from 'react';
import PollsFull from '../ChildComponents/PollsFull';
import PollsMin from '../ChildComponents/PollsMin';

const Polls = ({ location }) => {
    const params = new URLSearchParams(location.search);
    const sortBy = params.get('sort');
    const contextBy = params.get('context');

    const pollMinSortBy = {
        new: 'hot',
        hot: 'new',
    };

    return (
        <React.Fragment>
            <PollsFull sort={sortBy} context={contextBy} />
            <PollsMin sort={pollMinSortBy[sortBy]} />
        </React.Fragment>
    );
};

export default Polls;
