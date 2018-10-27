import React, { Component } from 'react';

class Footer extends Component {
	state = {
		textLeft: 'საიტის ავტორი: შპს სლეში',
		textRight: 'დოკუმენტაცია'
	}

	render() {
		return (
			<React.Fragment>
				<div className="pollitic-footer">
					<div className="row">
						<div className="col s6">
							<p className='left-align' style={{fontSize: '14px', color: 'grey'}}>{this.state.textLeft}</p>
						</div>
						<div className="col s6">
							<p className='right-align' style={{fontSize: '14px', color: 'grey'}}>{this.state.textRight}</p>
						</div>
					</div>
				</div>
			</React.Fragment>
		);
	}
}

export default Footer;