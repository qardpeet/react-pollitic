import React, { Component } from 'react';
import NavButtons from './FunctionalComponents/NavButtons';
import logo from '../assets/img/logo.png';

class Navbar extends Component {
	state = {
		buttons: [
			{name: 'მთავარი', url: '/', id: '0'},
			{name: 'დასრულებული', url: '/', id: '1'},
			{name: 'მიმდინარე', url: '/', id: '2'},
			{name: 'რატომ Pollitic?', url: '/', id: '3'}
		],
		sideNavActive: false,
		sideNavStyle: {
			transform: 'translateX(-105%)'		
		}
	}

	handleOpen = (e) => {
		e.preventDefault();

		this.setState({
			sideNavStyle: {
				transform: 'translateX(0%)',
				transition: 'all 250ms'				
			},
			sideNavActive: true
		});
	}

	handleClose = () => {
		this.setState({
			sideNavStyle: {
				transform: 'translateX(-105%)',
				transition: 'all 250ms'
			},
			sideNavActive: false
		});
	}

	render() {
		return (
			<React.Fragment>
				<nav className="white" role="navigation">
					<div className="nav-wrapper container">
						<a id="logo-container" href="/" className="brand-logo"><img src={logo} alt="logo"/></a>
						<ul className="right hide-on-med-and-down">
							<NavButtons buttons={this.state.buttons}/>
						</ul>

						<ul className="sidenav" style={this.state.sideNavStyle}>
							<NavButtons buttons={this.state.buttons}/>
						</ul>
						<a href="/" onClick={this.handleOpen} className="sidenav-trigger"><i className="material-icons">menu</i></a>
					</div>
				</nav>
				{this.state.sideNavActive ? (<div onClick={this.handleClose} className="pollitic-overlay"></div>) : null}					
			</React.Fragment>
		);
	}
}

export default Navbar;