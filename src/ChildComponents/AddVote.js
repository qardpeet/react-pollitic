import React, { Component } from 'react';
import cancelablePromise from '../helpers/cancelablePromise';
import CandidateRadioButtons from './FunctionalComponents/CandidateRadioButtons';
import PreLoader from './FunctionalComponents/PreLoader';
import Verify from './Verify';
import Recaptcha from 'react-recaptcha';
import axios from 'axios';

class AddVote extends Component {
    state = {
        userInput: {
            candidateId: '',
            number: '',
            gender: '',
            age: '',
            recaptcha: '',
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

    recaptchaLoaded = () => {
        console.log('Google ReCaptcha Loaded!');
    };

    verifyCallback = response => {
        if (response) {
            this.setState({
                userInput: {
                    ...this.state.userInput,
                    recaptcha: response,
                },
            });
        }
    };

    expiredCallback = () => {
        this.props.setModal(true, false, 'შეცდომა', 'გთხოვთ თავიდან მონიშნოთ Recaptcha');
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

        this.postApiData({ data: formData, type: 'vote' });
        this.recaptchaInstance.reset();
    };

    postApiData = ({ data, type }) => {
        this.setState({
            status: 'pending',
        });

        let postLink = '';
        if (type === 'vote') {
            postLink = `http://pollitic.herokuapp.com/api/poll/${this.props.pollId}/vote`;
        } else if (type === 'verify') {
            postLink = this.state.verificationLink;
        }

        const wrappedPromise = cancelablePromise(axios.post(postLink, data));
        this.appendPendingPromise(wrappedPromise);
        return wrappedPromise.promise
            .then(response => {
                this.displayMessage({ response, type });
            })
            .then(() => this.removePendingPromise(wrappedPromise))
            .catch(error => {
                if (!error.isCanceled) {
                    this.displayMessage({ response: error.response, type });
                    this.removePendingPromise(wrappedPromise);
                }
            });
    };

    displayMessage = ({ response, type }) => {
        if (response.statusText !== 'OK') {
            console.log(response);
            switch (type) {
                case 'verify':
                    this.setState({
                        status: 'waitingForUserVerification',
                    });
                    this.props.setModal(
                        true,
                        false,
                        'შეცდომა',
                        'გთხოვთ კიდევ სცადოთ ვერიფიკაცია ან მოგვწერეთ ჩვენს ფეისბუქ გვერდზე. მადლობა!'
                    );
                    break;
                case 'vote':
                    this.setState({
                        status: 'waitingForUser',
                    });
                    this.props.setModal(
                        true,
                        false,
                        'შეცდომა',
                        'გთხოვთ კიდევ სცადოთ ხმის მიცემა ან მოგვწერეთ ჩვენს ფეისბუქ გვერდზე. მადლობა!'
                    );
                    break;
                default:
                    return;
            }
            return;
        }
        if (response.data.status !== 'success') {
            switch (type) {
                case 'verify':
                    this.setState({
                        status: 'waitingForUserVerification',
                    });
                    break;
                case 'vote':
                    this.setState({
                        status: 'waitingForUser',
                    });
                    break;
                default:
                    return;
            }
            this.props.setModal(true, false, 'შეცდომა', response.data.error);
            return;
        }
        if (this.props.requirePhoneAuth === 'False') {
            this.setState({
                status: 'waitingForUser',
            });
            this.props.setModal(true, true, 'გილოცავთ', response.data.data.message);
            this.props.getPollApiData(this.props.pollId);
            return;
        }
        if (this.props.requirePhoneAuth === 'True') {
            switch (type) {
                case 'verify':
                    this.setState({
                        status: 'waitingForUser',
                    });
                    this.props.setModal(true, true, 'გილოცავთ', response.data.data.message);
                    this.props.getPollApiData(this.props.pollId);
                    break;
                case 'vote':
                    this.setState({
                        status: 'waitingForUserVerification',
                        verificationLink: response.data.data.link,
                    });
                    this.props.setModal(
                        true,
                        true,
                        'ვერიფიკაციის კოდი',
                        response.data.data.message
                    );
                    break;
                default:
                    return;
            }
            return;
        }
    };

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
                        {this.props.requirePhoneAuth === 'True' ? (
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
                        ) : null}
                        <div className="col s12">
                            <Recaptcha
                                sitekey="6Le4JnYUAAAAAJsF-r7jLHNI9zaMh4Wnuvb565Os"
                                ref={e => (this.recaptchaInstance = e)}
                                onloadCallback={this.recaptchaLoaded}
                                verifyCallback={this.verifyCallback}
                                expiredCallback={this.expiredCallback}
                                size="compact"
                                className="pollitic-recaptcha"
                                hl="ka"
                            />
                        </div>
                        <div className="input-field col s12">
                            <button
                                onClick={this.submitVote}
                                className="btn-large purple darken-1 main-btn"
                            >
                                ხმის დაფიქსირება
                            </button>
                        </div>
                    </div>
                </div>
            );
        } else if (this.state.status === 'waitingForUserVerification') {
            return (
                <Verify
                    link={this.state.verificationLink}
                    setModal={this.props.setModal}
                    postApiData={this.postApiData}
                />
            );
        } else {
            return <PreLoader />;
        }
    }
}

export default AddVote;
