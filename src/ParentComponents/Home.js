import React from 'react';
import Navbar from '../ChildComponents/Navbar';
import CallToAction from '../ChildComponents/CallToAction';
import AboutUs from '../ChildComponents/AboutUs';
import PollsMin from '../ChildComponents/PollsMin';
import Footer from '../ChildComponents/Footer';

const Home = () => {
	return (
		<React.Fragment>
			<Navbar />
			<CallToAction />
			<AboutUs />
			<PollsMin sort='hot' />
			<PollsMin sort='new' />
			<Footer />
		</React.Fragment>
	);
}

export default Home;