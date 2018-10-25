import React, { Component } from 'react';
import Navbar from '../ChildComponents/Navbar';
import PollFull from '../ChildComponents/FunctionalComponents/PollFull';
import PollsMin from '../ChildComponents/PollsMin';
import Footer from '../ChildComponents/Footer';


class HotPolls extends Component {
	state = {

	}

	render() {
		return (
			<div>
				<Navbar />
				<PollFull />
				<PollsMin />
				<Footer />
			</div>
		);
	}
}

export default HotPolls;