import React from 'react';

const NavButtons = ({buttons}) => {
    const buttonsList = buttons.map(button => {
        return (<li><a href={button.url}>{button.name}</a></li>);
    });

    return (
        <React.Fragment>
            {buttonsList}
        </React.Fragment>
    );
}

export default NavButtons;