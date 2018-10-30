import React from 'react';
import { Link } from 'react-router-dom';
import BasicContainerHOC from '../hoc/BasicContainerHOC';
import illustration from '../assets/img/man_graph.png';

const CallToAction = () => {
	const button = 'დაიწყე';
	const title = 'შექმენით სანდო კითხვარი წამებში';
	const description = 'ლორემ იპსუმ არამეგობრულ დაბორიალობდა გადმონაშთი მოიხელთავდა კალათას ფილმებისა დაიდეს მომაძახებდა გაყიდე დაუშავებიათ სტუდენტებისა ასპარეზიდან უტკბესმა გორდას. ემზადება ზევესს შეგყაროთ დაგენგრეოდა მოხდენილ ფილმებისა მჯიღს';

	return (			
		<div className="row">
			<div className="col s12 m12 l12 xl6">
				<img src={illustration} alt='სურათი'/>
			</div>
			<div className="col s12 m12 l12 xl6">
				<h1>{title}</h1>
				<p>{description}</p>
				<Link to="/new-poll"><button className="btn-large purple darken-1 z-depth-3">{button}</button></Link>
			</div>
		</div>
	);
}

export default BasicContainerHOC(CallToAction);