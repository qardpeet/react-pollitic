import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import NavButtons from './FunctionalComponents/NavButtons';
import logo from '../assets/img/logo.png';

class Navbar extends Component {
    state = {
        buttons: [
            { name: 'მთავარი', url: '/' },
            {
                name: 'კონტროვერსიალური',
                url: '/polls?sort=hot&context=ongoing',
            },
            { name: 'ახალი', url: '/polls?sort=new&context=ongoing' },
            { name: 'დასრულებული', url: '/polls?sort=hot&context=closed' },
        ],
        sideNavActive: false,
    };

    handleOpen = e => {
        e.preventDefault();
        this.setState({ sideNavActive: true });
    };

    handleClose = () => {
        this.setState({ sideNavActive: false });
    };

    render() {
        const sideNavStyle = this.state.sideNavActive
            ? { transform: 'translateX(0%)', transition: 'transform 250ms' }
            : { transition: 'transform 250ms' };

        return (
            <React.Fragment>
                <nav className="white" role="navigation">
                    <div className="nav-wrapper container">
                        <Link to="/" className="brand-logo">
                            <img className="pollitic-logo" src={logo} alt="logo" />
                        </Link>
                        <ul className="right hide-on-med-and-down">
                            <NavButtons
                                closeSideNav={this.handleClose}
                                buttons={this.state.buttons}
                            />
                        </ul>

                        <ul className="sidenav" style={sideNavStyle}>
                            <NavButtons
                                closeSideNav={this.handleClose}
                                buttons={this.state.buttons}
                            />
                        </ul>
                        <a href="/" onClick={this.handleOpen} className="sidenav-trigger">
                            <i className="material-icons">menu</i>
                        </a>
                    </div>
                </nav>
                {this.state.sideNavActive ? (
                    <div onClick={this.handleClose} className="pollitic-overlay" />
                ) : null}
            </React.Fragment>
        );
    }
}

export default Navbar;
