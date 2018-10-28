import React, { Component } from 'react';
import Navbar from '../ChildComponents/Navbar';
import PollDisplay from '../ChildComponents/FunctionalComponents/PollDisplay';
import axios from 'axios';
// import MainChart from '../ChildComponents/FunctionalComponents/MainChart';
// import VotePoll from '../ChildComponents/VotePoll';
// import DonutChart from '../ChildComponents/FunctionalComponents/DonutChart';
import Footer from '../ChildComponents/Footer';
import PreLoader from '../ChildComponents/FunctionalComponents/PreLoader';

class Poll extends Component {
	state = {
		status: 0
	}

	componentDidMount() {
		axios.get(`https://pollitic.herokuapp.com/api/poll/${this.props.match.params.poll_id}/view`)
			.then(response => {
				this.setState({
					apiData: response.data,
					status: response.statusText
				});
			})
			.catch(error => {
				this.setState({
					status: error.response.statusText
				});
			});
	}

	render() {
		return (
			<React.Fragment>
				<Navbar />

				{ this.state.status === 'OK' ? (
					<div className="container">
						<div className="row">
							<PollDisplay size='large' polls={[this.state.apiData.data.poll]}/>
						</div>				
					</div>
				) : <PreLoader /> }


				<Footer />
			</React.Fragment>
		);
	}
}

export default Poll;