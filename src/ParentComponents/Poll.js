import React, { Component } from 'react';
import Navbar from '../ChildComponents/Navbar';
import PollFull from '../ChildComponents/FunctionalComponents/PollFull';
import MainChart from '../ChildComponents/FunctionalComponents/MainChart';
import VotePoll from '../ChildComponents/VotePoll';
import DonutChart from '../ChildComponents/FunctionalComponents/DonutChart';
import PollsMin from '../ChildComponents/PollsMin';
import Footer from '../ChildComponents/Footer';


class Poll extends Component {
	state = {

	}

	render() {
		return (
			<div>
				<Navbar />
				<PollFull />
				<MainChart />
				<VotePoll />
				<DonutChart />
				<PollsMin />
				<Footer />
			</div>
		);
	}
}

export default Poll;