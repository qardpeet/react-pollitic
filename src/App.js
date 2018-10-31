import React, { Component } from 'react';
import { Route, BrowserRouter } from 'react-router-dom'
import Home from './ParentComponents/Home';
import NewPoll from './ParentComponents/NewPoll';
import Poll from './ParentComponents/Poll';
import Polls from './ParentComponents/Polls';
import Navbar from './ChildComponents/Navbar';
import Footer from './ChildComponents/Footer';
import Modal from './ChildComponents/FunctionalComponents/Modal';

class App extends Component {
	state = {
		modal: {
			isActive: false,
			status: false,
			title: '',
			message: ''			
		}
	}

	disableModal = () => {
		this.setState({
			modal: {...this.state.modal, isActive: false}
		})
	}

	setModal = (isActive, status, title, message) => {
		this.setState({
			modal: {
				isActive: isActive,
				message: message,
				title: title,
				status: status
			}
		})
	}

	render() {
		return (
			<BrowserRouter>
				<React.Fragment>
					<Modal 
						isActive={this.state.modal.isActive} 
						message={this.state.modal.message}
						title={this.state.modal.title}
						status={this.state.modal.status}
						disableModal={this.disableModal}
					/>
					<Navbar />
					<Route exact path='/' render={(props) => (<Home {...props} />)} />
					<Route path='/new-poll' render={(props) => (<NewPoll {...props} setModal={this.setModal}/>)} />
					<Route path='/poll/:poll_id' render={(props) => (<Poll {...props} />)} />
					<Route path='/polls' render={(props) => (<Polls {...props} />)} />
					<Footer />
				</React.Fragment>
			</BrowserRouter>
		);
	}
}

export default App;
