import React from 'react';
import Navbar from '../ChildComponents/Navbar';
import PollsFull from '../ChildComponents/PollsFull';
import PollsMin from '../ChildComponents/PollsMin';
import Footer from '../ChildComponents/Footer';

const HotPolls = () => {
	return (
		<React.Fragment>
			<Navbar />
			<PollsFull sort='hot' context='ongoing' />
			<PollsMin sort='new' />
			<Footer />
		</React.Fragment>
	);
}

export default HotPolls;