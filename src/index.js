import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory, IndexRoute } from 'react-router'
import App from './App';
import People from './components/People';
import PersonForm from './components/PersonForm';
import PersonMainView from './components/PersonMainView';
import './index.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';

ReactDOM.render((
  <Router history={browserHistory}>
  	<Route path="/" component={App}>
  		<IndexRoute component={People}/>
  		<Route path="/create-person" component={PersonForm}/>
  		<Route path="/people/:id" component={PersonMainView}/>
  		<Route path="/edit-people/:id" component={PersonForm}/>
  	</Route>
  </Router>
), document.getElementById('root'));
