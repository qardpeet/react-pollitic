import React from 'react';
import PollsFull from '../ChildComponents/PollsFull';

const Polls = ({ location }) => {
    const params = new URLSearchParams(location.search);
    const sortBy = params.get('sort');
    const contextBy = params.get('context');

    return (
        <React.Fragment>
            <PollsFull sort={sortBy} context={contextBy} />
        </React.Fragment>
    );
};

export default Polls;
