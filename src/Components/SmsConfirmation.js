import React, {Component} from 'react';

class SmsConfirmation extends Component {
    state = {
        pin: ''
    }

    handleChange = (e) => {
        this.setState({
            pin: e.target.value
        });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.confirmSmsKey(this.state.pin, this.props.link);
    }
    
    render(){
        return this.props.display ? (
            <div className="voting-section light">
                <div className="container">
                    <div className="add-vote">
                        <h5 className="center-align header-main">დაადასტურე შენი ხმის უნიკალურობა</h5>
                        <form onSubmit={this.handleSubmit}>
                            <div className="row">
                                <div className="col s12">
                                    <p style={{color: 'red'}}>ჩვენ გამოგიგზავნეთ ვალიდაციის კოდი თქვენს მიერ მითითებულ ნომერზე.</p>
                                </div>
                            </div>
                            <div className="row">
                                <div className="input-field col s12 m6">                            
                                    <input onChange={this.handleChange} placeholder="12345" name="pin" id="pin" type="text" className="validate"/>                            
                                    <label htmlFor="pin" className="active">ვალიდაციის კოდი<span className="important">*</span></label>
                                </div>
                            </div>
                            <button className="btn main-btn">დადასტურება</button>
                        </form>
                    </div>
                </div>
            </div>
        ) : false;
    }
}

export default SmsConfirmation; 