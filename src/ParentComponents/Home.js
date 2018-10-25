import React, { Component } from 'react';
import Navbar from '../ChildComponents/Navbar';
import CallToAction from '../ChildComponents/CallToAction';
import AboutUs from '../ChildComponents/AboutUs';
import PollsMin from '../ChildComponents/PollsMin';
import Footer from '../ChildComponents/Footer';

class Home extends Component {
	state = {

	}

	render() {
		return (
			<div>
				<Navbar />
				<CallToAction />
				<AboutUs />
				<PollsMin />
				<PollsMin />
				<Footer />
			</div>
		);
	}
}

export default Home;