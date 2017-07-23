import React,{PureComponent} from 'react';
import PropTypes from 'prop-types';
import {getStroage,deleteStroage} from '@public/localStorage';
const EmptyImg = require('@img/search.png')
export default class SearchStatusBox extends PureComponent{
	delStroageFn(){
		let {storageName} = this.props;
		deleteStroage(storageName);
		this.forceUpdate();
	}
	render(){
		let {isHistory,storageName,searchFn} = this.props;
		let data = JSON.parse(getStroage(storageName) || "[]");
		return(
			<div className="search-module">
				{isHistory ?<HsitoryBox
					searchFn = {searchFn}
					delStroageFn={this.delStroageFn.bind(this)}
					data={data}/> : <EmptyResultBox/> }
			</div>
		)
	}
}

//严格来说  这些外部传入的属性都是要被校验的
SearchStatusBox.propTypes = {
	isHistory : PropTypes.bool.isRequired,
	storageName : PropTypes.string.isRequired
}


const HsitoryBox = ({data,delStroageFn,searchFn})=>{
	return(
		<div className="history-search">
			<div className="sea-top">
				<span className="text-l">最近搜索</span>
				<span className="text-r" onTouchTap={delStroageFn}>删除记录</span>
			</div>
			<div className="ser-his-list">
				{data.map((item,index)=><p onTouchTap={()=>{searchFn(item)}} key={index}>{item}</p>)}
			</div>
		</div>
	)
}

const EmptyResultBox = ()=>{
	return(
		<div className="empty-result">
			<div className="img-full-box">
				<img src={EmptyImg} alt=""/>
			</div>
			<p className="empty-des">很遗憾!没有找到你搜索的商品</p>
		</div>
	)
}