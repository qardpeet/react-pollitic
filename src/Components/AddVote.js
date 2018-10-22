import React, {Component} from 'react';
import Recaptcha from 'react-recaptcha';

let recaptchaInstance;

class AddVote extends Component {
    state = {
        candidateId: '',
        number: '',
        gender: '',
        age: '',
        value: ''      
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    handleRadioChange = (e) => {
        this.setState({
            [e.target.name]: e.target.id
        });        
    }

    handleSubmit = (e) => {
        e.preventDefault();
        recaptchaInstance.reset();
        this.props.addVote(this.state);
    }

    recaptchaLoaded = () => {
        console.log('Google ReCaptcha Loaded!');
    }

    verifyCallback = (response) => {
        if(response) this.setState({value: response})
    }

    render(){
        const radioButton = this.props.data.map(candidate => {
            return (
                <p key={candidate.id}>
                    <label>
                        <input onClick={this.handleRadioChange} id={candidate.id} className="with-gap" name="candidateId" type="radio"/>
                        <span>{candidate.name}</span>
                    </label>
                </p>                
            );
        });

        return this.props.display ? (
            <div className="voting-section light">
                <div className="container">
                    <div className="add-vote">
                        <h5 className="center-align header-main">დააფიქსირე შენი ხმა</h5>
                        <form onSubmit={this.handleSubmit}>
                            <div className="row">
                                <div className="input-field col s6">
                                    <input onChange={this.handleChange} placeholder="+995599123456" name="number" type="text" className="validate"/>
                                    <label className="active">ტელეფონის ნომერი<span className="important">*</span></label>
                                </div>
                                <div className="input-field col s6">
                                    <input onChange={this.handleChange} placeholder="25" name="age" type="text" className="validate"/>
                                    <label className="active">ასაკი</label>
                                </div>
                                <div className="col s12 m6">
                                    <p>სქესი</p>
                                    <p>
                                        <label>
                                            <input onClick={this.handleRadioChange} id="male" className="with-gap" name="gender" type="radio"/>
                                            <span>კაცი</span>
                                        </label>
                                    </p>
                                    <p>
                                        <label>
                                            <input onClick={this.handleRadioChange} id="female" className="with-gap" name="gender" type="radio"/>
                                            <span>ქალი</span>
                                        </label>
                                    </p>                            
                                </div>                        
                                <div className="col s12 m6">
                                    <p>კანდიდატი<span className="important">*</span></p>
                                    {radioButton}
                                </div>
                                <div className="col s12 m6 offset-m6">
                                    <Recaptcha
                                    sitekey="6Le4JnYUAAAAAJsF-r7jLHNI9zaMh4Wnuvb565Os"
                                    ref={e => recaptchaInstance = e}
                                    onloadCallback={this.recaptchaLoaded}
                                    verifyCallback={this.verifyCallback}
                                    />
                                </div>                                     
                            </div>
                            <button className="btn main-btn">ხმის დაფიქსირება</button>                   
                        </form>          
                    </div>
                </div>
            </div>
        ) : false;
    }
}

export default AddVote;