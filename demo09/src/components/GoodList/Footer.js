import React,{PureComponent} from 'react';
import PropTypes from 'prop-types';
export default class Footer extends PureComponent{
	render(){
		let {totalMoney,totalCount,showCartBoxFn,placeAnOrder} = this.props;
		let totalMoneyArr = totalMoney.toFixed(2).split('.');
		return(
			<div className="fixed-footer fixed-bottom">
				<div className="sale-box">
					<div className="circel-box" onTouchTap={showCartBoxFn}>
						<i className="trash-icon"></i>
						{totalCount > 0 && <i className="total-count">{totalCount}</i>}
					</div>
					<div className="scale-des">
						<span className="s1">共计&nbsp;</span><span>&yen;</span><strong>{totalMoneyArr[0]}</strong><span>.{totalMoneyArr[1]}</span>
					</div>
				</div>
				<div className="po-btn" onTouchTap={placeAnOrder}>下单</div>
			</div>
		)
	}
}
Footer.propTypes = {
	totalCount : PropTypes.number.isRequired,
	totalMoney : PropTypes.number.isRequired,
	showCartBoxFn : PropTypes.func.isRequired,
	placeAnOrder : PropTypes.func.isRequired
}