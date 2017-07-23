import React,{Component} from 'react';
import goodsCache from './goodsCache';
let {geiUnit} = goodsCache;


export default class ShippingOrder extends Component{
	render(){
		let {cartList,clearCartList} = this.props;
		log('这是购物车的数据：',cartList)
		return(
			<div className="shipping-order-module" onTouchTap={clearCartList}>
				<div className="shop-od-warp" onTouchTap={e=>{e.stopPropagation();}}>
					<ul>
						{
							cartList.map((item,i)=>(
								<ShopItem
									{...this.props}
									index = {i}
									key={item.itemId || item.defItemId}
									item={item}
								/>
							))
						}
					</ul>
				</div>
			</div>
		)
	}
}


class ShopItem extends Component{
	render(){
		let {item,inputChange,ASS,index,blur} = this.props;
		let {listName,byCartCount,packageprice,snapPrice,colorName,specificationName,reqval2Name} = item;
		specificationName = specificationName || reqval2Name;
		log('itemitemitem',item)
		let unit = geiUnit(item);
		packageprice = packageprice || snapPrice;
		let price = (parseFloat(packageprice) || 0).toFixed(2)
		return(
			<li className="shop-item">
				{/*<div className="itme-index">1</div>*/}
				<div className="item-des">
					<p className="title">{listName}</p>
					<p className="des-bottm"><strong>&yen;</strong><strong className="bg-size">{price}</strong></p>
					<p className="des-gg">{colorName && (<span>{colorName}</span>)}<span>{specificationName}</span></p>
				</div>
				<div className="item-by">
					<span onTouchTap={e=>ASS(-1,index)} className="count-btn reduce">-</span>
					<input type="tel" value={byCartCount} onChange={e=>inputChange(e,index)}/>
					<span onTouchTap={e=>ASS(1,index)} className="count-btn add">+</span>
				</div>
			</li>
		)
	}
}