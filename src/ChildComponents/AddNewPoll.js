import React, { Component } from 'react';
import PaddedContainerHOC from '../hoc/PaddedContainerHOC';
import AddFormItem from './AddFormItem';
import ArrayToList from './FunctionalComponents/ArrayToList';
import cancelablePromise from '../helpers/cancelablePromise';
import PreLoader from './FunctionalComponents/PreLoader';
import { Redirect } from 'react-router-dom';
import Recaptcha from 'react-recaptcha';
import axios from 'axios';
import ApiConfig from '../ApiConfig';

class AddNewPoll extends Component {
    state = {
        userInput: {
            name: '',
            description: '',
            requirePhoneAuth: 'False',
            isListed: 'True',
            candidates: [],
            closingDate: '1',
            image: null,
            recaptcha: '',
        },
        status: 'waitingForUser',
    };

    refsCollection = {};

    pendingPromises = [];

    componentDidMount() {
        this.refsCollection.name.focus();
    }

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

    handleSubmit = () => {
        window.scrollTo(0, 0);
        let formData = new FormData();
        const closingDate = this.getClosingDate(parseInt(this.state.userInput.closingDate));

        for (let key in this.state.userInput) {
            if (Array.isArray(this.state.userInput[key])) {
                for (let i in this.state.userInput[key]) {
                    formData.append(`${key}[]`, this.state.userInput[key][i]);
                }
            } else {
                if (key === 'closingDate') {
                    formData.append(key, closingDate);
                } else {
                    formData.append(key, this.state.userInput[key]);
                }
            }
        }

        this.postApiData(formData);
        this.recaptchaInstance.reset();
    };

    postApiData = data => {
        this.setState({
            status: 'pending',
        });

        const wrappedPromise = cancelablePromise(
            axios.post(`${ApiConfig.url}/api/poll/create`, data, {
                headers: {
                    'content-type': 'application/x-www-form-urlencoded',
                },
            })
        );

        this.appendPendingPromise(wrappedPromise);

        return wrappedPromise.promise
            .then(response => {
                this.displayMessage(response);
            })
            .then(() => this.removePendingPromise(wrappedPromise))
            .catch(error => {
                if (!error.isCanceled) {
                    this.displayMessage(error.response);
                    this.removePendingPromise(wrappedPromise);
                }
            });
    };

    displayMessage = response => {
        if (response.statusText === 'OK') {
            if (response.data.status === 'success') {
                this.setState({
                    status: 'success',
                    newPollId: response.data.data.poll.id,
                });
                this.props.setModal(true, true, 'გილოცავთ', response.data.message);
            } else if (response.data.status === 'error') {
                this.setState({
                    status: 'waitingForUser',
                });
                this.props.setModal(true, false, 'შეცდომა', response.data.error);
            }
        } else {
            this.setState({
                status: 'waitingForUser',
            });
            this.props.setModal(
                true,
                false,
                'შეცდომა',
                'გთხოვთ კიდევ სცადოთ პოლის დამატება ან მოგვწერეთ ჩვენს ფეისბუქ გვერდზე. მადლობა!'
            );
            console.log(response);
        }
    };

    handleKeyUp = (e, nextInput) => {
        if (e.keyCode === 13) {
            this.refsCollection[nextInput].focus();
        }
    };

    handleChange = e => {
        this.setState({
            userInput: {
                ...this.state.userInput,
                [e.target.name]: e.target.value,
            },
        });
    };

    handleFileUpload = e => {
        this.setState({
            userInput: {
                ...this.state.userInput,
                [e.target.name]: e.target.files[0],
            },
        });
    };

    removeItem = (e, itemKey) => {
        const newItems = this.state.userInput[itemKey].filter(item => {
            return item !== e.target.innerHTML;
        });
        this.setState({
            userInput: { ...this.state.userInput, [itemKey]: [...newItems] },
        });
    };

    addItem = (item, itemKey) => {
        if (item !== '') {
            this.setState({
                userInput: {
                    ...this.state.userInput,
                    [itemKey]: [...this.state.userInput[itemKey], item],
                },
            });
        }
    };

    getClosingDate = days => {
        const currentTimeUnixMS = Date.now();
        const currentTimeUnix = currentTimeUnixMS / 1000;
        const roundedClosingDateUnix = Math.round(currentTimeUnix + days * 86400);
        return roundedClosingDateUnix.toString();
    };

    render() {
        if (this.state.status === 'waitingForUser') {
            return (
                <div className="row pollitic-pad">
                    <div className="col s12">
                        <h3>გამოკითხვის შექმნა</h3>
                    </div>
                    <div className="col s12">
                        <p className="pollitic-note">
                            <span className="important">*</span>
                            -ით მონიშნული ველების შევსება სავალდებულოა
                        </p>
                    </div>
                    <div className="input-field col s12">
                        <p className="pollitic-label">
                            სათაური
                            <span className="important">*</span>
                        </p>
                        <input
                            onChange={this.handleChange}
                            value={this.state.userInput.name}
                            ref={input => (this.refsCollection.name = input)}
                            onKeyUp={e => this.handleKeyUp(e, 'description')}
                            maxLength="80"
                            placeholder="მთავარი კითხვა"
                            name="name"
                            type="text"
                            className="validate"
                        />
                    </div>
                    <div className="input-field col s12">
                        <p className="pollitic-label">
                            აღწერა
                            <span className="important">*</span>
                        </p>
                        <input
                            onChange={this.handleChange}
                            value={this.state.userInput.description}
                            ref={input => (this.refsCollection.description = input)}
                            placeholder="დამატებითი ინფორმაცია"
                            name="description"
                            type="text"
                            className="validate"
                            maxLength="350"
                        />
                    </div>
                    <div className="input-field col s12 m6">
                        <p className="pollitic-label">
                            <button
                                className="tool-tip z-depth-1"
                                data-balloon="აირჩიეთ 'დახურული' თუ გსურთ, რომ თქვენი გამოთხვის ნახვა მხოლოდ პირადი ბმულით იყოს შესაძლებელი"
                                data-balloon-pos="right"
                            >
                                ?
                            </button>
                            სტატუსი
                            <span className="important">*</span>
                        </p>
                        <select
                            className="browser-default pollitic-select"
                            value={this.state.userInput.isListed}
                            onChange={this.handleChange}
                            name="isListed"
                        >
                            <option value="True">საჯარო</option>
                            <option value="False">დამალული</option>
                        </select>
                    </div>
                    <div className="input-field col s12 m6">
                        <p className="pollitic-label">
                            <button
                                className="tool-tip z-depth-1"
                                data-balloon="აირჩიეთ 'სავალდებულო' თუ გსურთ, რომ თქვენ გამოკითხვაზე ხმის მიცემა მხოლოდ SMS ვერიფიკაციით იყოს შესაძლებელი"
                                data-balloon-pos="right"
                            >
                                ?
                            </button>
                            SMS ვერიფიკაცია
                            <span className="important">*</span>
                        </p>
                        <select
                            className="browser-default pollitic-select"
                            value={this.state.userInput.requirePhoneAuth}
                            onChange={this.handleChange}
                            name="requirePhoneAuth"
                        >
                            <option value="False">არასავალდებულო</option>
                            <option value="True">სავალდებულო</option>
                        </select>
                    </div>
                    <div className="input-field col s12 m6">
                        <p className="pollitic-label">
                            <button
                                className="tool-tip z-depth-1"
                                data-balloon="აირჩიეთ თუ რამდენ ხანში გსურთ გამოკითხვის დასრულება (დასრულების შემდეგ შედეგების ნახვა მაინც შესაძლებელი იქნება)"
                                data-balloon-pos="right"
                            >
                                ?
                            </button>
                            ხანგრძლივობა
                            <span className="important">*</span>
                        </p>
                        <select
                            className="browser-default pollitic-select"
                            value={this.state.userInput.closingDate}
                            onChange={this.handleChange}
                            name="closingDate"
                        >
                            <option value="0.5">12 საათი</option>
                            <option value="1">1 დღე</option>
                            <option value="2">2 დღე</option>
                            <option value="3">3 დღე</option>
                            <option value="4">4 დღე</option>
                            <option value="7">1 კვირა</option>
                            <option value="14">2 კვირა</option>
                        </select>
                    </div>
                    <div className="input-field file-field col s12">
                        <div className="btn-small light-green darken-2 poll-btn">
                            <span>სურათი</span>
                            <input type="file" onChange={this.handleFileUpload} name="image" />
                        </div>
                        <div className="file-path-wrapper">
                            <input
                                className="file-path validate"
                                type="text"
                                placeholder="სურათის ატვირთვა"
                            />
                        </div>
                    </div>
                    <div className="input-field col s12">
                        <p className="pollitic-label">
                            <button
                                className="tool-tip z-depth-1"
                                data-balloon="დაამატეთ გამოკითხვაზე თითო პასუხი + ღილაკის საშუალებით"
                                data-balloon-pos="right"
                            >
                                ?
                            </button>
                            პასუხები
                            <span className="important">*</span>
                        </p>
                        <AddFormItem
                            addItem={this.addItem}
                            itemName="candidates"
                            inputLength="30"
                            placeHolderInput="მთავარი კითხვის პასუხი"
                        />
                    </div>
                    <div className="col s12">
                        <ArrayToList
                            removeItem={this.removeItem}
                            items={this.state.userInput.candidates}
                            itemKey="candidates"
                        />
                    </div>
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
                            onClick={this.handleSubmit}
                            className="btn-large light-green darken-2 z-depth-3 main-btn poll-btn"
                        >
                            დამატება
                        </button>
                    </div>
                </div>
            );
        } else if (this.state.status === 'success') {
            return <Redirect to={`/poll/${this.state.newPollId}`} />;
        }

        return <PreLoader />;
    }
}

export default PaddedContainerHOC(AddNewPoll);
