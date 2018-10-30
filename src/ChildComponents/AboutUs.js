import React from 'react';
import BasicContainerHOC from '../hoc/BasicContainerHOC';
import illustration from '../assets/img/man_graph_2.png';

const AboutUs = () => {
	const title = 'რატომ POLLITIC?';
	const description = 'ლორემ იპსუმ არამეგობრულ დაბორიალობდა გადმონაშთი მოიხელთავდა კალათას ფილმებისა დაიდეს მომაძახებდა გაყიდე დაუშავებიათ სტუდენტებისა ასპარეზიდან უტკბესმა გორდას. ემზადება ზევესს შეგყაროთ დაგენგრეოდა მოხდენილ ფილმებისა მჯიღს';

	return (
		<div className="row">
			<div className="col s12 m12 l12 push-xl6 xl6">
				<img src={illustration} alt='სურათი'/>
			</div>
			<div className="col s12 m12 l12 pull-xl6 xl6">
				<h1>{title}</h1>
				<p>{description}</p>
			</div>
		</div>
	);
}

export default BasicContainerHOC(AboutUs);