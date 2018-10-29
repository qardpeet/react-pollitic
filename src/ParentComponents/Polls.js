import React from 'react';
import Navbar from '../ChildComponents/Navbar';
import PollsFull from '../ChildComponents/PollsFull';
import PollsMin from '../ChildComponents/PollsMin';
import Footer from '../ChildComponents/Footer';

const Polls = ({location}) => {
    const params = new URLSearchParams(location.search);
    const sortBy = params.get('sort');
    const contextBy = params.get('context');

    const pollMinSortBy = {
        new: 'hot',
        hot: 'new'
    }

    return (
		<React.Fragment>
			<Navbar />
			<PollsFull sort={sortBy} context={contextBy} />
			<PollsMin sort={pollMinSortBy[sortBy]} />
			<Footer />
		</React.Fragment>
	);
}

export default Polls;