/*
* 购买规格的Item  单个规格的数据
* */

import React,{Component} from 'react';
import PropTypes from 'prop-types';

export default class ByGgItem extends Component{
	render(){
		let {priceArr,item,inputChange,ASS,index,blur} = this.props;
		let {colorName,specificationName,itemCount,itemName} = item;
		return(
			<li>
				<div className="m-left">
					<p className="text-over-1">{itemName}</p>
					<p><strong>{colorName}</strong><strong>{specificationName}</strong></p>
				</div>
				<div className="m-right">
					<p className="money">&yen;<span className="size-16">{priceArr[0]}</span>.{priceArr[1]}</p>
					<div className="by-group">
						<span className="reduce" onTouchTap={()=>{ASS(-1,index)}}>-</span>
						<input type="tel" value={itemCount || 0} onChange={e=>{inputChange(e,index)}}/>
						<span className="add" onTouchTap={()=>{ASS(1,index)}}>+</span>
					</div>
				</div>
			</li>
		)
	}
}
ByGgItem.propTypes = {
	item : PropTypes.object.isRequired,
	priceArr : PropTypes.array.isRequired,
	inputChange : PropTypes.func.isRequired,
	ASS : PropTypes.func.isRequired,
	index : PropTypes.number.isRequired
}