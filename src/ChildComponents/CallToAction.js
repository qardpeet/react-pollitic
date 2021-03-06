import React from 'react';
import { Link } from 'react-router-dom';
import BasicContainerHOC from '../hoc/BasicContainerHOC';
import illustration from '../assets/img/man_graph.png';

const CallToAction = () => {
    const button = 'დაიწყე';
    const title = 'შექმენით სანდო გამოკითხვა წამებში';
    const description = `გაიგეთ საზოგადოების აზრი ნებისმიერი საკითხის შესახებ სწრაფი და მარტივი
    გამოკითხვის საშუალებით. ჩვენ გთავაზობთ ინფორმაციის დაცვასა და გამჭვირვალობაზე
    ორიენტირებულ პლატფორმას, სადაც შეგიძლიათ ჩაატაროთ საზოგადო ან დახურული
    გამოკითხვები.`;

    return (
        <div className="row">
            <div className="col s12 m12 l12 xl6">
                <img src={illustration} alt="სურათი" />
            </div>
            <div className="col s12 m12 l12 xl6">
                <h1>{title}</h1>
                <p>{description}</p>
                <Link to="/new-poll">
                    <button className="btn-large light-green darken-2 z-depth-3 poll-btn">
                        {button}
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default BasicContainerHOC(CallToAction);
