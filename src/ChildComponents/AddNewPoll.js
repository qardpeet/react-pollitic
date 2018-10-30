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

		// axios.post('http://pollitic.herokuapp.com/api/poll/create', formData)
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
				<h3>ახალი პოლის დამატება</h3>
				<form onSubmit={this.handleSubmit}>
					<div className="row">
						<div className="input-field col s12">
							<input onChange={this.handleChange} value={this.state.name} placeholder="Pollitic კარგი საიტია?" name="name" type="text" className="validate"/>
							<label className="active">პოლის სათაური<span className="important">*</span></label>
                        </div>
						<div className="input-field col s12">
							<input onChange={this.handleChange} value={this.state.description} placeholder="გამოკითხვა Pollitic-ის შესახებ" name="description" type="text" className="validate"/>
							<label className="active">პოლის აღწერა<span className="important">*</span></label>
                        </div>
						<div className="input-field col s12 m6">
							<select className="browser-default pollitic-select" value={this.state.isListed} onChange={this.handleChange} name="isListed">
								<option value="True">საჯარო</option>
								<option value="False">დამალული</option>
							</select>
							<label className="active">პოლის სტატუსი<span className="important">*</span></label>
                        </div>
						<div className="input-field col s12 m6">
							<select className="browser-default pollitic-select" value={this.state.requirePhoneAuth} onChange={this.handleChange} name="requirePhoneAuth">
								<option value="False">არასავალდებულო</option>
								<option value="True">სავალდებულო</option>								
							</select>
							<label className="active">ტელეფონით ვერიფიკაცია<span className="important">*</span></label>
                        </div>
						<div className="input-field col s12 m6">
							<input onChange={this.handleChange} value={this.state.password} placeholder="" name="password" type="text" className="validate"/>
							<label className="active">პაროლი</label>
                        </div>
						<div className="input-field col s12 m6">
							<select className="browser-default pollitic-select" value={this.state.closingDate} onChange={this.handleChange} name="closingDate">
								<option value="0.5">12 საათი</option>
								<option value="1">1 დღე</option>
								<option value="2">2 დღე</option>
								<option value="3">3 დღე</option>
								<option value="4">4 დღე</option>
								<option value="7">1 კვირა</option>
								<option value="14">2 კვირა</option>								
							</select>
							<label className="active">ხანგრძლივობა<span className="important">*</span></label>
                        </div>
						<div className="input-field col s12 m6">
							<input onChange={this.handleFileUpload} value={this.state.image} placeholder="" name="image" type="file" className="validate"/>
							<label className="active">სურათი</label>
                        </div>
						<div className="col s12">
							<button className='btn main-btn'>დამატება</button>	
						</div>						
					</div>
				</form>	
			</React.Fragment>
		);
	}
}

export default PaddedContainerHOC(AddNewPoll);