import React from 'react';
import Navbar from '../ChildComponents/Navbar';
import AddNewPoll from '../ChildComponents/AddNewPoll';
import Footer from '../ChildComponents/Footer';

const NewPoll = () => {
	return (
		<React.Fragment>
			<Navbar />
			<AddNewPoll />
			<Footer />
		</React.Fragment>			
	);
}

export default NewPoll;