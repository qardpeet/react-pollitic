import React, { Component } from 'react';
import Navbar from '../ChildComponents/Navbar';
import PollFull from '../ChildComponents/FunctionalComponents/PollFull';
import PollsMin from '../ChildComponents/PollsMin';
import Footer from '../ChildComponents/Footer';


class NewPolls extends Component {
	state = {

	}

	render() {
		return (
			<React.Fragment>
				<Navbar />
				<PollFull />
				<PollsMin />
				<Footer />
			</React.Fragment>
		);
	}
}

export default NewPolls;