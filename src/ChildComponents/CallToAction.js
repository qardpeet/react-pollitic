import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import BasicContainerHOC from '../hoc/BasicContainerHOC';
import illustration from '../assets/img/man_graph.png';

class CallToAction extends Component {
	state = {
		button: 'დაიწყე',
		title: 'შექმენით სანდო კითხვარი წამებში',
		description: 'ლორემ იპსუმ არამეგობრულ დაბორიალობდა გადმონაშთი მოიხელთავდა კალათას ფილმებისა დაიდეს მომაძახებდა გაყიდე დაუშავებიათ სტუდენტებისა ასპარეზიდან უტკბესმა გორდას. ემზადება ზევესს შეგყაროთ დაგენგრეოდა მოხდენილ ფილმებისა მჯიღს'
	}

	render() {
		return (			
			<div className="row">
				<div className="col s12 m12 l12 xl6">
					<img src={illustration} alt='სურათი'/>
				</div>
				<div className="col s12 m12 l12 xl6">
					<h1>{this.state.title}</h1>
					<p>{this.state.description}</p>
					<Link to="/new-poll"><button className="btn">{this.state.button}</button></Link>
				</div>
			</div>
		);
	}
}

export default BasicContainerHOC(CallToAction);