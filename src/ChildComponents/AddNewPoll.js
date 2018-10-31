import React, { Component } from 'react';
import PaddedContainerHOC from '../hoc/PaddedContainerHOC';
import AddCandidate from './AddCandidate';
import AddQuestion from './AddQuestion';
import ArrayToList from './FunctionalComponents/ArrayToList';
import axios from 'axios';

class AddNewPoll extends Component {
	state = {
		userInput: {
			name: '',
			description: '',
			password: '',
			requirePhoneAuth: 'False',
			isListed: 'True',
			candidates: [],
			questions: [],
			closingDate: '1',
			image: null
		},
		status: 'fill'
	}

	handleSubmit = (e) => {
		e.preventDefault();
		let formData = new FormData();
		const closingDate = this.getClosingDate(parseInt(this.state.userInput.closingDate));
		
		for (let key in this.state.userInput) {
			if (key === 'closingDate') {
				formData.set(key, closingDate);
			} else if (key === 'image') {
				formData.append('image', this.state.userInput[key]);
			} else if (key === 'candidates') {
				for (let i in this.state.userInput[key]) {
					formData.append('candidates[]', this.state.userInput[key][i]);
				}
			} else if (key === 'questions') {
				for (let i in this.state.userInput[key]) {
					formData.append('questions[]', this.state.userInput[key][i]);
				}
			} else {
				formData.set(key, this.state.userInput[key]);
			}		
		}
		

		this.postApiData(formData);
	}

	postApiData = (data) => {
		axios.post(
			'http://pollitic.herokuapp.com/api/poll/create', 
			data, 
			{ 
				headers: { 
					'content-type': 'application/x-www-form-urlencoded'
				}
			})
			.then(response => {
				console.log(response);
			})
			.catch(error => {
				console.log(error.response);
			});
	}

	handleChange = (e) => {
		this.setState({
			userInput: {...this.state.userInput, [e.target.name]: e.target.value}
		});
	}

	handleFileUpload = (e) => {
		this.setState({
			userInput: {...this.state.userInput, [e.target.name]: e.target.files[0]}
		});
	}

	addCandidate = (candidate) => {
		if(candidate !== '') {
			this.setState({
				userInput: {...this.state.userInput, candidates: [...this.state.userInput.candidates, candidate]}
			});
		}
	}

	removeCandidate = (e) => {
		const newCandidates = this.state.userInput.candidates.filter(candidate => {
			return candidate !== e.target.innerHTML; 
		});
		this.setState({
			userInput: {...this.state.userInput, candidates: [...newCandidates]}
		});
	}

	addQuestion = (question) => {
		if(question !== '') {
			this.setState({
				userInput: {...this.state.userInput, questions: [...this.state.userInput.questions, question]}
			});
		}
	}

	removeQuestion = (e) => {
		const newQuestions = this.state.userInput.questions.filter(question => {
			return question !== e.target.innerHTML; 
		});
		this.setState({
			userInput: {...this.state.userInput, questions: [...newQuestions]}
		});
	}

	getClosingDate = (days) => {
		const currentTimeUnixMS = Date.now();
		const currentTimeUnix = currentTimeUnixMS / 1000;
		const roundedClosingDateUnix = Math.round(currentTimeUnix + (days * 86400));
		return roundedClosingDateUnix.toString();
	}

	render() {
		return (
			<React.Fragment>
				<form onSubmit={this.handleSubmit}>
					<div className="row pollitic-pad">
						<div className="col s12"><h3>პოლის პარამეტრები</h3></div>
						<div className="col s12">
							<p className="pollitic-note"><span className="important">*</span>-ით მონიშნული ველების შევსება სავალდებულოა</p>
						</div>
						<div className="input-field col s12">
							<p className="pollitic-label">სათაური<span className="important">*</span></p>
							<input onChange={this.handleChange} value={this.state.userInput.name} placeholder="მთავარი კითხვა" name="name" type="text" className="validate"/>
                        </div>
						<div className="input-field col s12">
							<p className="pollitic-label">აღწერა<span className="important">*</span></p>
							<input onChange={this.handleChange} value={this.state.userInput.description} placeholder="დამატებითი ინფორმაცია" name="description" type="text" className="validate"/>
                        </div>
						<div className="input-field col s12 m6">
							<p className="pollitic-label">სტატუსი<span className="important">*</span></p>
							<select className="browser-default pollitic-select" value={this.state.userInput.isListed} onChange={this.handleChange} name="isListed">
								<option value="True">საჯარო</option>
								<option value="False">დამალული</option>
							</select>
                        </div>
						<div className="input-field col s12 m6">
							<p className="pollitic-label">SMS ვერიფიკაცია<span className="important">*</span></p>
							<select className="browser-default pollitic-select" value={this.state.userInput.requirePhoneAuth} onChange={this.handleChange} name="requirePhoneAuth">
								<option value="False">არასავალდებულო</option>
								<option value="True">სავალდებულო</option>								
							</select>
                        </div>
						<div className="input-field col s12 m6">
							<p className="pollitic-label">ხანგრძლივობა<span className="important">*</span></p>
							<select className="browser-default pollitic-select" value={this.state.userInput.closingDate} onChange={this.handleChange} name="closingDate">
								<option value="0.5">12 საათი</option>
								<option value="1">1 დღე</option>
								<option value="2">2 დღე</option>
								<option value="3">3 დღე</option>
								<option value="4">4 დღე</option>
								<option value="7">1 კვირა</option>
								<option value="14">2 კვირა</option>								
							</select>
                        </div>
						<div className="input-field col s12 m6">
							<p className="pollitic-label">პაროლი</p>
							<input onChange={this.handleChange} value={this.state.userInput.password} name="password" type="password" className="validate"/>
                        </div>
						<div className="input-field file-field col s12 m6">
							<div className="btn-small light-green darken-2">
								<span>სურათი</span>
								<input type="file" onChange={this.handleFileUpload} name="image" />
							</div>							
							<div className="file-path-wrapper">
								<input className="file-path validate" type="text" placeholder="სურათის ატვირთვა"/>
							</div>
                        </div>
						<div className="input-field col s12">
							<p className="pollitic-label">პასუხები<span className="important">*</span></p>
							<AddCandidate addCandidate={this.addCandidate}/>							
                        </div>
						<div className="col s12">
							<ArrayToList removeItem={this.removeCandidate} items={this.state.userInput.candidates}/>
						</div>
						<div className="input-field col s12">
							<p className="pollitic-label">დამატებითი კითხვები</p>
							<AddQuestion addQuestion={this.addQuestion}/>							
                        </div>
						<div className="col s12">
							<ArrayToList removeItem={this.removeQuestion} items={this.state.userInput.questions}/>
						</div>
						<div className="col s12">
							<button className='btn-large purple darken-1 z-depth-3 main-btn'>დამატება</button>	
						</div>						
					</div>
				</form>	
			</React.Fragment>
		);
	}
}

export default PaddedContainerHOC(AddNewPoll);