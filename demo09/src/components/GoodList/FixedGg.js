import React,{Component} from 'react';
import ByGgItem from './ByGgItem';
import goodsCache from './goodsCache';
import PropTypes from 'prop-types';
import {Popup} from 'antd-mobile'
import _ from 'lodash';
import './scss/guige.scss';
let {getByCartList,geiUnit,changeByCarCount} = goodsCache;

export default class FixedGg extends Component{
	constructor(props){
		super(props);
		this.state = {
			imgurl :'',
			speclist : []
		}
		this.limitNum = 0;
		this.timer = null;
	}
	AddAndSubtract(count,index){
		let {speclist} = this.state;
		let item = speclist[index];
		let {itemCount} = item;
		this.changeCount(index,parseFloat(itemCount) + parseFloat(count))
	}
	changeCount(index,val){
		let {upDateCartCount,upDataGoodList,list} = this.props;
		let {speclist} = this.state;
		let item = speclist[index];
		let {storage,itemCount,itemId,listId} = item;
		val > storage && (val = storage);
		val < 0 && (val = 0);
		if(itemCount == val)return;
		val = parseInt(val);
		item.itemCount = val;
		this.setState({
			speclist : [...speclist]
		},()=>{
			upDateCartCount(item,val);
		})
		//同步商品列表
		changeByCarCount(val,listId,itemId,{...list,...item});
		upDataGoodList();
	}
	
	//输入框输入事件
	inputChange(e,index){
		let val = e.target.value.replace(/\D/,'') || 0;
		this.changeCount(index,val);
	}

	getItemCount(listId,itemId){
		let list = getByCartList(listId),count = 0;
		if(list){
			count = parseFloat(list.counts[itemId] || 0);
		}
		return count
	}
	componentWillMount() {
		let {data} = this.props;
		let obj = data[0];
		let imgurl = obj.imgUrl;
		let speclist = [];
		data.forEach(({specInfo})=>{
			specInfo.forEach((item)=>{
				let {listId,itemId} = item;
				let itemCount = this.getItemCount(listId,itemId);
				speclist.push({...item,itemCount})
			})
		})
		speclist = _.uniqBy(speclist, 'itemId');
		this.setState({
			speclist,imgurl
		})
	}
	render(){
		let {imgurl,speclist} = this.state;
		let {list} = this.props;
		let {listName,limitNum,packageprice} = list;
		let unit = geiUnit(list);
		let totalCount = 0,totalMoney = 0;
		this.limitNum = limitNum;
		log('speclist,',speclist,list)
		speclist.forEach(({itemCount})=>{
			itemCount = parseFloat(itemCount);
			totalCount += itemCount;
			totalMoney += itemCount * packageprice;
		})
		let totalMoneyArr = totalMoney.toFixed(2).split('.');
		let packagepriceArr = parseFloat(packageprice).toFixed(2).split('.')
		return(
			<div className="fixed-gg-module">
				<div className="close-gg" onTouchTap={()=>Popup.hide()}><i className="close-icon"></i></div>
				<div className="gg-head">
					<div className="img-full-box">
						<img src={imgurl} alt=""/>
					</div>
					<div className="shop-desc">
						<p className="title">{listName}</p>
						<p className="unit"><span className="num">{limitNum}</span>{unit.slignUnit}起订</p>
					</div>
				</div>
				<div className="gg-container">
					<ul>
						{speclist.map((item,i)=>(<ByGgItem
							index={i}
							key={item.itemId}
							item={item}
							inputChange = {this.inputChange.bind(this)}
							ASS={this.AddAndSubtract.bind(this)}
							priceArr={packagepriceArr}/>)
						)}
					</ul>
				</div>
				<div className="total-shop">
					<p>
						<span>总价 <i></i><i className="size-16">{totalMoneyArr[0]}</i><i>.{totalMoneyArr[1]}</i></span>
						<span>共 <i>{totalCount}</i> 件</span>
					</p>
				</div>
				<div className="btn-group">
					<span className="btn" onTouchTap={()=>Popup.hide()}>加入进货单</span>
				</div>
			</div>
		)
	}
}
FixedGg.propTypes = {
	data : PropTypes.array.isRequired,
	list : PropTypes.object.isRequired,
	upDataGoodList : PropTypes.func.isRequired,
	upDateCartCount : PropTypes.func.isRequired
}