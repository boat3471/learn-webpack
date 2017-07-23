import React,{PureComponent} from 'react';
import PropTypes from 'prop-types';
export default class FixedRule extends PureComponent{
	render(){
		let {ruleTap,isTop,activityDTO} = this.props;
		activityDTO = activityDTO || {}
		return(
			<div className={`${isTop ? 'rule-top' : 'rule-bottom'} fixed-bottom`}>
				<div className="rule-warp">
					<div className="act-rule" onTouchTap={ruleTap}>
						<div className="title-l"><i className="horn-icon"></i>活动规则</div>
						<div className="title-r">查看规则<i className="back-icon"></i></div>
					</div>
					<div className="rule-body">
						<div className="rect">
							<div className="line-rule" dangerouslySetInnerHTML={{__html : activityDTO.memo1}}></div>
						</div>
					</div>
				</div>
			</div>
		)
	}
}

//严格来说，这些暴露外部的属性都是要被校验的
FixedRule.propTypes = {
	isTop : PropTypes.bool.isRequired,
	ruleTap : PropTypes.func.isRequired
}