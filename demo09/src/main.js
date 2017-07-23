import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import './core/extend';
import './components/entry';
import Routers from './router';
import injectTapEventPlugin from 'react-tap-event-plugin';
import FastClick from 'fastclick';
import {Provider} from 'react-redux';
import {createStore,applyMiddleware} from 'redux';
import reducers from './reducer/index';
import {createLogger} from 'redux-logger';
import thunk from 'redux-thunk';
injectTapEventPlugin();
if(!__PRD__){
	require('vconsole');
}
window.addEventListener('load', () => {
	FastClick.attach(document.body);
});
import './scss/index.scss';
const logger = createLogger();
const middleware = [thunk];
if (process.env.NODE_ENV === `development`) {
	middleware.push(logger);
}
const store = createStore(reducers,applyMiddleware(...middleware));
ReactDOM.render(
	<Provider store={store}>
		<Routers/>
	</Provider>,
	document.getElementById('rootApp')
);