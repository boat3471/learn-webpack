import React,{PureComponent} from 'react';
import PropTypes from 'prop-types';
export default class Head extends PureComponent{
	back(){
		let{backClick} = this.props;
		backClick && backClick()
	}
	render(){
		let {children,right} = this.props;
		return(
			<header className="header">
				<div className="back-box" onTouchTap={this.back.bind(this)}><i className="back-icon"></i></div>
				{children}
				{right}
			</header>
		)
	}
}
Head.propTypes = {
	backClick : PropTypes.func
}