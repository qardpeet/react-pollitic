import React from 'react';
import { Link } from 'react-router-dom';

const NavButtons = ({buttons}) => {
    const buttonsList = buttons.map((button, index) => {
        return (<li key={index}><Link to={button.url}>{button.name}</Link></li>);
    });

    return (
        <React.Fragment>
            {buttonsList}
        </React.Fragment>
    );
}

export default NavButtons;