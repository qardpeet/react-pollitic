import React from 'react';
import BasicCointainerHOC from '../hoc/BasicContainerHOC';
import notFoundIllustration from '../assets/img/not_found.png';

const NotFound = () => {
    return (
        <React.Fragment>
            <div className="row pollitic-404">
                <div className="col s12 m6">
                    <h1>უი...</h1>
                    <h4>ეს გვერდი არ არსებობს</h4>
                    <p>კოდი: 404</p>
                </div>
                <div className="col s12 m6">
                    <img src={notFoundIllustration} alt="404" />
                </div>
            </div>
        </React.Fragment>
    );
};

export default BasicCointainerHOC(NotFound);
