import React, { Component } from 'react';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import Home from './ParentComponents/Home';
import NewPoll from './ParentComponents/NewPoll';
import Poll from './ParentComponents/Poll';
import Polls from './ParentComponents/Polls';
import Navbar from './ChildComponents/Navbar';
import Footer from './ChildComponents/Footer';
import Modal from './ChildComponents/FunctionalComponents/Modal';
import NotFound from './ParentComponents/NotFound';

class App extends Component {
    state = {
        modal: {
            isActive: false,
            status: false,
            title: '',
            message: '',
        },
    };

    disableModal = () => {
        this.setState({
            modal: { ...this.state.modal, isActive: false },
        });
    };

    setModal = (isActive, status, title, message) => {
        this.setState({
            modal: {
                isActive: isActive,
                message: message,
                title: title,
                status: status,
            },
        });
    };

    render() {
        return (
            <React.Fragment>
                <Modal
                    isActive={this.state.modal.isActive}
                    message={this.state.modal.message}
                    title={this.state.modal.title}
                    status={this.state.modal.status}
                    disableModal={this.disableModal}
                />
                <BrowserRouter>
                    <div className="pollitic-content">
                        <Navbar />
                        <Switch>
                            <Route
                                exact
                                path="/"
                                render={props => <Home {...props} />}
                            />
                            <Route
                                path="/new-poll"
                                render={props => (
                                    <NewPoll
                                        {...props}
                                        setModal={this.setModal}
                                    />
                                )}
                            />
                            <Route
                                path="/poll/:poll_id"
                                render={props => (
                                    <Poll {...props} setModal={this.setModal} />
                                )}
                            />
                            <Route
                                path="/polls"
                                render={props => <Polls {...props} />}
                            />
                            <Route
                                path="/404"
                                render={props => <NotFound {...props} />}
                            />
                            <Route render={props => <NotFound {...props} />} />
                        </Switch>
                        <div className="push" />
                    </div>
                </BrowserRouter>
                <Footer />
            </React.Fragment>
        );
    }
}

export default App;
