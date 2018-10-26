import React, { Component } from 'react';
import { Route, BrowserRouter } from 'react-router-dom'
import Home from './ParentComponents/Home';
import ClosedPolls from './ParentComponents/ClosedPolls';
import HotPolls from './ParentComponents/HotPolls';
import NewPoll from './ParentComponents/NewPoll';
import NewPolls from './ParentComponents/NewPolls';
import Poll from './ParentComponents/Poll';

class App extends Component {
	state = {

	}

	render() {
		return (
			<BrowserRouter>
				<React.Fragment>
					<Route exact path='/' component={Home}/>
					<Route path='/closedPolls' component={ClosedPolls} />
					<Route path='/hotPolls' component={HotPolls} />
					<Route path='/newPoll' component={NewPoll} />
					<Route path='/newPolls' component={NewPolls} />
					<Route path='/poll' component={Poll} />
				</React.Fragment>
			</BrowserRouter>
		);
	}
}

export default App;
