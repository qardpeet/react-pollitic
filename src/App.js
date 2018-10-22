import React, { Component } from 'react';
import Chart from './Components/Chart';
import AdditionalCharts from './Components/AdditionalCharts'
import AddVote from './Components/AddVote';
import Modal from './Components/Modal';
import SmsConfirmation from './Components/SmsConfirmation';

const urlData = 'https://pollitic.herokuapp.com/api'; //api url for fetching candidates
const urlPost = 'https://pollitic.herokuapp.com/api/vote';

class App extends Component {
	state = {
		modal: {
			display: false,
			status: false,
			message: 'ეს ნომერი ერთხელ უკვე გამოყენებული იქნა!'
		},
		input: {
			candidateSelection: true,
			smsVerification: false,
			link: ''
		}
	}

	formatNumber = (number) => {
		return number[0] !== '+' ? ('+' + number) : number;
    }

	addVote = (vote) => {
		console.log('%cVOTE OBJECT REACT', "color: blue; font-size:15px;");
		console.log(vote);
		const formattedNumber = this.formatNumber(vote.number);
		fetch(urlPost, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					number: formattedNumber,
					candidateId: vote.candidateId,
					gender: vote.gender,
					age: vote.age,
					value: vote.value
				})
			})
			.then(data => data.json())
			.then(data => {
				console.log('%cFETCH DATA JSON WITH VOTE OBJ', "color: red; font-size:15px;");
				console.log(data);
				if(data.status === 'success') {
					this.setState({
						input: {
							candidateSelection: false,
							smsVerification: true,
							link: data.data.link
						}
					});					
				} else {
					this.setState({
						modal: {
							display: true,
							status: false,
							message: data.error
						}
					});
				}
			});
		
	}

	confirmSmsKey = (pin, link) => {
		console.log('%cPIN, LINK OBJECT REACT', "color: blue; font-size:15px;");
		console.log({pin, link});
		fetch(link, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				pin: pin
			})
		})
			.then(data => data.json())
			.then(data => {
				console.log('%cFETCH DATA JSON WITH {pin, link} OBJ', "color: red; font-size:15px;");
				console.log(data);
				if(data.status === 'success') {
					fetch(urlData)
						.then(apiData => apiData.json())
						.then(apiData => {
							this.setState({
								modal: {
									display: true,
									status: true,
									message: data.data.message
								},
								input: {
									candidateSelection: false,
									smsVerification: false,
									link: ''						
								},
								apiData: apiData
							});
						});					
				} else {
					this.setState({
						modal: {
							display: true,
							status: false,
							message: data.error
						}
					});
				}
			});
	}

	changeModalStatus = () => {
		this.setState({
			modal: {
				display: false,
				status: false,
				message: ''
			}
		});
	}

	componentDidMount() {
		fetch(urlData)
			.then(apiData => apiData.json())
			.then(apiData => {
				this.setState({apiData: apiData});
			});
	}

	render() {
		if (!this.state.apiData) return <div className="loader">საიტი იტვირთება...</div>
		return (
			<div className="App">
				<Modal modal={this.state.modal} changeModalStatus={this.changeModalStatus}/>
				<Chart data={this.state.apiData.data}/>
				<AddVote display={this.state.input.candidateSelection} addVote={this.addVote} data={this.state.apiData.data} confirmSmsKey={this.confirmSmsKey}/>
				<SmsConfirmation display={this.state.input.smsVerification} confirmSmsKey={this.confirmSmsKey} link={this.state.input.link}/>
				<AdditionalCharts data={this.state.apiData.data}/>
			</div>
		);
	}
}

export default App;
