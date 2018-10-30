import React, { Component } from 'react';

class AddCandidate extends Component {
    state = {
        question: ''
    }

    handleChange = (e) => {
        this.setState({
            question: e.target.value
        });
    }

    addQuestion = () => {
        this.props.addQuestion(this.state.question);
        this.setState({
            question: ''
        });
    }

    render() {
        return (
            <React.Fragment>
                <div className="row">
                    <div className="col s12">
                        <input type="text" value={this.state.question} onChange={this.handleChange} className="validate" />
                    </div>
                    <div className="col s12">
                        <div className="btn light-green darken-2" onClick={this.addQuestion}>+</div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default AddCandidate