import React,{Component} from 'react';
import PropTypes from 'prop-types';
export default class Brank extends Component{
	render(){
		let {downFn} = this.props;
		return(
			<div className="nav-module">
				<div className="nav-list">
					{this.props.children}
				</div>
				<div className="nav-selct" onTouchTap={downFn}>
					<i className="select-icon"></i>
				</div>
			</div>
		)
	}
}
Brank.propTypes = {
	downFn : PropTypes.func.isRequired
}
