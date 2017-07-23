import React,{PureComponent} from 'react';
import LazyLoad from 'react-lazy-load';
export default class Goods extends PureComponent{
	
	render(){
		let {item} = this.props;
		let {preheatPromotionDesc,listName,defImgUrl,limitNum,preheatPrice,packageCount} = item;
		let {unit,SingleUnit} = getUnit(item);
		const PreheatPriceBox = ()=>{
			let arr = preheatPrice.split('');
			let dotIndex = arr.indexOf('.');
			dotIndex = ~dotIndex ? dotIndex : 99999999999;
			return (
				<div className="vip-sale">
					会场价
					{arr.map((item,index)=>{
						if(index < dotIndex){
							return (<span key={index} className="num-rect">{item}</span>)
						}else if(index > dotIndex){
							return (<span key={index} className="num-rect small-num-rect">{item}</span>)
						}else{
							return (<i key={index}>.</i>)
						}
					})}
					/{SingleUnit}
				</div>
			)
		}
		return(
			<li>
				<div className="item-body">
					<div className="pic-item">
						<LazyLoad height="120px"><img src={defImgUrl} alt=""/></LazyLoad>
						<div className="pic-mask">{preheatPromotionDesc}</div>
					</div>
					<p className="text">
						{listName}
					</p>
					<p className="sale-p">
						<span>{packageCount || 1}{unit}</span>
						<span className="limit-count"><b>{limitNum}</b>{SingleUnit}起售</span>
					</p>
				</div>
				<PreheatPriceBox/>
			</li>
		)
	}
}


const getUnit = ({boxSell,sellUnitSingle,sellUnit})=>{
	let isPackage = boxSell === 1;
	return {
		unit : !isPackage ? sellUnitSingle : `${sellUnitSingle}/${sellUnit}`,
		SingleUnit : !isPackage ? sellUnitSingle : `${sellUnit}`,
	}
}