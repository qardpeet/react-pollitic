import React, { Component } from 'react';
import logo from '../assets/img/logo.png';

class Navbar extends Component {
	state = {
		buttons: {
			home: 'მთავარი',
			closed: 'დასრულებული',
			ongoing: 'მიმდინარე',
			aboutUs: 'რატომ Pollitic?'
		}
	}

	render() {
		return (
			<div>
				<nav className="white" role="navigation">
					<div className="nav-wrapper container">
						<a id="logo-container" href="/" className="brand-logo"><img src={logo} alt="logo"/></a>
						<ul className="right hide-on-med-and-down">
							<li><a href="/">{this.state.buttons.home}</a></li>
							<li><a href="/">{this.state.buttons.closed}</a></li>
							<li><a href="/">{this.state.buttons.ongoing}</a></li>
							<li><a href="/">{this.state.buttons.aboutUs}</a></li>
						</ul>

						<ul id="nav-mobile" className="sidenav">
							<li><a href="/">{this.state.buttons.home}</a></li>
							<li><a href="/">{this.state.buttons.closed}</a></li>
							<li><a href="/">{this.state.buttons.ongoing}</a></li>
							<li><a href="/">{this.state.buttons.aboutUs}</a></li>
						</ul>
						<a href="/" data-target="nav-mobile" className="sidenav-trigger"><i className="material-icons">menu</i></a>
					</div>
				</nav>					
			</div>
		);
	}
}

export default Navbar;