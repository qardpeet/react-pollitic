import React, { Component } from 'react';
import illustration from '../assets/img/man_graph_2.png';

class AboutUs extends Component {
	state = {
		header: 'რატომ POLLITIC?',
		description: 'ლორემ იპსუმ არამეგობრულ დაბორიალობდა გადმონაშთი მოიხელთავდა კალათას ფილმებისა დაიდეს მომაძახებდა გაყიდე დაუშავებიათ სტუდენტებისა ასპარეზიდან უტკბესმა გორდას. ემზადება ზევესს შეგყაროთ დაგენგრეოდა მოხდენილ ფილმებისა მჯიღს'
	}

	render() {
		return (
			<div className="pollitic-item">
				<div className="container">
					<div className="row">
						<div className="col s12 m12 l12 xl6">
							<h1>{this.state.header}</h1>
							<p>{this.state.description}</p>
						</div>
						<div className="col s12 m12 l12 xl6">
							<img src={illustration} alt='სურათი'/>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default AboutUs;