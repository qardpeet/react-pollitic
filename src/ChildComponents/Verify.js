import React, { Component } from 'react';

class Verify extends Component {
    state = {
        userInput: {
            pin: '',
        },
    };

    verifyNumber = e => {
        e.preventDefault();
        let formData = new FormData();
        for (let key in this.state.userInput) {
            formData.append(key, this.state.userInput[key]);
        }
        this.props.postApiData({ data: formData, type: 'verify' });
    };

    handleChange = e => {
        this.setState({
            userInput: {
                ...this.state.userInput,
                [e.target.name]: e.target.value,
            },
        });
    };

    render() {
        return (
            <form onSubmit={this.verifyNumber}>
                <div className="row">
                    <div className="input-field col s12 m6">
                        <p className="pollitic-label">
                            პინ კოდი
                            <span className="important">*</span>
                        </p>
                        <input
                            onChange={this.handleChange}
                            value={this.state.userInput.pin}
                            maxLength="5"
                            placeholder="5 ნიშნა ვერიფიკაციის კოდი"
                            name="pin"
                            type="text"
                            className="validate"
                        />
                    </div>
                    <div className="col s12">
                        <button className="btn-large light-green darken-2 main-btn poll-btn">
                            ვერიფიკაცია
                        </button>
                    </div>
                </div>
            </form>
        );
    }
}

export default Verify;
