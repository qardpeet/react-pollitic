import React from 'react';
import CallToAction from '../ChildComponents/CallToAction';
import AboutUs from '../ChildComponents/AboutUs';
import PollsMin from '../ChildComponents/PollsMin';

const Home = () => {
	return (
		<React.Fragment>
			<CallToAction />
			<AboutUs />
			<PollsMin sort='hot' />
			<PollsMin sort='new' />
		</React.Fragment>
	);
}

export default Home;