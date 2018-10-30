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

    render() {
        return (
            <React.Fragment>
                <div className="row">
                    <div className="col s12">
                        <input type="text" value={this.state.candidate} onChange={this.handleChange} className="validate" />
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