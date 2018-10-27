import React, { Component } from 'react';
import PaddedContainerHOC from '../hoc/PaddedContainerHOC';
import PollDisplay from './FunctionalComponents/PollDisplay';
// import axios from 'axios';

// const apiLink = 'http://pollitic.herokuapp.com/api/ongoing';

class PollsMin extends Component {
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
					},
					{
						id: 2,
						name: "ლორემ იპსუმ",
						description: "test",
						imageLink: 'https://static01.nyt.com/images/2018/06/17/travel/17hours1/merlin_138493119_dc17f17f-96a2-4487-a9ea-214914926374-articleLarge.jpg?quality=75&auto=webp&disable=upscale',
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
					},
					{
						id: 3,
						name: "კალათას ფილმებისა დაიდეს მომაძახებდა გაყიდე დაუშავებიათ სტუდენტებისა",
						description: "test",
						imageLink: 'https://www.thenational.ae/image/policy:1.726715:1530420415/G_2.jpg?f=16x9&w=1200&$p$f$w=cb96f46',
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
					},
					{
						id: 4,
						name: "ლორემ იპსუმ არამეგობრულ დაბორიალობდა გადმონაშთი მოიხელთავდა",
						description: "test",
						imageLink: 'https://www.nationalgeographic.com/content/dam/travel/rights-exempt/Travel-2016/IT/2016-04/Tbilisi/tbilisi-old-town-georgia.ngsversion.1461174033045.adapt.1900.1.jpg',
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
		},
		headers: {
			new: 'ახალი',
			hot: 'კონტროვერსიალური',
			closed: 'დასრულებული'
		}
	}

	// componentDidMount() {
	// 	axios.post('http://pollitic.herokuapp.com/api/poll/create', {
	// 			name: 'ლორემ იპსუმ',
	// 			description: 'ტესტი',
	// 			requirePhoneAuth: 'False',
	// 			isListed: 'True',
	// 			candidates: [
	// 				'გიორგი',
	// 				'პაატა',
	// 				'ბუზალა'
	// 			],
	// 			closingDate: '2018-10-28 07:54:16'
	// 		})
	// 		.then(response => {
	// 			console.log(response);
	// 		})
	// 		.catch(error => {
	// 			console.log(error);
	// 		});
	// }

	render() {
		return (
			<React.Fragment>
				<h3>{this.state.headers[this.props.sort]}</h3>
				<div className="row">
					<PollDisplay polls={this.state.apiData.data.polls} size='small' />
				</div>
			</React.Fragment>
		);
	}
}

export default PaddedContainerHOC(PollsMin);