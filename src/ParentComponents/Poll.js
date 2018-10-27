import React, { Component } from 'react';
import Navbar from '../ChildComponents/Navbar';
import PollDisplay from '../ChildComponents/FunctionalComponents/PollDisplay';

// import MainChart from '../ChildComponents/FunctionalComponents/MainChart';
// import VotePoll from '../ChildComponents/VotePoll';
// import DonutChart from '../ChildComponents/FunctionalComponents/DonutChart';
// import Footer from '../ChildComponents/Footer';


class Poll extends Component {
	state = {
		apiData: {
			status: "success",
			data: {
				polls: [
					{
						id: 1,
						name: "ემზადება ზევესს შეგყაროთ დაგენგრეოდა მოხდენილ ფილმებისა მჯიღს",
						description: "test",
						imageLink: 'https://lonelyplanetimages.imgix.net/a/g/hi/t/22c5e154d806c069b0319cdbbcce24ab-tbilisi.jpg?sharp=10&vib=20&w=1200',
						password: null,
						requirePhoneAuth: "True",
						isListed: "True",
						cookieValue: "m1mgTNzOqVQO4xaRJyvZASzTr",
						created_at: "2018-10-23 10:42:59",
						updated_at: "2018-10-23 10:42:59",
						isClosed: "True",
						closingDate: {
							date:"0256-10-25 15:40:45.000000",
							timezone_type:3,
							timezone:"UTC"
						},
						totalVotes : 0,
					}			
				]
			}
		}
	}

	render() {
		return (
			<React.Fragment>
				<Navbar />

				<div className="container">
					<div className="row">
						<PollDisplay size='large' polls={this.state.apiData.data.polls}/>
					</div>				
				</div>
				{/* <MainChart /> */}
				{/* <VotePoll /> */}
				{/* <DonutChart /> */}
				{/* <Footer /> */}
			</React.Fragment>
		);
	}
}

export default Poll;