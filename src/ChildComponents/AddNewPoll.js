import React, { Component } from 'react';
import PaddedContainerHOC from '../hoc/PaddedContainerHOC';
// import axios from 'axios';

class AddNewPoll extends Component {
	state = {
		userInput: {
			name: '',
			description: '',
			password: '',
			requirePhoneAuth: 'False',
			isListed: 'True',
			candidates: ['პაატა', 'ბუზალა'],
			questions: [],
			closingDate: '1',
			image: null
		},
		status: 'fill'
	}

	handleSubmit = (e) => {
		e.preventDefault();
		let formData = {};
		const closingDate = this.getClosingDate(parseInt(this.state.userInput.closingDate));
		
		for (let key in this.state.userInput) {
			if(key === 'closingDate') formData = {...formData, [key]: closingDate};
			else formData = {...formData, [key]: this.state.userInput[key]};		
		}

		console.log(formData);
	}

	postApiData = (data) => {
		// axios.post('http://pollitic.herokuapp.com/api/poll/create', data)
		// 	.then(response => {
		// 		console.log(response);
		// 	})
		// 	.catch(error => {
		// 		console.log(error.response);
		// 	});
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
							<input onChange={this.handleChange} value={this.state.name} placeholder="მთავარი კითხვა" name="name" type="text" className="validate"/>
                        </div>
						<div className="input-field col s12">
							<p className="pollitic-label">აღწერა<span className="important">*</span></p>
							<input onChange={this.handleChange} value={this.state.description} placeholder="დამატებითი ინფორმაცია" name="description" type="text" className="validate"/>
                        </div>
						<div className="input-field col s12 m6">
							<p className="pollitic-label">სტატუსი<span className="important">*</span></p>
							<select className="browser-default pollitic-select" value={this.state.isListed} onChange={this.handleChange} name="isListed">
								<option value="True">საჯარო</option>
								<option value="False">დამალული</option>
							</select>
                        </div>
						<div className="input-field col s12 m6">
							<p className="pollitic-label">SMS ვერიფიკაცია<span className="important">*</span></p>
							<select className="browser-default pollitic-select" value={this.state.requirePhoneAuth} onChange={this.handleChange} name="requirePhoneAuth">
								<option value="False">არასავალდებულო</option>
								<option value="True">სავალდებულო</option>								
							</select>
                        </div>
						<div className="input-field col s12 m6">
							<p className="pollitic-label">ხანგრძლივობა<span className="important">*</span></p>
							<select className="browser-default pollitic-select" value={this.state.closingDate} onChange={this.handleChange} name="closingDate">
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
							<input onChange={this.handleChange} value={this.state.password} name="password" type="password" className="validate"/>
                        </div>
						<div className="input-field file-field col s12 m6">
							<p className="pollitic-label">სურათი</p>
							<div className="btn-small light-green darken-2">
								<span>არჩევა</span>
								<input type="file" onChange={this.handleFileUpload} value={this.state.image} name="image" />
							</div>							
							<div className="file-path-wrapper">
								<input className="file-path validate" type="text" placeholder="სურათის ატვირთვა"/>
							</div>
                        </div>
						<div className="col s12"><h3>პასუხები</h3></div>
						<div className="col s12"><h3>კითხვები</h3></div>
						<div className="col s12 m12">
							<button className='btn-large light-green darken-2 main-btn'>დამატება</button>	
						</div>						
					</div>
				</form>	
			</React.Fragment>
		);
	}
}

export default PaddedContainerHOC(AddNewPoll);