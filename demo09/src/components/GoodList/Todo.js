import React,{Component} from 'react';
import PropTypes from 'prop-types';
import goodsCache from './goodsCache';
import LazyLoad from 'react-lazy-load';
let {geiUnit} = goodsCache;
export default class Todo extends Component{
	render(){
		let {index,data,AAS,inputChange} = this.props;
		let {listName,defImgUrl,packageprice,limitNum,packageCount,byCartCount,sortNum,promotionIds,
			storage, discountPrice,zonePrice,multisku} = data;
		let {unit,slignUnit} = geiUnit(data);
		let isShowReduceBtn = byCartCount <= 0;
		let isShowAddBtn = byCartCount >= storage;
		let promotionStr = '';
		if(promotionIds === '8 21')promotionStr = '满减';
		if(promotionIds === '8 4')promotionStr = '满赠';
		if (discountPrice != zonePrice && parseFloat(discountPrice)!=0)promotionStr = '折扣';
		let isMoreGG = multisku === 1;
		return(
			<div className="shop-item">
				<div className="pic-box">
					<LazyLoad><img src={defImgUrl} /></LazyLoad>
					<i className="itme-index">{sortNum}</i>
				</div>
				<div className="item-des">
					<div className="des-top">
						<p className="title">{listName}</p>
						<p className="des-act">
							{promotionStr.length > 0 && <span>{promotionStr}</span>}
						</p>
						<p className="des-unit">{packageCount}{unit} | <span className="num">{limitNum}</span>{slignUnit}起售</p>
					</div>
					<div className="des-bottm">
						<p><strong>&yen;</strong><strong className="bg-size">{packageprice.toFixed(2)}</strong>/{slignUnit}</p>
					</div>
				</div>
				<div className="item-by">
					<span onTouchTap={(e)=>AAS(e,index,-1)} className={`count-btn reduce ${isShowReduceBtn ? 'disable' : ''}`}>-</span>
					<input onChange={e=>inputChange(e,index)}
					       disabled={isMoreGG ? true : false}
					       type="tel" value={byCartCount || ''}
					/>
					<span onTouchTap={(e)=>AAS(e,index,1)} className={`count-btn add ${isShowAddBtn ? 'disable' : ''}`}>+</span>
				</div>
			</div>
		)
	}
}


//严格来说  这些外部传入的属性都是要被校验的
Todo.propTypes = {
	index : PropTypes.number.isRequired,
	AAS : PropTypes.func.isRequired,
	inputChange : PropTypes.func.isRequired,
	list : PropTypes.array.isRequired
}

