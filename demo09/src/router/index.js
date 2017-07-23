import React,{Component} from 'react';
import SetGet from '@public/SetGet';
import {
	HashRouter,
	Router,
	Route
} from 'react-router-dom';
import createHashHistory from 'history/createHashHistory';
const history = createHashHistory();

import createComponent from './Bundle';
import Home from 'bundle-loader?lazy&name=Home!../components/Home/Home';
import Goods from 'bundle-loader?lazy&name=Goods!../components/GoodList/Goods';
import Test from 'bundle-loader?lazy&name=Goods!../test';
export default class App extends Component{
	componentWillMount() {
		!SetGet.isLoad && (SetGet.isLoad = true);
	}
	render(){
		return(
			<HashRouter>
				<Router  history={history} baseName="/">
					<div>
						<Route path="/home" component={createComponent(Home)}></Route>
						<Route path="/goodlist" component={createComponent(Goods)}/>
						<Route path="/test" component={createComponent(Test)}/>
					</div>
				</Router>
			</HashRouter>
		)
	}
}