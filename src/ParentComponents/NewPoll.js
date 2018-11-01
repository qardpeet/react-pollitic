import React from 'react';
import AddNewPoll from '../ChildComponents/AddNewPoll';
import PollsMin from '../ChildComponents/PollsMin';

const NewPoll = props => {
    return (
        <React.Fragment>
            <AddNewPoll setModal={props.setModal} />
            <PollsMin sort="hot" />
        </React.Fragment>
    );
};

export default NewPoll;
