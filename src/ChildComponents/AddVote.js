import React, { Component } from 'react';
import cancelablePromise from '../helpers/cancelablePromise';
import CandidateRadioButtons from './FunctionalComponents/CandidateRadioButtons';
import PreLoader from './FunctionalComponents/PreLoader';
import Verify from './Verify';
import axios from 'axios';

class AddVote extends Component {
    state = {
        userInput: {
            candidateId: '',
            number: '',
            gender: '',
            age: '',
        },
        status: 'waitingForUser',
        verificationLink: '',
    };

    pendingPromises = [];

    componentWillUnmount() {
        this.pendingPromises.map(p => p.cancel());
    }

    appendPendingPromise = promise => {
        this.pendingPromises = [...this.pendingPromises, promise];
    };

    removePendingPromise = promise => {
        this.pendingPromises = this.pendingPromises.filter(p => p !== promise);
    };

    handleChange = e => {
        this.setState({
            userInput: {
                ...this.state.userInput,
                [e.target.name]: e.target.value,
            },
        });
    };

    submitVote = () => {
        // do some client-side validation before posting the data to the api
        let formData = new FormData();

        for (let key in this.state.userInput) {
            formData.append(key, this.state.userInput[key]);
        }

        // this.postApiData(formData);
    };

    // postApiData = data => {
    //     this.setState({
    //         status: 'pending',
    //     });

    //     const wrappedPromise = cancelablePromise(
    //         axios.post(
    //             `http://pollitic.herokuapp.com/api/poll/${
    //                 this.props.pollId
    //             }/vote/`,
    //             data,
    //             {
    //                 headers: {
    //                     'content-type': 'application/x-www-form-urlencoded',
    //                 },
    //             }
    //         )
    //     );

    //     this.appendPendingPromise(wrappedPromise);

    //     return wrappedPromise.promise
    //         .then(response => {
    //             this.displayMessage(response);
    //         })
    //         .then(() => this.removePendingPromise(wrappedPromise))
    //         .catch(error => {
    //             if (!error.isCanceled) {
    //                 this.displayMessage(error.response);
    //                 this.removePendingPromise(wrappedPromise);
    //             }
    //         });
    // };

    // displayMessage = response => {
    //     if (response.statusText === 'OK') {
    //         if (response.data.status === 'success') {
    //             this.setState({
    //                 status: 'success',
    //                 // verification link
    //             });
    //             this.props.setModal(
    //                 true,
    //                 true,
    //                 'გილოცავთ',
    //                 response.data.message
    //             );
    //         } else if (response.data.status === 'error') {
    //             this.setState({
    //                 status: 'waitingForUser',
    //             });
    //             this.props.setModal(
    //                 true,
    //                 false,
    //                 'შეცდომა',
    //                 response.data.error
    //             );
    //         }
    //     } else {
    //         this.setState({
    //             status: 'waitingForUser',
    //         });
    //         this.props.setModal(
    //             true,
    //             false,
    //             'შეცდომა',
    //             'გთხოვთ კიდევ სცადოთ პოლის დამატება ან მოგვწერეთ ჩვენს ფეისბუქ გვერდზე. მადლობა!'
    //         );
    //         console.log(response);
    //     }
    // };

    render() {
        if (this.state.status === 'waitingForUser') {
            return (
                <div className="pollitic-add-vote">
                    <h3>დააფიქსირე შენი ხმა!</h3>
                    <div className="row">
                        <div className="input-field col s12">
                            <p className="pollitic-label">
                                პასუხი
                                <span className="important">*</span>
                            </p>
                            <CandidateRadioButtons
                                handleChange={this.handleChange}
                                candidates={this.props.candidates}
                            />
                        </div>
                        <div className="input-field col s12 m6">
                            <p className="pollitic-label">
                                ტელეფონის ნომერი
                                <span className="important">*</span>
                            </p>
                            <input
                                onChange={this.handleChange}
                                value={this.state.userInput.number}
                                maxLength="20"
                                placeholder="მითითებულ ნომერზე მოგივათ ვერიფიკაციის კოდი"
                                name="number"
                                type="text"
                                className="validate"
                            />
                        </div>
                        <div className="input-field col s12">
                            <button
                                onClick={this.submitVote}
                                className="btn-large purple darken-1 z-depth-3 main-btn"
                            >
                                ხმის დაფიქსირება
                            </button>
                        </div>
                    </div>
                </div>
            );
        } else if (this.state.status === 'waitingForUserVerification') {
            return <Verify />;
        } else {
            return <PreLoader />;
        }
    }
}

export default AddVote;
