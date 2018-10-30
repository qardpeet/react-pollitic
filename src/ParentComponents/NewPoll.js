import React from 'react';
import Navbar from '../ChildComponents/Navbar';
import AddNewPoll from '../ChildComponents/AddNewPoll';
import PollsMin from '../ChildComponents/PollsMin';
import Footer from '../ChildComponents/Footer';

const NewPoll = () => {
	return (
		<React.Fragment>
			<Navbar />
			<AddNewPoll />
			<PollsMin sort='hot' />
			<Footer />
		</React.Fragment>			
	);
}

export default NewPoll;