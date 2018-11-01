import React, { Component } from 'react';

class AddFormItem extends Component {
    state = {
        item: '',
    };

    handleChange = e => {
        this.setState({
            item: e.target.value,
        });
    };

    addItem = () => {
        this.props.addItem(this.state.item, this.props.itemName);
        this.setState({
            item: '',
        });
    };

    handleKeyUp = e => {
        if (e.keyCode === 13) {
            this.addItem();
        }
    };

    render() {
        return (
            <React.Fragment>
                <div className="row">
                    <div className="col s12">
                        <input
                            type="text"
                            value={this.state.item}
                            onChange={this.handleChange}
                            onKeyUp={this.handleKeyUp}
                            className="validate"
                            maxLength={this.props.inputLength}
                            placeholder={this.props.placeHolderInput || null}
                        />
                    </div>
                    <div className="col s12">
                        <div
                            className="btn light-green darken-2"
                            onClick={this.addItem}
                        >
                            +
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default AddFormItem;
