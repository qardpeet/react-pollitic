import React from 'react';
import Navbar from '../ChildComponents/Navbar';
import PollsFull from '../ChildComponents/PollsFull';
import PollsMin from '../ChildComponents/PollsMin';
import Footer from '../ChildComponents/Footer';

const ClosedPolls = () => {
	return (
		<React.Fragment>
			<Navbar />
			<PollsFull sort='closed' />
			<PollsMin sort='hot' />
			<Footer />
		</React.Fragment>
	);
}

export default ClosedPolls;