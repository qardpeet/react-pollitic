import React, { Component } from 'react';

class AddCandidate extends Component {
    state = {
        candidate: ''
    }

    handleChange = (e) => {
        this.setState({
            candidate: e.target.value
        });
    }

    addCandidate = () => {
        this.props.addCandidate(this.state.candidate);
        this.setState({
            candidate: ''
        });
    }

    handleKeyUp = (e) => {
        if (e.keyCode === 13) {
            this.addCandidate();
        }
    }

    render() {
        return (
            <React.Fragment>
                <div className="row">
                    <div className="col s12">
                        <input type="text" 
                            value={this.state.candidate} 
                            onChange={this.handleChange}
                            onKeyUp={this.handleKeyUp}
                            className="validate"
                            maxLength="30"
                            placeholder="მთავარი კითხვის პასუხი" 
                        />
                    </div>
                    <div className="col s12">
                        <div className="btn light-green darken-2" onClick={this.addCandidate}>+</div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default AddCandidate