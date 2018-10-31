import React from 'react';
import { Link } from 'react-router-dom';

const NavButtons = ({buttons, closeSideNav}) => {
    const buttonsList = buttons.map((button, index) => {
        return (<li onClick={closeSideNav} key={index}><Link to={button.url}>{button.name}</Link></li>);
    });

    return (
        <React.Fragment>
            {buttonsList}
        </React.Fragment>
    );
}

export default NavButtons;