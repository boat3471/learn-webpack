import React,{Component} from 'react';
import Head from '@view/Head/Head';
import jsonp from '@/jsonp';
import FixedRule from './FixedRule';//规则组件
import Goods from './Goods';//商品
import Notice from './Notice';//订货会banner下面的公告
import {YRPAGE_URL} from '@url';
import PropTypes from 'prop-types';
import {goHome} from '@/core/ShellApi';
const Banner1 = require('@img/banner.jpg');

import './yr.scss';
export default class Home extends Component{
	constructor(props){
		super(props);
		this.state = {
			isTop : false,//是否显示规则
			activityListingDTOList : [],//预热商品列表
			activityDTO:{}//活动信息
		}
		this.url1 = `//wholesale.${window.uleServer}/fxYzgApi/activityIndex.do`;
	}
	//规则显示隐藏事件
	ruleTap(){
		this.setState(({isTop})=>({
			isTop : !isTop
		}))
	}
	backClick(){//返回首页
		goHome()
	}
	componentWillMount() {
		jsonp({
			url : YRPAGE_URL,
			data : {zoneId : zoneId}
		}).then(res=>{
			log('这是订货会场主页调用的接口返回的参数:',res);
			let {returnCode,returnMessage,data} = res;
			if(returnCode === '0000'){
				let {activityDTO,activityListingDTOList} = data;
				this.setState({activityDTO,activityListingDTOList})
			}
		})
	}
	
	render(){
		const {isTop,activityDTO,activityListingDTOList} = this.state;
		return(
			<div className="yr-page pt-50">
				<Head backClick={this.backClick}>
					<div className="title">
						订货会预热
					</div>
				</Head>
				<div className="banner img-full-box">
					<img src={Banner1} alt=""/>
				</div>
				<div className="yr-box">
					<Notice activityDTO={activityDTO}/>
					<div className="shop-warp">
						<ShopWarpUl list={activityListingDTOList}/>
					</div>
				</div>
				<FixedRule
					activityDTO={activityDTO}
					ruleTap={this.ruleTap.bind(this)}
					isTop = {isTop}
				/>
			</div>
		)
	}
}
Home.contextTypes = {
	store: PropTypes.object
}
const ShopWarpUl = ({list})=>{
	return (
		<ul>
			{list.map((item,index)=>(<Goods
				item={item}
				key={index}
			/>))}
		</ul>
	)
}
