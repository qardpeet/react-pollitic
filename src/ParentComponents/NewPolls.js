import React from 'react';
import Navbar from '../ChildComponents/Navbar';
import PollsFull from '../ChildComponents/PollsFull';
import PollsMin from '../ChildComponents/PollsMin';
import Footer from '../ChildComponents/Footer';

const NewPolls = () => {
	return (
		<React.Fragment>
			<Navbar />
			<PollsFull sort='new' context='ongoing' />
			<PollsMin sort='hot' />
			<Footer />
		</React.Fragment>
	);
}

export default NewPolls;