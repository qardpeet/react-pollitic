import React, { Component } from 'react';
import Navbar from '../ChildComponents/Navbar';
import AddNewPoll from '../ChildComponents/AddNewPoll';
import PollsMin from '../ChildComponents/PollsMin';
import Footer from '../ChildComponents/Footer';

class NewPoll extends Component {
	state = {

	}

	render() {
		return (
			<React.Fragment>
				<Navbar />
				<AddNewPoll />
				<PollsMin />
				<Footer />
			</React.Fragment>			
		);
	}
}

export default NewPoll;