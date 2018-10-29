import React from 'react';
import { Route, BrowserRouter } from 'react-router-dom'
import Home from './ParentComponents/Home';
import NewPoll from './ParentComponents/NewPoll';
import Poll from './ParentComponents/Poll';
import Polls from './ParentComponents/Polls';

const App = () => {
	return (
		<BrowserRouter>
			<React.Fragment>
				<Route exact path='/' component={Home}/>
				<Route path='/new-poll' component={NewPoll} />
				<Route path='/poll/:poll_id' component={Poll} />
				<Route path='/polls' component={Polls} />
			</React.Fragment>
		</BrowserRouter>
	);
}

export default App;
